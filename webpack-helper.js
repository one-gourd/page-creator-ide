const COMMON_EXTERNALS = {
  ette: {
    commonjs: 'ette',
    commonjs2: 'ette',
    amd: 'ette',
    root: 'Ette'
  },
  'ette-router': {
    commonjs: 'ette-router',
    commonjs2: 'ette-router',
    amd: 'ette-router',
    root: 'etteRouter'
  },
  'ette-proxy': {
    commonjs: 'ette-proxy',
    commonjs2: 'ette-proxy',
    amd: 'ette-proxy',
    root: 'etteProxy'
  },
  react: {
    commonjs: 'react',
    commonjs2: 'react',
    amd: 'react',
    root: 'React'
  },
  'react-dom': {
    commonjs: 'react-dom',
    commonjs2: 'react-dom',
    amd: 'react-dom',
    root: 'ReactDOM'
  },
  antd: 'antd',
  mobx: 'mobx',
  'mobx-react': {
    commonjs: 'mobx-react',
    commonjs2: 'mobx-react',
    amd: 'mobx-react',
    root: 'mobxReact'
  },
  'mobx-react-lite': {
    commonjs: 'mobx-react-lite',
    commonjs2: 'mobx-react-lite',
    amd: 'mobx-react-lite',
    root: 'mobxReact'
  },
  'mobx-state-tree': {
    commonjs: 'mobx-state-tree',
    commonjs2: 'mobx-state-tree',
    amd: 'mobx-state-tree',
    root: 'mobxStateTree'
  },
  'styled-components': {
    commonjs: 'styled-components',
    commonjs2: 'styled-components',
    amd: 'styled-components',
    root: 'styled'
  },
  "ide-lib-utils": {
    "commonjs": "ide-lib-utils",
    "commonjs2": "ide-lib-utils",
    "amd": "ide-lib-utils",
    "root": "ideLibUtils"
  },
  "ide-lib-base-component": {
    "commonjs": "ide-lib-base-component",
    "commonjs2": "ide-lib-base-component",
    "amd": "ide-lib-base-component",
    "root": "ideBaseComponent"
  }
};


const ALL_EXTERNALS = Object.assign({}, COMMON_EXTERNALS, {
  'ss-tree': {
    commonjs: 'ss-tree',
    commonjs2: 'ss-tree',
    amd: 'ss-tree',
    root: 'ssTree'
  },
  'ide-code-editor': {
    commonjs: 'ide-code-editor',
    commonjs2: 'ide-code-editor',
    amd: 'ide-code-editor',
    root: 'ideCodeEditor'
  }
});

const COMMON_LIBS = Object.keys(COMMON_EXTERNALS);

module.exports = {
  COMMON_EXTERNALS,
  getExternal: function (extraLibs = [], directUse = false) {
    const libs = COMMON_LIBS.concat(extraLibs);
    const externals = {};
    libs.forEach(lib => {
      externals[lib] = directUse
        ? ALL_EXTERNALS[lib]
        : (ALL_EXTERNALS[lib] && ALL_EXTERNALS[lib].root) || lib;
    });
    return externals;
  }
};
