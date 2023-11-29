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
  getAllQuestionsAPI,
  getQuestionsAPI,
  nextQuestion,
  preQuestion,
  selectChoicedAnswer,
  selectCurrentQuestion,
  selectError,
  selectIsLoading,
  selectIsOpenModal,
  selectIsSubmitted,
  selectNumberQuestion,
  selectQuestionList,
  selectScore,
  selectType,
  startGame,
} from "@/redux/slices/question";
import ConfirmSubmitModal from "@/components/question/confirmSubmitModal";
import DrawerRanking from "@/components/question/drawerRanking";
import {
  closeDrawer,
  getUsersAPI,
  openDrawer,
  selectIsOpenDrawer,
  selectUserList,
} from "../../../redux/slices/user";
import Quizz from "@/components/question/quizz";
import QuestionsBoard from "@/components/question/questionsBoard";
import Review from "@/components/question/review";
import Result from "@/components/question/result";
import { useRouter } from "next/router";
import test from "@/redux/slices/test";

const defaultTheme = createTheme();

export default function Page(props) {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { testId } = query;

  const questionList = useSelector(selectQuestionList);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const numberQuestion = useSelector(selectNumberQuestion);
  const userAnswer = useSelector(selectChoicedAnswer);
  const isLoading = useSelector(selectIsLoading);
  const open = useSelector(selectIsOpenModal);
  const isSubmitted = useSelector(selectIsSubmitted);
  const error = useSelector(selectError);
  const score = useSelector(selectScore);
  const type = useSelector(selectType);

  const userList = useSelector(selectUserList);
  const isOpenDrawer = useSelector(selectIsOpenDrawer);

  useEffect(() => {
    dispatch(getAllQuestionsAPI(testId));
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getUsersAPI());
  // }, [dispatch]);

  if (isLoading) {
    return (
      <Container
        disableGutters
        maxWidth="md"
        component="main"
        align="center"
        sx={{ pt: 8, pb: 6 }}
      >
        <CircularProgress />
      </Container>
    );
  }

  const onclickStartBtn = () => {
    dispatch(startGame());
  };

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  const onClickRanking = () => {
    dispatch(openDrawer());
  };

  const onClickNextBtn = () => {
    dispatch(nextQuestion());
  };

  const onClickPreBtn = () => {
    dispatch(preQuestion());
  };

  const onChangeTab = (event, type) => {
    dispatch(changeTab(type));
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
          <Tab value={0} label="Practice" />
          <Tab value={1} label="Test" />
        </Tabs>
        <Grid container spacing={2} mt={4}>
          <Grid item xs={6} md={3}>
            <QuestionsBoard
              userAnswer={userAnswer}
              currentQuestion={currentQuestion}
              isSubmitted={isSubmitted}
              type={type}
            />
          </Grid>

          <Grid item xs={6} md={9}>
            <Stack spacing={2}>
              {(isSubmitted && currentQuestion == null && (
                <Result userAnswer={userAnswer} />
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
                (currentQuestion != null && (
                  <Quizz
                    questionList={questionList}
                    currentQuestion={currentQuestion}
                    userAnswer={userAnswer}
                    isSubmitted={isSubmitted}
                    onClickNextBtn={onClickNextBtn}
                    onClickPreBtn={onClickPreBtn}
                    type={type}
                  />
                ))}
              {isSubmitted && (
                <Review questionList={questionList} userAnswer={userAnswer} />
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <ConfirmSubmitModal open={open} score={score} />
      <DrawerRanking
        open={isOpenDrawer}
        userList={userList}
        handleClose={handleCloseDrawer}
      />
    </ThemeProvider>
  );
}
