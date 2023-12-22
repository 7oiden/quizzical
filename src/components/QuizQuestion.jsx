import PropTypes from "prop-types";
import { decode } from "html-entities";
import { useState } from "react";
import { nanoid } from "nanoid";
import shuffle from "lodash/shuffle"

export default function QuizQuestion(props) {
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  console.log(props.num);

  const correctAnswerObject = {
    id: "correctAnswer" + props.num,
    answer: decode(props.correctAnswer),
    isCorrect: true,
  };

  const incorrectAnswerObjects = props.incorrectAnswers.map((answer, index) => {
    return {
      id: `incorrectAnswer_${props.num}${index}`,
      answer: decode(answer),
      isCorrect: false,
    };
  });

  let answersArray = shuffle([correctAnswerObject, ...incorrectAnswerObjects]);

  // let shuffledAnswersArray = shuffle(answersArray);

  // console.log(shuffledAnswersArray);

  const handleOptionChange = (event, answerId) => {
    setSelectedAnswerId(answerId);

    // console.log(answerId);

    if (event.target.checked) {
      document.getElementById(answerId).style.backgroundColor = "pink";
    }
  };

  const decodedQuestionText = decode(props.questionText);

  return (
    <div className="quiz-container">
      <h2>{decodedQuestionText}</h2>
      <div className="answer-container">
        {answersArray.map((answer) => {
          return (
            <label key={answer.id} className="radio-btn-label">
              <input
                type="radio"
                name={`answer_${props.num}`}
                id={answer.id}
                value={answer.answer}
                checked={selectedAnswerId === answer.id}
                onChange={(event) => handleOptionChange(event, answer.id)}
                className="radio-btn-input"
              />
              <span className="custom-radio-btn">{answer.answer}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

QuizQuestion.propTypes = {
  questionText: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  num: PropTypes.number.isRequired,
};
