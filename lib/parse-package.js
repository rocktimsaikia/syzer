'use strict';
const shell = require('shelljs');

const formatVersions = string => {
	const object = {};
	const stringArray = string.replace(/\s\s+/g, ' ').split(' ');
	stringArray.pop();

	object.name = stringArray[0].slice(1);
	object.current = stringArray[1];
	object.wanted = stringArray[2];
	object.latest = stringArray[3];

	return object;
};

const readThePackages = () => {
	if (shell.which('npm')) {
		const response = shell.exec('npm outdated', {silent: true});

		// If stdout is empty then , all packages are up-to-date
		if (response.stdout === '') {
			return -1;
		}

		const dataArray = JSON.stringify(response.stdout).replace(/"/g, '').split('\\');
		dataArray.shift();
		dataArray.pop();

		const packages = dataArray.map(string => formatVersions(string));

		return packages;
	}
};

module.exports = readThePackages;
