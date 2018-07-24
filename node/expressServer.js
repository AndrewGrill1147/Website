'use strict';

var express = require('express');
var fileSystem = require('fs');
var filePath = require('path');

var server = express();

server.get('/', function (req,res){
	var baseName = filePath.basename(req.url);
	var dirName = filePath.dirname(req.url);
	var pageData ='';

	var localFolder = '/srv/CommunityHub';
	server.use(express.static(localFolder));//To serve stylesheet alongside page

	if(req.url.indexOf('.') === -1){
		pageData = localFolder + req.url + '/index.html';
	}
	else
		pageData = localFolder + dirName + '/' + baseName;

	fileSystem.readFile(pageData, function(err,data){
		if(!err){
			res.status(200);
			res.set({
				'Content-Type': 'text/html'
			});
			console.log('A user has accessed the home page');
			res.end(data);
		}
		else{    
			res.status(404);
			res.set({
				'Content-Type': 'text/html'
			});
			res.write(pageData + '\n');
			res.end("<h1>page not found</h1>");
		}
	})
});

server.listen(80, function(){
	console.log("EXPRESS SERVER RUNNING");
});
