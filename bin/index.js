#!/usr/bin/env node
'use strict';
const meow = require('meow');
const intoStream = require('into-stream');
const path = require('path');
const fs = require('fs');
const parsePackage = require('../lib/parse-package');
const {init, updatePackageJson} = require('./cli');

const cli = meow('',
	{
		flags: {
			outdated: {
				type: 'boolean',
				alias: 'o'
			},
			update: {
				type: 'boolean',
				alias: 'u'
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

	if (cli.flags.outdated) {
		const boxenOutdatedPackages = init(outdatedPackages);
		process.stdout.write(boxenOutdatedPackages);
	}

	if (cli.flags.update) {
		const updatedJson = await updatePackageJson(outdatedPackages);
		const pathToJson = path.resolve(process.cwd(), 'package.json');

		intoStream(updatedJson).pipe(fs.createWriteStream(pathToJson));
	}
})();
