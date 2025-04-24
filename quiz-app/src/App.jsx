import React, { useState, useEffect, useRef } from "react";
import quizData from "./quizData";

function App() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [timer, setTimer] = useState(60);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (!started || selected !== null) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          if (indexRef.current < quizData.length) {
            handleAnswer(null); // timeout = sai
          }
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [started, selected]);

  const startQuiz = () => {
    setStarted(true);
    setCurrentIndex(0);
    setScore(0);
    setResults([]);
    setSelected(null);
    setTimer(60);
  };

  const handleAnswer = (option) => {
    if (currentIndex >= quizData.length) return;

    const current = quizData[currentIndex];
    if (!current) return;

    const isCorrect = option === current.answer;
    setSelected(option);

    if (option === null) {
      setScore((prev) => prev - 1);
    } else if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setResults((prev) => [
      ...prev,
      {
        question: current.question,
        selected: option,
        correct: current.answer,
        isCorrect,
      },
    ]);

    setTimeout(() => {
      setSelected(null);
      setTimer(60);
      setCurrentIndex((prev) => prev + 1);
    }, 1500);
  };

  if (!started) {
    return (
      <div className="center">
        <h1>Quiz App</h1>
        <p>Test your general knowledge! You have 1 minute per question.</p>
        <button onClick={startQuiz}>Start Quiz</button>
      </div>
    );
  }

  if (currentIndex >= quizData.length) {
    return (
      <div className="center">
        <h2>Quiz Finished!</h2>
        <p>Your Score: {score}</p>
        <ul>
          {results.map((res, i) => (
            <li key={i}>
              <strong>{res.question}</strong><br />
              Your answer: {res.selected != null ? res.selected : "⏰ Skipped"}<br />
              Correct: {res.correct} - {res.isCorrect ? "✅" : "❌"}
            </li>
          ))}
        </ul>
        <button onClick={startQuiz}>Try Again</button>
      </div>
    );
  }

  const current = quizData[currentIndex];

  return (
    <div className="card">
      <h3>Question {currentIndex + 1}</h3>
      <p>{current.question}</p>
      <div>
        {current.options.map((opt, i) => {
          const isCorrect = opt === current.answer;
          const isSelected = selected === opt;

          let className = "btn";
          if (selected !== null) {
            if (opt === current.answer) className += " correct";
            else if (isSelected) className += " wrong";
            else className += " disabled";
          }

          return (
            <button
              key={i}
              className={className}
              onClick={() => handleAnswer(opt)}
              disabled={selected !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <p>⏱ Time left: {timer}s</p>
    </div>
  );
}

export default App;
