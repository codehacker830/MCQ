// import { number, select } from "@storybook/addon-knobs";
import { number } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { Hero } from "./Hero";

storiesOf("Landing", module)
  .addParameters({ info: { propTablesExclude: [MemoryRouter as any] } })
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("Hero", () => {
    const backgroundAlpha = number("Background Alpha", 0.65, {
      max: 1,
      min: 0.05,
      range: true,
      step: 0.05,
    });
    // const backgroundImage = select(
    //   "Background Image",
    //   backgroundImageFilenames,
    //   "soldier-optimized.png",
    // );

    return (
      <div>
        <p>Background Alpha: {backgroundAlpha}</p>
        <Hero
        // backgroundAlpha={backgroundAlpha}
        // backgroundImage={backgroundImage}
        />
      </div>
    );
  });

// const backgroundImageFilenames = [
//   "soldier-optimized.png",
//   "Army-soldier-1024x782.jpg",
//   "7735008231155760386.png",
//   "060920-F-2034C-010.JPG",
//   "080715-F-JZ034-492.JPG",
//   "Ajay@EDiting B.jpg",
//   "Ajay@editingA.jpg",
//   "army (1).jpg",
//   "army.jpg",
//   "BL09_BP_AIRFORCE_GO_802946f.jpg",
//   "cdbfc061959733.5a7ffed5547d9.jpg",
//   "collage.png",
//   "crpf.jpg",
//   "india-kashmir-unrest-attack_9eff8a06-20e5-11e7-beb7-f1cbdf0743d8.jpg",
//   "Indian-Air-Force.jpg",
//   "Indian-Army-2.jpg",
//   "Indra-joint-india-russia-military-exercise-war-games.png",
//   "navy_story_647_051216042848.jpg",
//   "wp-image-143184595.jpg",
// ];
