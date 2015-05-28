define(["react", "./src/core", "globalize/currency"], function(React, core) {

return React.createClass(core("formatCurrency", ["value", "currency", "options"]));

});
