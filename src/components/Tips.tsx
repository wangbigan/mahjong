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
    // 前期技巧
    {
      id: '1',
      title: '开局舍牌',
      category: '前期技巧',
      content: '字牌先出，幺九次之，中张保留',
      rhyme: '先舍风箭后舍边，中张留到最关键',
      explanation: '开局前几轮，优先舍弃字牌（东南西北中发白）和幺九边张（1、9等边路牌），这类牌组合成顺子的概率低，且易被对手碰杠。保留中张牌（如3-7的万、条、筒），因其更容易凑成顺子或搭子。',
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: '三巡观察',
      category: '前期技巧',
      content: '前三轮摸牌判断牌势',
      rhyme: '三巡不摸风，杠上易开花',
      explanation: '如果前三轮未摸到需要的字牌或边张，说明这类牌可能已被对手扣住或成对，此时需果断调整策略，转向中张牌型发展。同时，留意对手舍牌规律。',
      difficulty: 'beginner'
    },
    {
      id: '3',
      title: '金三银七',
      category: '前期技巧',
      content: '保留3、7中张牌',
      rhyme: '金三银七臭二八，宁缺东三省，不打边三饼',
      explanation: '3、7是顺子核心（可连1-5或5-9），价值高于2、8等边张。',
      difficulty: 'beginner'
    },
    {
      id: '4',
      title: '搭子管理',
      category: '前期技巧',
      content: '按对子数量拆搭',
      rhyme: '一对定将，两对拆搭，三对拆对，四对必碰',
      explanation: '一对时保留作将牌；两对时拆多余搭子；三对拆一对；四对优先碰牌加速听牌。',
      difficulty: 'beginner'
    },
    {
      id: '5',
      title: '听牌基本',
      category: '前期技巧',
      content: '优先两头听，避免单钓将',
      rhyme: '两头好，卡张难，单钓将，要耐心',
      explanation: '两头听（如听4万时，3万和5万均可胡）胜率最高（8张机会），单钓将仅剩4张牌需耐心。',
      difficulty: 'beginner'
    },
    // 中期技巧
    {
      id: '6',
      title: '碰牌策略',
      category: '中期技巧',
      content: '权衡碰牌与摸牌的利弊',
      rhyme: '上碰下自摸，牌从门前过',
      explanation: '碰牌虽能加速手牌成型，但过度碰牌会暴露牌型，让对手提前防备。中盘阶段，若碰牌后难以快速听牌，反而会陷入被动。需权衡是"碰牌抢快"还是"摸牌求稳"。',
      difficulty: 'intermediate'
    },
    {
      id: '7',
      title: '听牌选择',
      category: '中期技巧',
      content: '听熟张避生张',
      rhyme: '听牌听熟张，生张是炸弹',
      explanation: '听牌时优先选择"熟张"（牌池中已出现过的牌），尤其是中后期，生张极可能是对手扣住的危险牌。若被迫听生张，需观察对手是否已进入听牌状态。',
      difficulty: 'intermediate'
    },
    {
      id: '8',
      title: '快听策略',
      category: '中期技巧',
      content: '快速听牌，减少贪大',
      rhyme: '快听牌，稳胡牌，不贪大，求稳妥',
      explanation: '早听牌多摸牌机会，但避免强求清一色等高危牌型。',
      difficulty: 'intermediate'
    },
    {
      id: '9',
      title: '多面听牌',
      category: '中期技巧',
      content: '听牌选多面听＞单钓',
      rhyme: '听牌多口胜单吊，三门不靠易放炮',
      explanation: '三面听（如2-3-4-5万听1/4/7万）胡牌机会12张，效率远超单钓。',
      difficulty: 'intermediate'
    },
    {
      id: '10',
      title: '读三家牌',
      category: '中期技巧',
      content: '观察对手舍牌推测手牌',
      rhyme: '他打一万我不碰，三四万里有文章；两圈不见幺九张，对子刻子手中藏',
      explanation: '下家舍1万时，警惕其握3/4万；两圈未出幺九牌，大概率被对手扣住成对/刻。',
      difficulty: 'intermediate'
    },
    {
      id: '11',
      title: '牌旺策略',
      category: '中期技巧',
      content: '顺风局连庄，逆风弃庄',
      rhyme: '牌旺坐庄要连庄，牌弱弃庄别硬撑',
      explanation: '手气旺时争取连庄叠加番数；牌弱时及时止损。',
      difficulty: 'intermediate'
    },
    // 后期技巧
    {
      id: '12',
      title: '终局金三银七',
      category: '后期技巧',
      content: '终局阶段3、7的战略价值',
      rhyme: '金三银七，生死一线间',
      explanation: '数字3和7在麻将中被称为"金三银七"，因为它们能连接1-5和5-9的顺子，战略价值极高。终局阶段，若对手舍出3或7，往往意味着其手牌已成型，需警惕其是否听牌。',
      difficulty: 'advanced'
    },
    {
      id: '13',
      title: '终局防守',
      category: '后期技巧',
      content: '优先舍幺九字牌，扣中张',
      rhyme: '先跑一九，再跑字牌，最后跑中张',
      explanation: '当牌局进入尾声，若判断自己难以胡牌，首要目标是"避炮"。按照"幺九→字牌→中张"的顺序舍牌，因幺九和字牌的成牌概率更低，相对安全。',
      difficulty: 'intermediate'
    },
    {
      id: '14',
      title: '八断九不见',
      category: '后期技巧',
      content: '警惕断张牌风险',
      rhyme: '八断九不见，必定有戏看；先打九后打八，紧防四七把把抓',
      explanation: '八筒断张（四张现尽）而九筒未现时，对手可能握九筒对子或刻子，打4/7筒易点炮。',
      difficulty: 'advanced'
    },
    {
      id: '15',
      title: '拆搭原则',
      category: '后期技巧',
      content: '拆低效搭子保进张',
      rhyme: '拆边不拆卡，丢张最少化',
      explanation: '优先拆边搭（1-2或8-9），保留卡张（如4-6听5）和中张搭（3-5）。',
      difficulty: 'advanced'
    },
    {
      id: '16',
      title: '生死张陷阱',
      category: '后期技巧',
      content: '故意打半危险牌诱导对手',
      rhyme: '生死张里藏陷阱，终局摸打反逻辑',
      explanation: '终局阶段打出生张诱使对手跟打，破坏其听牌节奏。',
      difficulty: 'advanced'
    },
    // 心理技巧
    {
      id: '17',
      title: '牌烂心不烂',
      category: '心理技巧',
      content: '烂牌防守，心态至上',
      rhyme: '牌烂未必输，心乱一定输；输赢不显面，逆风稳如钟',
      explanation: '烂牌时扣住危险张喂小牌家，避免点炮大牌；心态崩溃必输。',
      difficulty: 'intermediate'
    },
    {
      id: '18',
      title: '逆风稳进',
      category: '心理技巧',
      content: '逆风局减少碰牌',
      rhyme: '人旺不乱碰，宁弃不助攻',
      explanation: '对手手气旺时，少碰牌避免助其摸牌提速。',
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