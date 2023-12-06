import Button from "@mui/material/Button";
import Question from "./question";
import Options from "./options";
import SVGIcon from "../SVGIcon";
import { Box } from "@mui/material";
import EnterAnswer from "./enter-answer";
import { Answer } from "types/question";


interface QuestionsBoardProps {
  currentQuestion: number, 
  userAnswer : Answer[], 
  onClickNextBtn: Function, 
  onClickPreBtn: Function, 
  type: string,
}

export default function Quizz(props: QuestionsBoardProps) {
  const { currentQuestion, userAnswer, onClickNextBtn, onClickPreBtn, type } =
    props;
  const question = userAnswer[currentQuestion].question;
  const question_type = question.question_type;
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
      <Question question={question.question} />
      {(question_type == "input" && (
        <EnterAnswer
          options={userAnswer[currentQuestion].options}
          answer={userAnswer[currentQuestion].answer}
          explanation={question.explanation}
          showAnswer={userAnswer[currentQuestion].showAnswer}
        />
      )) || (
        <Options
          options={userAnswer[currentQuestion].options}
          answer={userAnswer[currentQuestion]}
          explanation={question.explanation}
          showAnswer={userAnswer[currentQuestion].showAnswer}
          question_type={question_type}
          type={type}
        />
      )}

      <Box sx={{ position: "absolute", bottom: "30px", left: "60px" }}>
        <Button
          className="moveQuestionBtn"
          onClick={() => onClickPreBtn}
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
          onClick={() => onClickNextBtn}
          disabled={currentQuestion == userAnswer.length - 1}
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
