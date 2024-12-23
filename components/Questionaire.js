import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveQuestionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
  id: 0,
  text: "What's your full name?",
  type: 'text'
},
{
  id: 1,
  text: "Write down the top 5 feelings you have while you are with your closest friend?",
  type: 'textarea'
},
{
  id: 2,
  text: "Describe your current business challenges",
  type: 'textarea'
},
{
  id: 3,
  text: "Describe your current business challenges",
  type: 'textarea'
},
{
  id: 4,
  text: "Describe your current business challenges",
  type: 'textarea'
},
{
  id: 5,
  text: "Describe your current business challenges",
  type: 'textarea'
},
{
  id: 6,
  text: "Describe your current business challenges",
  type: 'textarea'
},
{
  id: 7,
  text: "Describe your current business challenges",
  type: 'textarea'
}
  ];

  const handleNextQuestion = () => {
    if (inputValue.trim() === '') return;

    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: inputValue
    }));

    setInputValue('');

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const resetQuestionnaire = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setInputValue('');
    setIsComplete(false);
  };

  const renderInputField = () => {
    const question = questions[currentQuestion];
    switch(question.type) {
      case 'textarea':
        return (
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-3 bg-white/20 backdrop-blur-sm text-white rounded-xl min-h-[120px] resize-none"
            placeholder="Type your answer here..."
          />
        );
      default:
        return (
          <input
            type={question.type}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-3 bg-white/20 backdrop-blur-sm text-white rounded-xl"
            placeholder="Type your answer here..."
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 overflow-hidden relative">
      <div className="relative w-full bg-transparent max-w-xl h-[600px]">
        <AnimatePresence mode="popLayout">
          {!isComplete && questions.map((question, index) => {
            if (Math.abs(index - currentQuestion) > 1) return null;

            return (
              <motion.div
                key={question.id}
                initial={{ 
                  opacity: index === currentQuestion ? 1 : 0.5, 
                  x: index === currentQuestion 
                    ? 0 
                    : index < currentQuestion 
                      ? -150 
                      : 150,
                  scale: index === currentQuestion ? 1 : 0.9,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  zIndex: index === currentQuestion ? 10 : 1
                }}
                animate={{ 
                  opacity: index === currentQuestion ? 1 : 0.5, 
                  x: index === currentQuestion 
                    ? 0 
                    : index < currentQuestion 
                      ? -150 
                      : 150,
                  scale: index === currentQuestion ? 1 : 0.9,
                  transition: { 
                    type: 'spring', 
                    stiffness: 300, 
                    damping: 20 
                  }
                }}
                style={{
                  transform: `translateX(${index === currentQuestion 
                    ? '0%' 
                    : index < currentQuestion 
                      ? '-20%' 
                      : '20%'})`
                }}
                className="absolute bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 overflow-hidden"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  {question.text}
                </h2>

                {index === currentQuestion && (
                  <div className="space-y-4">
                    {renderInputField()}
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextQuestion}
                      disabled={!inputValue.trim()}
                      className={`w-full px-4 py-3 rounded-xl transition-all text-white ${
                        inputValue.trim() 
                          ? 'bg-white/30 hover:bg-white/50' 
                          : 'bg-white/10 cursor-not-allowed'
                      }`}
                    >
                      {currentQuestion === questions.length - 1 ? 'Complete' : 'Next Question'}
                    </motion.button>
                  </div>
                )}

                <div className="mt-6 w-full bg-white/20 rounded-full h-2.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="bg-white h-2.5 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isComplete && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-white bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-6">Thank You!</h3>
            <div className="bg-white/20 p-6 rounded-xl">
              <h4 className="text-xl mb-4">Your Responses:</h4>
              {Object.entries(answers).map(([question, answer]) => (
                <p key={question} className="mb-2">
                  {questions[question].text}: {answer}
                </p>
              ))}
            </div>
            <button 
              onClick={resetQuestionnaire}
              className="mt-6 px-6 py-3 bg-white/30 backdrop-blur-sm rounded-xl hover:bg-white/50 transition-all"
            >
              Restart Questionnaire
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InteractiveQuestionnaire;