module.exports = {
	coverageDirectory: "coverage",
	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/src/test/fileMock.ts",
	},
	setupFiles: ["<rootDir>/src/test/registerContext.ts"],
};
