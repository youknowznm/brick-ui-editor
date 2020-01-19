/* eslint-disable */
var utils = require('common/utils')
var config = require('common/config')
var fs = require('fs')
var nps = require('path')

var zhStringReg = /(['"`])([\u4e00-\u9fa5]+)[^\\]\1/g;
// var stringReg = /(['"`])[^]*?[^\\]\1/g;
var stringReg = /(['"`]).*?[^\\]\1/g;
var containZhStringReg = /(['"`]).*?([\u4e00-\u9fa5]+).*?[^\\]\1/g;
var inlineCommentReg = /\/\/[^\n]*\n/g;
var blockCommentReg = /\/\*[^]*?\*\//g;

function generateZhWords(text) {
    text = text
        .replace(inlineCommentReg, '')
        .replace(blockCommentReg, '');
    var matched, tmp, zhGroup, zhList = [];
    matched = text.match(stringReg) || [];

    matched.forEach(function (constString) {
        tmp = constString.match(containZhStringReg) || [];

        tmp.forEach(function (containZh) {
            // zhGroup = containZh.split(/[^\u4e00-\u9fa5]+/);
            // zhGroup = zhGroup.filter(Boolean);
            // zhList.push.apply(zhList, zhGroup);
            //

            containZh = containZh.replace(/^(['"`])(.*)\1$/, '$2')
            if (containZh) {
                zhList.push(containZh);
            }

        });
    })

    // matched.forEach(function (containZh) {
    //     // zhGroup = containZh.split(/[^\u4e00-\u9fa5]+/);
    //     // zhGroup = zhGroup.filter(Boolean);
    //     // zhList.push.apply(zhList, zhGroup);
    //     //
    //
    //     containZh = containZh.replace(/^(['"`])(.*)\1$/, '$2')
    //     if (containZh) {
    //         zhList.push(containZh);
    //     }
    //
    // });

    return zhList;
}

function generateZhCode(list) {
    var str = list.map(function (ch) {
        return ch;
        // return '    \'' + ch + '\': \'' + ch + '\','
    }).join('\n');

    return str;
    // return [
    //     'var lang = {',
    //     str,
    //     '    \'__dummy_line__\': \'保证这是最后一行, 不要删除\'',
    //     '};',
    //     'lang;'
    // ].join('\n');
}

module.exports = function generate(files, filter) {
    filter = filter || function () {return true}

    var wordsList = files
        .map(function (x) {
            return nps.resolve(x)
        })
        .filter(filter)
        .map(function (file) {
            return generateZhWords(
                fs.readFileSync(file).toString()
            )
        });

    var words = [], zhMap = {}, uniqueWords = [];
    wordsList.forEach(function (list) {
        words = words.concat(list);
    })

    words.forEach(function (zh) {
        if (!zhMap[zh]) {
            uniqueWords.push(zh);
        }
        zhMap[zh] = true;
    })

    console.log(generateZhCode(uniqueWords))
}


