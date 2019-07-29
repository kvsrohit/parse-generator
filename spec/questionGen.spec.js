
var QuestionGen = require('../src/questionGen');

// Test Suite 'Number Generator Specs'
describe('Question Generator ', function(){

    var numTests = 20;

    // Similar to setup
    beforeEach(function() {
    });

    afterEach(function() {
    });


    it('Should Generate not-found for missing key set', function() {

		var refData = {};
		var q = "---@Name.0---";

		var ret = QuestionGen.generate(refData,q);

		expect(ret.question).toEqual('---Not-Found-0---');
		expect(ret.answer).toBeNull();
		expect(ret.variables.length).toEqual(1);
		expect(ret.variables[0].name).toEqual('@Name.0');
		expect(ret.variables[0].value).toEqual('Not-Found-0');
		//expect(arr.countMatching('George')).toEqual(1);
	});

    it('Should Generate For Single @Variable', function() {

		var refData = {Name:['Jilson']};
		var q = "Some Prefix @Name.0 And";
		var a = "5*60";

		var ret = QuestionGen.generate(refData,q,a);

		expect(ret.question).toEqual('Some Prefix Jilson And');
		expect(ret.answer).toEqual(300);
		expect(ret.variables.length).toEqual(1);
		expect(ret.variables[0].name).toEqual('@Name.0');
		expect(ret.variables[0].value).toEqual('Jilson');
	});


    it('Should Generate For Multiple @Variable', function() {

		var refData = {Name:['Jilson','Sunity'], Fruit:['Apple','Banana','Orange'], Int:[0,1,2,3,4]};
		var q = "@Name.0 has @Int.1 @Fruit.0 and @Int.0 @Fruit.1";
		var a = "@Int.0 + @Int.1";

		var ret = QuestionGen.generate(refData,q,a);

		expect(ret.question).toMatch(/(Jilson|Sunity) has (0|1|2|3|4) (Apple|Banana|Orange) and (0|1|2|3|4) (Apple|Banana|Orange)/);
		expect(typeof ret.answer == "number").toBeTruthy();
		expect(ret.variables.length).toEqual(5);
	});


    it('Should Handle Multiple occurances of @Variable', function() {

		var refData = {Name:['Jilson','Sunity'], Fruit:['Apple','Banana','Orange'], Int:[0,1,2,3,4]};
		var q = "@Name.0 has @Int.0 @Fruit.0 and @Int.0 @Fruit.1.";
		var a = "2*@Int.0";

		var ret = QuestionGen.generate(refData,q,a);

		expect(ret.question).toMatch(/(Jilson|Sunity) has (0|1|2|3|4) (Apple|Banana|Orange) and (0|1|2|3|4) (Apple|Banana|Orange)/);
		expect(typeof ret.answer == "number").toBeTruthy();
		expect(ret.variables.length).toEqual(4);

		var intVar = ret.variables.find(function(a){return a.name == '@Int.0';});
		expect(intVar).toBeTruthy();
		expect(typeof intVar.value == "number").toBeTruthy();
		expect(intVar.value * 2).toBeCloseTo(ret.answer);
	});

    it('Should Generate #Variable', function() {

		var refData = {Name:['Jilson','Sunity'], Fruit:['Apple','Banana','Orange'], Int:[0,1,2,3,4]};
		var q = "#N.0__";
		var a = "5*#N.0";

		var ret = QuestionGen.generate(refData,q,a);

		expect(typeof ret.answer == "number").toBeTruthy();
		expect(ret.variables.length).toEqual(1);
		var intVar = ret.variables.find(function(a){return a.name == '#N.0';});
		expect(intVar).toBeTruthy();
		expect(typeof intVar.value == "number").toBeTruthy();
		expect(intVar.value * 5).toBeCloseTo(ret.answer);
		expect(ret.question).toEqual(''+intVar.value);
	});


    it('Should Handle Multiple occurances of @Variable', function() {

		var refData = {Name:['Jilson','Sunity'], Fruit:['Apple','Banana','Orange'], Int:[0,1,2,3,4]};
		var q = "@Name.0 has #N.0_[2,2]_ @Fruit.0 and #N.1_[2,2,0,99-#N.0]_ @Fruit.1. @Name.1 gives her #N.2_#N.1-9_ of @Fruit.1.";
		var a = "#N.0 + #N.1 + #N.2";

		var ret = QuestionGen.generate(refData,q,a);

		expect(ret.question).toMatch(/(Jilson|Sunity) has \d+.\d\d (Apple|Banana|Orange) and \d+.\d\d (Apple|Banana|Orange)/);
		expect(typeof ret.answer == "number").toBeTruthy();
		expect(ret.variables.length).toEqual(7);
		var N0 = ret.variables.find(function(a){return a.name == '#N.0';});
		var N1 = ret.variables.find(function(a){return a.name == '#N.1';});
		var N2 = ret.variables.find(function(a){return a.name == '#N.2';});
		expect( N0 ).toBeTruthy();
		expect( N1 ).toBeTruthy();
		expect( N2 ).toBeTruthy();
		expect(typeof N0.value == "number").toBeTruthy();
		expect(typeof N1.value == "number").toBeTruthy();
		expect(typeof N2.value == "number").toBeTruthy();

		expect( N0.value + N1.value + N2.value ).toBeCloseTo(ret.answer);
	});

});
