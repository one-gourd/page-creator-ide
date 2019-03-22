const fs = require('fs');

function invariant(check, message, logger = console) {

    if (!check) {
        logger.error(
            '[ide-cli] Invariant failed: ' +
            message
        );
        process.exit(1);
    }
}
function readFileOrEmpty(filepath) {
    try {
        console.log('=====> 读取 ' + filepath + '文件内容');
        return fs.readFileSync(filepath, 'utf8');
    } catch (e) {
        console.error('=====> 读取 ' + filepath + '文件内容失败');
        return '';
    }
}

function writeFileOrNone(filepath, data) {
    fs.writeFile(filepath, data, 'utf8', function (err) {
        if (err) {
            console.log('=====> 写入数据到' + filepath + '失败');
            console.error('=====> 想要写入的数据：' + data);
            return;
        }

        console.log('=====> 已将数据写入到：' + filepath);
    });
}

function isExistFile(filepath) {
    var exist = true;

    try {
        var stat = fs.statSync(filepath);
    } catch (e) {
        console.error('=====> 判断 ' + filepath + ' 目录是否存在失败');
        console.error(e);
        exist = false;
    }

    return exist;
}

function parseOrFalse(str) {
    var json = {};
    try {
        if (str.length) {
            json = JSON.parse(str);
            console.log('=====> 将字符串解析成 JSON 成功');

            return json;
        } else {
            return false;
        }
    } catch (err) {
        console.error('=====> 将字符串解析成 JSON 失败：', err);
        console.error('=====> 原字符串内容：' + str);

        return false;
    }
}

// 新建文件夹
function mkdirSyncOrNone(filepath) {
    try {
        fs.mkdirSync(filepath);
        console.log('=====> 创建文件夹成功：' + filepath);
    } catch (e) {
        if (e.code == 'EEXIST') {
            console.log('=====> 文件夹已存在不需要创建');
        } else {
            // 如果不是文件已存在的案例，则直接抛出错误
            console.error('=====> 创建文件夹失败：', e);
            console.log('文件夹:', filepath, '创建失败');
            throw e;
        }
    }
}
function escapeRegex(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

function isTrue(val) {
    return val === 'true' || val === true;
}

module.exports = {
    readFileOrEmpty,
    writeFileOrNone,
    isExistFile,
    parseOrFalse,
    escapeRegex,
    mkdirSyncOrNone,
    invariant,
    isTrue
};
