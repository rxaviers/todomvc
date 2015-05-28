(function(root, factory) {

    if (typeof exports === "object") {
        // Node, CommonJS
        module.exports = factory(require("react"), require("./src/core"), require("./src/message"));
    } else {
        // Global
        root.ReactGlobalize = factory(root.Global, root.React, root.ReactGlobalizeCore, root.ReactGlobalizeMessage);
    }

}(this, function(Globalize, React, core, message) {

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var fns = {
    formatCurrency: ["value", "currency", "options"],
    formatDate: ["value", "options"],
    formatMessage: ["path", "variables"],
    formatNumber: ["value", "options"],
    formatRelativeTime: ["value", "unit", "options"]
};

return Object.keys(fns).reduce(function(ReactGlobalize, fn) {
    var Fn = capitalizeFirstLetter(fn);
    ReactGlobalize[Fn] = React.createClass(fn === "formatMessage" ? message : core(fn, fns[fn]));
    return ReactGlobalize;
});

}));
