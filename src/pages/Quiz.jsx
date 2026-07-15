import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, AlertCircle, Trophy } from 'lucide-react';
import { quizQuestions } from '../data/practiceData';
import { ProgressContext } from '../context/ProgressContext';
import './Quiz.css';

const Quiz = () => {
  const navigate = useNavigate();
  const { recordQuiz } = useContext(ProgressContext);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30s per question
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  useEffect(() => {
    if (quizFinished || isAnswered) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, isAnswered, quizFinished]);

  const handleTimeUp = () => {
    setIsAnswered(true);
    setSelectedAnswer(-1); // Indicator for timeout
  };

  const handleAnswerSelect = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (index === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    const finalScore = Math.round((score / quizQuestions.length) * 100);
    recordQuiz({
      topic: 'Mixed Practice',
      score: finalScore,
      date: new Date().toISOString()
    });
  };

  if (quizFinished) {
    const finalScore = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="quiz-result fade-in">
        <Trophy size={64} className="result-icon" />
        <h2>Quiz Completed!</h2>
        <div className="score-display">
          <span className="score-number">{finalScore}%</span>
        </div>
        <p>You scored {score} out of {quizQuestions.length}</p>
        <div className="result-actions">
          <button className="btn-secondary" onClick={() => navigate('/app')}>Back to Dashboard</button>
          <button className="btn-primary" onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page fade-in">
      <div className="quiz-header">
        <div className="quiz-progress">
          Question {currentQuestionIndex + 1} of {quizQuestions.length}
        </div>
        <div className={`quiz-timer ${timeLeft < 10 ? 'danger' : ''}`}>
          <Clock size={18} />
          <span>00:{timeLeft.toString().padStart(2, '0')}</span>
        </div>
      </div>

      <div className="progress-bar-bg mb-6">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${((currentQuestionIndex) / quizQuestions.length) * 100}%` }}
        ></div>
      </div>

      <div className="question-container">
        <span className="question-topic">{currentQuestion.topic}</span>
        <h2 className="question-text">{currentQuestion.question}</h2>
        
        <div className="options-grid">
          {currentQuestion.options.map((option, index) => {
            let className = 'quiz-option';
            if (isAnswered) {
              if (index === currentQuestion.correctAnswer) className += ' correct';
              else if (index === selectedAnswer) className += ' incorrect';
              else className += ' disabled';
            } else if (index === selectedAnswer) {
              className += ' selected';
            }

            return (
              <button 
                key={index}
                className={className}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
              >
                <div className="option-letter">{String.fromCharCode(65 + index)}</div>
                <span className="option-text">{option}</span>
                {isAnswered && index === currentQuestion.correctAnswer && <CheckCircle className="status-icon" size={20} />}
                {isAnswered && index === selectedAnswer && index !== currentQuestion.correctAnswer && <XCircle className="status-icon" size={20} />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="explanation-box fade-in">
            <div className="explanation-header">
              <AlertCircle size={18} />
              <h4>Explanation</h4>
            </div>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      <div className="quiz-footer">
        <button 
          className="btn-primary ml-auto" 
          disabled={!isAnswered}
          onClick={handleNext}
        >
          {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
