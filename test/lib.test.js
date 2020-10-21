import test from 'ava';
import proxyquire from 'proxyquire';
import shell from 'shelljs';
import updatePackages from '../lib/update-package';
import path from 'path';

process.chdir(path.join(__dirname, 'dir_'));

const parsePackages = proxyquire('../lib/parse-package.js', {
	shelljs: shell
});

test('parse the outdated packages', t => {
	t.true(Array.isArray(parsePackages()));
	t.true(parsePackages().length === 2);
});

test('update given outdated packages', async t => {
	const {updatedJson} = await updatePackages(parsePackages(), 'latest');

	t.true(updatedJson.dependencies['is-even'] === '1.0.0');
	t.true(updatedJson.dependencies['is-odd'] === '3.0.1');
});
