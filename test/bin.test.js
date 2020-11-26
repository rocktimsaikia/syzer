const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const {assert} = require('chai');
const {after} = require('mocha');
const del = require('del');

// Change working dir to the test folder
process.chdir(path.join(__dirname, 'dir_'));

describe('main --bin execution test', () => {
	this.overWritePackageJson = () => {
		const jsonData = fs.readFileSync('package-mock.json', 'utf8');
		fs.writeFileSync('package.json', jsonData);
	};

	before(() => {
		this.overWritePackageJson();
	});

	after(async () => {
		await del('./package.json');
	});

	it('check for the outdated packages', () => {
		const data = shell.exec('node ../../bin/index.js', {silent: true});
		assert.isTrue(data.code === 0);
	});

	it('update, option to update packages to wanted version', () => {
		const data = shell.exec('node ../../bin/index.js update', {silent: true});
		assert.isTrue(data.code === 0);
		const jsonData = JSON.parse(fs.readFileSync('package.json', 'utf8'));
		assert.equal(jsonData.dependencies['is-even'], '0.1.2');
		assert.equal(jsonData.dependencies['is-odd'], '3.0.0');
	});

	it('update --latest, option to update packages to latest version', () => {
		const data = shell.exec('node ../../bin/index.js update --latest', {silent: true});
		assert.isTrue(data.code === 0);
		const jsonData = JSON.parse(fs.readFileSync('package.json', 'utf8'));
		assert.equal(jsonData.dependencies['is-even'], '1.0.0');
		assert.equal(jsonData.dependencies['is-odd'], '3.0.1');
	});

	it('update --exclude is-odd, option to exclude provided packages', () => {
		this.overWritePackageJson();

		const data = shell.exec('node ../../bin/index.js update --exclude is-odd', {silent: true});
		assert.isTrue(data.code === 0);
		const jsonData = JSON.parse(fs.readFileSync('package.json', 'utf8'));
		assert.equal(jsonData.dependencies['is-even'], '0.1.2');
		assert.equal(jsonData.dependencies['is-odd'], '3.0.0');
	});

	it('update --latest --exclude is-odd, option to exclude provided packages with --latest flag', () => {
		this.overWritePackageJson();

		const data = shell.exec('node ../../bin/index.js update --latest --exclude is-odd', {silent: true});
		assert.isTrue(data.code === 0);
		const jsonData = JSON.parse(fs.readFileSync('package.json', 'utf8'));
		assert.equal(jsonData.dependencies['is-even'], '1.0.0');
		assert.equal(jsonData.dependencies['is-odd'], '3.0.0');
	});
});
