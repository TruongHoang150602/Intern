import { Box, Typography } from "@mui/material";
import Options from "./options";

export default function Review(props) {
  const { questionList, userAnswer } = props;

  if (questionList == []) return;

  return (
    <Box sx={{ background: "#F8F8FA", padding: "30px", borderRadius: "15px" }}>
      {questionList.map((question, index) => (
        <Box key={index}>
          <Typography variant="h6">Question {index + 1}:</Typography>
          <Typography mt={1}>{question.question}</Typography>
          <Options
            options={questionList[currentQuestion].options}
            answer={userAnswer[currentQuestion]}
            explanation={questionList[currentQuestion].explanation}
            isSubmitted={isSubmitted}
            question_type={question_type}
            type={type}
          />
        </Box>
      ))}
    </Box>
  );
}
