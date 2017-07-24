/**
 * Created by yuhongjun on 2017/7/21.
 */
'use strict';

var greet=require('./hello');
var s='Michael';
greet(s);
process.on('exit', function (code) {
	console.log('test about to exit with code: ' + code);
});

if (typeof(window) === 'undefined') {
	console.log('node.js');
} else {
	console.log('browser');
}

var fs = require('fs');
// 请注意，sample.txt文件必须在当前目录下，且文件编码为utf-8。
// fs.readFile('sample.txt', 'utf-8', function (err, data) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(data);
// 	}
// });
// var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
// ws1.write('使用Stream写入文本数据...\n');
// ws1.write('END.');
// ws1.end();
//
// var ws2 = fs.createWriteStream('output2.txt');
// ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
// ws2.write(new Buffer('END.', 'utf-8'));
// ws2.end();
// var rs = fs.createReadStream('output1.txt', 'utf-8');
//
// rs.on('data', function (chunk) {
// 	console.log('DATA:')
// 	console.log(chunk);
// });
//
// rs.on('end', function () {
// 	console.log('END');
// });
//
// rs.on('error', function (err) {
// 	console.log('ERROR: ' + err);
// });

var rs = fs.createReadStream('output1.txt');
var ws = fs.createWriteStream('copied.txt');

rs.pipe(ws);