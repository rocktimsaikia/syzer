import fs from 'fs';
import test from 'ava';
import del from 'del';
import shell from 'shelljs';

// Change working dir to the test folder
process.chdir(__dirname);

const asyncExec = async cmd => {
	return shell.exec(cmd, {silent: true});
};

const delJsonFile = async () => {
	if (fs.existsSync('./package.json')) {
		await del('./package.json');
	}
};

test.beforeEach('create mock `package.json` file', async () => {
	const jsonData = await fs.promises.readFile('dir_/package.json', {encoding: 'utf8'});
	await fs.promises.writeFile('package.json', jsonData);
});

test.afterEach('delete the `package.json` file', async () => {
	await delJsonFile();
});

test('--outdated, option to check for the outdated packages', t => {
	if (shell.which('node')) {
		const data = shell.exec('node ../bin/index.js -o', {silent: true});
		t.true(data.code === 0);
	}
});

test('update, option to update packages to wanted version', async t => {
	if (shell.which('node')) {
		const data = await asyncExec('node ../bin/index.js update');
		t.true(data.code === 0);
		t.is(require('./package.json').dependencies['is-even'], '0.1.2');
		t.is(require('./package.json').dependencies['is-odd'], '3.0.0');
	}
});

test('update --latest, option to update packages to latest version', async t => {
	if (shell.which('node')) {
		const data = await asyncExec('node ../bin/index.js update --latest');
		t.true(data.code === 0);
		console.log(require('./package.json'));
		t.is(require('./package.json').dependencies['is-even'], '1.0.0');
		t.is(require('./package.json').dependencies['is-odd'], '3.0.1');
	}
});
