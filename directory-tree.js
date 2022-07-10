const path = require("path");
const fs = require("fs");

const listFiles = (file, depth = 0) => {
	fs.stat(file, (err, stats) => {
		if (stats.isDirectory()) {
			console.log(" ".repeat(depth) + " -> " + file + " dir");
			fs.readdir(file, (err, files) => {
				files.forEach((child) => listFiles(`${file}/${child}`, depth + 1));
			});
		} else {
			console.log(" ".repeat(depth) + " -- " + file + " file");
		}
	});
};

listFiles("./directory");
