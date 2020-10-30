import React, { useState, useEffect } from 'react';
import { HomeDisplay } from "./HomeDisplay.js";
import { ScoreDisplay } from "./ScoreDisplay.js";
import { ProgressBar } from "./ProgressBar.js";
import { QuestionDisplay } from "./QuestionDisplay.js";
import { ChoiceDisplay } from "./ChoiceDisplay.js";
import { BottomBar } from "./BottomBar.js";

import trivia from "../Apprentice_TandemFor400_Data.json";

import '../styles/App.css';

export const App = () => {

  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions] = useState(10);
  const [questionsInSession, setQuestionsInSession] = useState([]);

  const [canNext, setCanNext] = useState(true);
  const [showHome, setShowHome] = useState(true);
  const [showFinal, setShowFinal] = useState(false);

  const getQuestion = () => {
    let nextQuestion = getRandomIndexNoRepeat(trivia.length);

    if ( questionsInSession.length < totalQuestions ) {
      setQuestionsInSession([...questionsInSession, nextQuestion]);
      setCurrentQuestion(nextQuestion);
    } else {
      setShowFinal(true);
    }
  }

  const getRandomIndexNoRepeat = range => {
    let newQuestion = Math.floor(Math.random() * range)

    if (questionsInSession.includes(newQuestion)) {
      return getRandomIndexNoRepeat(range);
    } else {
      return newQuestion;
    }
  }

  const increaseScore = () => {
    setScore(score + 1);
  }

  const restart = () => {
    setCurrentQuestion(0);
    setQuestionsInSession([]);
    setShowFinal(false);
    setShowHome(true);
  }

  const next = () => {
    if (showHome) {
      setShowHome(false);
    }
    getQuestion();
  }

  return (
    <div className="App">
      { showHome ?
        <HomeDisplay /> 
        :
        <>
          <ScoreDisplay 
            score={score} 
            showFinal={showFinal}
          />
                     
          { !showFinal &&
            <>
              <ProgressBar progress={((questionsInSession.length - 1) / totalQuestions) * 100}/>

              <QuestionDisplay question={trivia[currentQuestion].question} />

              <ChoiceDisplay 
                correct={trivia[currentQuestion].correct} 
                incorrect={trivia[currentQuestion].incorrect} 
                increaseScore={() => increaseScore()}
              />
            </>
          }
        </>
      }
      <BottomBar 
        canRestart={ !showHome }
        restart={() => restart()}
        canNext={canNext} // do not show when asking question
        next={() => next()}
      />
    </div>
  );
}
