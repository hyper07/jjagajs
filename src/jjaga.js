/* global require, module, window */
var Handler = require('./jjaga/handler')
var Util = require('./jjaga/util')
var Random = require('./jjaga/random')
var RE = require('./jjaga/regexp')
var toJSONSchema = require('./jjaga/schema')
var valid = require('./jjaga/valid')

var XHR
if (typeof window !== 'undefined') XHR = require('./jjaga/xhr')

/*!
    Mock - 模拟请求 & 模拟数据
    https://github.com/hyper07/jjaga
    墨智 mozhi.gyy@taobao.com nuysoft@gmail.com
*/
var Mock = {
    Handler: Handler,
    Random: Random,
    Util: Util,
    XHR: XHR,
    RE: RE,
    toJSONSchema: toJSONSchema,
    valid: valid,
    heredoc: Util.heredoc,
    setup: function(settings) {
        return XHR.setup(settings)
    },
    _mocked: {}
}

Mock.version = '1.0.1-beta3'

// 避免循环依赖
if (XHR) XHR.Mock = Mock

/*
    * Mock.mock( template )
    * Mock.mock( function() )
    * Mock.mock( rurl, template )
    * Mock.mock( rurl, function(options) )
    * Mock.mock( rurl, rtype, template )
    * Mock.mock( rurl, rtype, function(options) )

    根据数据模板生成模拟数据。
*/
Mock.mock = function(rurl, rtype, template) {
    // Mock.mock(template)
    if (arguments.length === 1) {
        return Handler.gen(rurl)
    }
    // Mock.mock(rurl, template)
    if (arguments.length === 2) {
        template = rtype
        rtype = undefined
    }
    // 拦截 XHR
    if (XHR) window.XMLHttpRequest = XHR
    Mock._mocked[rurl + (rtype || '')] = {
        rurl: rurl,
        rtype: rtype,
        template: template
    }
    return Mock
}

module.exports = Mock