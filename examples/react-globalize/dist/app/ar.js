(function( root, factory ) {

	// UMD returnExports
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define("compiled-i18n-data", ["globalize-runtime/plural","globalize-runtime/message"], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require("globalize/dist/globalize-runtime/plural"), require("globalize/dist/globalize-runtime/message") );
	} else {

		// Global
		factory( root.Globalize );
	}
}( this, function( Globalize ) {

var validateParameterTypeNumber = Globalize._validateParameterTypeNumber;
var validateParameterPresence = Globalize._validateParameterPresence;
var pluralGeneratorFn = Globalize._pluralGeneratorFn;
var validateParameterTypeMessageVariables = Globalize._validateParameterTypeMessageVariables;
var messageFormat = Globalize._messageFormat;
var messageFormatterFn = Globalize._messageFormatterFn;

Globalize.a940160898 = pluralGeneratorFn(function(n) {
  var s = String(n).split('.'), t0 = Number(s[0]) == n,
      n100 = t0 && s[0].slice(-2);
  return (n == 0) ? 'zero'
      : (n == 1) ? 'one'
      : (n == 2) ? 'two'
      : ((n100 >= 3 && n100 <= 10)) ? 'few'
      : ((n100 >= 11 && n100 <= 99)) ? 'many'
      : 'other';
});
Globalize.a940276218 = pluralGeneratorFn(function(n) {
  var s = String(n).split('.'), v0 = !s[1];
  return (n == 1 && v0) ? 'one' : 'other';
});
Globalize.b1458073668 = messageFormatterFn((function(  ) {
  return function (d) { return "What needs to be done?"; }
})());
Globalize.a1383686709 = messageFormatterFn((function(  ) {
  return function (d) { return "todos"; }
})());
Globalize.b604402423 = messageFormatterFn((function(  ) {
  return function (d) { return "All"; }
})());
Globalize.b351831116 = messageFormatterFn((function(  ) {
  return function (d) { return "Active"; }
})());
Globalize.b169692813 = messageFormatterFn((function(  ) {
  return function (d) { return "Completed"; }
})());
Globalize.b1669168544 = messageFormatterFn((function(  ) {
  return function (d) { return "Clear completed"; }
})());
Globalize.b1299367534 = messageFormatterFn((function(  ) {
  return function (d) { return "Double-click to edit a todo"; }
})());
Globalize.b1703217265 = messageFormatterFn((function(  ) {
  return function (d) { return "Created by [petehunt/] (React) and [rxaviers/] (Globalize)"; }
})());
Globalize.a61508260 = messageFormatterFn((function(  ) {
  return function (d) { return "Part of [TodoMVC/]"; }
})());
Globalize.b2028508620 = messageFormatterFn((function(  ) {
  return function (d) { return "What needs to be done?"; }
})());
Globalize.a1070141399 = messageFormatterFn((function( number, plural, pluralFuncs ) {
  return function (d) { return plural(d.count, 0, pluralFuncs.en, { one: function() { return number(d.count) + " item left";}, other: function() { return number(d.count) + " items left";} }); }
})(messageFormat.number, messageFormat.plural, {"en": Globalize("en").pluralGenerator()}));
Globalize.b804496467 = messageFormatterFn((function(  ) {
  return function (d) { return "todos"; }
})());
Globalize.b660221089 = messageFormatterFn((function( number, plural, pluralFuncs ) {
  return function (d) { return plural(d.count, 0, pluralFuncs.ar, { one: function() { return number(d.count) + " item left";}, other: function() { return number(d.count) + " items left";} }); }
})(messageFormat.number, messageFormat.plural, {"ar": Globalize("ar").pluralGenerator()}));
Globalize.a711754881 = messageFormatterFn((function(  ) {
  return function (d) { return "All"; }
})());
Globalize.a533967164 = messageFormatterFn((function(  ) {
  return function (d) { return "Active"; }
})());
Globalize.a367800043 = messageFormatterFn((function(  ) {
  return function (d) { return "Completed"; }
})());
Globalize.a145098200 = messageFormatterFn((function(  ) {
  return function (d) { return "Clear completed"; }
})());
Globalize.b605075190 = messageFormatterFn((function(  ) {
  return function (d) { return "Double-click to edit a todo"; }
})());
Globalize.a1865742615 = messageFormatterFn((function(  ) {
  return function (d) { return "Created by [petehunt/] (React) and [rxaviers/] (Globalize)"; }
})());
Globalize.a1013625900 = messageFormatterFn((function(  ) {
  return function (d) { return "Part of [TodoMVC/]"; }
})());

return Globalize;

}));
