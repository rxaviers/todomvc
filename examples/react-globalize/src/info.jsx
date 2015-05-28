define([
	"globalize",
	"react",
	"react-globalize/message"
], function(Globalize, React, FormatMessage) {

	'use strict';

	var Info = React.createClass({
		render: function () {
			return (
				<div>
					<p><FormatMessage>Double-click to edit a todo</FormatMessage></p>
					<p>
						<FormatMessage elements={{
							petehunt: <a href="http://github.com/petehunt/">petehunt</a>,
							rxaviers: <a href="http://github.com/rxaviers/">rxaviers</a>
						}}>
							Created by [petehunt/] (React) and [rxaviers/] (Globalize)
						</FormatMessage>
					</p>
					<p>
						<FormatMessage elements={{
							TodoMVC: <a href="http://todomvc.com">TodoMVC</a>
						}}>
							Part of [TodoMVC/]
						</FormatMessage>
					</p>
				</div>
			);
		}
	});

	return Info;

});
