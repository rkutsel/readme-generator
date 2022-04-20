const https = require("https");

const gitFetch = {
	hostname: "api.github.com",
	path: "/licenses",
	headers: { "User-Agent": "Mozilla/5.0" },
};

let licenseOptions = [];

function gitHubFetch() {
	https
		.get(gitFetch, (result) => {
			let bodyInit = "";

			result.on("data", (data) => {
				bodyInit += data;
			});
			result.on("end", function () {
				const dataResponse = JSON.parse(bodyInit);
				dataResponse.forEach((element) => {
					licenseOptions.push(element.spdx_id);
				});
				// console.log(licenseOptions);
				return licenseOptions;
			});
		})
		.on("error", (error) => {
			console.error(error);
		});
}

gitHubFetch();

module.exports = licenseOptions;
