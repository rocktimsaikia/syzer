const readPkg = require('./src/parse-package');
const Table = require('cli-table3');

// Table structure instantiate
const table = new Table({
	style: {head: ['red']},
	head: ['Package', 'Current', 'Wanted', 'Latest'],
	colWidths: [15, 10, 10, 10]
});

const packages = readPkg();

for (const package_ of packages) {
	table.push([
		package_.name,
		package_.current,
		package_.wanted,
		package_.latest
	]);
}

console.log(table.toString());
