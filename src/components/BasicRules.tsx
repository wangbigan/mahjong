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
            '字牌：东南西北（风牌），中发白（箭牌），各4张，共28张',
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
          details: [
            '1. 洗牌：将全部牌洗混',
            '2. 码牌：每人面前码成18墩，共36张牌，没有花牌的是17墩34张牌',
            '3. 开门：掷骰子决定起手位置',
            '4. 配牌：每人取13张牌作为起手牌',
            '5. 打牌：轮流摸牌、打牌，直到有人胡牌'
          ]
        },
        {
          subtitle: '开门配牌详解',
          details: [
            '掷骰子：庄家掷两个骰子，点数之和决定开门位置',
            '确定开门方向：从庄家开始按逆时针方向数，数到骰子点数对应的玩家',
            '开门位置：该玩家面前的牌墙作为开门位置',
            '开门墩数：两个骰子中，小点数确定开门的具体位置，比如骰子数为3和5，则跳过3墩，从第4墩开始',
            '配牌顺序：从开门位置开始，庄家先取，按逆时针轮流取牌，每次2墩（4张）',
            '补牌规则：每人取12张后，再继续各取一张，确保每人13张手牌，然后由庄家开始摸牌、打牌。（实际操作过程中，补牌时庄稼直接补两张牌，第二张牌跳过3张牌，也是一样）',
            '花牌处理：如有花牌需要补花，从牌墙末尾补取相应数量的牌'
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
          subtitle: '基本胡牌条件',
          details: [
            '14张牌组成：4副顺子或刻子 + 1对将牌',
            '起胡番数：满足最低番数要求（通常1番以上）',
            '胡牌方式：自摸（自己摸到）或接炮（别人打出）',
            '听牌状态：手牌只差一张就能胡牌'
          ]
        },
        {
          subtitle: '1番牌型',
          details: [
            '平胡：4副顺子或刻子 + 1对将牌的基本牌型',
            '断幺九：牌型中不含1、9和字牌',
            '一般高：两副相同的顺子',
            '连六：一种花色的六张连续牌',
            '老少副：一种花色的123和789两副顺子',
            '幺九刻：由1、9或字牌组成的刻子'
          ]
        },
        {
          subtitle: '2番牌型',
          details: [
            '七对子：七个不同的对子',
            '混一色：由一种花色加字牌组成',
            '全求人：全靠吃、碰、杠别人的牌胡牌',
            '双暗刻：两个暗刻（未碰出的刻子）',
            '暗杠：四张相同牌未亮出的杠',
            '断幺：牌型中不含幺九牌'
          ]
        },
        {
          subtitle: '4番牌型',
          details: [
            '碰碰胡：四副刻子加一对将牌',
            '混幺九：每副牌都含有幺九牌',
            '三暗刻：三个暗刻',
            '小三元：中发白三张字牌，其中两副刻子一对将',
            '双箭刻：中发白中的两副刻子'
          ]
        },
        {
          subtitle: '6番牌型',
          details: [
            '清一色：全部由同一种花色组成',
            '三色同顺：万条筒各有一副相同数字的顺子',
            '一气通贯：一种花色的123、456、789三副顺子',
            '全大：全部由789组成的牌型',
            '全中：全部由456组成的牌型',
            '全小：全部由123组成的牌型'
          ]
        },
        {
          subtitle: '8番及以上牌型',
          details: [
            '大三元：中发白三副刻子（8番）',
            '小四喜：东南西北三副刻子一对将（8番）',
            '清幺九：全部由幺九牌组成（24番）',
            '四暗刻：四个暗刻（满贯）',
            '大四喜：东南西北四副刻子（满贯）',
            '十三幺：13种幺九牌各一张加其中一种的对子（满贯）',
            '九莲宝灯：一种花色的1112345678999（满贯）'
          ]
        },
        {
          subtitle: '特殊胡牌',
          details: [
            '天胡：庄家起手14张牌即胡牌（满贯）',
            '地胡：闲家第一轮摸牌即胡牌（满贯）',
            '海底捞月：最后一张牌自摸胡牌（+1番）',
            '河底捞鱼：最后一张牌接炮胡牌（+1番）',
            '抢杠胡：抢别人补杠的牌胡牌（+1番）',
            '岭上开花：杠牌后摸到的牌胡牌（+1番）'
          ]
        }
      ]
    },
    {
      id: 'scoring',
      title: '番倍规则',
      content: [
        {
          subtitle: '番数计算',
          description: '麻将的番数决定了胡牌的价值，常见番数规则：',
          details: [
            '1番：平胡、断幺九、一般高等基础牌型',
            '2番：小七对、混一色、全求人等',
            '3番：混幺九、全带幺等',
            '4番：碰碰胡、全不靠等',
            '6番：清一色、三色同顺等',
            '8番：大三元、小四喜等',
            '满贯：役满牌型，如国士无双、四暗刻等'
          ]
        },
        {
          subtitle: '倍数规则',
          description: '根据番数计算实际得分倍数：',
          details: [
            '1-2番：基础倍数，通常为1-2倍',
            '3-4番：中等倍数，通常为4-8倍',
            '5-7番：高倍数，通常为16-32倍',
            '8番以上：满贯，固定高倍数',
            '自摸加番：自己摸牌胡牌额外加1番',
            '门前清：不吃不碰不明杠额外加1番'
          ]
        },
        {
          subtitle: '特殊加番',
          description: '特定情况下的额外加番：',
          details: [
            '花牌：每张花牌加1番（部分规则）',
            '杠牌：每个杠子加1番',
            '海底捞月：最后一张牌自摸加1番',
            '河底捞鱼：最后一张牌接炮加1番',
            '抢杠：抢别人的杠胡牌加1番',
            '岭上开花：杠牌后摸到的牌胡牌加1番'
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