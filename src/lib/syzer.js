import logger from "console";
import Table from "cli-table3";
import colors from "colors";
import ora from "ora";

/** lib and util imports */
import {
	parseVersion,
	readJsonFile,
	colorizeVersions,
	formatTable,
	metaDataFetcher,
} from "../util";

/**
 * Shows the
 */
const syzer = async () => {
	try {
		// table structure instantiate
		const table = new Table({
			style: { head: ["green"] },
			head: ["Packages", "Current", "Latest"],
			colWidths: [15, 10, 10],
		});
		let isOutdated = false;
		let isOutdatedDev = false;

		const spinner = ora("Reading package.json...").start();

		const { jsonContents } = await readJsonFile("package.json");
		const { dependencies, devDependencies } = jsonContents;

		if (typeof dependencies !== "undefined") {
			// local dependencies
			const dependencyNames = Object.keys(dependencies);
			const dependencyVersions = parseVersion(Object.values(dependencies));

			spinner.color = "yellow";
			spinner.text = "Loading Dependencies..";
			// latest dependency versions
			const latestDependencyVersions = await metaDataFetcher(dependencyNames);
			const dependencyVersionTable = formatTable(
				dependencyNames,
				dependencyVersions,
				latestDependencyVersions
			);
			const { arr: filteredTable, outDatedExists } = colorizeVersions(
				dependencyVersionTable
			);
			isOutdated = outDatedExists;
			table.push(...filteredTable);
		}

		if (typeof devDependencies !== "undefined") {
			// local dependencies
			const dependencyNames = Object.keys(devDependencies);
			const dependencyVersions = parseVersion(Object.values(devDependencies));

			spinner.color = "yellow";
			spinner.text = "Loading DevDependecies..";
			// latest dependency versions
			const latestDependencyVersions = await metaDataFetcher(dependencyNames);
			const dependencyVersionTable = formatTable(
				dependencyNames,
				dependencyVersions,
				latestDependencyVersions
			);
			const { arr: filteredTable, outDatedExists } = colorizeVersions(
				dependencyVersionTable
			);
			isOutdatedDev = outDatedExists;
			table.push(...filteredTable);
		}

		spinner.stop();

		logger.log(table.toString());
		if (isOutdated || isOutdatedDev) {
			return logger.info(
				colors.cyan(
					"Run `syzer --update` to update your package.json with the latest versions.\n"
				)
			);
		}
		return logger.info(colors.green("All the dependencies are up-to-date."));
	} catch (err) {
		return logger.error(err);
	}
};

export default syzer;
