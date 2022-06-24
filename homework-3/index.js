#!/usr/bin/env node
//first attempt to manual server, ignore

const http = require("http");
const hostname = "127.0.0.1";
const port = 8080;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	console.log("hi");
	const fs = require("fs");
	const str = fs.createReadStream("./bombard.js");
	setTimeout(() => res.end(str), 100);
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
