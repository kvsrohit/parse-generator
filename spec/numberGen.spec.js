
var NumberGen = require (__dirname + "/../src/numberGen.js");

// Test Suite 'Number Generator Specs'
describe('Number Generator ', function(){

	var gen;

	var numTests = 20;

	// Similar to setup
	beforeEach(function() {
		gen = new NumberGen();
	});

	afterEach(function() {
		gen = null;
	});

	it('Should initialize properly', function() {
			expect(gen.digits).toBeNull();
			expect(gen.precision).toEqual(0);
			expect(gen.max).toBeNull();
			expect(gen.min).toBeNull();
			expect(gen.finalValue).toBeNull();
			expect(gen.format).toBeUndefined();
	});

	it('Should set format in constructor',function(){
		var format = "[]";
		gen = new NumberGen(format);
		expect(gen.format).toEqual(format);
	});

	it('Should return itself', function() {
		expect(gen.parse("[]")).toBe(gen);	
	});

	it('Should Parse Simple Number: Value', function() {
			var format="203.57";
			gen.parse(format);
			expect(gen.finalValue).toEqual(203.57);
	});

	it('Should Parse Simple Number: Add', function() {
			var format="273.57+673.92";
			gen.parse(format);
			expect(gen.finalValue).toEqual(947.49);
	});

	it('Should Parse Simple Number: Multiplication', function() {
			var format="67.9*6";
			gen.parse(format);
			expect(gen.finalValue).toEqual(407.4);
	});

	it('Should Parse Simple Number: Subtraction', function() {
			var format="458.62-743.9";
			gen.parse(format);
			expect(gen.finalValue).toEqual(-285.28);
	});

	it('Should Parse Simple Number: Division', function() {
			var format="80.4/2";
			gen.parse(format);
			expect(gen.finalValue).toEqual(40.2);
	});

	it('Should Parse Array: Empty', function() {
			var format="[]";
			gen.parse(format);
			expect(gen.finalValue).toBeNull();
			expect(gen.digits).toBeNull();
			expect(gen.min).toEqual(1);
			expect(gen.max).toEqual(100);
			expect(gen.precision).toEqual(0);
	});

	it('Should Parse Array: digits', function() {
			var format="[3]";
			expect(gen.finalValue).toBeNull();
			gen.parse(format);
			expect(gen.digits).toEqual(3);
			expect(gen.min).toEqual(100);
			expect(gen.max).toEqual(999);
			expect(gen.precision).toEqual(0);
	});

	it('Should Parse Array: If digits <0 then set to 1', function() {
			var format="[-3]";
			expect(gen.finalValue).toBeNull();
			gen.parse(format);
			expect(gen.digits).toEqual(1);
			expect(gen.min).toEqual(1);
			expect(gen.max).toEqual(9);
			expect(gen.precision).toEqual(0);
	});

	it('Should Parse Array: digits & precision', function() {
			var format="[2,3]";
			gen.parse(format);
			expect(gen.digits).toEqual(2);
			expect(gen.finalValue).toBeNull();
			expect(gen.min).toEqual(10);
			expect(gen.max).toEqual(99);
			expect(gen.precision).toEqual(3);
	});

	it('Should Parse Array: digits, precision, min', function() {
			var format="[4,2,3468]";
			gen.parse(format);
			expect(gen.digits).toEqual(4);
			expect(gen.finalValue).toBeNull();
			expect(gen.min).toEqual(3468);
			expect(gen.max).toEqual(9999);
			expect(gen.precision).toEqual(2);
	});

	it('Should alter min to match digits', function() {
			var format="[4,2,896]";
			gen.parse(format);
			expect(gen.digits).toEqual(4);
			expect(gen.finalValue).toBeNull();
			expect(gen.min).toEqual(1000);
			expect(gen.max).toEqual(9999);
			expect(gen.precision).toEqual(2);
	});

	it('Should Parse Array: digits, precision, min,max', function() {
			var format="[4,1,3738,8457]";
			gen.parse(format);
			expect(gen.digits).toEqual(4);
			expect(gen.finalValue).toBeNull();
			expect(gen.min).toEqual(3738);
			expect(gen.max).toEqual(8457);
			expect(gen.precision).toEqual(1);
	});

	it('Should alter max to match digits', function() {
			var format="[4,2,896,54353]";
			gen.parse(format);
			expect(gen.digits).toEqual(4);
			expect(gen.finalValue).toBeNull();
			expect(gen.min).toEqual(1000);
			expect(gen.max).toEqual(9999);
			expect(gen.precision).toEqual(2);
	});

	it('Should Parse Array: should swap min/max if min>max', function() {
			var format='[3,2,643,123]';
			gen.parse(format);
			expect(gen.digits).toEqual(3);
			expect(gen.finalValue).toBeNull();
			expect(gen.min).toEqual(123);
			expect(gen.max).toEqual(643);
			expect(gen.precision).toEqual(2);
	});

	it('Should Parse Object: Empty', function() {
			var format="{}";
			gen.parse(format);
			expect(gen.finalValue).toBeNull();
			expect(gen.digits).toBeNull();
			expect(gen.min).toEqual(1);
			expect(gen.max).toEqual(100);
			expect(gen.precision).toEqual(0);
	});

	it('Should Parse Object: digits', function() {
			var format='{"digits":5}';
			expect(gen.finalValue).toBeNull();
			gen.parse(format);
			expect(gen.digits).toEqual(5);
			expect(gen.min).toEqual(10000);
			expect(gen.max).toEqual(99999);
			expect(gen.precision).toEqual(0);
	});

	it('Should Parse Object: If digits <0 then set to 1', function() {
			var format='{"digits":-2}';
			expect(gen.finalValue).toBeNull();
			gen.parse(format);
			expect(gen.digits).toEqual(1);
			expect(gen.min).toEqual(1);
			expect(gen.max).toEqual(9);
			expect(gen.precision).toEqual(0);
	});

	it('Should Parse Object: digits & precision', function() {
			var format='{"digits":4,"precision":2}';
			gen.parse(format);
			expect(gen.digits).toEqual(4);
			expect(gen.finalValue).toBeNull();
			expect(gen.min).toEqual(1000);
			expect(gen.max).toEqual(9999);
			expect(gen.precision).toEqual(2);
	});

	it('Should Parse Object: digits, precision, min', function() {
			var format='{"digits":4,"precision":2,"min":3468}';
			gen.parse(format);
			expect(gen.digits).toEqual(4);
			expect(gen.finalValue).toBeNull();
			expect(gen.min).toEqual(3468);
			expect(gen.max).toEqual(9999);
			expect(gen.precision).toEqual(2);
	});

	it('Should alter min to match digits', function() {
			var format='{"digits":4,"precision":2,"min":643}';
			gen.parse(format);
			expect(gen.digits).toEqual(4);
			expect(gen.finalValue).toBeNull();
			expect(gen.min).toEqual(1000);
			expect(gen.max).toEqual(9999);
			expect(gen.precision).toEqual(2);
	});

	it('Should Parse Object: digits, precision, min,max', function() {
			var format='{"digits":4,"precision":2,"min":643,"max":8568}';
			gen.parse(format);
			expect(gen.digits).toEqual(4);
			expect(gen.finalValue).toBeNull();
			expect(gen.min).toEqual(1000);
			expect(gen.max).toEqual(8568);
			expect(gen.precision).toEqual(2);
	});

	it('Should alter max to match digits', function() {
			var format='{"digits":4,"precision":2,"min":643,"max":45353}';
			gen.parse(format);
			expect(gen.digits).toEqual(4);
			expect(gen.finalValue).toBeNull();
			expect(gen.min).toEqual(1000);
			expect(gen.max).toEqual(9999);
			expect(gen.precision).toEqual(2);
	});

	it('Should Parse Object: should swap min/max if min>max', function() {
			var format='{"digits":3,"precision":2,"min":643,"max":123}';
			gen.parse(format);
			expect(gen.digits).toEqual(3);
			expect(gen.finalValue).toBeNull();
			expect(gen.min).toEqual(123);
			expect(gen.max).toEqual(643);
			expect(gen.precision).toEqual(2);
	});

	it('Should generate Simple Number: Value', function() {
			var format="203.57";
			var value = gen.generate(format);
			expect(value).toEqual(203.57);
	});

	it('Should generate Simple Number: Add', function() {
			var format="273.57+673.92";
			var value = gen.generate(format);
			expect(value).toEqual(947.49);
	});

	it('Should generate Simple Number: Multiplication', function() {
			var format="67.9*6";
			var value = gen.generate(format);
			expect(value).toEqual(407.4);
	});

	it('Should generate Simple Number: Subtraction', function() {
			var format="458.62-743.9";
			var value = gen.generate(format);
			expect(value).toEqual(-285.28);
	});

	it('Should generate Simple Number: Division', function() {
			var format="80.4/2";
			var value = gen.generate(format);
			expect(value).toEqual(40.2);
	});

	it('Should generate Simple Number: Division', function() {
			var format="math.pow(14,2)";
			var value = gen.generate(format);
			expect(value).toEqual(196);
	});

	it('Should generate Array: Empty', function() {
		var format="[]";

		for(var i=0;i<numTests;i++){
			var value = gen.generate(format);

			expect(value>=1).toBeTruthy();
			expect(value<=100).toBeTruthy();
			expect(value.getPrecision()).toEqual(0);
		}
	});

	it('Should generate Array: digits', function() {
		var format="[3]";

		for(var i=0;i<numTests;i++){
			expect(gen.finalValue).toBeNull();
			var value = gen.generate(format);

			expect(value>=100).toBeTruthy();
			expect(value<=999).toBeTruthy();
			expect(value.getPrecision()).toEqual(0);
		}
	});

	it('Should generate Array: If digits <0 then set to 1', function() {
		var format="[-3]";

		for(var i=0;i<numTests;i++){
			expect(gen.finalValue).toBeNull();
			var value = gen.generate(format);

			expect(value>=1).toBeTruthy();
			expect(value<=9).toBeTruthy();
			expect(value.getPrecision()).toEqual(0);
		}

	});

	it('Should generate Array: digits & precision', function() {
		var format="[2,3]";

		for(var i=0;i<numTests;i++){
			var value = gen.generate(format);

			expect(value>=10).toBeTruthy();
			expect(value<=99).toBeTruthy();
			expect(value.getPrecision()).toEqual(3);
		}
	});

	it('Should generate Array: digits, precision, min', function() {
		var format="[4,2,3468]";

		for(var i=0;i<numTests;i++){
			var value = gen.generate(format);

			expect(value>=3468).toBeTruthy();
			expect(value<=9999).toBeTruthy();
			expect(value.getPrecision()).toEqual(2);
		}
	});

	it('Should alter min to match digits', function() {
		var format="[4,2,896]";

		for(var i=0;i<numTests;i++){
			var value = gen.generate(format);

			expect(value>=1000).toBeTruthy();
			expect(value<=9999).toBeTruthy();
			expect(value.getPrecision()).toEqual(2);
		}

	});

	it('Should generate Array: digits, precision, min,max', function() {
		var format="[4,1,3738,8457]";

		for(var i=0;i<numTests;i++){
			var value = gen.generate(format);

			expect(value>=3738).toBeTruthy();
			expect(value<=8457).toBeTruthy();
			expect(value.getPrecision()).toEqual(1);
		}

	});

	it('Should alter max to match digits', function() {
		var format="[4,2,896,54353]";

		for(var i=0;i<numTests;i++){
			var value = gen.generate(format);
			expect(value>=1000).toBeTruthy();
			expect(value<=9999).toBeTruthy();
			expect(value.getPrecision()).toEqual(2);
		}

	});

	it('Should generate Array: should swap min/max if min>max', function() {
		var format='[3,2,643,123]';

		for(var i=0;i<numTests;i++){
			var value = gen.generate(format);

			expect(value>=123).toBeTruthy();
			expect(value<=643).toBeTruthy();
			expect(value.getPrecision()).toEqual(2);
		}

	});

	it('Should generate Object: Empty', function() {
		var format="{}";

		for(var i=0;i<numTests;i++){
			var value = gen.generate(format);

			expect(value>=1).toBeTruthy();
			expect(value<=100).toBeTruthy();
			expect(value.getPrecision()).toEqual(0);
		}

	});

	it('Should generate Object: digits', function() {
		var format='{"digits":5}';

		for(var i=0;i<numTests;i++){
			expect(gen.finalValue).toBeNull();
			var value = gen.generate(format);

			expect(value>=10000).toBeTruthy();
			expect(value<=99999).toBeTruthy();
			expect(value.getPrecision()).toEqual(0);
		}

	});

	it('Should generate Object: If digits <0 then set to 1', function() {
		var format='{"digits":-2}';

		for(var i=0;i<numTests;i++){
			expect(gen.finalValue).toBeNull();
			var value = gen.generate(format);

			expect(value>=1).toBeTruthy();
			expect(value<=9).toBeTruthy();
			expect(value.getPrecision()).toEqual(0);
		}

	});

	it('Should generate Object: digits & precision', function() {
		var format='{"digits":4,"precision":2}';

		for(var i=0;i<numTests;i++){
			var value = gen.generate(format);

			expect(value>=1000).toBeTruthy();
			expect(value<=9999).toBeTruthy();
			expect(value.getPrecision()).toEqual(2);
		}

	});

	it('Should generate Object: digits, precision, min', function() {
		var format='{"digits":4,"precision":2,"min":3468}';

		for(var i=0;i<numTests;i++){
			var value = gen.generate(format);

			expect(value>=3468).toBeTruthy();
			expect(value<=9999).toBeTruthy();
			expect(value.getPrecision()).toEqual(2);
		}

	});

	it('Should alter min to match digits', function() {
		var format='{"digits":4,"precision":2,"min":643}';

		for(var i=0;i<numTests;i++){
			var value = gen.generate(format);

			expect(value>=1000).toBeTruthy();
			expect(value<=9999).toBeTruthy();
			expect(value.getPrecision()).toEqual(2);
		}

	});

	it('Should generate Object: digits, precision, min,max', function() {
		var format='{"digits":4,"precision":2,"min":643,"max":8568}';

		for(var i=0;i<numTests;i++){
			var value = gen.generate(format);

			expect(value>=1000).toBeTruthy();
			expect(value<=8568).toBeTruthy();
			expect(value.getPrecision()).toEqual(2);
		}

	});

	it('Should alter max to match digits', function() {
		var format='{"digits":4,"precision":2,"min":643,"max":45353}';

		for(var i=0;i<numTests;i++){
			var value = gen.generate(format);

			expect(value>=1000).toBeTruthy();
			expect(value<=9999).toBeTruthy();
			expect(value.getPrecision()).toEqual(2);
		}
	
	});

	it('Should generate Object: should swap min/max if min>max', function() {
		var format='{"digits":3,"precision":2,"min":643,"max":123}';

		for(var i=0;i<numTests;i++){
			var value = gen.generate(format);

			expect(value>=123).toBeTruthy();
			expect(value<=643).toBeTruthy();
			expect(value.getPrecision()).toEqual(2);
		}

	});
});
