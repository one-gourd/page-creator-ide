var Debug = require('debug');
var debug = Debug('page-creator');

// 基本 log 构造函数
// 添加一些基本的注释，方便理解；
var debugBase = (type:string, ...notes:string[]) => (...props: string[]) => {
    let str = '';
    [].concat(notes).forEach(note => {
        str += `[${note}]`;
    });

    props[0] = str + props[0];
    Debug(`page-creator:${type}`)(...props);
}

var debugMini = debugBase('mini', '普通'); // 普通的日志
var debugError = debugBase('error', '错误'); // 错误日志

var debugModel = debugBase('model', '模型'); // 模型的日志
var debugComp = debugBase('comp', '组件'); // 组件的日志
var debugRender = debugBase('render', '渲染时');  // render 回调中的日志
var debugInteract = debugBase('act', '交互行为');  // 交互行为，用户触发的
var debugIO = debugBase('io', '数据请求');  // io 请求时的日志

export {
    debug,
    debugBase,

    debugMini,
    debugModel,
    debugComp,
    debugInteract,
    debugRender,
    debugIO,
    debugError
};