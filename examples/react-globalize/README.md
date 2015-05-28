# React TodoMVC Example Using Globalize For Internationalization

This example assumes you're sold to React already and it focuses on the Globalize integration.

> Globalize is a JavaScript library for internationalization and localization that leverages the Unicode CLDR data. Its core principles are stability (runs in browsers and Node.js, consistently across all of them), flexibility (allows developers to load as much or as little data as they need; allows developers to load the i18n functionalities they need) and efficiency (generates precompiled production code for optimal speed and size).

> React-Globalize is an experimental JavaScript library that takes the power of Globalize and makes it React friendly. Its core principle is to allow declarative code. Simply specify your messages using ICU Messageformat syntax with plural and gender support and specify your formatters (numbers, currencies, datetimes, relative time) conveniently independent of the locale conventions and React-Globalize will do the rest. Our tooling automatically generates translation table and provides defaul language as fallback.

> _[React - facebook.github.io/react](http://facebook.github.io/react)_

> _[Globalize - jquery/globalize](https://github.com/jquery/globalize)_

> _[ReactGlobalize - kborchers/react-globalize](https://github.com/kborchers/react-globalize)_

## Goals

### Production code

- Small. Avoid including unnecessary i18n data. For example, doesn't include unnecessary translation messages, doesn't include unnecessary functionality data (e.g., doesn't include calendar information if not formatting dates, doesn't include currency data if not formatting currencies, etc), doesn't include unnecessary data within the same functionality (e.g., doesn't include month names if formatting dates using numbered months only). Thefore, no bandwidth is wasted.
- Fast. Have all formatters (numbers, currencies, datetimes, relative time) generated/preprocessed at built time. This is, traversing CLDR data and generating the formatters will happen during build time and will be precompiled for runtime. Therefore, no CPU clocks are wasted on the client.
- Reliable. Runs in browsers (Chrome, Firefox, IE8 using ES5 shim, IE9+, Safari 5.1+, Opera 12.1, iOS 6.1+, Android 2.3, 4+) and Node.js, consistently across all of them.
- Up-to-date. Use the CLDR data of your preference (and have the runtime bundles built with them). For example, use the latest available CLDR (JSON format) directly from Unicode without having to wait for any pipeline on the Globalize project side or even use CLDR with your custom modifications.

In this example, we've arranged the files as follows. But, obviously this could be arranged to best suite your needs.

All external libraries have been bundled into `dist/libs.js`, all application code has been bundled into `dist/app.js`, and all the necessary i18n formatters have been put into `dist/app/<locale>.js`.

    dist/
    ├── app.js
    ├── app/
    │   ├── ar.js
    │   ├── ...
    │   ├── en.js
    │   ├── ...
    │   └── zh.js
    └── libs.js

For example, all you need to load to serve the application for the Portuguese `pt` locale is:

```html
<script src="dist/libs.js"></script>
<script src="dist/app/pt.js"></script>
<script src="dist/app.js"></script>
```

In 3.2KB (2.5KB for the Globalize and ReactGlobalize runtime libraries, plus 0.7KB for the `pt` application precompiled formatters), you have everything you need to localize your application for the Portuguese locale.

| File | Minified + gzipped size | Summary |
|---|--:|---|
| dist/app.js | 4.0KB | Demo application code. |
| dist/app/\<locale\>.js | ~0.7KB | Precompiled formatters used in this demo. |
| dist/libs.js | 45.5KB | All the external libraries needed for this demo. Note that Globalize and ReactGlobalize runtime libraries account for 2.5KB only. |

### Development

- Declarative and disposable i18n code (in other words, React friendly code).
- Automatically generates (initialize and manage) the translation messages (JSON files with translation data).
- Doesn't require a build step on development. In other words, change a message, reload and see the result; or update the CLDR data version (or even customize it), reload and see the updates.

***Declarative and disposable i18n code***

A regular (non-localized) message looks like `<p>Double-click to edit a todo</p>`. A localized message using Globalize (and ReactGlobalize) looks like this:

```js
<p><FormatMessage>Double-click to edit a todo</FormatMessage></p>
```

By default, the message itself is used as key for translation. But, obviously you want can use your own keys if you want to (not covered here).

Globalize supports ICU Message Format. So, yeap it supports pluralization and gender inflections. More details can be found at [jquery/globalize/doc/api/message](https://github.com/jquery/globalize/blob/master/doc/api/message/message-formatter.md).

```js
<FormatMessage variables={{count: this.props.count}}>{
  "{count, plural," +
  "  one {# item left}" +
  "other {# items left}" +
  "}"
}</FormatMessage>
```

When you need your localized message as a String rather than a React Element, use Globalize directly.

```diff
<input placeholder={Globalize.formatMessage("What needs to be done?")} />
```

When you need to include React Elements in your messages, use the pseudo `[empty-tag/]` or `[tag]content[/tag]`.

```js
<FormatMessage elements={{
  TodoMVC: <a href="http://todomvc.com">TodoMVC</a>
}}>
  Part of [TodoMVC/]
</FormatMessage>
```

*Disclosure*: It could be possible to deduce elements from a structure like `<FormatMessage>Part of <a href="http://todomvc.com">TodoMVC</a></FormatMessage>`, which is cleaner. Although, it would make ReactGlobalize code more complex.

***Automatically generates the translation messages***

The ReactGlobalize tooling parses the application code and generates translation messages like the below.

```
Running "react-globalize" task
Generated `src/translations/en.json` using the default translation.
Populated the new fields of `src/translations/pt.json` using the default translation.
...
```

src/translations/en.json
```
{
  "en": {
    "Double-click to edit a todo": "Double-click to edit a todo"
  }
}
```

src/translations/pt.json
```
{
  "pt": {
    "Double-click to edit a todo": "Double-click to edit a todo"
  }
}
```

*Disclosures*: Currently, the translation messages are extracted dynamically (we're considering to implement a static extractor as well - each approach has its own advantages). Also, in this demo we're using a Grunt task. But, the extractor itself is a JavaScript library. Therefore, we believe that porting to Gulp or other task-frameworks shouldn't be hard (and we'll be happy to provide assistance).

For the next example, let's suppose we had translated the `pt` message above and we have new code with new messages available. Re-running the ReactGlobalize tool to extract the messages will result in the below.

```
Running "react-globalize" task
Generated `src/translations/en.json` using the default translation.
Populated the new fields of `src/translations/pt.json` using the default translation.
...
```

src/translations/en.json
```
{
  "en": {
    "Double-click to edit a todo": "Double-click to edit a todo",
    "Part of [TodoMVC|]": "Part of [TodoMVC/]",
    "What needs to be done?": "What needs to be done?",
    "(count, plural, one (# item left) other (# items left) )": [
      "{count, plural,",
      "   one {# item left}",
      " other {# items left}",
      "}"
    ]
  }
}
```

src/translations/pt.json (only new messages are added)
```
{
  "pt": {
    "Double-click to edit a todo": "Clique duas vezes para editar uma tarefa",
    "Part of [TodoMVC|]": "Part of [TodoMVC/]",
    "What needs to be done?": "What needs to be done?",
    "(count, plural, one (# item left) other (# items left) )": [
      "{count, plural,",
      "   one {# item left}",
      " other {# items left}",
      "}"
    ]
  }
}
```

***Doesn't require a build step on development***

In this demo, we're using AMD to demonstrate that ReactGlobalize can be used without a build step. To run the app, spin up an HTTP server (e.g. `python -m SimpleHTTPServer`) and visit `http://localhost/development.html`.

### Back to production code

As important as being easy to use is that the final product is great. Above, we've mentioned our goal for production code was being small, fast, reliable, and up-to-date. Below, I want to show how changes affect your final production code.

Suppose that we include the following message in `info.jsx`.

```jsx
<FormatMessage>Get all this for free</FormatMessage>
```

Such change is going to produce the following impact on the production code.

| File | Minified + gzipped size | Change |
|---|--:|---|
| dist/app.js | 4.1KB | +0.1KB (the new message) |
| dist/app/\<locale\>.js | ~0.8KB | +0.1KB ([the new message formatter](https://gist.github.com/rxaviers/86dbc0a2e4dd15b019a2)) |
| dist/libs.js | 45.5KB | +0.0KB (no change) |

The only addition to `dist/app/en.js` (and analogous for other locales) is below. See the [full diff here](https://gist.github.com/rxaviers/86dbc0a2e4dd15b019a2).

```js
Globalize.b690639996 = messageFormatterFn((function() {
  return function (d) { return "Get all this for free"; }
})());
```

Now, suppose we include a localized `$0.00` in the message.

```jsx
<FormatMessage variables={{ price: Globalize.formatCurrency(0, "USD") }}>{
  "Get all this for free {price}"
}</FormatMessage>
```

Such change is going to produce the following impact on the production code.

| File | Minified + gzipped size | Change |
|---|--:|---|
| dist/app.js | 4.1KB | +0.1KB (same as before) |
| dist/app/\<locale\>.js | ~0.9KB | +0.2KB ([the new message and currency formatters](https://gist.github.com/rxaviers/56b3b2716c97a30a1994)) |
| dist/libs.js | 47.0KB | +1.5KB (currency and number runtime modules are now included) |

The new formatters added to `dist/app/en.js` (and analogous for other locales) are below. See the [full diff here](https://gist.github.com/rxaviers/56b3b2716c97a30a1994).

```js
Globalize.b957349717 = numberFormatterFn(["'$'",,1,2,2,,,0,3,,"","'$'#,##0.00","-'$''$'#,##0.00","-'$'","",numberRound(),"∞","NaN",{".":".",",":",","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);

Globalize.b1223214380 = currencyFormatterFn(Globalize("en").numberFormatter({"raw":"'$'#,##0.00"}));

Globalize.a2053015180 = messageFormatterFn((function(  ) {
  return function (d) { return "Get all this for free " + d.price; }
})());
```

Now, suppose you are going to use currency formatting in various other places in your code (either via `<FormatCurrency>` element or `Globalize.formatCurrency()` directly). In your final production code, as you might have guessed, there won't be duplicate currency formatters, only the new messages will be included. They will reuse the currency formatter above.

## Learning Globalize

The [Globalize getting started documentation](https://github.com/jquery/globalize/#getting-started) is a great way to get started.

Here are some links you may find helpful:

* [Documentation](https://github.com/jquery/globalize/#globalize)
* [API Reference](https://github.com/jquery/globalize/#api)
* [Globalize on GitHub](https://github.com/jquery/globalize)
* [Support on IRC](http://irc.jquery.org/)

_If you have other helpful links to share, or find any of the links above no longer work, please [let us know](https://github.com/tastejs/todomvc/issues)._


## Running

To run the development app, spin up an HTTP server (e.g. `python -m SimpleHTTPServer`) and visit http://localhost/development.html.

To run the production app, visit http://localhost/production.html.

To (re-)build the production app, first install [grunt-cli](http://gruntjs.com/getting-started#installing-the-cli), then run `grunt`.
