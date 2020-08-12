#!/usr/bin/env node

import meow from "meow";
import colors from "colors";
import syzer from "./lib/syzer";
import syzerUpdate from "./lib/syzerUpdate";

const guide = colors.yellow(`
Usage:
	$ syzer
    ${colors.grey("//shows the latest versions.")}

    $ syzer --update ${colors.grey("or")} syzer -u
    ${colors.grey("//updates package.json.")}

	$ syzer --update --ignore nodemon express
	${colors.grey("or")}
	$ syzer -u -i nodemon express
	${colors.grey("//ignores the following dependencies")}

Options:
	--update, -u  updates package.json.

	--version, -v shows the npu current version.

    --help, -h shows the user guide.
`);

const cli = meow(guide, {
	flags: {
		update: {
			type: "boolean",
			alias: "u",
		},
		ignore: {
			type: "string",
			alias: "i",
			isMultiple: true,
		},
	},
});

(async () => {
	if (
		cli.input.length === 0 &&
		cli.flags.update === false &&
		Object.keys(cli.flags).length === 1
	) {
		await syzer();
	}

	if (cli.flags.update && cli.flags.ignore === undefined) {
		await syzerUpdate();
	}

	if (cli.flags.update && cli.flags.ignore !== undefined) {
		await syzerUpdate(cli.flags.ignore);
	}
})();
