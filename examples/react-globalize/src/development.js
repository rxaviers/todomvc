require([
	"cldr-data!entireMain",
	"cldr-data!entireSupplemental",
	"globalize",
	"jsx!app",
	"jsx!info",
	"react",
	"./todoModel"
], function(cldrMain, cldrSupplemental, Globalize, TodoApp, Info, React, TodoModel) {

	var model = new TodoModel("react-todos");

	Globalize.load(cldrMain, cldrSupplemental);
	Globalize.locale("en");

	function render() {
		/* globals document */
		React.render(React.createElement(TodoApp, {model: model}), document.getElementById("todoapp"));
	}
	React.render(React.createElement(Info), document.getElementById("info"));

	model.subscribe(render);
	render();

});
