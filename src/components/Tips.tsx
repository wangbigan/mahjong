import React, { useState } from 'react';
import { Lightbulb, Star, BookOpen, Target } from 'lucide-react';

interface Tip {
  id: string;
  title: string;
  category: string;
  content: string;
  rhyme: string;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const Tips: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedDifficulty, setSelectedDifficulty] = useState('全部');

  const tips: Tip[] = [
    {
      id: '1',
      title: '听牌基本口诀',
      category: '基础技巧',
      content: '两头听、卡张听、单钓听',
      rhyme: '两头好，卡张难，单钓将，要耐心',
      explanation: '两头听胜率最高，卡张听次之，单钓将需要耐心等待。优先选择两头听的牌型。',
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: '舍牌顺序',
      category: '基础技巧',
      content: '字牌先出，幺九次之',
      rhyme: '风箭先走，幺九随后，中间留着，组顺有望',
      explanation: '字牌最难组合，优先打出；一九牌组合面窄；中间牌容易组成顺子。',
      difficulty: 'beginner'
    },
    {
      id: '3',
      title: '防守基本',
      category: '防守技巧',
      content: '观察舍牌，推测手牌',
      rhyme: '他打一万我不碰，三四万里有文章',
      explanation: '观察对手舍牌规律，推测其手牌构成，避免点炮。',
      difficulty: 'intermediate'
    },
    {
      id: '4',
      title: '进攻时机',
      category: '进攻技巧',
      content: '听牌要快，胡牌要稳',
      rhyme: '快听牌，稳胡牌，不贪大，求稳妥',
      explanation: '尽快进入听牌状态，但胡牌时要确保安全，不要为了大牌型而冒险。',
      difficulty: 'intermediate'
    },
    {
      id: '5',
      title: '牌型选择',
      category: '基础技巧',
      content: '平胡为主，特殊为辅',
      rhyme: '平胡易成功，特殊要谨慎，七对要配对，清色需时间',
      explanation: '基础胡牌容易达成，特殊牌型风险较大，要根据起手牌合理选择。',
      difficulty: 'beginner'
    },
    {
      id: '6',
      title: '读牌技巧',
      category: '高级技巧',
      content: '数牌记忆，推理分析',
      rhyme: '四张出三看一张，两张出一要小心',
      explanation: '记住已出现的牌，推测剩余牌的分布，判断对手可能的牌型。',
      difficulty: 'advanced'
    },
    {
      id: '7',
      title: '做牌策略',
      category: '高级技巧',
      content: '根据起手牌确定方向',
      rhyme: '对子多了做七对，一色多了清一色，平均分布走平胡',
      explanation: '分析起手牌特点，选择最适合的牌型方向，提高成功率。',
      difficulty: 'advanced'
    },
    {
      id: '8',
      title: '心理战术',
      category: '心理技巧',
      content: '保持冷静，控制情绪',
      rhyme: '胜不骄来败不馁，平常心态最重要',
      explanation: '保持良好心态，不被胜负影响判断，理性分析每一步。',
      difficulty: 'intermediate'
    }
  ];

  const categories = ['全部', ...Array.from(new Set(tips.map(tip => tip.category)))];
  const difficulties = ['全部', '新手', '进阶', '高级'];

  const filteredTips = tips.filter(tip => {
    const matchesCategory = selectedCategory === '全部' || tip.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === '全部' || 
      (selectedDifficulty === '新手' && tip.difficulty === 'beginner') ||
      (selectedDifficulty === '进阶' && tip.difficulty === 'intermediate') ||
      (selectedDifficulty === '高级' && tip.difficulty === 'advanced');
    return matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '新手';
      case 'intermediate': return '进阶';
      case 'advanced': return '高级';
      default: return '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-t-4 border-yellow-500">
        <div className="flex items-center mb-6">
          <Lightbulb className="h-8 w-8 text-yellow-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">实用口诀</h1>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          麻将口诀是前辈总结的宝贵经验，通过朗朗上口的韵律帮助记忆重要技巧。
          这些口诀简单易记，实战性强，是提升麻将水平的捷径。
        </p>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">分类筛选</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">难度筛选</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTips.map((tip) => (
          <div key={tip.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">{tip.title}</h3>
              </div>
              <div className="flex gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {tip.category}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(tip.difficulty)}`}>
                  {getDifficultyText(tip.difficulty)}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                <div className="flex items-center mb-2">
                  <BookOpen className="h-4 w-4 text-yellow-600 mr-2" />
                  <span className="text-sm font-medium text-yellow-800">口诀</span>
                </div>
                <p className="text-yellow-700 font-medium text-lg leading-relaxed">
                  {tip.rhyme}
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <Target className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">要点</span>
                </div>
                <p className="text-gray-600">{tip.content}</p>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">详细解释</div>
                <p className="text-gray-600 text-sm leading-relaxed">{tip.explanation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <Lightbulb className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">没有找到符合条件的口诀</p>
          <p className="text-gray-400">请尝试调整筛选条件</p>
        </div>
      )}

      <div className="mt-8 bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">学习建议</h3>
        <ul className="text-yellow-700 space-y-2">
          <li>• 先熟记基础口诀，在实战中反复运用</li>
          <li>• 理解口诀背后的道理，不要死记硬背</li>
          <li>• 根据个人水平循序渐进，从新手级开始</li>
          <li>• 结合实际牌局验证口诀的实用性</li>
        </ul>
      </div>
    </div>
  );
};

export default Tips;