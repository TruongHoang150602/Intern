export interface Option {
  _id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  isSelected: boolean;
}

export interface Question {
  _id: string;
  id: number;
  question: string;
  question_type: "input" | "choice" | "multiple_choice" | "multiple_answer";
  topic: string;
  level: "easy" | "medium" | "hard";
  explanation: string | null;
  options: string[] | Option[];
}

export interface Answer {
  question: Question;
  options: Option[];
  answer: string | null;
  showAnswer: boolean;
  _id: string;
}

export interface UserResult {
  _id: string | null;
  userId: string | null;
  testId: string | null;
  answers: Answer[];
  score: number;
  isSubmitted: boolean;
  type: "practice" | "test";
  createdAt: string | null;
  updatedAt: string | null;
  __v: number;
}

export interface QuestionState {
  id: string | null;
  userAnswer: Answer[] | null;
  currentQuestion: number | null;
  type: "practice" | "test";
  score: number;
  isLoading: boolean;
  error: string | undefined;
  isSubmitted: boolean;
  isOpenModal: boolean;
}
