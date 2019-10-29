const path = require("path");

module.exports = {
	parser: "@typescript-eslint/parser",
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
		// project: path.join(__dirname, "src/tsconfig.json"),
		warnOnUnsupportedTypeScriptVersion: false,
	},
	plugins: ["react", "react-hooks", "jsx-a11y"],
	rules: {
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		curly: ["error", "multi-line"],
	},
	extends: ["plugin:jsx-a11y/strict", "plugin:prettier/recommended"],
};
