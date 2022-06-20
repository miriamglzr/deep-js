const nameItems = require("./name-items.json");

const tree = function (nameItems, count = 0) {
	//for every name item in the object
	for (name in nameItems) {
		//if the name item has a childern
		if (count)
			console.log("  " + nameItems["items"] ? "└──" : "├──", nameItems["name"]);
		else console.log(nameItems["name"]);
		if (nameItems["items"]) {
			count++;
			return nameItems["items"].forEach((child) => tree(child, count++));
		}
		//if the name item has no children
		else {
			console.log("│");
		}
	}
};

console.log(tree(nameItems));
module.exports = tree;
