import Button from "@mui/material/Button";
import Question from "./question";
import Options from "./options";
import SVGIcon from "../SVGIcon";
import { Box } from "@mui/material";
import EnterAnswer from "./enter-answer";

export default function Quizz(props) {
  const {
    questionList,
    currentQuestion,
    userAnswer,
    isSubmitted,
    onClickNextBtn,
    onClickPreBtn,
    type,
  } = props;
  const question_type = questionList[currentQuestion].question_type;
  return (
    <Box
      sx={{
        background: "#FFFFFF",
        height: "485px",
        padding: "30px",
        borderRadius: "15px",
        position: "relative",
      }}
    >
      <Question question={questionList[currentQuestion].question} />
      {(question_type == "input" && (
        <EnterAnswer
          options={questionList[currentQuestion].options}
          currentQuestion={currentQuestion}
          userAnswer={userAnswer}
          explanation={questionList[currentQuestion].explanation}
          isSubmitted={isSubmitted}
          type={type}
        />
      )) || (
        <Options
          options={questionList[currentQuestion].options}
          answer={userAnswer[currentQuestion]}
          explanation={questionList[currentQuestion].explanation}
          isSubmitted={isSubmitted}
          question_type={question_type}
          type={type}
        />
      )}

      <Box sx={{ position: "absolute", bottom: "30px", left: "60px" }}>
        <Button
          className="moveQuestionBtn"
          onClick={onClickPreBtn}
          disabled={currentQuestion == 0}
        >
          <SVGIcon
            src="/icon/previousIcon.svg"
            sx={{ width: 6, height: 10, marginRight: "6px" }}
          />
          Previous
        </Button>
        <Button
          className="moveQuestionBtn nextQuestionBtn"
          onClick={onClickNextBtn}
          disabled={currentQuestion == questionList.length - 1}
        >
          Next
          <SVGIcon
            src="/icon/next.svg"
            sx={{ width: 6, height: 10, marginLeft: "6px" }}
          />
        </Button>
      </Box>
    </Box>
  );
}
