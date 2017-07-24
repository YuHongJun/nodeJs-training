/**
 * Created by yuhongjun on 2017/7/24.
 */
'use strict';

var
	fs = require('fs'),
	url = require('url'),
	path = require('path'),
	http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

// 创建服务器:
var server = http.createServer(function (request, response) {
	// 获得URL的path，类似 '/css/bootstrap.css':
	var pathname = url.parse(request.url).pathname;
	// 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
	var filepath = path.join(root, pathname);
	// 获取文件状态:
	fs.stat(filepath, function (err, stats) {
		if (!err && stats.isFile()) {
			// 没有出错并且文件存在:
			console.log('200 ' + request.url);
			// 发送200响应:
			response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
			// 将文件流导向response:
			fs.createReadStream(filepath).pipe(response);
		} else if(!err && stats.isDirectory()){
			fs.readdir(filepath, (err, files) => {
				if (err) {
					response.writeHead(404);
					response.end('404 not found!');
					console.log('读取目录错误！');
				} else {
					// 优先查找 index.html
					if (files.includes('index.html')) {
						console.log('200 ' + request.url);
						filepath = path.join(filepath, 'index.html');
						// response(request, response, filepath);
						// 发送200响应:
						response.writeHead(200);
						// 将文件流导向response:
						fs.createReadStream(filepath).pipe(response);

					} else if(files.includes('default.html')) {
						console.log('200 ' + request.url);
						filepath = path.join(filepath, 'default.html');
						// 发送200响应:
						response.writeHead(200);
						// 将文件流导向response:
						fs.createReadStream(filepath).pipe(response);
					} else {
						console.log('404 ' + request.url);
						response.writeHead(404);
						response.end('404 not found!');
					}
				}
			})


		}else {
			// 出错了或者文件不存在:
			console.log('404 ' + request.url);
			// 发送404响应:
			response.writeHead(404);
			response.end('404 Not Found');
		}
	});
});

server.listen(8080);
// http://127.0.0.1:8080/http
console.log('Server is running at http://127.0.0.1:8080/');