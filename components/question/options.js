import React, { useState } from "react";
import { Stack, Button, Grid, Typography, Divider, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import SVGIcon from "../SVGIcon";
import {
  chooseMutilOption,
  chooseOption,
  submitQuestion,
} from "@/redux/slices/question";

export default function Options(props) {
  const { options, answer, explanation, showAnswer, question_type, type } =
    props;
  const dispatch = useDispatch();

  const [show, setShow] = useState(true);
  const onClickShow = () => {
    setShow(!show);
  };

  const onClickOption = (id) => {
    dispatch(chooseOption(id));
  };

  const onClickSubmitQuestion = () => {
    dispatch(submitQuestion());
  };

  return (
    <Stack spacing={2} sx={{ padding: 3 }}>
      {options.map((option, index) => (
        <Box key={index}>
          <Grid container alignItems="center" className="answerOption">
            <Grid item>
              <Button
                className={`answerOptionBtn ${
                  (!showAnswer && option.isSelected && "choosenOptionBtn") ||
                  (showAnswer &&
                    option.option.is_correct &&
                    "correctOptionBtn") ||
                  (option.isSelected &&
                    !option.option.is_correct &&
                    "wrongOptionBtn")
                }`}
                value={option._id}
                onClick={() => {
                  onClickOption(option.option._id);
                }}
                disabled={showAnswer}
              >
                <SVGIcon
                  src={
                    (!showAnswer && option.isSelected && "/icon/choose.svg") ||
                    (showAnswer &&
                      ((option.option.is_correct && "/icon/correct.svg") ||
                        (option.isSelected &&
                          !option.option.is_correct &&
                          "/icon/wrong.svg")))
                  }
                  sx={{ width: "12px", height: "12px" }}
                />
              </Button>
            </Grid>
            <Grid item>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  letterSpacing: "0em",
                  textAlign: "left",
                }}
              >
                {option.option.option_text}
              </Typography>
            </Grid>
          </Grid>
          <Box
            className={`explanation ${
              showAnswer && option.option.is_correct && "show-explanation"
            }`}
          >
            <Button
              variant="text"
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "18px",
                letterSpacing: "0em",
                textAlign: "left",
              }}
              onClick={onClickShow}
            >
              {(show && "Hide Explanation") || "Show Explanation"}
            </Button>
            <Divider />
            <Typography
              className={`explanation ${show && "show-explanation"}`}
              sx={{
                fontSize: "13px",
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: "0em",
                textAlign: "justified",
                marginLeft: "8px",
              }}
            >
              {explanation}
            </Typography>
          </Box>
        </Box>
      ))}
      {question_type == "multiple_answer" && type == "practice" && (
        <Box>
          <Button
            variant={answer.length > 0 ? "contained" : "outlined"}
            disabled={showAnswer}
            onClick={onClickSubmitQuestion}
          >
            Submit
          </Button>
        </Box>
      )}
    </Stack>
  );
}
