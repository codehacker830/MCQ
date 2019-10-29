import { ExamHeaderProps } from "./index";

export const examHeaderPlaceholderProps: Omit<
  ExamHeaderProps,
  "questionNumber"
> = {
  sectionTitle: "Part 1: General Knowledge",
  sectionMarkingsCaption: "+2, -.33",
  sectionInstructions:
    "A question will be asked to a team and if they are unable to answer it will be passed to the next team - Rounds 4- 24 questions",
  question:
    "Which of the following features of Indian temples resembles pylons of the Egyptian temples?",
  examName: "GD 2015, Sol Clk 2016",
};
