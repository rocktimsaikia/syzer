/**
 * Formats and merge the arrays to fit into the cli-table3 structure
 * [package_name,current_version,fetch_version]
 *
 * @param {Array} packages | currently installed package names
 * @param {Array} packageVersions | currently installed package versions
 * @param {Array} latestPkgVersions | fetched versions of installed packages
 */
const formatTable = (packages, packageVersions, latestPkgVersions) => {
	const table = [];
	packages.map((pkg, i) => {
		const format = [pkg, packageVersions[i], latestPkgVersions[i]];
		table.push(format);
	});
	return table;
};

export default formatTable;
