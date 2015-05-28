require([
	"compiled-i18n-data",
	"jsx!./app",
	"jsx!./info",
	"react",
	"./todoModel"
], function(Globalize, TodoApp, Info, React, TodoModel) {

	var model = new TodoModel("react-todos");

	/* globals document */
	Globalize.locale(document.documentElement.lang);

	function render() {
		React.render(React.createElement(TodoApp, {model: model}), document.getElementById("todoapp"));
	}
	React.render(React.createElement(Info), document.getElementById("info"));

	model.subscribe(render);
	render();

});
