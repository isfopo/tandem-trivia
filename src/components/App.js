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
  const [progress, setProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [canRestart, setCanRestart] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [showHome, setShowHome] = useState(true);

  const getQuestion = () => {

    // choose random number between 0 and 9 that does not repeat

    increaseProgress();
    setCurrentQuestion();
  }

  const increaseScore = () => {
    setScore(score + 1);
  }

  const increaseProgress = () => {
    setProgress(progress + 1);
  } 

  const restart = () => {
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
          <ScoreDisplay score={score} />
          
          <ProgressBar progress={progress}/>

          <QuestionDisplay question={trivia[currentQuestion].question} />

          <ChoiceDisplay 
            correct={trivia[currentQuestion].correct} 
            incorrect={trivia[currentQuestion].incorrect} 
            increaseScore={() => increaseScore()}
          />
    
          <BottomBar 
            canRestart={canRestart} 
            restart={() => restart()}
            canNext={canNext}
            next={() => next()}
          />
        </>
      }
    </div>
  );
}
