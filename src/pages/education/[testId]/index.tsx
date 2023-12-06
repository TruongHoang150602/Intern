import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  CircularProgress,
  Grid,
  Box,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { useSelector, useDispatch } from "react-redux";
import {
  changeTab,
  chooseQuestion,
  selectCurrentQuestion,
  selectError,
  selectIsLoading,
  selectIsOpenModal,
  selectIsSubmitted,
  selectScore,
  selectType,
  selectUserAnswer,
  startGame,
} from "redux/reducer/question/question";
import ConfirmSubmitModal from "components/question/confirmSubmitModal";
import Quizz from "components/question/quizz";
import QuestionsBoard from "components/question/questionsBoard";
import Review from "components/question/review";
import Result from "components/question/result";
import { useRouter } from "next/router";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { getUserResultAPI } from "redux/reducer/question/userResultAPI";

const defaultTheme = createTheme();

export default function Page(props : any) {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { testId } = query;

  const userAnswer = useSelector(selectUserAnswer);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const isLoading = useSelector(selectIsLoading);
  const open = useSelector(selectIsOpenModal);
  const isSubmitted = useSelector(selectIsSubmitted);
  const error = useSelector(selectError);
  const score = useSelector(selectScore);
  const type = useSelector(selectType);

  useEffect(() => {
    if (typeof testId === 'string' && type) {
      (dispatch as ThunkDispatch<any, void, AnyAction>)(getUserResultAPI({ userId: "65641bc12971970f5e1918cc", testId, type }));
    }
  }, [dispatch, testId, type]);
  

  if (isLoading) {
    return (
      <Container
        disableGutters
        maxWidth="md"
        component="main"
        sx={{ pt: 8, pb: 6, textAlign: 'center' }} 
      >
        <CircularProgress />
      </Container>
    );
  }

  const onclickStartBtn = () => {
    dispatch(startGame());
  };

  const onClickNextBtn = () => {
    if (typeof currentQuestion === 'number') {
      dispatch(chooseQuestion(currentQuestion + 1));
    }
  };
  
  const onClickPreBtn = () => {
    if (typeof currentQuestion === 'number') {
      dispatch(chooseQuestion(currentQuestion - 1));
    }
  };
  

  const onChangeTab = (event: any, type: "practice" | "test") => {
    dispatch(changeTab({ testId, type }));
    if (typeof testId === 'string' && type)
      (dispatch as ThunkDispatch<any, void, AnyAction>)(getUserResultAPI({ userId: "65641bc12971970f5e1918cc", testId, type }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      <Container className="main" maxWidth="xl">
        <Tabs
          value={type}
          onChange={onChangeTab}
          sx={{ background: "#F8F8FA", padding: "10px", borderRadius: "15px" }}
        >
          <Tab value="practice" label="Practice" />
          <Tab value="test" label="Test" />
        </Tabs>
        <Grid container spacing={2} mt={4}>
          <Grid item xs={6} md={3}>
            {userAnswer &&
            <QuestionsBoard
              userAnswer={userAnswer}
              currentQuestion={currentQuestion}
              isSubmitted={isSubmitted}
              type={type}
            />
            }
          </Grid>

          <Grid item xs={6} md={9}>
            <Stack spacing={2}>
              {(isSubmitted && currentQuestion && userAnswer && typeof testId === 'string'  && (
                <Result userAnswer={userAnswer} testId={testId} type={type} />
              )) ||
                (!isSubmitted && currentQuestion == null && (
                  <Box
                    sx={{
                      background: "#FFFFFF",
                      height: "485px",
                      padding: "30px",
                      borderRadius: "15px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button variant="contained" onClick={onclickStartBtn}>
                      Start
                    </Button>
                  </Box>
                )) ||
                (currentQuestion && userAnswer && (
                  <Quizz
                    currentQuestion={currentQuestion}
                    userAnswer={userAnswer}
                    onClickNextBtn={onClickNextBtn}
                    onClickPreBtn={onClickPreBtn}
                    type={type}
                  />
                ))}
              {isSubmitted && userAnswer && <Review userAnswer={userAnswer} type={type} />}
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <ConfirmSubmitModal open={open} score={score} />
      {/* <DrawerRanking
        open={isOpenDrawer}
        userList={userList}
        handleClose={handleCloseDrawer}
      /> */}
    </ThemeProvider>
  );
}
