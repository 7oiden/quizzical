import "./sass/styles.scss";
import { useState, useEffect } from "react";
import "./App.scss";
import { BASE_URL } from "./components/constants/api";
import axios from "axios";
import QuizQuestion from "./components/QuizQuestion";
import StartScreen from "./components/StartScreen";

function App() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [isNewGame, setIsNewGame] = useState(true);

  function handleStartQuiz() {
    console.log("Start Quiz");
    setIsNewGame((prev) => !prev);
    setQuizQuestions([]);
  }

  function fetchData() {
    axios
      .get(BASE_URL)
      .then((response) => {
        const results = response.data.results;
        setQuizQuestions(results);
        // console.log(results);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (!isNewGame) {
      fetchData();
    }
    // setIsNewGame(false);
  }, [isNewGame]);

  console.log(quizQuestions);

  const quizContent = quizQuestions.map((question, index) => {
    return (
      <QuizQuestion
        key={question.question}
        num={index}
        questionText={question.question}
        correctAnswer={question.correct_answer}
        incorrectAnswers={question.incorrect_answers}
      />
    );
  });

  return (
    <main>
      <div className="start-container"></div>
      <div className="quiz-wrapper">
        {isNewGame ? <StartScreen /> : quizContent}
      </div>
      <button className="btn" onClick={handleStartQuiz}>
        Start Quiz
      </button>
    </main>
  );
}

export default App;
