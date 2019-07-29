
Number.prototype.getPrecision = function () {
    var s = "" + this,
        d = s.indexOf('.') + 1;

    return !d ? 0 : s.length - d;
}

Array.prototype.makeUnique = function (){
    var self = this;
    return self.filter(function (e, i, arr) {
        return arr.lastIndexOf(e) === i;
    });
}


Array.prototype.countMatching = function(value){
    return this.reduce(function (privVal, curVal) {
        return curVal.indexOf(value) == 0? privVal+1:privVal;
    }, 0 /* initial value 0 */);
}

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}
