import { Container, Typography } from "@mui/material";

export default function Question(props) {
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
