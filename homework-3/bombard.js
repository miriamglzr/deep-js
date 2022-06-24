#!/usr/bin/env node
const program = require("commander");
const { description, version } = require("./package.json");
const axios = require("axios");
//c
program
	.command("bombard")
	.description(
		"`bombard` should collect and output stats about number, amount of successful and failing responses, average time per performed requests."
	)
	.option(
		"-c, --concurrency <number>",
		"number of parallel requests to perform at a time"
	)
	.option(
		"-n, --requests <number>",
		"number of requests to perform for the benchmarking session"
	)
	.option(
		"-b, --body",
		" if specified, should sent a random generated body with request"
	)
	.option("-url, --url", "used for requests");

const options = program.opts();

//set default request and concurrencies to 1
options.requests =
	parseInt(options.requests) > 0 ? parseInt(options.requests) : 1;
options.concurrency =
	parseInt(options.concurrency) > 0 ? parseInt(options.concurrency) : 1;

let bombards = [];
let successfulRequests = 0;
let failedRequests = 0;

console.time("bombard");
try {
	(async () => {
		for (let i = 0; i < options.requests; i += options.concurrency) {
			const n =
				i + options.concurrency > options.requests
					? options.requests - i
					: options.concurrency;
			const promises = [];

			const requestOptions = { method: options.body ? "POST" : "GET" };
			if (options.body)
				requestOptions.body = Math.random().toString(36).substring(7);
			for (let j = 0; j < n; j++) {
				promises.push(
					new Promise((resolve) => {
						const time = new Date().getTime();
						axios
							.get(options.url, requestOptions)
							.then(({ status, statusText, headers }) => {
								if (status === 200 || statusText === "OK") successfulRequests++;
								else failedRequests++;

								bombards.push(
									Math.abs(time - new Date(headers.date).getTime())
								);
								resolve();
							});
					})
				);
			}
			await Promise.allSettled(promises);
		}
		//get average time response
		let averageTime = bombards.reduce((a, b) => a + b) / options.requests;
		console.log("bombarded");
		console.log(options.requests + " times");
		console.log(
			successfulRequests + " successful, " + failedRequests + " failing"
		);
		console.log("average response time" + averageTime + "ms");
		console.log("");
		console.log("Number Time");
		bombards.forEach((bombard, i) => console.log(i + 1 + " " + bombard + "ms"));
		console.timeEnd("bombard");
	})();
} catch (err) {
	console.log(err.message);
}

program
	.description(description)
	.version(version, "-v, --version")
	.parse(process.argv);

if (!process.argv.slice(2).length) {
	program.outputHelp();
}
