#!/usr/bin/env node
'use strcit';

const logSymbols = require('log-symbols');
const {gray, brightYellow} = require('colors');
const Table = require('cli-table3');
const boxen = require('boxen');

const updatePackage = require('../lib/update-package');

const init = outdatedPackages => {
	if (outdatedPackages === -1) {
		console.log(boxen(gray(logSymbols.success + ' Your dependencies are up-to-date'), {
			margin: {left: 2},
			padding: 2,
			borderColor: 'magenta',
			borderStyle: 'round',
			dimBorder: true
		}));
		process.exit(0);
	}

	// Table structure instantiate
	const table = new Table({
		head: [
			brightYellow('package'),
			brightYellow('current'),
			brightYellow('wanted'),
			brightYellow('latest')
		],
		colWidths: [15, 10, 10, 10]
	});

	for (const package_ of outdatedPackages) {
		table.push([
			gray(package_.name),
			gray(package_.current),
			gray(package_.wanted),
			gray(package_.latest)
		]);
	}

	return table.toString();
};

const updatePackageJson = async (outdatedPackages, versionType) => {
	const {updatedJson, jsonFileIndent} = await updatePackage(outdatedPackages, versionType);
	const packageJson = JSON.stringify(updatedJson, null, jsonFileIndent);

	return packageJson;
};

module.exports = {
	init,
	updatePackageJson
};
