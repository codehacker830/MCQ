import initStoryshots from "@storybook/addon-storyshots";
import render from "../test/renderer";

initStoryshots({
	configPath: __dirname,
	renderer: render,
});
