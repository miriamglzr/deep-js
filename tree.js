const nameItems = require("./name-items.json");

function tree(nameItems) {
	const recur = ({ name, items }) =>
		name +
		(items?.length
			? "\n" +
			  items
					.map(recur)
					.map((text, i, { length }) =>
						i < length - 1
							? "├──" + text.replace(/\n/g, "\n│  ")
							: "└──" + text.replace(/\n/g, "\n   ")
					)
					.join("\n")
			: "");
	return nameItems.map(recur).join("\n");
}

console.log(tree(nameItems));

module.exports = tree;
