"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = NoData;
function NoData() {
	return React.createElement(
		"div",
		{ className: "no-data-placeholder" },
		React.createElement("i", { className: "no-data" }),
		React.createElement(
			"span",
			{ className: "no-data-title" },
			"\u6682\u65E0\u6570\u636E"
		)
	);
}
module.exports = exports["default"];