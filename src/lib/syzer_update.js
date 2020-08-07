import fs from "fs-extra";
import util from "util";
import { info as logger } from "console";
import colors from "colors";
import ora from "ora";
import _ from "lodash";
const asyncWriteFile = util.promisify(fs.writeFile);

//utils imports
import {
	readJsonFile,
	parseVersion,
	metaDataFetcher,
	formatTable,
	updateVersions,
	excludeDependencies,
} from "../util";

/**
 * @param {Array} args | Updates the package.json with latest versions.
 */
const syzer_update = async (args = [0]) => {
	try {
		//loading spinner start!
		const spinner = ora("Reading package.json").start();

		let jsonContents = await readJsonFile("package.json");
		let { dependencies, devDependencies } = jsonContents;

		if (typeof dependencies !== "undefined") {
			const packageNames = Object.keys(dependencies);
			const currentVersions = parseVersion(Object.values(dependencies));

			//loading spinner color/text changes!
			spinner.color = "cyan";
			spinner.text = "Fetching latest dependencies...";

			const latestVersions = await metaDataFetcher(packageNames);

			const allVersions = formatTable(
				packageNames,
				currentVersions,
				latestVersions
			);
			let updatedPackages = updateVersions(allVersions);
			let exlcudedPackages = excludeDependencies(
				dependencies,
				updatedPackages,
				args
			);
			jsonContents["dependencies"] = exlcudedPackages;
		}

		if (typeof devDependencies !== "undefined") {
			const packageNames = Object.keys(devDependencies);
			const currentVersions = parseVersion(Object.values(devDependencies));

			//loading spinner color/text changes!
			spinner.color = "yellow";
			spinner.text = "Updating package.json...";

			const latestVersions = await metaDataFetcher(packageNames);

			const allVersions = formatTable(
				packageNames,
				currentVersions,
				latestVersions
			);
			const updatedPackages = updateVersions(allVersions);
			let exlcudedPackages = excludeDependencies(
				devDependencies,
				updatedPackages,
				args
			);

			jsonContents["devDependencies"] = exlcudedPackages;
		}
		await asyncWriteFile("package.json", JSON.stringify(jsonContents, null, 4));

		//loading spinner stop!
		spinner.stop();

		return logger(
			colors.cyan(
				"\nPackage.json is updated.\nRun `npm install` to install the latest packages."
			)
		);
	} catch (error) {
		return error;
	}
};

export default syzer_update;
