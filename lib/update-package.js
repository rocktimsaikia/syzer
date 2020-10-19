'use strict';
const detectIndent = require('detect-indent');
const path = require('path');
const fs = require('fs');

const updatePackages = async packages => {
	const pathToPackageJson = path.resolve(process.cwd(), 'package.json');
	const packageJson = await fs.promises.readFile(pathToPackageJson, {encoding: 'utf8'});
	const jsonIndent = detectIndent(packageJson).indent || '    ';
	const packageMetadata = JSON.parse(packageJson);

	for (const package_ of packages) {
		for (const key in packageMetadata) {
			if (packageMetadata[key].hasOwnProperty(package_.name)) {
				packageMetadata[key][package_.name] = package_.latest;
			}
		}
	}

	return {
		updatedJson: packageMetadata,
		jsonFileIndent: jsonIndent
	};
};

module.exports = updatePackages;
