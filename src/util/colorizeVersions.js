import colors from "colors";
import logSymbols from "log-symbols";
import versionCompare from "./versionCompare";

/**
 * Colorize the package versions that needs to be updated
 * @param {Array} versions | array of all the packages with current version and latest version
 */
const colorizeVersions = (versions) => {
	const arr = [];
	let outDatedExists = false;

	for (let i = 0; i < versions.length; i++) {
		let pkgName = versions[i][0];
		let currentV = versions[i][1];
		let latestV = versions[i][2];

		const vDiff = versionCompare(currentV, latestV);

		if (vDiff === -1) {
			pkgName = `${pkgName} ${logSymbols.warning}`;
			currentV = colors.red(currentV);
			latestV = colors.cyan(latestV);
			outDatedExists = true;
		} else {
			currentV = colors.green(currentV);
		}
		arr[i] = [pkgName, currentV, latestV];
	}

	return {
		arr,
		outDatedExists,
	};
};

export default colorizeVersions;
