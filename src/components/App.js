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
  const [questionsInSession, setQuestionsInSession] = useState([]);

  const [canRestart, setCanRestart] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [showHome, setShowHome] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const getQuestion = () => {
    let nextQuestion = getRandomIndexNoRepeat();

    if ( questionsInSession.length < 10 ) {
      increaseProgress();
      setQuestionsInSession(questionsInSession.push(nextQuestion));
      setCurrentQuestion(nextQuestion);
    } else {
      setShowFinal(true);
    }
  }

  const getRandomIndexNoRepeat = () => {
    let newQuestion = Math.floor(Math.random() * trivia.length)

    questionsInSession.forEach(questionNumber => {
      if (questionNumber === newQuestion) {
        return getRandomIndexNoRepeat(); // this recursion might not work
      }
    })
  }

  const increaseScore = () => {
    setScore(score + 1);
  }

  const increaseProgress = () => {
    setProgress(progress + 1);
  } 

  const restart = () => {
    setProgress(0);
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
              <ProgressBar progress={progress}/>

              <QuestionDisplay question={trivia[currentQuestion].question} />

              <ChoiceDisplay 
                correct={trivia[currentQuestion].correct} 
                incorrect={trivia[currentQuestion].incorrect} 
                increaseScore={() => increaseScore()}
              />
            </>
          }
    
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
