var http 	= require("http"),
    path 	= require("path"),
    fs 		= require("fs");

http.createServer(function (request, response){

	console.log("request starting...");

	var filePath = '.' + request.url;
	if (filePath === "./") {
		filePath = "./index.html";
	}
	
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}
	
	path.exists(filePath, function(exists) {
		if (exists) {
			console.log(filePath);
			fs.readFile(filePath, function(error, content){
				if(error) {
					response.writeHead(500);
					response.end();
				} else {
					response.writeHead(200, {"Content-Type": contentType});
					response.end(content, "utf-8");
				}
			});
		} else {
			response.writeHead(404);
			response.end();
		}
	});
	
}).listen(8125);

console.log("Server running at http://127.0.0.1:8125/");