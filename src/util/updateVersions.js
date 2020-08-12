import versionCompare from "./versionCompare";

const updateVersions = (pkgs) => {
	const dependencies = {};
	for (let i = 0; i < pkgs.length; i++) {
		const pkgName = pkgs[i][0];
		let currentV = pkgs[i][1];
		const latestV = pkgs[i][2];

		const vDiff = versionCompare(currentV, latestV);

		if (vDiff === -1) {
			currentV = latestV;
		}

		dependencies[pkgName] = currentV;
	}
	return dependencies;
};

export default updateVersions;
