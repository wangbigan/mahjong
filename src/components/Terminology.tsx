import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';

interface Term {
  term: string;
  category: string;
  definition: string;
  example?: string;
}

const Terminology: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const terms: Term[] = [
    // 基础术语
    { term: '胡牌', category: '基础术语', definition: '达成获胜条件，完成一局游戏', example: '我胡了！' },
    { term: '摸牌', category: '基础术语', definition: '从牌墙中取一张牌到手中' },
    { term: '打牌', category: '基础术语', definition: '将手中的牌丢弃到桌面中央' },
    { term: '吃牌', category: '基础术语', definition: '利用上家打出的牌组成顺子', example: '吃上家的五万，组成四五六万' },
    { term: '碰牌', category: '基础术语', definition: '利用任意一家打出的牌组成刻子', example: '碰三筒，亮出三张三筒' },
    { term: '杠牌', category: '基础术语', definition: '四张相同的牌组成杠，分为明杠（利用别人打出的牌组成杠）、暗杠（自己摸齐四张牌组成杠）、或补杠（先前碰牌后，再从手牌中摸到第四张牌组成杠）' },
    
    // 牌型术语
    { term: '顺子', category: '牌型术语', definition: '三张连续数字的同花色牌', example: '一二三万、四五六条' },
    { term: '刻子', category: '牌型术语', definition: '三张相同的牌', example: '三张五筒' },
    { term: '将牌', category: '牌型术语', definition: '胡牌时必须的一对相同牌，也叫“将对”或“雀头”' },
    { term: '小七对', category: '牌型术语', definition: '七个对子组成的特殊胡牌牌型' },
    { term: '幺九牌', category: '牌型术语', definition: '指一万、九万、一条、九条、一筒、九筒以及所有字牌（东南西北中发白）', example: '一万、九万、东风、中等都是幺九牌' },
    { term: '十三幺', category: '牌型术语', definition: '由13种幺九牌组成的特殊胡牌牌型' },
    { term: '清一色', category: '牌型术语', definition: '全部由同一种花色组成的牌型' },
    { term: '缺一门', category: '牌型术语', definition: '手牌中缺少万、条、筒三种花色中的任意一种', example: '手中只有万和条，没有筒子' },
    { term: '平胡', category: '牌型术语', definition: '最基本的胡牌牌型，由四个顺子（或刻子）加一对将牌组成', example: '一二三万、四五六条、七八九筒、二二二万、五五筒' },
    { term: '鸡胡', category: '牌型术语', definition: '没有任何特殊牌型的普通胡牌，通常指最低番数的胡牌', example: '只有基本胡牌，无其他加番' },
    
    // 游戏术语
    { term: '庄家', category: '游戏术语', definition: '每局游戏的主导者，先出牌的人' },
    { term: '闲家', category: '游戏术语', definition: '除庄家外的其他三位玩家' },
    { term: '听牌', category: '游戏术语', definition: '只差一张牌就能胡牌的状态，有的地方也称“叫牌”' },
    { term: '流局', category: '游戏术语', definition: '牌墙摸完仍无人胡牌，本局结束' },
    { term: '连庄', category: '游戏术语', definition: '庄家胡牌或流局时继续做庄' },
    { term: '起手牌', category: '游戏术语', definition: '游戏开始时每位玩家分到的初始手牌', example: '通常为13张牌' },
    { term: '门清', category: '游戏术语', definition: '没有吃、碰、明杠的纯手牌状态', example: '保持门清可以增加某些牌型的番数' },
    
    // 计分术语
    { term: '番', category: '计分术语', definition: '麻将的计分单位，用于计算胡牌价值' },
    { term: '自摸', category: '计分术语', definition: '自己摸到胡牌的牌', example: '自摸加番' },
    { term: '点炮', category: '计分术语', definition: '打出的牌让别人胡了，也叫放炮' },
    { term: '接炮', category: '计分术语', definition: '胡别人打出的牌' },
    { term: '包牌', category: '计分术语', definition: '某玩家承担另一玩家的胡牌费用' },
  ];

  const categories = ['全部', ...Array.from(new Set(terms.map(term => term.category)))];

  const filteredTerms = useMemo(() => {
    return terms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '全部' || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-t-4 border-purple-500">
        <div className="flex items-center mb-6">
          <BookOpen className="h-8 w-8 text-purple-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">麻将术语大全</h1>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          这里收录了麻将中的常用术语和专业词汇，支持搜索和分类筛选，帮助你快速理解麻将语言。
        </p>
        
        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="搜索术语或定义..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-4 text-sm text-gray-600">
          找到 {filteredTerms.length} 个相关术语
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTerms.map((term, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{term.term}</h3>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  {term.category}
                </span>
              </div>
              <p className="text-gray-600 mb-2 leading-relaxed">{term.definition}</p>
              {term.example && (
                <div className="bg-gray-50 rounded p-2">
                  <span className="text-sm text-gray-500">示例：</span>
                  <span className="text-sm text-gray-700 italic">{term.example}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-500 text-lg">没有找到相关术语</p>
            <p className="text-gray-400">请尝试其他搜索词或选择不同的分类</p>
          </div>
        )}
      </div>

      <div className="mt-8 bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
        <h3 className="text-lg font-semibold text-purple-800 mb-3">使用提示</h3>
        <ul className="text-purple-700 space-y-2">
          <li>• 可以通过术语名称或定义内容进行搜索</li>
          <li>• 使用分类筛选可以快速找到特定类型的术语</li>
          <li>• 建议先掌握基础术语，再学习高级概念</li>
        </ul>
      </div>
    </div>
  );
};

export default Terminology;