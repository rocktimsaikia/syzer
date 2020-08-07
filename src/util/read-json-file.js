import fs from "fs-extra";
import util from "util";
const asyncReadFile = util.promisify(fs.readFile);

/**
 * reads the package.json file contents and returns the dependencies
 * @param {String} file
 */

const readJsonFile = async (file) => {
	const jsonContents = await asyncReadFile(file, "utf-8");
	const jsonContens = JSON.parse(jsonContents);
	return jsonContens;
};

export default readJsonFile;
