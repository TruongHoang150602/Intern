import { Container, Typography } from "@mui/material";

interface QuestionProps {
  question: string
}

export default function Question(props: QuestionProps) {
  const { question } = props;
  return (
    <Typography
      sx={{
        fontFamily: "Segoe UI",
        fontSize: "20px",
        fontWeight: "600",
        lineHeight: "27px",
        letterSpacing: "0em",
        textAlign: "justified",
      }}
    >
      {question}
    </Typography>
  );
}
