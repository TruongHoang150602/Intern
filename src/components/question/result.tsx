import {
  chooseQuestion,
  restartGame,
  startGame,
} from "redux/reducer/question/question";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Answer } from "types/question";
import { checkCorrect } from "utils/question";
import { createNewUserResultAPI } from "redux/reducer/question/userResultAPI";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

interface ResultProps {
  userAnswer: Answer[], 
  testId : string, 
  type: "practice" | "test"
}

export default function Result(props: ResultProps) {
  const { userAnswer, testId, type } = props;
  console.log(testId, type);
  const dispatch = useDispatch();

  const total = userAnswer.length;
  let correct = 0;
  userAnswer.forEach((element) => {
    if (checkCorrect(element)) correct++;
  });
  const incorrect = total - correct;
  const isPass = correct / total > 0.3;

  const onClickRestart = (testId: string, type: "practice" | "test") => {
    console.log("Restart: ", testId, type);
    (dispatch as ThunkDispatch<any, void, AnyAction>)(createNewUserResultAPI({ userId: "65641bc12971970f5e1918cc", testId, type }));
    dispatch(startGame());
  };

  const onClickReview = () => {
    dispatch(chooseQuestion(0));
  };
  return (
    <Box
      sx={{
        background: "#FFFFFF",
        height: "485px",
        padding: "30px",
        borderRadius: "15px",
      }}
    >
      <Stack spacing={2} alignItems={"center"}>
        <Typography variant="h5">
          {(isPass && "Congatulations") || "Not enough to pass"}
        </Typography>
        <Image
          src={(isPass && "/image/pass.png") || "/image/fail.png"}
          alt=""
          width={315}
          height={200}
        />

        <Box>
          <Button
            variant="outlined"
            sx={{ width: "180px", height: "40px", borderRadius: "50px" }}
            onClick={() => onClickRestart(testId, type)}
          >
            TRY AGAIN
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "180px",
              height: "40px",
              borderRadius: "50px",
              marginLeft: "30px",
            }}
            onClick={onClickReview}
          >
            REVIEW
          </Button>
        </Box>

        <Box mt={4}>
          <Typography className="result-chip" sx={{ color: "#FFC93F" }}>
            <span style={{ fontWeight: "bold", marginRight: "20px" }}>
              {total}
            </span>{" "}
            Total
          </Typography>
          <Typography className="result-chip" sx={{ color: "#FF5252" }}>
            <span style={{ fontWeight: "bold", marginRight: "20px" }}>
              {incorrect}
            </span>{" "}
            Incorrect
          </Typography>
          <Typography className="result-chip" sx={{ color: "#82BC24" }}>
            <span style={{ fontWeight: "bold", marginRight: "20px" }}>
              {correct}
            </span>{" "}
            Correct
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
