import React, { useState, useEffect } from 'react';
import { 
  Target, CheckCircle, XCircle, RotateCcw, Trophy, 
  Brain, Users, BarChart3, Play, Pause, 
  TrendingUp, Shield, Sword, Eye,
  Clock, Star, Award, Zap
} from 'lucide-react';

// 核心数据接口定义
interface ScenarioQuestion {
  id: string;
  type: 'scenario' | 'tactical' | 'defensive';
  title: string;
  situation: string;
  handTiles: string[];
  riverTiles: string[];
  options: {
    action: string;
    tiles?: string[];
    description: string;
    riskLevel: 'low' | 'medium' | 'high';
    expectedValue: number;
  }[];
  correct: number;
  explanation: string;
  relatedPrinciple: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

interface AIOpponent {
  id: string;
  name: string;
  avatar: string;
  personality: 'aggressive' | 'conservative' | 'analytical';
  skillLevel: number;
  specialties: string[];
  description: string;
}

interface GameSession {
  id: string;
  opponent: AIOpponent;
  rounds: number;
  currentRound: number;
  playerScore: number;
  aiScore: number;
  gameHistory: any[];
  startTime: Date;
}

interface AnalysisData {
  totalGames: number;
  winRate: number;
  avgDecisionTime: number;
  strongPoints: string[];
  weakPoints: string[];
  improvementSuggestions: string[];
  skillRadar: {
    offense: number;
    defense: number;
    reading: number;
    timing: number;
    calculation: number;
  };
}

const Practice: React.FC = () => {
  // 主要状态管理
  const [activeMode, setActiveMode] = useState<'scenario' | 'battle' | 'analysis'>('scenario');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  
  // 对战模式状态
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [isGameActive, setIsGameActive] = useState(false);
  const [selectedOpponent, setSelectedOpponent] = useState<AIOpponent | null>(null);
  
  // 分析模式状态
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  // 情景练习题库 - 基于口诀的实战训练
  const scenarioQuestions: ScenarioQuestion[] = [
    {
      id: 'scenario_1',
      type: 'tactical',
      title: '边张优先拆解',
      situation: '第3巡，手牌整理阶段',
      handTiles: ['1万', '2万', '4万', '5万', '6万', '7万', '8万', '9万', '2条', '3条', '4条', '5筒', '5筒', '6筒'],
      riverTiles: ['东', '南', '白'],
      options: [
        {
          action: '打出1万',
          tiles: ['1万'],
          description: '拆除边张，保留中张搭子',
          riskLevel: 'low',
          expectedValue: 85
        },
        {
          action: '打出9万',
          tiles: ['9万'],
          description: '拆除边张，但破坏万子连续性',
          riskLevel: 'medium',
          expectedValue: 75
        },
        {
          action: '打出6筒',
          tiles: ['6筒'],
          description: '保留边张，拆除中张',
          riskLevel: 'high',
          expectedValue: 45
        },
        {
          action: '打出2条',
          tiles: ['2条'],
          description: '破坏条子顺子',
          riskLevel: 'high',
          expectedValue: 35
        }
      ],
      correct: 0,
      explanation: '根据"先拆边张，后拆中张"原则，1万是孤立边张，进张面最窄，应优先打出。保留中张搭子能最大化后续进张可能性。',
      relatedPrinciple: '先拆边张，后拆中张',
      difficulty: 'beginner',
      category: '拆搭技巧'
    },
    {
      id: 'scenario_2',
      type: 'defensive',
      title: '危险牌判断',
      situation: '第8巡，对手刚打出6万',
      handTiles: ['2万', '3万', '4万', '7万', '8万', '1条', '2条', '3条', '5条', '6条', '7条', '东', '东', '南'],
      riverTiles: ['1万', '9万', '1条', '9条', '2筒', '8筒'],
      options: [
        {
          action: '打出南',
          tiles: ['南'],
          description: '安全字牌，无风险',
          riskLevel: 'low',
          expectedValue: 90
        },
        {
          action: '打出7万',
          tiles: ['7万'],
          description: '可能被对手吃碰',
          riskLevel: 'medium',
          expectedValue: 60
        },
        {
          action: '打出5条',
          tiles: ['5条'],
          description: '中张危险牌',
          riskLevel: 'high',
          expectedValue: 30
        },
        {
          action: '打出1条',
          tiles: ['1条'],
          description: '破坏顺子但相对安全',
          riskLevel: 'medium',
          expectedValue: 55
        }
      ],
      correct: 0,
      explanation: '根据"防大放小"原则，在中后期应优先打出安全牌。南风是生张，且对手河牌显示在清理边张，此时字牌最安全。',
      relatedPrinciple: '防大放小，安全第一',
      difficulty: 'intermediate',
      category: '防守策略'
    },
    {
      id: 'scenario_3',
      type: 'scenario',
      title: '听牌选择',
      situation: '第12巡，即将听牌',
      handTiles: ['2万', '3万', '4万', '5万', '6万', '7万', '2条', '3条', '4条', '6条', '7条', '8条', '中', '中'],
      riverTiles: ['1万', '9万', '东', '南', '西', '北'],
      options: [
        {
          action: '打出2万听5万8万',
          tiles: ['2万'],
          description: '两面听牌，进张8张',
          riskLevel: 'low',
          expectedValue: 95
        },
        {
          action: '打出7万听5万',
          tiles: ['7万'],
          description: '单钓听牌，进张4张',
          riskLevel: 'medium',
          expectedValue: 70
        },
        {
          action: '打出6条听5条9条',
          tiles: ['6条'],
          description: '边张听牌，进张6张',
          riskLevel: 'medium',
          expectedValue: 75
        },
        {
          action: '打出中听中',
          tiles: ['中'],
          description: '对子听牌，进张2张',
          riskLevel: 'high',
          expectedValue: 40
        }
      ],
      correct: 0,
      explanation: '根据"好搭不拆，听牌要宽"原则，选择进张面最宽的听牌方式。两面听5万8万共8张牌，是最优选择。',
      relatedPrinciple: '好搭不拆，听牌要宽',
      difficulty: 'advanced',
      category: '听牌技巧'
    }
  ];

  // AI对手配置
  const aiOpponents: AIOpponent[] = [
    {
      id: 'aggressive_ai',
      name: '疾风剑豪',
      avatar: '⚔️',
      personality: 'aggressive',
      skillLevel: 1200,
      specialties: ['快速听牌', '高频吃碰', '压制战术'],
      description: '激进型AI，擅长快攻战术，适合练习防守技巧'
    },
    {
      id: 'conservative_ai',
      name: '稳健大师',
      avatar: '🛡️',
      personality: 'conservative',
      skillLevel: 1400,
      specialties: ['安全打法', '风险控制', '后期逆转'],
      description: '保守型AI，注重安全牌效，适合学习稳健策略'
    },
    {
      id: 'analytical_ai',
      name: '算牌专家',
      avatar: '🧠',
      personality: 'analytical',
      skillLevel: 1600,
      specialties: ['概率计算', '读牌精准', '最优决策'],
      description: '分析型AI，基于数学模型决策，适合高级训练'
    }
  ];

  const filteredQuestions = scenarioQuestions.filter(q => q.difficulty === selectedDifficulty);
  const currentQ = filteredQuestions[currentQuestion];

  // 模拟分析数据
  const mockAnalysisData: AnalysisData = {
    totalGames: 45,
    winRate: 67.8,
    avgDecisionTime: 8.5,
    strongPoints: ['拆搭技巧', '安全打法', '基础理论'],
    weakPoints: ['读牌能力', '听牌选择', '时机把握'],
    improvementSuggestions: [
      '加强对手牌河分析训练',
      '练习复杂听牌形态判断',
      '提升中后期决策速度'
    ],
    skillRadar: {
      offense: 75,
      defense: 85,
      reading: 60,
      timing: 70,
      calculation: 80
    }
  };

  // 事件处理函数
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

  const startBattle = (opponent: AIOpponent) => {
    setSelectedOpponent(opponent);
    setGameSession({
      id: `game_${Date.now()}`,
      opponent,
      rounds: 8,
      currentRound: 1,
      playerScore: 0,
      aiScore: 0,
      gameHistory: [],
      startTime: new Date()
    });
    setIsGameActive(true);
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

  const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
    }
  };

  const isQuizComplete = currentQuestion === filteredQuestions.length - 1 && showResult;

  // 主导航栏
  const renderModeSelector = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-t-4 border-green-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Target className="h-8 w-8 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">麻将实战训练系统</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveMode('scenario')}
          className={`p-6 rounded-xl border-2 transition-all ${
            activeMode === 'scenario'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Brain className="h-8 w-8 mx-auto mb-3 text-blue-600" />
          <h3 className="text-lg font-semibold mb-2">情景练习</h3>
          <p className="text-sm text-gray-600">口诀与实战结合的学习引擎</p>
        </button>
        
        <button
          onClick={() => setActiveMode('battle')}
          className={`p-6 rounded-xl border-2 transition-all ${
            activeMode === 'battle'
              ? 'border-red-500 bg-red-50 text-red-700'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Users className="h-8 w-8 mx-auto mb-3 text-red-600" />
          <h3 className="text-lg font-semibold mb-2">人机对战</h3>
          <p className="text-sm text-gray-600">拟真博弈环境与AI分层</p>
        </button>
        
        <button
          onClick={() => setActiveMode('analysis')}
          className={`p-6 rounded-xl border-2 transition-all ${
            activeMode === 'analysis'
              ? 'border-purple-500 bg-purple-50 text-purple-700'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <BarChart3 className="h-8 w-8 mx-auto mb-3 text-purple-600" />
          <h3 className="text-lg font-semibold mb-2">对战复盘</h3>
          <p className="text-sm text-gray-600">结构化分析与成长路径</p>
        </button>
      </div>
    </div>
  );

  // 情景练习模式
  const renderScenarioMode = () => {
    if (!currentQ) {
      return (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <Target className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">该难度下暂无练习题</p>
          <p className="text-gray-400">请选择其他难度</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* 控制面板 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
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
            <div className="text-sm text-gray-600">
              题目 {currentQuestion + 1} / {filteredQuestions.length} | 正确率: {answered.length > 0 ? Math.round((score / answered.length) * 100) : 0}%
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {isQuizComplete ? (
          // 完成界面
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
          // 题目界面
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* 题目信息 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getDifficultyColor(selectedDifficulty)} text-white`}>
                  {getDifficultyText(selectedDifficulty)}级
                </span>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {currentQ.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentQ.title}</h2>
              <p className="text-gray-600 mb-4">{currentQ.situation}</p>
              
              {/* 牌面展示 */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">手牌：</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentQ.handTiles.map((tile, index) => (
                      <span key={index} className="px-2 py-1 bg-white border rounded text-sm font-mono">
                        {tile}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">牌河：</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentQ.riverTiles.map((tile, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-200 border rounded text-sm font-mono">
                        {tile}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 选项 */}
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
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-blue-500 bg-blue-50'
                      : showResult && index === currentQ.correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-medium">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="font-medium">{option.action}</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getRiskColor(option.riskLevel)}`}>
                          {option.riskLevel === 'low' ? '低风险' : option.riskLevel === 'medium' ? '中风险' : '高风险'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 ml-9">{option.description}</p>
                      <p className="text-xs text-gray-500 ml-9 mt-1">期望值: {option.expectedValue}%</p>
                    </div>
                    {showResult && (
                      <div className="ml-4">
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

            {/* 解析 */}
            {showResult && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-800 mb-2">解析</h3>
                <p className="text-blue-700 mb-3">{currentQ.explanation}</p>
                <div className="bg-blue-100 rounded p-3">
                  <h4 className="text-sm font-medium text-blue-800 mb-1">相关口诀：</h4>
                  <p className="text-sm text-blue-700 font-mono">"{currentQ.relatedPrinciple}"</p>
                </div>
              </div>
            )}

            {/* 控制按钮 */}
            <div className="flex justify-between">
              <div>
                {currentQuestion > 0 && (
                  <button
                    onClick={() => {
                      setCurrentQuestion(Math.max(0, currentQuestion - 1));
                      setSelectedAnswer(null);
                      setShowResult(false);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    ← 上一题
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
                    {currentQuestion < filteredQuestions.length - 1 ? '下一题 →' : '查看结果'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 人机对战模式
  const renderBattleMode = () => (
    <div className="space-y-6">
      {!gameSession ? (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">选择对手</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiOpponents.map((opponent) => (
              <div key={opponent.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{opponent.avatar}</div>
                  <h3 className="text-lg font-semibold text-gray-800">{opponent.name}</h3>
                  <p className="text-sm text-gray-600">技能等级: {opponent.skillLevel}</p>
                </div>
                <p className="text-sm text-gray-600 mb-4">{opponent.description}</p>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">专长：</h4>
                  <div className="flex flex-wrap gap-1">
                    {opponent.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => startBattle(opponent)}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  开始对战
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">对战进行中</h2>
            <p className="text-gray-600 mb-6">正在与 {gameSession.opponent.name} 对战...</p>
            <div className="bg-gray-100 rounded-lg p-8 mb-6">
              <p className="text-gray-500">3D牌桌界面开发中...</p>
              <p className="text-sm text-gray-400 mt-2">将支持拖拽换张、实时对战等功能</p>
            </div>
            <button
              onClick={() => {
                setGameSession(null);
                setIsGameActive(false);
              }}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              结束对战
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // 分析模式
  const renderAnalysisMode = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">战绩分析</h2>
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="week">近一周</option>
            <option value="month">近一月</option>
            <option value="all">全部</option>
          </select>
        </div>
        
        {/* 核心指标 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <div className="text-2xl font-bold text-blue-800">{mockAnalysisData.totalGames}</div>
            <div className="text-sm text-blue-600">总对局数</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <div className="text-2xl font-bold text-green-800">{mockAnalysisData.winRate}%</div>
            <div className="text-sm text-green-600">胜率</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <Clock className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
            <div className="text-2xl font-bold text-yellow-800">{mockAnalysisData.avgDecisionTime}s</div>
            <div className="text-sm text-yellow-600">平均决策时间</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <Star className="h-8 w-8 mx-auto text-purple-600 mb-2" />
            <div className="text-2xl font-bold text-purple-800">B+</div>
            <div className="text-sm text-purple-600">综合评级</div>
          </div>
        </div>
        
        {/* 能力雷达图 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">能力分析</h3>
            <div className="space-y-3">
              {Object.entries(mockAnalysisData.skillRadar).map(([skill, value]) => {
                const skillNames = {
                  offense: '进攻能力',
                  defense: '防守能力', 
                  reading: '读牌能力',
                  timing: '时机把握',
                  calculation: '计算能力'
                };
                return (
                  <div key={skill} className="flex items-center">
                    <div className="w-20 text-sm text-gray-600">{skillNames[skill as keyof typeof skillNames]}</div>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-10 text-sm text-gray-800 font-medium">{value}</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">改进建议</h3>
            <div className="space-y-3">
              {mockAnalysisData.improvementSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start">
                  <Zap className="h-4 w-4 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{suggestion}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-800 mb-3">优势领域</h4>
              <div className="flex flex-wrap gap-2">
                {mockAnalysisData.strongPoints.map((point, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {point}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-md font-medium text-gray-800 mb-3">待提升领域</h4>
              <div className="flex flex-wrap gap-2">
                {mockAnalysisData.weakPoints.map((point, index) => (
                  <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    {point}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {renderModeSelector()}
      
      {activeMode === 'scenario' && renderScenarioMode()}
      {activeMode === 'battle' && renderBattleMode()}
      {activeMode === 'analysis' && renderAnalysisMode()}
      
      {/* 底部提示 */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-l-4 border-green-500">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 系统特色</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div>
            <strong>情景练习：</strong>基于经典口诀的实战训练，即时反馈与解析
          </div>
          <div>
            <strong>人机对战：</strong>多层次AI对手，模拟真实对局环境
          </div>
          <div>
            <strong>数据复盘：</strong>深度分析决策过程，个性化改进建议
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;