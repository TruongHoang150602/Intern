import {
  chooseQuestion,
  openModal,
  restartGame,
} from "redux/reducer/question/question";
import { Box, Button, Grid, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { useDispatch } from "react-redux";
import { Answer } from "types/question";
import { checkCorrect } from "utils/question";

interface QuestionsBoardProps {
  userAnswer: Answer[], 
  currentQuestion: number | null, 
  isSubmitted: boolean, 
  type: string
}

export default function QuestionsBoard(props: QuestionsBoardProps) {
  const { userAnswer, currentQuestion, isSubmitted, type } = props; // Fix typo in variable name
  const dispatch = useDispatch();

  const onClickQuestion = (index: number) => {
    dispatch(chooseQuestion(index));
  };

  const onClickSubmit = () => {
    dispatch(openModal());
  };

  const onClickRestart = () => {
    dispatch(restartGame());
  };

  

  return (
    <Box
      sx={{
        background: "#FFFFFF",
        height: "275px",
        borderRadius: "15px",
        borderTopLeftRadius: "0px",
        position: "relative",
      }}
    >
      <Typography
        sx={{
          background: "#FFFFFF",
          width: "100px",
          height: "30px",
          borderRadius: "15px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          fontWeight: "600",
          fontSize: "16px",
          lineHeight: "40px",
          position: "absolute",
          top: "-30px",
        }}
        align="center"
      >
        Level 8
      </Typography>

      <Box sx={{ padding: "16px" }}>
        <Typography>Question Palette</Typography>
        <Grid container spacing={1} pt={2}>
          {userAnswer.map((answer, index) => (
            <Grid item xs={1.5} key={index}>
              <Button
                className={`QuestionPalette ${
                  (currentQuestion == index && "currentQuestion") ||
                  (answer.showAnswer &&
                    ((checkCorrect(answer) && "correctOptionBtn") ||
                      (!checkCorrect(answer) && "wrongOptionBtn"))) ||
                  (type == "test" && answer.answer && "choosenQuestionBtn")
                }`}
                onClick={() => {
                  onClickQuestion(index);
                }}
                disabled={currentQuestion == null}
              >
                {index + 1}
              </Button>
            </Grid>
          ))}

          {currentQuestion != null &&
            !isSubmitted &&
            ((type == "practice" && (
              <Button
                variant="outlined"
                onClick={onClickRestart}
                sx={{ position: "absolute", bottom: "15px", right: "15px" }}
                startIcon={<ReplayIcon />}
              >
                Restart
              </Button>
            )) || (
              <Button
                variant="contained"
                onClick={onClickSubmit}
                sx={{ position: "absolute", bottom: "15px", right: "15px" }}
              >
                Submit
              </Button>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
