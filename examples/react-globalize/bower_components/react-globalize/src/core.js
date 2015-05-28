(function(root, factory) {

    // UMD returnExports
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["globalize", "react"], factory);
    } else if (typeof exports === "object") {
        // Node, CommonJS
        module.exports = factory(require("globalize"), require("react"));
    } else {
        // Global
        root.ReactGlobalizeCore = factory(root.Global, root.React);
    }

}(this, function(Globalize, React) {

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

return function(fn, argArray) {
    var Fn = capitalizeFirstLetter(fn);
    return {
        displayName: Fn,
        format: function() {
            return this.instance[fn].apply(this.instance, this.args);
        },
        render: function() {
            var formatted;
            var componentProps = this.props;
            this.instance = Globalize;
            this.args = argArray.map(function(element) {
                return componentProps[element];
            });

            if (this.props["locale"]) {
              this.instance = Globalize(this.props["locale"]);
            }

            return React.DOM.span(null, this.format());
        }
    }
};

}));
