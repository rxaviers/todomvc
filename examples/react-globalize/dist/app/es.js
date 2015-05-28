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

Globalize.a940281023 = pluralGeneratorFn(function(n) {
  return (n == 1) ? 'one' : 'other';
});
Globalize.a1990363369 = messageFormatterFn((function(  ) {
  return function (d) { return "Part of [TodoMVC/]"; }
})());
Globalize.a401119184 = messageFormatterFn((function(  ) {
  return function (d) { return "todos"; }
})());
Globalize.b468372900 = messageFormatterFn((function( number, plural, pluralFuncs ) {
  return function (d) { return plural(d.count, 0, pluralFuncs.es, { one: function() { return number(d.count) + " item left";}, other: function() { return number(d.count) + " items left";} }); }
})(messageFormat.number, messageFormat.plural, {"es": Globalize("es").pluralGenerator()}));
Globalize.b480285340 = messageFormatterFn((function(  ) {
  return function (d) { return "All"; }
})());
Globalize.b1515405831 = messageFormatterFn((function(  ) {
  return function (d) { return "What needs to be done?"; }
})());
Globalize.a1597481358 = messageFormatterFn((function(  ) {
  return function (d) { return "Completed"; }
})());
Globalize.a581677627 = messageFormatterFn((function(  ) {
  return function (d) { return "Clear completed"; }
})());
Globalize.a1535015149 = messageFormatterFn((function(  ) {
  return function (d) { return "Double-click to edit a todo"; }
})());
Globalize.a1548258516 = messageFormatterFn((function(  ) {
  return function (d) { return "Created by [petehunt/] (React) and [rxaviers/] (Globalize)"; }
})());
Globalize.b746653319 = messageFormatterFn((function(  ) {
  return function (d) { return "Active"; }
})());

return Globalize;

}));
