import versionCompare from "./version-compare";

const updateVersions = (pkgs) => {
	let dependencies = {};
	for (let i = 0; i < pkgs.length; i++) {
		let pkg_name = pkgs[i][0];
		let current_v = pkgs[i][1];
		let latest_v = pkgs[i][2];

		const v_Diff = versionCompare(current_v, latest_v);

		if (v_Diff === -1) {
			current_v = latest_v;
		}

		dependencies[pkg_name] = current_v;
	}
	return dependencies;
};

export default updateVersions;
