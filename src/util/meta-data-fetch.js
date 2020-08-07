import pacote from "pacote";

/**
 * Fetches the most recent release version of the provided package title.
 * @param {Array} pkgs | List of current installed packages.
 */
const metaDataFetcher = async (pkgs) => {
	const latestVersions = await Promise.all(
		pkgs.map(async (pkg) => {
			const { version } = await pacote.manifest(pkg);
			return version;
		})
	);
	return latestVersions;
};

export default metaDataFetcher;
