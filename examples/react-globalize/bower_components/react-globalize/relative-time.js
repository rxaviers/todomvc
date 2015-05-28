define(["react", "./src/core", "globalize/relative-time"], function(React, core) {

return React.createClass(core("formatRelativeTime", ["value", "unit", "options"]));

});
