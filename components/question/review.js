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
            options={question.options}
            isChoiced={userAnswer[index]}
            explanation={question.explanation}
            isSubmitted={true}
          />
        </Box>
      ))}
    </Box>
  );
}
