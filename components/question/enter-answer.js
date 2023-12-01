import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FormProvider, RHFTextField } from "../react-hook-form";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import SVGIcon from "../SVGIcon";
import { useDispatch } from "react-redux";
import { submitQuestion } from "@/redux/slices/question";
import { useState } from "react";

export default function EnterAnswer(props) {
  const { options, explanation, answer, showAnswer } = props;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(submitQuestion(data));
  };

  useEffect(() => {
    setValue("answer", answer.answer || "");
  }, [answer, setValue]);

  const [show, setShow] = useState(true);
  const onClickShow = () => {
    setShow(!show);
  };

  return (
    <Stack spacing={2} sx={{ padding: 3 }}>
      <Box className="form-input-answer">
        <FormProvider onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            className="AnswerInput"
            fullWidth
            placeholder="Đáp án trả lời ..."
            name="answer"
            control={control}
            disabled={showAnswer}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SVGIcon
                    src="/arrow-right.svg"
                    sx={{ color: "#007AFF", width: "20px", height: "20px" }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </FormProvider>
      </Box>

      {showAnswer && (
        <Box>
          <Button className="answerOptionBtn correctOptionBtn" disabled={true}>
            <SVGIcon src="correct.svg" sx={{ width: "12px", height: "12px" }} />
          </Button>
          {options.map((option) => option.option.option_text + " ")}
          <Box className={`explanation ${showAnswer && "show-explanation"}`}>
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
      )}
    </Stack>
  );
}
