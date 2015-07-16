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

Globalize.a940237778 = pluralGeneratorFn(function(n) {
  var s = String(n).split('.'), v0 = !s[1];
  return (n == 1 && v0) ? 'one' : 'other';
});
Globalize.a1810536572 = messageFormatterFn((function(  ) {
  return function (d) { return "Teil von [TodoMVC/]"; }
})());
Globalize.a654292317 = messageFormatterFn((function(  ) {
  return function (d) { return "Aufgaben"; }
})());
Globalize.a493353903 = messageFormatterFn((function( number, plural, pluralFuncs ) {
  return function (d) { return plural(d.count, 0, pluralFuncs.de, { one: function() { return number(d.count) + " Aufgabe übrig";}, other: function() { return number(d.count) + " Aufgaben übrig";} }); }
})(messageFormat.number, messageFormat.plural, {"de": Globalize("de").pluralGenerator()}));
Globalize.b1597339087 = messageFormatterFn((function(  ) {
  return function (d) { return "Alle"; }
})());
Globalize.b1838363636 = messageFormatterFn((function(  ) {
  return function (d) { return "Was ist zu tun?"; }
})());
Globalize.b1422184293 = messageFormatterFn((function(  ) {
  return function (d) { return "Erledigt"; }
})());
Globalize.a1798898568 = messageFormatterFn((function(  ) {
  return function (d) { return "Erledigte Aufgaben löschen"; }
})());
Globalize.a1795374778 = messageFormatterFn((function(  ) {
  return function (d) { return "Doppelklick um eine Aufgabe zu editieren"; }
})());
Globalize.b1945219737 = messageFormatterFn((function(  ) {
  return function (d) { return "Erstellt von [petehunt/] (React) and [rxaviers/] (Globalize)"; }
})());
Globalize.b1488220788 = messageFormatterFn((function(  ) {
  return function (d) { return "Aktiv"; }
})());

return Globalize;

}));
