var http = require("http");
var fs = require("fs");
var path = require("path");

var hostname = "127.0.0.1";
var port = 3030;

var mimeTypes = {
	".html": "text/html",
	".ico": "image/x-icon",
  '.svg': 'image/svg+xml',
	".jpg": "image/jpeg",
	".png": "image/png",
	".gif": "image/gif",
	".css": "text/css",
	".js": "text/javascript",
  '.json': 'application/json',
};

http
	.createServer((request, response) => {
		console.log(`Request: ${request.url}`);

		var filePath = "." + request.url;
		if (filePath === "./") filePath = "./index.html";

		var extname = String(path.extname(filePath)).toLowerCase();
		var contentType = mimeTypes[extname] || "application/octet-stream";

		fs.readFile(filePath, (err, data) => {
			if (err) {
				if (err.code === "ENOENT") {
					response.writeHead(404, { "Content-Type": "text/html" });
					response.end("<h1>404 - File Not Found</h1>", "utf-8");
				} else {
					response.writeHead(500);
					response.end(`Server Error: ${err.code}`);
				}
			} else {
				response.writeHead(200, { "Content-Type": contentType });
				response.end(data, "utf-8");
			}
		});
	})
	.listen(port, hostname, () => {
		console.log(`Server running at http://${hostname}:${port}/`);
	});
