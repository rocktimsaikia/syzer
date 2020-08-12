import { metaDataFetcher } from "../src/util";

describe("Fetches the latest package versions", () => {
	const expected = ["4.1.0", "0.6.0", "1.4.0"];

	test("should return the latest releases", async () => {
		const data = await metaDataFetcher(["chalk", "cli-table3", "colors"]);
		expect(data).toEqual(expected);
	});
});
