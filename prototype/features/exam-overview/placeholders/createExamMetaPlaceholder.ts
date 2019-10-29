import { IExamMeta } from "../models/IExamMeta";

export const createExamMetaPlaceholder = (): IExamMeta => ({
  subjects: [
    "General Knowledge",
    "General Knowledge",
    "English 1",
    "History",
    "Geography",
    "Political Science",
    "General Knowledge 2",
    "World War 1",
    "Global Warming",
    "Pollution",
  ].map((t, index) => ({
    id: `${t}-${index}`,
    title: { en: t },
    questionCount: 50,
    marksAllocated: 150,
  })),

  markings: {
    totalMarks: 200,
    passingMarks: 150,
    totalTimeMinutes: 15,
    questionsCount: 20,
    marksPerCorrectAnswer: 3,
    marksPerIncorrectAnswer: 1,
  },
});
