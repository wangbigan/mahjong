import React, { useState } from 'react';
import { ChevronRight, ChevronDown, BookOpen } from 'lucide-react';

const BasicRules: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('basics');

  const rulesSections = [
    {
      id: 'basics',
      title: '麻将基础知识',
      content: [
        {
          subtitle: '麻将牌的组成',
          description: '标准麻将共144张牌，包括：',
          details: [
            '万子牌：一万到九万，各4张，共36张',
            '条子牌：一条到九条，各4张，共36张',
            '筒子牌：一筒到九筒，各4张，共36张',
            '字牌：东南西北中发白，各4张，共28张',
            '花牌：春夏秋冬梅兰竹菊，各1张，共8张（部分地区使用）'
          ]
        }
      ]
    },
    {
      id: 'gameplay',
      title: '游戏流程',
      content: [
        {
          subtitle: '基本流程',
          description: '麻将游戏的基本步骤：',
          details: [
            '1. 洗牌：将144张牌洗混',
            '2. 码牌：每人面前码成18墩，共36张牌',
            '3. 开门：掷骰子决定起手位置',
            '4. 配牌：每人取13张牌作为起手牌',
            '5. 打牌：轮流摸牌、打牌，直到有人胡牌'
          ]
        }
      ]
    },
    {
      id: 'combinations',
      title: '牌型组合',
      content: [
        {
          subtitle: '基本牌型',
          description: '麻将的基本牌型组合：',
          details: [
            '顺子：三张连续的同花色牌（如：一二三万）',
            '刻子：三张相同的牌（如：三张五筒）',
            '杠：四张相同的牌',
            '对子：两张相同的牌',
            '胡牌牌型：4副顺子/刻子 + 1对将牌'
          ]
        }
      ]
    },
    {
      id: 'winning',
      title: '胡牌条件',
      content: [
        {
          subtitle: '基本胡牌',
          description: '达成胡牌的基本条件：',
          details: [
            '14张牌组成：4副顺子或刻子 + 1对将牌',
            '特殊胡牌：七对子、十三幺等',
            '起胡番数：满足最低番数要求（通常2番以上）',
            '胡牌方式：自摸（自己摸到）或接炮（别人打出）'
          ]
        }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-t-4 border-green-500">
        <div className="flex items-center mb-6">
          <BookOpen className="h-8 w-8 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">麻将基础规则</h1>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">
          欢迎来到麻将基础规则学习页面。这里将详细介绍麻将的基本知识、游戏流程、牌型组合和胡牌条件，
          帮助你从零开始掌握麻将的精髓。
        </p>
      </div>

      <div className="space-y-4">
        {rulesSections.map((section) => (
          <div key={section.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
              {expandedSection === section.id ? (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {expandedSection === section.id && (
              <div className="px-6 pb-6 border-t border-gray-100">
                {section.content.map((item, index) => (
                  <div key={index} className="py-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">{item.subtitle}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <ul className="space-y-2">
                      {item.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
        <h3 className="text-lg font-semibold text-green-800 mb-3">学习提示</h3>
        <p className="text-green-700">
          麻将规则看似复杂，但掌握基本概念后就会变得简单。建议先理解牌型组合，再学习具体的胡牌条件。
          多看多练，很快就能上手！
        </p>
      </div>
    </div>
  );
};

export default BasicRules;