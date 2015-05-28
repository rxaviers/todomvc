// Share paths between Development browsing via AMD, and Production build via
// Gruntfile.

(function(root, factory) {
	// Node. Build compilation by Gruntfile.
	if (typeof exports === "object") {
		module.exports = factory();
	// Global
	} else {
		root.requirejs = factory();
	}
}(this, function() {

	return {
		paths: {
			"cldr": "../bower_components/cldrjs/dist/cldr",
			"cldr-data": "../bower_components/cldr-data/cldr-data",
			"director": "../bower_components/director/build/director",
			"globalize": "../bower_components/globalize/dist/globalize",
			"jsx": "../bower_components/requirejs-react-jsx/jsx",
			"JSXTransformer": "../bower_components/react/JSXTransformer",
			"react": "../bower_components/react/react-with-addons",
			"react-globalize": "../bower_components/react-globalize",
			"text": "../bower_components/requirejs-text/text",
			"todomvc-common": "../bower_components/todomvc-common"
		},

		"cldr-data": {
			locales: ["en"]
		},

		shim: {
			"director": {
				exports: "Router"
			},
			"react": {
				exports: "React"
			},
			JSXTransformer: "JSXTransformer"
		},

		jsx: {
			fileExtension: ".jsx",
			transformOptions: {
				harmony: false,
				stripTypes: false,
				inlineSourceMap: false
			},
			usePragma: false
		}
	};

}));
