var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	setTimeout(
		() =>
			res.render("index", {
				title: "homework #3",
				message: "Hello World!",
			}),
		100
	);
});

module.exports = router;
