import { addDecorator, configure } from "@storybook/react";
import { StrictMode } from "react";
import { ThemeProvider } from "../display";

// Integrate the Material UI and Styled Components libraries, set the default
// theme, apply the baseline CSS styles, and enable React's strict mode.
addDecorator(story => (
	<StrictMode>
		<ThemeProvider>{story()}</ThemeProvider>
	</StrictMode>
));

// TODO: Remove the regex adjustment which ignores the stories from the frontend
// prototype project.
// Locate all Storybook stories.
// const req = require.context("..", true, /\.stories\.tsx$/);
const req = require.context("..", true, /^(?!.*prototype).*\.stories\.tsx?$/);

// Load Storybook stories.
function loadStories() {
	req.keys().forEach(filename => req(filename));
}

// Bootstrap Storybook.
configure(loadStories, module);
