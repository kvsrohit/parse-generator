
var parser = require('./src/questionGen');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
	text = text.trim();
	console.log('received data:', text);

    equation = "@Name.0 has @Int.0 @Unit.0 of @Fruit.0. @Name.1 gives @Int.1 more @Unit.0 to him. How many @Unit.0 @Name.0 has now?";
    answer = "@Int.0 + @Int.1";
	parser.generate(equation, answer);

    //equation = "#N.0_[3,3]_ gives #N.1_{\"digits\":3,\"precision\":3, \"condition\":\"#N.0>value\" }_";
    equation = "#N.0_[3,3]_ -------------  #N.1_[3,3,0,\"999-#N.0\"]_  ----------------- #N.3_#N.0*3_";
    answer = "#N.0 + #N.1";
	//parser.generate(equation, answer);

	if (text === 'quit') {
		done();
	}
});

function done() {
	console.log('Now that process.stdin is paused, there is nothing more to do.');
	process.exit();
}
