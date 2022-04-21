const fs = require("fs");
const https = require("https");
const inquirer = require("inquirer");
const questions = require("./questions");

let gitFetchRep;
let licenseName;
const fileLicensePath = "./content/LICENSE.txt";
const fileReadmePath = "./content/README.md";

const gitBadges = {
	MIT: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
	"LGPL-3.0":
		"[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)",
	"MPL-2.0":
		"[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
	"AGPL-3.0":
		"[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)",
	Unlicense:
		"[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",
	"Apache-2.0":
		"[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
	"GPL-3.0":
		"[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
};

function gitHubFetchAll() {
	const gitFetchReqAll = {
		hostname: "api.github.com",
		path: "/licenses",
		headers: { "User-Agent": "Mozilla/5.0" },
	};
	https
		.get(gitFetchReqAll, (result) => {
			let bodyInit = "";

			result.on("data", (data) => {
				bodyInit += data;
			});
			result.on("end", () => {
				const dataResponse = JSON.parse(bodyInit);
				gitFetchRep = dataResponse;
				dataResponse.forEach((element) => {
					questions.licenseOptions[0].choices.push(element.spdx_id);
				});
				promptUser();
			});
		})
		.on("error", (error) => {
			console.error(error);
		});
}

function gitHubFetchOne(licenseName) {
	const gitFetchReqOne = {
		hostname: "api.github.com",
		path: `/licenses/${licenseName}`,
		headers: { "User-Agent": "Mozilla/5.0" },
	};
	https
		.get(gitFetchReqOne, (result) => {
			let bodyInit = "";

			result.on("data", (data) => {
				bodyInit += data;
			});
			result.on("end", () => {
				const dataResponse = JSON.parse(bodyInit);
				gitFetchRep = dataResponse.body;
			});
		})
		.on("error", (error) => {
			console.error(error);
		});
}

function promptUser() {
	inquirer.prompt(questions.licenseOptions).then((answer) => {
		licenseName = answer.licenseOptions;
		updateReadme();
		gitHubFetchOne(answer.licenseOptions.toLowerCase());
		inquirer.prompt(questions.licenseConfirmName).then((answer) => {
			if (!Object.values(answer)[0]) {
				return console.log(
					"Canceled. You opted out of including your name in the license."
				);
			} else {
				inquirer.prompt(questions.licensePutName).then((answer) => {
					console.log(answer.licensePutName);
					gitFetchRep = gitFetchRep.replace("[year]", Date().split(" ")[3]);
					gitFetchRep = gitFetchRep.replace(
						"[fullname]",
						answer.licensePutName
					);
					writeToFile();
				});
			}
		});
	});
}

function updateReadme() {
	try {
		const loadFile = fs.readFileSync("./content/README.md");
		fs.writeFileSync(
			fileReadmePath,
			`### ${licenseName} License\n ${gitBadges[licenseName]}\n`
		);
		fs.appendFileSync(fileReadmePath, loadFile);
	} catch (error) {
		console.error(`Couldn't write to a file: ${error.message}`);
	}
}

function writeToFile() {
	// gitFetchRep.replace("[year]", `[${Date().split(" ")[3]}]`);
	try {
		fs.writeFileSync(fileLicensePath, gitFetchRep);
		inquirer.prompt(questions.openEditor).then((answer) => {});
	} catch (error) {
		console.error(`Couldn't write to a file: ${error.message}`);
	}
}

module.exports = gitHubFetchAll;
