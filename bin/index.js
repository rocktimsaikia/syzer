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
			$ syzer outdated
			$ syzer update
			$ syzer update --latest
`,
{
	flags: {
		outdated: {
			type: 'boolean',
			alias: 'o'
		},
		latest: {
			type: 'boolean',
			alias: 'l',
			default: false
		},
		version: {
			type: 'boolean',
			alias: 'v'
		}
	}
}
);

(async () => {
	const outdatedPackages = parsePackage();
	const pathToJson = path.resolve(process.cwd(), 'package.json');

	if (cli.flags.outdated) {
		const boxenOutdatedPackages = init(outdatedPackages);
		process.stdout.write(boxenOutdatedPackages);
		process.exit(0);
	}

	if (cli.input[0] === 'update' && cli.flags.latest) {
		const updatedJson = await updatePackageJson(outdatedPackages, 'latest');
		intoStream(updatedJson).pipe(fs.createWriteStream(pathToJson));
	}

	if (cli.input[0] === 'update' && !cli.flags.latest) {
		const updatedJson = await updatePackageJson(outdatedPackages);
		intoStream(updatedJson).pipe(fs.createWriteStream(pathToJson));
	}
})();
