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

Globalize.a940609685 = pluralGeneratorFn(function(n) {
  var s = String(n).split('.'), t0 = Number(s[0]) == n;
  return ((t0 && n >= 0 && n <= 2) && n != 2) ? 'one' : 'other';
});
Globalize.b1796913729 = messageFormatterFn((function(  ) {
  return function (d) { return "Parte do projeto [TodoMVC/]"; }
})());
Globalize.a1912977210 = messageFormatterFn((function(  ) {
  return function (d) { return "tarefas"; }
})());
Globalize.b46555470 = messageFormatterFn((function( number, plural, pluralFuncs ) {
  return function (d) { return plural(d.count, 0, pluralFuncs.pt, { one: function() { return number(d.count) + " item restante";}, other: function() { return number(d.count) + " itens restantes";} }); }
})(messageFormat.number, messageFormat.plural, {"pt": Globalize("pt").pluralGenerator()}));
Globalize.b1439604914 = messageFormatterFn((function(  ) {
  return function (d) { return "Todos"; }
})());
Globalize.a939073487 = messageFormatterFn((function(  ) {
  return function (d) { return "O que você precisa fazer?"; }
})());
Globalize.a495123448 = messageFormatterFn((function(  ) {
  return function (d) { return "Completos"; }
})());
Globalize.b1797253851 = messageFormatterFn((function(  ) {
  return function (d) { return "Apagar tarefas completas"; }
})());
Globalize.a1274268887 = messageFormatterFn((function(  ) {
  return function (d) { return "Clique duas vezes para editar uma tarefa"; }
})());
Globalize.b1107084374 = messageFormatterFn((function(  ) {
  return function (d) { return "Criado por [petehunt/] (React) e [rxaviers/] (Globalize)"; }
})());
Globalize.b1123694769 = messageFormatterFn((function(  ) {
  return function (d) { return "Ativos"; }
})());

return Globalize;

}));
