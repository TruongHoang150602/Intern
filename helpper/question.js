export const chooseOptionFuntion = (options, optionId, mutilOption = false) => {
  for (let i = 0; i < options.length; i++) {
    if (options[i]._id === optionId) {
      options[i].isSelected = !options[i].isSelected;
    } else if (!mutilOption) {
      options[i].isSelected = false;
    }
  }
};

export const checkSufficientQuestions = (options) => {
  const requiredCount = options.reduce(
    (count, option) => count + (option.option.is_correct ? 1 : 0),
    0
  );
  const selectedCount = options.reduce(
    (count, option) => count + (option.isSelected ? 1 : 0),
    0
  );
  return requiredCount === selectedCount;
};

export const resetOption = (options) => {
  options.forEach((option) => {
    option.isSelected = false;
  });
};

export const resetUserAnswer = (userAnswer) => {
  userAnswer.forEach((answer) => {
    answer.answers = null;
    answer.showAnswer = false;
    resetOption(answer.options);
  });
};

export const submitUserAnswer = (userAnswer) => {
  userAnswer.forEach((answer) => {
    answer.showAnswer = true;
  });
};
