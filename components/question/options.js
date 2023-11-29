import React, { useState } from "react";
import {
  Stack,
  Button,
  Grid,
  Typography,
  Divider,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import SVGIcon from "../SVGIcon";
import { chooseMutilOption, chooseOption } from "@/redux/slices/question";

export default function Options(props) {
  const { options, answer, explanation, isSubmitted, type, question_type } =
    props;
  const dispatch = useDispatch();

  const [show, setShow] = useState(true);
  const onClickShow = () => {
    setShow(!show);
  };

  const onClickOption = (id, is_correct) => {
    if (question_type == "choice")
      dispatch(chooseOption([{ option: id, is_correct }]));
    else dispatch(chooseMutilOption({ option: id, is_correct }));
  };

  // let checkSelected = false;
  // switch (question_type) {
  //   case "choice":
  //   case "multiple_choice":
  //     checkSelected = answer
  //     break;

  //   default:
  //     break;
  // }

  const checkSelectedOption = (id) => {
    const index = answer
      ? answer.findIndex((element) => element.option == id)
      : -1;
    return index !== -1;
  };

  const checkSelectedAll = () => {
    if (question_type == "multiple_answer") return false;
    return (
      options.filter((element) => element.is_correct).length == answer.length
    );
  };

  const showAnswer = (type == 0 && checkSelectedAll()) || isSubmitted;

  return (
    <Stack spacing={2} sx={{ padding: 3 }}>
      {options.map((option, index) => (
        <Box key={index}>
          <Grid container alignItems="center" className="answerOption">
            <Grid item>
              <Button
                className={`answerOptionBtn ${
                  (!showAnswer &&
                    checkSelectedOption(option._id) &&
                    "choosenOptionBtn") ||
                  (showAnswer && option.is_correct && "correctOptionBtn") ||
                  (checkSelectedOption(option._id) &&
                    !option.is_correct &&
                    "wrongOptionBtn")
                }`}
                value={option._id}
                onClick={() => {
                  onClickOption(option._id, option.is_correct);
                }}
                disabled={showAnswer}
              >
                <SVGIcon
                  src={
                    (!showAnswer &&
                      checkSelectedOption(option._id) &&
                      "/icon/choose.svg") ||
                    (showAnswer &&
                      ((option.is_correct && "/icon/correct.svg") ||
                        (checkSelectedOption(option._id) &&
                          !option.is_correct &&
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
                {option.option_text}
              </Typography>
            </Grid>
          </Grid>
          <Box
            className={`explanation ${
              showAnswer && option.is_correct && "show-explanation"
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
      {question_type == "multiple_answer" && type == 0 && (
        <Box>
          <Button variant={answer.length > 0 ? "contained" : "outlined"}>
            Submit
          </Button>
        </Box>
      )}
    </Stack>
  );
}
