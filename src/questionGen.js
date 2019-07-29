
var math = require('mathjs');
require('./genUtils');
var NumberSpec = require('./numberGen');

var master = {
    Fruit : ['Apple', 'Banana', 'Cherry',
             'Mango', 'Orange', 'Strawberry',
             'Blueberry', 'Raspberry', 'Nectarine'
            ],
    Name  : ['John', 'Robert', 'Mala',
             'Angel', 'Peter', 'Annie',
             'Nigel', 'David', 'Terry'
            ],
    Unit  : ['dozen', 'Kg', 'packs'
            ],
    Int   : [1, 2, 3, 4, 5,
             6, 7, 8, 9, 10
            ]
};

function getRandomValue(masterSet, group){

    var valCollection = masterSet[group];
	if(valCollection){
		var idx = math.randomInt(valCollection.length);
		return valCollection[idx];
	}
	else
		return null;

}

module.exports.generate = function(refData, questionFmt, answerFmt) {
    //console.log('Parsing '+questionFmt);
    var questionStr = questionFmt;
    var answerStr = answerFmt;
    var results = [];

    var retObject = {question:questionStr, answer:answerStr, variables:results};

	if(!questionFmt)
		return retObject;

    // @{Word}.{digits}
    var atVars = questionFmt.match(/@\w+\.\d+/g);
    if (atVars && atVars.length>0) {
        atVars = atVars.makeUnique().sort();
        //console.log( atVars );


        var tmpResults=new Object();

        atVars.forEach(function(curAtVar,index){
            //Variable is of the form @{Group}.{digits}	

            //get the group "Group". Start index=1 to skip "@"
            var group = curAtVar.substr(1,curAtVar.indexOf('\.')-1);

			//console.log("Var: " + curAtVar + " Group: " + group);
            //initialize the results array for "@Group"
            if(!tmpResults[group]){
                tmpResults[group] = [];
            }


            var newVal = getRandomValue(refData, group);
            if(newVal == null){
                //"Group" is not defined in master, default value..."Not-Found-{index}"
                newVal = "Not-Found-"+index;
            } else {
			//console.log(group + " First generated value " + newVal + "\nCurrent values are ");
			//console.log(tmpResults[group]);
			
			//Now it should never generate null.	
            while(tmpResults[group].indexOf(newVal) >= 0){
                newVal = getRandomValue(refData, group);
				//console.log(group + " New generated value " + newVal);
				
            }
			}
			//console.log(group + " Final Value " + newVal );

            tmpResults[group].push(newVal);
			
            results.push({name:"@"+group+"."+(tmpResults[group].length-1), value:newVal});
        });	

    } /*else {
        //console.log("No @ patterns");
    }*/
    // Now look for Numbers...

    // #N.{digit}_{fmt-string}_
    var regex = /#N\.\d+_[^_]*_/g;
    var hashVars = questionStr.match(regex);
    if (hashVars && hashVars.length>0) {
    hashVars = hashVars.makeUnique().sort();
    //console.log( hashVars );

    regex = /#N\.\d+/g;
    groups = questionStr.match(regex);
    groups = groups.makeUnique().sort();
    //console.log( groups );

    var numGenerator = new NumberSpec();
    //console.log(numGenerator);

    hashVars.forEach(function(curHashVar){
        //console.log("-------- FOR -- "  + curHashVar);

        var splits = curHashVar.split('_');
        var varName = splits[0];
        var formatString = splits[1];
        //Refine the formatString for already known values.
        //Remember the format can be like #N.2_3*#N.1_
        //So replace #N.1 with actual calculated value of #N.1 in previous cycle
        results.forEach(function(val){
            var regex = new RegExp (val.name,'g');
            formatString = formatString.replace(regex, val.value);
        });

        //console.log("Now parsing " + formatString);

        numGenerator.parse(formatString);
        var num = numGenerator.generate();

        // Number with format specs can not be used in regex replace
        // since, the format may not be a proper regex.
        // Hence, replace them directly. They are not expected to be
        // present in the string more-than once.
        questionStr = questionStr.replace(curHashVar, num );

        //add to the results for later references
        results.push(  {name:varName, value:num }  ); //then the simple one

    });
    } else {
        ;//console.log("No # patterns");
    }

    //console.log(results);
    results.forEach	( function(result){
        //console.log( 'Replacing ' + result.name + " with " + result.value );
        var regex = new RegExp (result.name,'g');
        questionStr = questionStr.replace(regex, result.value);

        if(answerStr)
			answerStr = answerStr.replace(regex, result.value);

        //console.log( 'new String is ' + questionStr );
        //console.log( 'new String is ' + answerStr );
    });

    //console.log("ANSWER STRING "+ answerStr );

    if(answerStr)
		answerStr=eval(answerStr);
	else
		answerStr = null;

    //console.log( questionStr );
    //console.log( answerStr );

	retObject.question = questionStr;
	retObject.answer = answerStr;

    return retObject;
}
