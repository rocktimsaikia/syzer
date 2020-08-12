import * as _ from "lodash";

/**
 * Excludes the packages passed with the --ignore flag
 * @param {Object} original | Original dependencies object from package.json.
 * @param {Object} pkgs | already updated dependencies
 * @param {Array} args | List of arguments(packages) to exlcude from updating
 */
const excludeDependencies = (original, pkgs, args) => {
	// picking the packages from original dependencies that needs to be ignored.
	// and formatting them from an object to an array ex:[["nodemon","2.3.1"],[...]]
	const arr = [];
	const packages = pkgs;
	const excludedPkgs = _.pick(original, args);
	const keys = Object.keys(excludedPkgs);
	const values = Object.values(excludedPkgs);
	keys.forEach((key, i) => {
		arr[i] = [keys[i], values[i]];
	});

	// if the already updated dependencies includes any ignored dependencies then
	// replacing the their versions with the current versions.
	for (let i = 0; i < arr.length; i++) {
		const [pkgName, pkgVersion] = arr[i];
		if (Object.prototype.hasOwnProperty.call(packages, pkgName)) {
			packages[pkgName] = pkgVersion;
		}
	}
	Object.keys(packages).forEach((key) => {
		const value = packages[key].replace("^", "");
		packages[key] = `^${value}`;
	});
	return packages;
};

export default excludeDependencies;
