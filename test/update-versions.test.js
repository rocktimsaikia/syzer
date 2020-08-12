import { updateVersions } from "../src/util";

describe("upates the outdated versios to latest versions", () => {
	const arr = [
		["ipsum", "2.3.1", "3.2.0"],
		["lorem", "1.0.1", "1.2.0"],
	];
	it("returns the updated array with latest versions", () => {
		const expected = { ipsum: "3.2.0", lorem: "1.2.0" };
		expect(updateVersions(arr)).toEqual(expected);
	});
});
