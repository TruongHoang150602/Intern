import React, { useState } from "react";
import { Stack, Button, Grid, Typography, Divider, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import SVGIcon from "../SVGIcon";
import {
  chooseOption,
  submitQuestion,
} from "redux/reducer/question/question";
import { Answer, Option } from "types/question";

interface OptionProps {
  options: Option[]; 
  explanation: string | null; 
  answer: Answer;
  showAnswer: boolean;
  question_type: string,
  type: string
}

export default function Options(props: OptionProps) {
  const { options, answer, explanation, showAnswer, question_type, type } =
    props;
  const dispatch = useDispatch();

  const [show, setShow] = useState(true);
  const onClickShow = () => {
    setShow(!show);
  };

  const onClickOption = (id: string) => {
    dispatch(chooseOption(id));
  };

  const onClickSubmitQuestion = () => {
    dispatch(submitQuestion(""));
  };

  const getIconSrc = (option: Option) => {
    if (!showAnswer && option.isSelected) {
      return "/icon/choose.svg";
    } else if (showAnswer) {
      if (option.is_correct) {
        return "/icon/correct.svg";
      } else if (option.isSelected && !option.is_correct) {
        return "/icon/wrong.svg";
      }
    }
  
    // Nếu không phù hợp với bất kỳ điều kiện nào, trả về một giá trị mặc định hoặc rỗng tùy vào trường hợp của bạn.
    return "";
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
                    option.is_correct &&
                    "correctOptionBtn") ||
                  (option.isSelected &&
                    !option.is_correct &&
                    "wrongOptionBtn")
                }`}
                value={option._id}
                onClick={() => {
                  onClickOption(option._id);
                }}
                disabled={showAnswer}
              >
                <SVGIcon
                  src={getIconSrc(option)}
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
      {question_type == "multiple_answer" && type == "practice" && (
        <Box>
          <Button
            variant="outlined"
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
