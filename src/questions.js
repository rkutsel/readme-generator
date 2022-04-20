// const licenseFetch = setTimeout(() => {
// 	const licenseFetch = require("./fetch");
// 	const licenseNewFetch = licenseFetch.map((element) => element);
// 	console.log(typeof newArr);
// 	return licenseNewFetch;
// }, 300);

//Define globals here.
const filePath = "./content/README.md";

const scope = [
	{
		type: "list",
		name: "scope",
		message: "Choose the scope of your README?",
		choices: ["Minimal", "Extended"],
	},
];

const scopeMinimal = [
	{
		type: "input",
		name: "title",
		message: "Enter project title.",
		validate(value) {
			const valid = value.length > 5;
			return valid || "Title should have at least a few words. You got this!";
		},
	},
	{
		type: "input",
		name: "description",
		message: "Enter project description.",
		validate(value) {
			const valid = value.length > 10;
			return (
				valid || "Description should be a bit more descriptive. You got this!"
			);
		},
	},
];

const scopeExtended = [
	{
		type: "checkbox",
		message: "Choose README sections you'd like included:",
		name: "extended",
		default: ["Title", "Description"],
		choices: [
			{
				name: "Title",
			},
			{
				name: "Description",
			},
			{
				name: "Installation Instructions",
			},
			{
				name: "Usage with Examples",
			},
			{
				name: "Features",
			},
			{
				name: "Credits",
			},
			{
				name: "Contribute",
			},
			{
				name: "Tests",
			},
		],
	},
];

const isFilePresent = [
	{
		type: "confirm",
		name: "fileOverwrite",
		message: `File in ${filePath} already present. Would you like to overwrite it?`,
	},
];

const license = [
	{
		type: "confirm",
		name: "license",
		message: `Would you like to include a license?`,
	},
];

const licenseOptions = [
	{
		type: "list",
		name: "licenseOptions",
		message: "Which license would you like to include?",
		choices: ["Apache - 2.0", "MIT", "BSD-2-Clause"],
	},
];

module.exports = {
	scope,
	scopeMinimal,
	scopeExtended,
	isFilePresent,
	license,
	licenseOptions,
};
