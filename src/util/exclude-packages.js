import * as _ from "lodash";

/**
 * Excludes the packages passed with the --ignore flag
 * @param {Object} original | Original dependencies object from package.json.
 * @param {Object} pkgs | already updated dependencies
 * @param {Array} args | List of arguments(packages) to exlcude from updating
 */
const excludeDependencies = (original, pkgs, args) => {
	//picking the packages from original dependencies that needs to be ignored.
	//and formatting them from an object to an array ex:[["nodemon","2.3.1"],[...]]
	const arr = [];
	const excludedPkgs = _.pick(original, args);
	const keys = Object.keys(excludedPkgs);
	const values = Object.values(excludedPkgs);
	keys.map((key, i) => {
		arr[i] = [keys[i], values[i]];
	});

	//if the already updated dependencies includes any ignored dependencies then
	//replacing the their versions with the current versions.
	for (let i = 0; i < arr.length; i++) {
		if (pkgs.hasOwnProperty(arr[i][0])) {
			pkgs[arr[i][0]] = arr[i][1];
		}
	}
	for (const key in pkgs) {
		let value = pkgs[key].replace("^", "");
		pkgs[key] = `^${value}`;
	}
	return pkgs;
};

export default excludeDependencies;
