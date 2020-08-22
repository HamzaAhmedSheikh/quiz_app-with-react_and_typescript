import React from 'react';

import QuestionCard from './components/QuestionCard'

function App() {

  const startQuiz = async() => {}

  const nextQuestion = () => {}



  return (
    <div className="App">
      <h1> Quiz App </h1> 

      <button className="start" onClick={startQuiz}>
         Begin Quiz
      </button>   

      <p className="score">
         Score:
      </p>

      <p>
        Loading......
      </p>

      <QuestionCard />

      <button className="next" onClick={nextQuestion}>
        Next 
      </button>

    </div>
  );
}

export default App;
