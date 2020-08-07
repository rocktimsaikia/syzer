const { colorizeVersions } = require("../src/util");
const colors = require("colors");
const logSymbols = require("log-symbols");

describe("colorizes the outdated versions.", () => {
	const Expectedversions = [
		["chalk " + logSymbols.warning, colors.red("4.1.0"), colors.cyan("4.2.0")],
		["colors " + logSymbols.warning, colors.red("1.1.0"), colors.cyan("1.1.2")],
	];

	it("outputs outdated versions with warnings", () => {
		const versions = [
			["chalk", "4.1.0", "4.2.0"],
			["colors", "1.1.0", "1.1.2"],
		];
		const { arr: colorized } = colorizeVersions(versions);
		expect(colorized).toStrictEqual(Expectedversions);
	});

	it("does not outputs warnings when versions are up-to-date", () => {
		const versions = [
			["chalk", "4.1.0", "4.1.0"],
			["colors", "1.1.0", "1.1.0"],
		];
		const { arr: colorized } = colorizeVersions(versions);
		expect(colorized).not.toStrictEqual(Expectedversions);
	});
});
