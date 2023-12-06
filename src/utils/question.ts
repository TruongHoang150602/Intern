import { Answer, Option } from "types/question";

export const chooseOptionFuntion = (
  options: Option[],
  optionId: string,
  multiOption = false
) => {
  options.forEach((option) => {
    if (option._id == optionId) {
      option.isSelected = !option.isSelected;
    } else if (!multiOption) {
      option.isSelected = false;
    }
  });
  return options;
};

export const checkSufficientQuestions = (options: Option[]) => {
  const requiredCount = options.reduce(
    (count, option) => count + (option.is_correct ? 1 : 0),
    0
  );
  const selectedCount = options.reduce(
    (count, option) => count + (option.isSelected ? 1 : 0),
    0
  );
  return requiredCount === selectedCount;
};

export const resetOption = (options: Option[]) => {
  options.forEach((option) => {
    option.isSelected = false;
  });
};

export const resetUserAnswer = (userAnswer: Answer[]) => {
  userAnswer.forEach((answer) => {
    answer.answer = null;
    answer.showAnswer = false;
    resetOption(answer.options);
  });
};

export const submitUserAnswer = (userAnswer: Answer[]) => {
  userAnswer.forEach((answer) => {
    answer.showAnswer = true;
  });
};

export const calculateScore = (userAnswer: Answer[]) => {};

export const checkCorrect = (answer: Answer) => {
  if (answer.question.question_type == "input") {
    if (!answer.answer) return false;
    return (
      answer.options[0].option_text.toLowerCase() == answer.answer.toLowerCase()
    );
  }

  return answer.options.every((option) => {
    return (
      (option.isSelected && option.is_correct) ||
      (!option.isSelected && !option.is_correct)
    );
  });
};
