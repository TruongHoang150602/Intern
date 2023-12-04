import {
  chooseQuestion,
  createNewUserResultAPI,
  restartGame,
  startGame,
} from "@/redux/slices/question";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function Result(props) {
  const { userAnswer, testId, type } = props;
  console.log(testId, type);
  const dispatch = useDispatch();

  const total = userAnswer.length;
  let correct = 0;
  userAnswer.forEach((element) => {
    if (element.is_correct) correct++;
  });
  const incorrect = total - correct;
  const isPass = correct / total > 0.3;

  const onClickRestart = (testId, type) => {
    console.log("Restart: ", testId, type);
    dispatch(createNewUserResultAPI({ testId, type }));
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
