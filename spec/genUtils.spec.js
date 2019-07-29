
var genUtils = require('../src/genUtils');

// Test Suite 'Number Generator Specs'
describe('GenUtils ', function(){

    // Similar to setup
    beforeEach(function() {
    });

    afterEach(function() {
    });

    it('Should return correct precision', function() {
		var num = 1.23;
        expect(num.getPrecision()).toEqual(2);

        expect(1.5546456.getPrecision()).toEqual(7);

		num = 456;
        expect(num.getPrecision()).toEqual(0);
	});

    it('Should make integer array unique', function() {
		var arr = [1,2,2,4,5,6,3,2,3,6];

		expect(arr.length).toEqual(10);
		expect(arr.makeUnique().length).toEqual(6);
	});	

    it('Should make string array unique', function() {
		var arr = ['Ana','Vikas','Isabel','George','Peter','Peter','Vikas','Isabel'];

		expect(arr.length).toEqual(8);
		expect(arr.makeUnique().length).toEqual(5);
	});	

    it('Should make mixed array unique', function() {
		var arr = ['Ana','Ana',2,'Vikas',5.4,'Isabel',8, 'George',4,5.4,4,6,6,'Peter','Peter',6.9,'Peter',9, 'Vikas','Isabel','Isabel'];

		expect(arr.length).toEqual(21);
		expect(arr.makeUnique().length).toEqual(12);
	});	
	
    it('Should count occurance correctly', function() {
		var arr = ['Ana','Anil','Vikas','Isabel','Isabel','Ismael','Vikky','George','Peter','Anne','Peter','Vikas','Isabel'];

		expect(arr.length).toEqual(13);
		expect(arr.countMatching('Ana')).toEqual(1);
		expect(arr.countMatching('An')).toEqual(3);
		expect(arr.countMatching('Vik')).toEqual(3);
		expect(arr.countMatching('George')).toEqual(1);
		expect(arr.countMatching('Is')).toEqual(4);
		expect(arr.countMatching('XYZ')).toEqual(0);
	});	
});
