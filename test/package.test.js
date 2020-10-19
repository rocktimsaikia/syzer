import test from 'ava';
import proxyquire from 'proxyquire';
import shell from 'shelljs';
import updatePackages from '../lib/update-package';

process.chdir(__dirname);

const parsePackages = proxyquire('../lib/parse-package.js', {
	shelljs: shell
});

test('parse the outdated packages', t => {
	t.true(Array.isArray(parsePackages()));
	t.true(parsePackages().length === 2);
});

test('update given outdated packages', async t => {
	const {updatedJson} = await updatePackages('./package.json', parsePackages());

	t.true(updatedJson.dependencies['is-even'] === '1.0.0');
	t.true(updatedJson.dependencies['is-odd'] === '3.0.1');
});

