import fs from "fs-extra";
import util from "util";
import detectIndent from "detect-indent";
const asyncReadFile = util.promisify(fs.readFile);

/**
 * reads the package.json file contents and returns the dependencies
 * @param {String} path
 */

const readJsonFile = async (path) => {
	const file = await asyncReadFile(path, "utf-8");
	const indent = detectIndent(file).indent || 2;
	const jsonContents = JSON.parse(file);

	return { jsonContents, indent };
};

export default readJsonFile;
