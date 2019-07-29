
var math = require('mathjs');

Number.prototype.getPrecision = function () {
    var s = "" + this,
        d = s.indexOf('.') + 1;

    return !d ? 0 : s.length - d;
}

function NumberGen(fmt) {
    this.digits = null;
    this.precision = 0;
    this.min = null;
    this.max = null;
    this.format = null;
    this.finalValue = null;
    this.condition = null;

    this.format = fmt;
}

NumberGen.prototype.parse = function (spec) {
    this.digits = null;
    this.precision = 0;
    this.min = null;
    this.max = null;
    this.condition = null;
    this.finalValue = null;

    this.format = spec;

    //console.log(spec);
    //console.log(typeof spec);
    //console.log(Array.isArray(spec));

    if(spec){
        if(typeof spec === 'string')
        {
            if(spec[0]==='{'){
                spec = JSON.parse(spec);
            } else {
                spec = eval(spec);
            }
        }

        //console.log('After eval ' + typeof spec);
        //console.log(spec);
        if(typeof spec==='number') {
            //this.finalValue = spec;
            this.finalValue = math.round(spec,4);
            //TODO Evaluate this rounding
        } else if(Array.isArray(spec)){
            if(spec.length > 0)
                this.digits = spec[0];
            if(spec.length > 1)
                this.precision = spec[1];
            if(spec.length > 2)
                this.min = eval(spec[2]);
            if(spec.length>3)
                this.max = eval(spec[3]);
            if(spec.length>4)
                this.condition = spec[4];

        } else {
            this.digits = spec['digits'];
            this.precision = spec['precision'];
            this.min = spec['min'];
            this.max = spec['max'];
            this.condition = spec['condition'];

            if(!this.digits) this.digits = null;
            if(!this.precision) this.precision = null;
            if(!this.min) this.min = null;
            if(!this.max) this.max = null;
            if(!this.condition) this.condition = null;
        }
    }

    //We only need these if 'ABSOLUTE finalValue' is not arrived.
    if(!this.finalValue){
        if(this.digits && this.digits <= 0) this.digits = 1;

        if(this.digits)
        {
            //Set the min to match the digits
            //if NOT set OR min is less than required by digits
            var requiredMinVal = math.pow(10,this.digits-1);
            if( !this.min || this.min < requiredMinVal){
                this.min = requiredMinVal;
            }

            //Set the max to match the digits
            //if NOT set OR max is greater than required by digits
            var requiredMaxVal = math.pow(10,this.digits)-1;
            if(!this.max || this.max > requiredMaxVal){
                this.max = requiredMaxVal;
            }
        }

        if(!this.min) this.min = 1; // We do not want 'bought _0_ packets'
        if(!this.max) this.max = 100; 
        if(!this.precision) this.precision = 0; 

        if(this.min>this.max) {
            var tmp = this.min;
            this.min = this.max;
            this.max = tmp;
        }
    }
    return this;
};

NumberGen.prototype.generate = function(spec) {

    if(spec){
        this.parse(spec);
    }

    //console.log("Generating with=========================");
    //console.log(this);

    var retVal = this.finalValue;
    if(!retVal){
        retVal = math.round(math.random(this.min, this.max),this.precision);

        while(retVal.getPrecision() != this.precision){
            retVal = math.round(math.random(this.min, this.max),this.precision);	
        }
    }
    //TODO See if condition implementation is required.

    return retVal;
}

module.exports = NumberGen;
