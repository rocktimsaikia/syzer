import { parseVersion } from "../src/util";

describe("parses the version string", () => {
	const expected = ["4.0.0", "2.0.0", "1.0.0"];
	test("should return the parsed versions", () => {
		expect(parseVersion(["^4.0.0", "^2.0.0", "^1.0.0"])).toEqual(expected);
	});
});
