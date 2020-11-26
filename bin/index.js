#!/usr/bin/env node
'use strict';

const meow = require('meow');
const intoStream = require('into-stream');
const path = require('path');
const fs = require('fs');
const parsePackage = require('../lib/parse-package');
const {init, updatePackageJson} = require('./cli');

const cli = meow(`
		Usage:
			$ syzer update
			$ syzer update --latest
`,
{
	flags: {
		latest: {
			type: 'boolean',
			alias: 'l',
			default: false
		},
		exclude: {
			type: 'string',
			alias: 'x',
			isMultiple: true
		},
		version: {
			type: 'boolean',
			alias: 'v'
		}
	}
}
);

(async () => {
	let outdatedPackages = parsePackage();
	const pathToJson = path.resolve(process.cwd(), 'package.json');

	if (cli.input.length === 0) {
		const boxenOutdatedPackages = init(outdatedPackages);
		process.stdout.write(boxenOutdatedPackages);
		process.exit(0);
	}

	if (cli.input[0] === 'update' && cli.flags.exclude !== undefined) {
		outdatedPackages = outdatedPackages.filter(pkg => !cli.flags.exclude.includes(pkg.name));
	}

	if (cli.input[0] === 'update' && cli.flags.latest) {
		const updatedJson = await updatePackageJson(outdatedPackages, 'latest');
		intoStream(updatedJson).pipe(fs.createWriteStream(pathToJson));
	}

	if (cli.input[0] === 'update' && !cli.flags.latest) {
		const updatedJson = await updatePackageJson(outdatedPackages, 'wanted');
		intoStream(updatedJson).pipe(fs.createWriteStream(pathToJson));
	}
})();
