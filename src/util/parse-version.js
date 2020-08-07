/**
 *
 * @param {Array} currentVersions | Array of dependency versions
 */
const parseVersion = (currentVersions) => {
	const parsedArr = currentVersions.map((v) => v.replace("^", ""));
	return parsedArr;
};

export default parseVersion;
