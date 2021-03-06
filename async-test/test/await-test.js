const assert = require('assert');

const hello = require('../hello');

describe('#async hello', () => {
	describe('#asyncCalculate()', () => {
		// function(done) {}
		it('#async with done', (done) => {
			(async function() {
				try {
					let r = await hello();
					assert.strictEqual(r, 15);
					done();
				} catch ( err ) {
					done(err);
				}
			})();
		});
		it('#async function', async() => {
			var err;
			try {
				let r = await hello();
				assert.strictEqual(r, 15);
			} catch ( e ) {
				err = e;
				assert(err);
				assert.strictEqual(err.message, 'io error');
			}
		});
		// it('#async function', async() => {
		// 	let r = await hello();
		// 	assert.strictEqual(r, 15);
		// });

		it('#sync function', () => {
			assert(true);
		});
	});
});
