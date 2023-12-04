import { Box, Typography } from "@mui/material";
import Options from "./options";

export default function Review(props) {
  const { userAnswer } = props;

  if (userAnswer == []) return;

  return (
    <Box sx={{ background: "#F8F8FA", padding: "30px", borderRadius: "15px" }}>
      {userAnswer.map((answer, index) => (
        <Box key={index}>
          <Typography variant="h6">Question {index + 1}:</Typography>
          <Typography mt={1}>{answer.question.question}</Typography>
          <Options
            options={answer.options}
            answer={answer}
            explanation={answer.question.explanation}
            showAnswer={answer.showAnswer}
            question_type={answer.question.question_type}
          />
        </Box>
      ))}
    </Box>
  );
}
