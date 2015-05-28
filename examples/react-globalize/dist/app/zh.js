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

Globalize.a940896063 = pluralGeneratorFn(function(n) {
  return 'other';
});
Globalize.b224285847 = messageFormatterFn((function(  ) {
  return function (d) { return "Part of [TodoMVC/]"; }
})());
Globalize.b813472432 = messageFormatterFn((function(  ) {
  return function (d) { return "todos"; }
})());
Globalize.a170292444 = messageFormatterFn((function( number, plural, pluralFuncs ) {
  return function (d) { return plural(d.count, 0, pluralFuncs.zh, { one: function() { return number(d.count) + " item left";}, other: function() { return number(d.count) + " items left";} }); }
})(messageFormat.number, messageFormat.plural, {"zh": Globalize("zh").pluralGenerator()}));
Globalize.b1773167900 = messageFormatterFn((function(  ) {
  return function (d) { return "All"; }
})());
Globalize.b262758279 = messageFormatterFn((function(  ) {
  return function (d) { return "What needs to be done?"; }
})());
Globalize.a162508558 = messageFormatterFn((function(  ) {
  return function (d) { return "Completed"; }
})());
Globalize.a927178683 = messageFormatterFn((function(  ) {
  return function (d) { return "Clear completed"; }
})());
Globalize.b736221587 = messageFormatterFn((function(  ) {
  return function (d) { return "Double-click to edit a todo"; }
})());
Globalize.a1125330772 = messageFormatterFn((function(  ) {
  return function (d) { return "Created by [petehunt/] (React) and [rxaviers/] (Globalize)"; }
})());
Globalize.a255712249 = messageFormatterFn((function(  ) {
  return function (d) { return "Active"; }
})());

return Globalize;

}));
