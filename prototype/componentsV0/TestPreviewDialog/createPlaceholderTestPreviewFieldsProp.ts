import { TestPreviewFields } from "./index";

export const createPlaceholderTestPreviewFieldsProp = (): TestPreviewFields => ({
  testName: "Army Soldier GD",
  testTotalMarks: "200",
  testPassingMarks: "82",
  testMarksCorrectAnswer: "3",
  testMarksIncorrectAnswer: "-1",
  testDuration: "10 mins",

  testSections: [
    {
      sectionName: "Part 1 General Knowledge",
      sectionTotalMarks: "80",
      sectionPassingMarks: "44",
      sectionDifficultyPercentageEasy: "30%",
      sectionDifficultyPercentageMedium: "30%",
      sectionDifficultyPercentageHard: "40%",

      sectionSubjects: [
        {
          subjectName: "Geography",

          subjectTopics: [
            {
              topicName: "Regional",
              topicTotalQuestions: "4",
            },
            {
              topicName: "Foreign Lands",
              topicTotalQuestions: "4",
            },
          ],
        },
        {
          subjectName: "History",

          subjectTopics: [
            {
              topicName: "Regional",
              topicTotalQuestions: "2",
            },
          ],
        },
      ],
    },
  ],
});
