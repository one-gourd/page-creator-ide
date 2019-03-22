const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { readFileOrEmpty, parseOrFalse, isExistFile } = require('./util');

const URL_PREFIX = 'https://unpkg.com/ide-code-editor/dist/';
const TARGET_DIR = path.join(__dirname, `../.cache/works`);
const filenames = [
  'editor.worker.js',
  'json.worker.js',
  'typescript.worker.js'
];

let shouldRequest = false;

/* ----------------------------------------------------
    通过 package json 判断是否请求 works
----------------------------------------------------- */
const pkgFile = path.join(__dirname, `../package.json`);
if (isExistFile(pkgFile)) {
  const pkgJson = parseOrFalse(readFileOrEmpty(pkgFile));
  if (pkgJson) {
    const peerObject = pkgJson.peerDependencies || {};
    shouldRequest = !!peerObject['ide-code-editor']; // 有相应的依赖就去请求
  }
}
// ==============================
if (!shouldRequest) {
  console.log('不存在 code-editor 相关依赖，不请求 works.js');
  return;
}

console.log('存在 code-editor 相关依赖，将要请求 works.js');

function requestFile(targetUrl, writePath, count = 0) {
  if (count > 5) {
    console.error('detect repeatedly redirect, please check your target url ');
    return;
  }
  https.get(targetUrl, function(res) {
    // Detect a redirect
    if (res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
      // The location for some (most) redirects will only contain the path,  not the hostname;
      // detect this and add the host to the path.
      const targetHost =
        url.parse(res.headers.location).hostname ||
        url.parse(targetUrl).hostname;
      requestFile(
        `https://${targetHost}${res.headers.location}`,
        writePath,
        ++count
      );
    } else {
      // write to local file
      const file = fs.createWriteStream(writePath);
      res.pipe(file);
    }
  });
}

fs.access(TARGET_DIR, fs.constants.F_OK, dirErr => {
  console.log(
    `${TARGET_DIR} ${
      dirErr ? 'does not exist, will create' : 'exists, not create'
    }`
  );
  //   如果不存在，则创建文件夹
  if (dirErr) {
    fs.mkdirSync(TARGET_DIR, true);
  }
  //   获取指定远程文
  filenames.forEach(name => {
    const targetPath = `${TARGET_DIR}/${name}`;
    // Check if the file exists in the current directory.
    fs.access(targetPath, fs.constants.F_OK, err => {
      console.log(
        `file '${name}' ${
          err ? 'does not exist, will fetch' : 'exists, not fetch'
        }`
      );
      //   fetch
      if (err) {
        const targetUrl = `${URL_PREFIX}${name}`;
        requestFile(targetUrl, targetPath);
      }
    });
  });
});
