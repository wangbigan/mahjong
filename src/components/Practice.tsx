import React, { useState } from 'react';
import { Target, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface Question {
  id: string;
  type: 'multiple' | 'scenario';
  question: string;
  description?: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

const Practice: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');

  const questions: Question[] = [
    {
      id: '1',
      type: 'multiple',
      question: '麻将中，顺子是指什么？',
      options: [
        '三张相同的牌',
        '三张连续数字的同花色牌',
        '两张相同的牌',
        '四张相同的牌'
      ],
      correct: 1,
      explanation: '顺子是三张连续数字的同花色牌，如一二三万、四五六条等。',
      difficulty: 'beginner',
      category: '基础概念'
    },
    {
      id: '2',
      type: 'scenario',
      question: '你的手牌是：一万、二万、四万、五万、六万、七万、八万、九万、二条、三条、四条、五筒、五筒。应该打出哪张牌？',
      description: '分析当前手牌，选择最优的舍牌策略',
      options: [
        '打出一万',
        '打出九万',
        '打出二条',
        '打出其中一张五筒'
      ],
      correct: 0,
      explanation: '一万是孤张，不容易组成顺子，应该优先打出。这样可以为手牌留出更多组合可能。',
      difficulty: 'intermediate',
      category: '实战技巧'
    },
    {
      id: '3',
      type: 'multiple',
      question: '什么是"听牌"？',
      options: [
        '刚开始摸牌的状态',
        '只差一张牌就能胡牌的状态',
        '已经胡牌的状态',
        '不能继续游戏的状态'
      ],
      correct: 1,
      explanation: '听牌是指手牌已经整理好，只需要再摸到一张特定的牌就能胡牌的状态。',
      difficulty: 'beginner',
      category: '基础概念'
    },
    {
      id: '4',
      type: 'scenario',
      question: '观察到对手连续打出了一万、九万、一条、九条，这说明什么？',
      options: [
        '对手在做清一色',
        '对手在做七对子',
        '对手在做平胡，清理边张',
        '对手的牌很差'
      ],
      correct: 2,
      explanation: '连续打出边张（一、九）说明对手在整理手牌，追求平胡牌型，这是常见的整牌策略。',
      difficulty: 'advanced',
      category: '读牌技巧'
    },
    {
      id: '5',
      type: 'multiple',
      question: '在广东麻将中，推倒胡是指什么？',
      options: [
        '必须有特定牌型才能胡牌',
        '任意牌型都可以胡牌',
        '只能自摸胡牌',
        '必须清一色才能胡牌'
      ],
      correct: 1,
      explanation: '推倒胡是广东麻将的特色，任何符合基本胡牌条件的牌型都可以胡牌，不需要特定役种。',
      difficulty: 'intermediate',
      category: '地区规则'
    }
  ];

  const filteredQuestions = questions.filter(q => q.difficulty === selectedDifficulty);
  const currentQ = filteredQuestions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    const newAnswered = [...answered];
    newAnswered[currentQuestion] = true;
    setAnswered(newAnswered);
    
    if (selectedAnswer === currentQ.correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered([]);
  };

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty as 'beginner' | 'intermediate' | 'advanced');
    handleRestart();
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '新手';
      case 'intermediate': return '进阶';
      case 'advanced': return '高级';
      default: return '';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'from-green-500 to-green-600';
      case 'intermediate': return 'from-yellow-500 to-yellow-600';
      case 'advanced': return 'from-red-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const isQuizComplete = currentQuestion === filteredQuestions.length - 1 && showResult;

  if (!currentQ) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <Target className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg">该难度下暂无练习题</p>
        <p className="text-gray-400">请选择其他难度</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-t-4 border-green-500">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">实战练习</h1>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedDifficulty}
              onChange={(e) => handleDifficultyChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="beginner">新手级</option>
              <option value="intermediate">进阶级</option>
              <option value="advanced">高级</option>
            </select>
            <button
              onClick={handleRestart}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              重新开始
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>题目 {currentQuestion + 1} / {filteredQuestions.length}</span>
          <span>正确率: {answered.length > 0 ? Math.round((score / answered.length) * 100) : 0}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {isQuizComplete ? (
        // Quiz Complete Screen
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">练习完成！</h2>
          <div className={`inline-block px-6 py-3 rounded-lg bg-gradient-to-r ${getDifficultyColor(selectedDifficulty)} text-white text-lg font-semibold mb-6`}>
            {getDifficultyText(selectedDifficulty)}级 - 得分: {score}/{filteredQuestions.length}
          </div>
          <p className="text-gray-600 mb-6">
            正确率: {Math.round((score / filteredQuestions.length) * 100)}%
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              再练一次
            </button>
            <button
              onClick={() => {
                const nextDifficulty = selectedDifficulty === 'beginner' ? 'intermediate' : 
                                     selectedDifficulty === 'intermediate' ? 'advanced' : 'beginner';
                handleDifficultyChange(nextDifficulty);
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              挑战更高难度
            </button>
          </div>
        </div>
      ) : (
        // Question Screen
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getDifficultyColor(selectedDifficulty)} text-white`}>
                {getDifficultyText(selectedDifficulty)}级
              </span>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {currentQ.category}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {currentQ.question}
            </h2>
            {currentQ.description && (
              <p className="text-gray-600 mb-4">{currentQ.description}</p>
            )}
          </div>

          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? showResult
                      ? index === currentQ.correct
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-red-500 bg-red-50 text-red-800'
                      : 'border-blue-500 bg-blue-50'
                    : showResult && index === currentQ.correct
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 hover:border-gray-300'
                } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                  {showResult && (
                    <div className="ml-auto">
                      {index === currentQ.correct ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : selectedAnswer === index ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : null}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-800 mb-2">解析</h3>
              <p className="text-gray-600">{currentQ.explanation}</p>
            </div>
          )}

          <div className="flex justify-between">
            <div className="text-sm text-gray-500">
              {currentQuestion > 0 && (
                <button
                  onClick={() => {
                    setCurrentQuestion(Math.max(0, currentQuestion - 1));
                    setSelectedAnswer(null);
                    setShowResult(false);
                  }}
                  className="text-blue-600 hover:text-blue-700"
                >
                  上一题
                </button>
              )}
            </div>
            <div className="space-x-3">
              {!showResult ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  提交答案
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {currentQuestion < filteredQuestions.length - 1 ? '下一题' : '查看结果'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
        <h3 className="text-lg font-semibold text-green-800 mb-3">练习提示</h3>
        <ul className="text-green-700 space-y-2">
          <li>• 仔细阅读题目，理解题意后再选择答案</li>
          <li>• 查看解析可以帮助理解正确答案的原理</li>
          <li>• 建议从新手级开始，逐步提升难度</li>
          <li>• 多次练习有助于巩固所学知识</li>
        </ul>
      </div>
    </div>
  );
};

export default Practice;