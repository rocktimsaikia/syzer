import versionCompare from "./version-compare";
import colors from "colors";
import logSymbols from "log-symbols";

/**
 * Colorize the package versions that needs to be updated
 * @param {Array} versions | array of all the packages with current version and latest version
 */
const colorizeVersions = (versions) => {
	const arr = [];
	let outDatedExists = false;

	for (let i = 0; i < versions.length; i++) {
		let pkg_name = versions[i][0];
		let current_v = versions[i][1];
		let latest_v = versions[i][2];

		const v_Diff = versionCompare(current_v, latest_v);

		if (v_Diff === -1) {
			pkg_name = `${pkg_name} ${logSymbols.warning}`;
			current_v = colors.red(current_v);
			latest_v = colors.cyan(latest_v);
			outDatedExists = true;
		} else {
			current_v = colors.green(current_v);
		}
		arr[i] = [pkg_name, current_v, latest_v];
	}

	return {
		arr,
		outDatedExists,
	};
};

export default colorizeVersions;
