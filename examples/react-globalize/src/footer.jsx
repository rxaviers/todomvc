define([
	"./consts",
	"react",
	"react-globalize/message"
], function(consts, React, FormatMessage) {

	'use strict';

	var TodoFooter = React.createClass({
		render: function () {
			var clearButton = null;

			if (this.props.completedCount > 0) {
				clearButton = (
					<button
						id="clear-completed"
						onClick={this.props.onClearCompleted}>
						<FormatMessage>Clear completed</FormatMessage>
					</button>
				);
			}

			// React idiom for shortcutting to `classSet` since it'll be used often
			var cx = React.addons.classSet;
			var nowShowing = this.props.nowShowing;
			return (
				<footer id="footer">
					<span id="todo-count">
						<FormatMessage variables={{count: this.props.count}}>{
							"{count, plural,\n" +
							"   one {# item left}\n" +
							" other {# items left}\n" +
							"}"
						}</FormatMessage>
					</span>
					<ul id="filters">
						<li>
							<a
								href="#/"
								className={cx({selected: nowShowing === consts.ALL_TODOS})}>
									<FormatMessage>All</FormatMessage>
							</a>
						</li>
						{' '}
						<li>
							<a
								href="#/active"
								className={cx({selected: nowShowing === consts.ACTIVE_TODOS})}>
									<FormatMessage>Active</FormatMessage>
							</a>
						</li>
						{' '}
						<li>
							<a
								href="#/completed"
								className={cx({selected: nowShowing === consts.COMPLETED_TODOS})}>
									<FormatMessage>Completed</FormatMessage>
							</a>
						</li>
					</ul>
					{clearButton}
				</footer>
			);
		}
	});

	return TodoFooter;

});
