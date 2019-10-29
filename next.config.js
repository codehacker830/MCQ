require("@babel/register")({
	babelrc: false,
	extensions: [".ts"],
	presets: [
		["@babel/preset-env", { targets: "node 10" }],
		"@babel/preset-typescript",
	],
});

const nextConfig = require("./src/next.config.ts").default;
module.exports = nextConfig;
