define('consts',[],function() {

	return {
		ALL_TODOS: 'all',
		ACTIVE_TODOS: 'active',
		COMPLETED_TODOS: 'completed'
	};

});


define('footer',[
	"./consts",
	"react",
	"react-globalize/message"
], function(consts, React, FormatMessage) {

	'use strict';

	var TodoFooter = React.createClass({displayName: "TodoFooter",
		render: function () {
			var clearButton = null;

			if (this.props.completedCount > 0) {
				clearButton = (
					React.createElement("button", {
						id: "clear-completed", 
						onClick: this.props.onClearCompleted}, 
						React.createElement(FormatMessage, null, "Clear completed")
					)
				);
			}

			// React idiom for shortcutting to `classSet` since it'll be used often
			var cx = React.addons.classSet;
			var nowShowing = this.props.nowShowing;
			return (
				React.createElement("footer", {id: "footer"}, 
					React.createElement("span", {id: "todo-count"}, 
						React.createElement(FormatMessage, {variables: {count: this.props.count}}, 
							"{count, plural,\n" +
							"   one {# item left}\n" +
							" other {# items left}\n" +
							"}"
						)
					), 
					React.createElement("ul", {id: "filters"}, 
						React.createElement("li", null, 
							React.createElement("a", {
								href: "#/", 
								className: cx({selected: nowShowing === consts.ALL_TODOS})}, 
									React.createElement(FormatMessage, null, "All")
							)
						), 
						' ', 
						React.createElement("li", null, 
							React.createElement("a", {
								href: "#/active", 
								className: cx({selected: nowShowing === consts.ACTIVE_TODOS})}, 
									React.createElement(FormatMessage, null, "Active")
							)
						), 
						' ', 
						React.createElement("li", null, 
							React.createElement("a", {
								href: "#/completed", 
								className: cx({selected: nowShowing === consts.COMPLETED_TODOS})}, 
									React.createElement(FormatMessage, null, "Completed")
							)
						)
					), 
					clearButton
				)
			);
		}
	});

	return TodoFooter;

});


define('todoItem',[
	"react"
], function(React) {

	'use strict';

	var ESCAPE_KEY = 27;
	var ENTER_KEY = 13;

	var TodoItem = React.createClass({displayName: "TodoItem",
		handleSubmit: function () {
			var val = this.state.editText.trim();
			if (val) {
				this.props.onSave(val);
				this.setState({editText: val});
			} else {
				this.props.onDestroy();
			}
		},

		handleEdit: function () {
			this.props.onEdit();
			this.setState({editText: this.props.todo.title});
		},

		handleKeyDown: function (event) {
			if (event.which === ESCAPE_KEY) {
				this.setState({editText: this.props.todo.title});
				this.props.onCancel(event);
			} else if (event.which === ENTER_KEY) {
				this.handleSubmit(event);
			}
		},

		handleChange: function (event) {
			this.setState({editText: event.target.value});
		},

		getInitialState: function () {
			return {editText: this.props.todo.title};
		},

		/**
		 * This is a completely optional performance enhancement that you can
		 * implement on any React component. If you were to delete this method
		 * the app would still work correctly (and still be very performant!), we
		 * just use it as an example of how little code it takes to get an order
		 * of magnitude performance improvement.
		 */
		shouldComponentUpdate: function (nextProps, nextState) {
			return (
				nextProps.todo !== this.props.todo ||
				nextProps.editing !== this.props.editing ||
				nextState.editText !== this.state.editText
			);
		},

		/**
		 * Safely manipulate the DOM after updating the state when invoking
		 * `this.props.onEdit()` in the `handleEdit` method above.
		 * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
		 * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
		 */
		componentDidUpdate: function (prevProps) {
			if (!prevProps.editing && this.props.editing) {
				var node = this.refs.editField.getDOMNode();
				node.focus();
				node.setSelectionRange(node.value.length, node.value.length);
			}
		},

		render: function () {
			return (
				React.createElement("li", {className: React.addons.classSet({
					completed: this.props.todo.completed,
					editing: this.props.editing
				})}, 
					React.createElement("div", {className: "view"}, 
						React.createElement("input", {
							className: "toggle", 
							type: "checkbox", 
							checked: this.props.todo.completed, 
							onChange: this.props.onToggle}
						), 
						React.createElement("label", {onDoubleClick: this.handleEdit}, 
							this.props.todo.title
						), 
						React.createElement("button", {className: "destroy", onClick: this.props.onDestroy})
					), 
					React.createElement("input", {
						ref: "editField", 
						className: "edit", 
						value: this.state.editText, 
						onBlur: this.handleSubmit, 
						onChange: this.handleChange, 
						onKeyDown: this.handleKeyDown}
					)
				)
			);
		}
	});

	return TodoItem;

});

/* global _ */
(function () {
	'use strict';

	/* jshint ignore:start */
	// Underscore's Template Module
	// Courtesy of underscorejs.org
	var _ = (function (_) {
		_.defaults = function (object) {
			if (!object) {
				return object;
			}
			for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {
				var iterable = arguments[argsIndex];
				if (iterable) {
					for (var key in iterable) {
						if (object[key] == null) {
							object[key] = iterable[key];
						}
					}
				}
			}
			return object;
		}

		// By default, Underscore uses ERB-style template delimiters, change the
		// following template settings to use alternative delimiters.
		_.templateSettings = {
			evaluate    : /<%([\s\S]+?)%>/g,
			interpolate : /<%=([\s\S]+?)%>/g,
			escape      : /<%-([\s\S]+?)%>/g
		};

		// When customizing `templateSettings`, if you don't want to define an
		// interpolation, evaluation or escaping regex, we need one that is
		// guaranteed not to match.
		var noMatch = /(.)^/;

		// Certain characters need to be escaped so that they can be put into a
		// string literal.
		var escapes = {
			"'":      "'",
			'\\':     '\\',
			'\r':     'r',
			'\n':     'n',
			'\t':     't',
			'\u2028': 'u2028',
			'\u2029': 'u2029'
		};

		var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

		// JavaScript micro-templating, similar to John Resig's implementation.
		// Underscore templating handles arbitrary delimiters, preserves whitespace,
		// and correctly escapes quotes within interpolated code.
		_.template = function(text, data, settings) {
			var render;
			settings = _.defaults({}, settings, _.templateSettings);

			// Combine delimiters into one regular expression via alternation.
			var matcher = new RegExp([
				(settings.escape || noMatch).source,
				(settings.interpolate || noMatch).source,
				(settings.evaluate || noMatch).source
			].join('|') + '|$', 'g');

			// Compile the template source, escaping string literals appropriately.
			var index = 0;
			var source = "__p+='";
			text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
				source += text.slice(index, offset)
					.replace(escaper, function(match) { return '\\' + escapes[match]; });

				if (escape) {
					source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
				}
				if (interpolate) {
					source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
				}
				if (evaluate) {
					source += "';\n" + evaluate + "\n__p+='";
				}
				index = offset + match.length;
				return match;
			});
			source += "';\n";

			// If a variable is not specified, place data values in local scope.
			if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

			source = "var __t,__p='',__j=Array.prototype.join," +
				"print=function(){__p+=__j.call(arguments,'');};\n" +
				source + "return __p;\n";

			try {
				render = new Function(settings.variable || 'obj', '_', source);
			} catch (e) {
				e.source = source;
				throw e;
			}

			if (data) return render(data, _);
			var template = function(data) {
				return render.call(this, data, _);
			};

			// Provide the compiled function source as a convenience for precompilation.
			template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

			return template;
		};

		return _;
	})({});

	if (location.hostname === 'todomvc.com') {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-31081062-1', 'auto');
		ga('send', 'pageview');
	}
	/* jshint ignore:end */

	function redirect() {
		if (location.hostname === 'tastejs.github.io') {
			location.href = location.href.replace('tastejs.github.io/todomvc', 'todomvc.com');
		}
	}

	function findRoot() {
		var base = location.href.indexOf('examples/');
		return location.href.substr(0, base);
	}

	function getFile(file, callback) {
		if (!location.host) {
			return console.info('Miss the info bar? Run TodoMVC from a server to avoid a cross-origin error.');
		}

		var xhr = new XMLHttpRequest();

		xhr.open('GET', findRoot() + file, true);
		xhr.send();

		xhr.onload = function () {
			if (xhr.status === 200 && callback) {
				callback(xhr.responseText);
			}
		};
	}

	function Learn(learnJSON, config) {
		if (!(this instanceof Learn)) {
			return new Learn(learnJSON, config);
		}

		var template, framework;

		if (typeof learnJSON !== 'object') {
			try {
				learnJSON = JSON.parse(learnJSON);
			} catch (e) {
				return;
			}
		}

		if (config) {
			template = config.template;
			framework = config.framework;
		}

		if (!template && learnJSON.templates) {
			template = learnJSON.templates.todomvc;
		}

		if (!framework && document.querySelector('[data-framework]')) {
			framework = document.querySelector('[data-framework]').dataset.framework;
		}

		this.template = template;

		if (learnJSON.backend) {
			this.frameworkJSON = learnJSON.backend;
			this.frameworkJSON.issueLabel = framework;
			this.append({
				backend: true
			});
		} else if (learnJSON[framework]) {
			this.frameworkJSON = learnJSON[framework];
			this.frameworkJSON.issueLabel = framework;
			this.append();
		}

		this.fetchIssueCount();
	}

	Learn.prototype.append = function (opts) {
		var aside = document.createElement('aside');
		aside.innerHTML = _.template(this.template, this.frameworkJSON);
		aside.className = 'learn';

		if (opts && opts.backend) {
			// Remove demo link
			var sourceLinks = aside.querySelector('.source-links');
			var heading = sourceLinks.firstElementChild;
			var sourceLink = sourceLinks.lastElementChild;
			// Correct link path
			var href = sourceLink.getAttribute('href');
			sourceLink.setAttribute('href', href.substr(href.lastIndexOf('http')));
			sourceLinks.innerHTML = heading.outerHTML + sourceLink.outerHTML;
		} else {
			// Localize demo links
			var demoLinks = aside.querySelectorAll('.demo-link');
			Array.prototype.forEach.call(demoLinks, function (demoLink) {
				if (demoLink.getAttribute('href').substr(0, 4) !== 'http') {
					demoLink.setAttribute('href', findRoot() + demoLink.getAttribute('href'));
				}
			});
		}

		document.body.className = (document.body.className + ' learn-bar').trim();
		document.body.insertAdjacentHTML('afterBegin', aside.outerHTML);
	};

	Learn.prototype.fetchIssueCount = function () {
		var issueLink = document.getElementById('issue-count-link');
		if (issueLink) {
			var url = issueLink.href.replace('https://github.com', 'https://api.github.com/repos');
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.onload = function (e) {
				var parsedResponse = JSON.parse(e.target.responseText);
				if (parsedResponse instanceof Array) {
					var count = parsedResponse.length;
					if (count !== 0) {
						issueLink.innerHTML = 'This app has ' + count + ' open issues';
						document.getElementById('issue-count').style.display = 'inline';
					}
				}
			};
			xhr.send();
		}
	};

	redirect();
	getFile('learn.json', Learn);
})();

define('todomvc-common/base', {});

define('app',[
	"./consts",
	"director",
	"globalize-runtime",
	"./footer",
	"./todoItem",
	"react",
	"react-globalize/message",
	"todomvc-common/base"
], function(consts, Router, Globalize, TodoFooter, TodoItem, React, FormatMessage) {

	'use strict';

	var ENTER_KEY = 13;

	var TodoApp = React.createClass({displayName: "TodoApp",
		getInitialState: function () {
			return {
				nowShowing: consts.ALL_TODOS,
				editing: null
			};
		},

		componentDidMount: function () {
			var setState = this.setState;
			var router = Router({
				'/': setState.bind(this, {nowShowing: consts.ALL_TODOS}),
				'/active': setState.bind(this, {nowShowing: consts.ACTIVE_TODOS}),
				'/completed': setState.bind(this, {nowShowing: consts.COMPLETED_TODOS})
			});
			router.init('/');
		},

		handleNewTodoKeyDown: function (event) {
			if (event.which !== ENTER_KEY) {
				return;
			}

			event.preventDefault();

			var val = this.refs.newField.getDOMNode().value.trim();

			if (val) {
				this.props.model.addTodo(val);
				this.refs.newField.getDOMNode().value = '';
			}
		},

		toggleAll: function (event) {
			var checked = event.target.checked;
			this.props.model.toggleAll(checked);
		},

		toggle: function (todoToToggle) {
			this.props.model.toggle(todoToToggle);
		},

		destroy: function (todo) {
			this.props.model.destroy(todo);
		},

		edit: function (todo) {
			this.setState({editing: todo.id});
		},

		save: function (todoToSave, text) {
			this.props.model.save(todoToSave, text);
			this.setState({editing: null});
		},

		cancel: function () {
			this.setState({editing: null});
		},

		clearCompleted: function () {
			this.props.model.clearCompleted();
		},

		render: function () {
			var footer;
			var main;
			var todos = this.props.model.todos;

			var shownTodos = todos.filter(function (todo) {
				switch (this.state.nowShowing) {
				case consts.ACTIVE_TODOS:
					return !todo.completed;
				case consts.COMPLETED_TODOS:
					return todo.completed;
				default:
					return true;
				}
			}, this);

			var todoItems = shownTodos.map(function (todo) {
				return (
					React.createElement(TodoItem, {
						key: todo.id, 
						todo: todo, 
						onToggle: this.toggle.bind(this, todo), 
						onDestroy: this.destroy.bind(this, todo), 
						onEdit: this.edit.bind(this, todo), 
						editing: this.state.editing === todo.id, 
						onSave: this.save.bind(this, todo), 
						onCancel: this.cancel}
					)
				);
			}, this);

			var activeTodoCount = todos.reduce(function (accum, todo) {
				return todo.completed ? accum : accum + 1;
			}, 0);

			var completedCount = todos.length - activeTodoCount;

			if (activeTodoCount || completedCount) {
				footer =
					React.createElement(TodoFooter, {
						count: activeTodoCount, 
						completedCount: completedCount, 
						nowShowing: this.state.nowShowing, 
						onClearCompleted: this.clearCompleted}
					);
			}

			if (todos.length) {
				main = (
					React.createElement("section", {id: "main"}, 
						React.createElement("input", {
							id: "toggle-all", 
							type: "checkbox", 
							onChange: this.toggleAll, 
							checked: activeTodoCount === 0}
						), 
						React.createElement("ul", {id: "todo-list"}, 
							todoItems
						)
					)
				);
			}

			return (
				React.createElement("div", null, 
					React.createElement("header", {id: "header"}, 
						React.createElement("h1", null, React.createElement(FormatMessage, null, "todos")), 
						React.createElement("input", {
							ref: "newField", 
							id: "new-todo", 
							placeholder: Globalize.formatMessage("What needs to be done?"), 
							onKeyDown: this.handleNewTodoKeyDown, 
							autoFocus: true}
						)
					), 
					main, 
					footer
				)
			);
		}
	});

	return TodoApp;

});


define('info',[
	"globalize-runtime",
	"react",
	"react-globalize/message"
], function(Globalize, React, FormatMessage) {

	'use strict';

	var Info = React.createClass({displayName: "Info",
		render: function () {
			return (
				React.createElement("div", null, 
					React.createElement("p", null, React.createElement(FormatMessage, null, "Double-click to edit a todo")), 
					React.createElement("p", null, 
						React.createElement(FormatMessage, {elements: {
							petehunt: React.createElement("a", {href: "http://github.com/petehunt/"}, "petehunt"),
							rxaviers: React.createElement("a", {href: "http://github.com/rxaviers/"}, "rxaviers")
						}}, 
							"Created by [petehunt/] (React) and [rxaviers/] (Globalize)"
						)
					), 
					React.createElement("p", null, 
						React.createElement(FormatMessage, {elements: {
							TodoMVC: React.createElement("a", {href: "http://todomvc.com"}, "TodoMVC")
						}}, 
							"Part of [TodoMVC/]"
						)
					)
				)
			);
		}
	});

	return Info;

});

define('utils',[],function() {

	'use strict';

	/* globals localStorage */

	var Utils = {
		uuid: function () {
			/*jshint bitwise:false */
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
					.toString(16);
			}

			return uuid;
		},

		store: function (namespace, data) {
			if (data) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			}

			var store = localStorage.getItem(namespace);
			return (store && JSON.parse(store)) || [];
		},

		extend: function () {
			var newObj = {};
			for (var i = 0; i < arguments.length; i++) {
				var obj = arguments[i];
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						newObj[key] = obj[key];
					}
				}
			}
			return newObj;
		}
	};

	return Utils;
});

define('todoModel',[
	"./utils"
],
function(Utils) {

	'use strict';

	// Generic "model" object. You can use whatever
	// framework you want. For this application it
	// may not even be worth separating this logic
	// out, but we do this to demonstrate one way to
	// separate out parts of your application.
	var TodoModel = function (key) {
		this.key = key;
		this.todos = Utils.store(key);
		this.onChanges = [];
	};

	TodoModel.prototype.subscribe = function (onChange) {
		this.onChanges.push(onChange);
	};

	TodoModel.prototype.inform = function () {
		Utils.store(this.key, this.todos);
		this.onChanges.forEach(function (cb) { cb(); });
	};

	TodoModel.prototype.addTodo = function (title) {
		this.todos = this.todos.concat({
			id: Utils.uuid(),
			title: title,
			completed: false
		});

		this.inform();
	};

	TodoModel.prototype.toggleAll = function (checked) {
		// Note: it's usually better to use immutable data structures since they're
		// easier to reason about and React works very well with them. That's why
		// we use map() and filter() everywhere instead of mutating the array or
		// todo items themselves.
		this.todos = this.todos.map(function (todo) {
			return Utils.extend({}, todo, {completed: checked});
		});

		this.inform();
	};

	TodoModel.prototype.toggle = function (todoToToggle) {
		this.todos = this.todos.map(function (todo) {
			return todo !== todoToToggle ?
				todo :
				Utils.extend({}, todo, {completed: !todo.completed});
		});

		this.inform();
	};

	TodoModel.prototype.destroy = function (todo) {
		this.todos = this.todos.filter(function (candidate) {
			return candidate !== todo;
		});

		this.inform();
	};

	TodoModel.prototype.save = function (todoToSave, text) {
		this.todos = this.todos.map(function (todo) {
			return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
		});

		this.inform();
	};

	TodoModel.prototype.clearCompleted = function () {
		this.todos = this.todos.filter(function (todo) {
			return !todo.completed;
		});

		this.inform();
	};

	return TodoModel;

});

require([
	"compiled-i18n-data",
	"./app",
	"./info",
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



