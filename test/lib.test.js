const proxyquire = require('proxyquire');
const shell = require('shelljs');
const updatePackages = require('../lib/update-package');
const path = require('path');
const {assert} = require('chai');

process.chdir(path.join(__dirname, 'dir_'));

const parsePackages = proxyquire('../lib/parse-package.js', {
	shelljs: shell
});

describe('main --api test', () => {
	it('parse the outdated packages', () => {
		assert.isArray(parsePackages());
		assert.isTrue(parsePackages().length === 2);
	});

	it('update given outdated packages', async () => {
		const {updatedJson} = await updatePackages(parsePackages(), 'latest');

		assert.isTrue(updatedJson.dependencies['is-even'] === '1.0.0');
		assert.isTrue(updatedJson.dependencies['is-odd'] === '3.0.1');
	});
});
