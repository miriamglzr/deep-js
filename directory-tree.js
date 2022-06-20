const path = require("path");
const fs = require("fs");

const listFiles = (dir) => {
	console.log(dir);
	fs.readdir(path.join(__dirname, dir), (err, files) => {
		if (err) {
		} else if (files.length) {
			files.forEach((file) => {
				console.log(" └──", file);
				listFiles(file);
			});
		}
	});
};

listFiles("./directory");
