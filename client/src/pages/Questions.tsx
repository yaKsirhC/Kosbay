import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionForm from "../components/questions/QuestionForm";
import "../styles/questions.scss";
import { hydrateQuestions } from "../features/secondarySlice";
import { RootState } from "../../store";
import SingleQuestion from "../components/questions/SingleQuestion";

export default function Questions() {
  const dispatch = useDispatch();
  const {questions} = useSelector((state: RootState) => state.secondary)
  useEffect(() => {
    // @ts-ignore
    dispatch(hydrateQuestions({depth: 0, DpVP: 3}))
  }, []);

  return (
    <div className="questions_wrapper">
      <header>
        <h1 className="questions_header">Questions</h1>
      </header>
      <main className="questions_container">
        <div className="questions">
          <QuestionForm />
          <div className="popular_questions">
            {
              questions.map((question: any, i: any) => {
                return <SingleQuestion key={i} question={question} />
              })
            }
          </div>
        </div>
        <div className="ads"></div>
      </main>
    </div>
  );
}
