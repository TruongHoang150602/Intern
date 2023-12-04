export const chooseOptionFuntion = (options, optionId, multiOption = false) => {
  options.forEach((option) => {
    if (option.option._id == optionId) {
      option.isSelected = !option.isSelected;
    } else if (!multiOption) {
      option.isSelected = false;
    }
  });
  return options;
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
    answer.answer = null;
    answer.showAnswer = false;
    resetOption(answer.options);
  });
};

export const submitUserAnswer = (userAnswer) => {
  userAnswer.forEach((answer) => {
    answer.showAnswer = true;
  });
};

export const calculateScore = (userAnswer) => {};
