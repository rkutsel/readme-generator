//Import modules here
const inquirer = require("inquirer");
const fs = require("fs");
const questions = require("./src/questions");

//Define globals here
const filePath = "./content/README.md";
let minimalContent = [];
let extendedContent = "";

function writeToFile() {
	try {
		if (minimalContent.length > 0) {
			fs.writeFileSync(
				filePath,
				`# ${minimalContent[0]}\n\n ${"#".repeat(2)} ${minimalContent[1]}`
			);
		} else {
			fs.writeFileSync(filePath, extendedContent);
		}
	} catch (error) {
		console.error(`Couldn't write to a file: ${error.message}`);
	}
}

function generateMinimal() {
	inquirer.prompt(questions.scopeMinimal).then((answer) => {
		minimalContent.push(answer.title);
		minimalContent.push(answer.description);
		writeToFile();
	});
}

function generateExtended() {
	inquirer.prompt(questions.scopeExtended).then((answer) => {
		extendedContent += `# ${answer.extended[0]}\n\n`;
		extendedContent += `## Table of Contents\n\n`;
		answer.extended.forEach((element, index) => {
			if (index > 0) {
				extendedContent += `- [${element}](#${element.split(" ")[0]})\n\n`;
			}
		});
		answer.extended.forEach((element, index) => {
			if (index > 0) {
				extendedContent += `${"#".repeat(2)} ${element}\n\n`;
			}
		});
		chooseLicense();
		writeToFile();
	});
}

function chooseLicense() {
	inquirer.prompt(questions.license).then((answer) => {
		if (!Object.values(answer)[0]) {
			return console.log("Canceled. You opted out of including a license.");
		} else {
			inquirer.prompt(questions.licenseOptions).then(answer);
		}
	});
}

function isFilePresent(filePath, answer) {
	const scope = Object.values(answer)[0];

	if (fs.existsSync(filePath)) {
		inquirer.prompt(questions.isFilePresent).then((answer) => {
			if (!Object.values(answer)[0]) {
				return console.log(
					"Canceled. You can try again by running node main.js in your cli prompt."
				);
			} else scope === "Minimal" ? generateMinimal() : generateExtended();
		});
	} else scope === "Minimal" ? generateMinimal() : generateExtended();
}

function initApp() {
	console.log("Let's generate a neat README!");

	inquirer.prompt(questions.scope).then((answer) => {
		isFilePresent(filePath, answer);
	});
}

initApp();