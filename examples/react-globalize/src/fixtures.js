define([
  "./fixtures/key",
  "./fixtures/model"
], function() {

  var fixturesParts = [].slice.call(arguments, 0); 

  function extend() {
    return [].slice.call(arguments, 1).reduce(function(ret, obj) {
      var prop;
      for(prop in obj) {
        ret[prop] = obj[prop];
      }
      return ret;
    }, arguments[0]);
  }

  function multiply(m) {
    var b;
    var a = m[0];
    if (m.length > 2) {
      b = multiply(m.slice(1));
    } else {
      b = m[1];
    }
    return a.reduce(function(ret, i) {
      b.forEach(function(j) {
        ret.push(extend({}, i, j));
      });
      return ret;
    }, []);
  }

  // Combine the whole matrix.
  return multiply(fixturesParts);

});
