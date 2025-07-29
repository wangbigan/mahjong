import React, { useState } from 'react';
import { MapPin, Users, Trophy, Info } from 'lucide-react';

interface RegionRule {
  name: string;
  description: string;
  details: string[];
}

interface Region {
  id: string;
  name: string;
  description: string;
  color: string;
  rules: RegionRule[];
}

const RegionalDifferences: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('yunnan');

  const regions: Region[] = [
    {
      id: 'yunnan',
      name: '云南麻将',
      description: '杠上花开局，翻尾牌预判、杠牌联动、自摸强制性',
      color: 'from-green-500 to-green-600',
      rules: [
        {
          name: '核心规则（玉溪基础版）',
          description: '云南麻将的基础玩法',
          details: [
            '牌数：136张（万/条/筒+字牌），无花牌',
            '禁止吃牌：只能碰、杠',
            '尾牌机制：开局预翻牌墙末尾两张，用于“杠上花”预判',
            '平胡强制自摸：基础牌型必须自摸，大牌型可点炮',
            '终局强制胡：剩余4张牌时，点炮或自摸都必须胡'
          ]
        },
        {
          name: '地区特色变体',
          description: '不同地区的特色玩法',
          details: [
            '曲靖麻将：幺鸡（1条）为万能牌，有特殊的烂牌胡法',
            '西双版纳：引入花牌系统，花牌可加番',
            '玉溪/楚雄：听5筒或6筒时，有杠牌自动触发“杠上花”',
            '丽江麻将：听牌必须声明（“站着胡”），卡五胡牌翻倍',
            '昆明麻将：庄家连庄胡牌番数会累计增加（“飞庄”）'
          ]
        },
        {
          name: '战术逻辑与禁忌',
          description: '取胜的关键策略',
          details: [
            '激情原则：打法要积极，避免过于保守',
            '节奏控制：运势不佳时，主动打乱对手节奏',
            '尾牌预判：根据翻开的尾牌规划杠牌策略',
            '防守优先：限制对手碰杠，尤其封锁关键牌（如5/6筒）',
            '禁忌：不可弃先胡后，终局（剩4张）时谨慎杠牌'
          ]
        }
      ]
    },
    {
      id: 'sichuan',
      name: '四川麻将',
      description: '四川地区特有玩法，以血战到底、刮风下雨、定缺门为核心特色',
      color: 'from-orange-500 to-orange-600',
      rules: [
        {
          name: '核心规则与玩法',
          description: '四川麻将的基础规则体系',
          details: [
            '牌数：108张（仅筒、条、万），无字牌、花牌',
            '定缺门：开局必须选择一门花色打缺，否则为“花猪”',
            '不可吃牌：只能进行碰、杠操作',
            '血战到底：一家胡牌后牌局继续，直到三家胡牌或流局',
            '刮风下雨：杠牌有额外计分，直杠（刮风）1倍，暗杠（下雨）2倍'
          ]
        },
        {
          name: '番型与计分',
          description: '主要的番型和计分方式',
          details: [
            '基础番型：平胡（1番）、对对胡（2番）',
            '大牌番型：清一色（4番）、带幺九（4番）、七对（4番）、龙七对（8番）',
            '叠加番：根（+1番）、杠上花（+1番）、抢杠胡（+1番）',
            '点炮者独付，自摸三家分摊，番数有封顶限制（通常5或8番）'
          ]
        },
        {
          name: '战术逻辑与文化',
          description: '取胜策略与文化影响',
          details: [
            '攻势优先：快速打缺、尽早听牌，利用查叫规则施压',
            '尊杠策略：多留对子以求杠牌，增加收益',
            '血战博弈：先胡未必是最终赢家，需根据场上局势调整策略',
            '文化符号：术语民俗化，是重要的社交和年俗活动',
            '竞技地位：2016年成为国际麻将联盟认证的三大竞技麻将之一'
          ]
        }
      ]
    },
    {
      id: 'guangdong',
      name: '广东麻将',
      description: '流行于岭南地区，以鸡平胡为核心，规则多样，注重博弈',
      color: 'from-red-500 to-red-600',
      rules: [
        {
          name: '核心规则与玩法',
          description: '主流鸡平胡派系规则',
          details: [
            '牌数：136张（筒/条/万+字牌），无花牌',
            '可吃牌：下家可吃上家打出的牌，但碰/杠优先',
            '爆胡（封顶）：通常3番封顶，大牌型（如清一色）按3番计，特殊牌型（十三幺）除外',
            '一炮多响：一张点炮牌可被多家胡，点炮者需分别赔付',
            '买马：胡牌后摸指定牌（马牌）定输赢，增加随机性'
          ]
        },
        {
          name: '番种体系与计分',
          description: '主要的番型和计分方式',
          details: [
            '鸡胡（1番）：基础牌型，无特殊要求，部分规则限自摸',
            '碰碰胡（2番）：全为刻子',
            '混一色（2番）：一种花色+字牌',
            '清一色（4番）：仅一种花色',
            '十三幺（∞）：集齐特定幺九牌与字牌，番数突破封顶',
            '附加番：杠上开花、海底捞月、自摸等均可+1番'
          ]
        },
        {
          name: '派系差异与战术',
          description: '不同玩法与策略',
          details: [
            '鸡平胡 vs 推倒胡：鸡平胡可吃牌，节奏慢；推倒胡不可吃，节奏快',
            '速听逼爆：快速听牌，利用爆胡规则限制对手大牌',
            '终局防守：牌局末期谨慎出牌，避免点大炮',
            '文化符号：二筒称“眼镜”，一索为“小鸟”，是重要的社交娱乐方式'
          ]
        }
      ]
    },
    {
      id: 'guizhou',
      name: '贵州麻将（捉鸡）',
      description: '以“捉鸡”和“豆”为核心，玩法刺激，极具地方特色的麻将',
      color: 'from-blue-500 to-blue-600',
      rules: [
        {
          name: '核心机制：捉鸡与豆',
          description: '游戏最核心的计分与玩法系统',
          details: [
            '捉鸡：胡牌后翻牌确定“鸡”，手中有“鸡”即可加分。幺鸡、八筒为特殊“常鸡”',
            '金鸡：翻出的鸡牌是常鸡，则分数翻倍',
            '冲锋鸡：开局首张打出的幺鸡/八筒，结算时翻倍',
            '豆（杠）：杠牌即为“豆”，是平胡点炮的“通行证”，每个豆独立计分'
          ]
        },
        {
          name: '基础规则与胡牌',
          description: '游戏的基本流程与胡牌条件',
          details: [
            '牌数：108张（万/筒/条），无字牌、花牌',
            '不可吃牌：规则与四川麻将相似，只能碰、杠',
            '平胡限制：平胡点炮必须有“豆”，否则只能自摸',
            '大牌型：大对子、清一色、七对等牌型无“豆”也可点炮',
            '报听：可选择报听，报听后不可换牌，增加博弈性'
          ]
        },
        {
          name: '计分与战术',
          description: '结算方式与取胜策略',
          details: [
            '总分 = (牌型分 + 鸡分 + 豆分) × 倍数',
            '责任鸡：首张幺鸡被打出被碰/杠，打出者需向碰/杠者赔付',
            '抢杠胡：抢他人补杠的牌胡牌，被抢者豆分无效',
            '战术核心：优先碰牌求豆，尽早打出幺鸡/八筒争夺冲锋鸡'
          ]
        }
      ]
    }
  ];

  const selectedRegionData = regions.find(r => r.id === selectedRegion) || regions[0];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-t-4 border-orange-500">
        <div className="flex items-center mb-6">
          <MapPin className="h-8 w-8 text-orange-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">地区差异</h1>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">
          不同地区的麻将规则各有特色，了解这些差异有助于你在不同场合都能游刃有余。
          下面详细介绍各地区麻将的特点和规则差异。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Region Selector */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-4 sticky top-4">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              选择地区
            </h2>
            <div className="space-y-2">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedRegion === region.id
                      ? 'bg-orange-100 text-orange-800 font-medium border-l-4 border-orange-500'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Region Details */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className={`bg-gradient-to-r ${selectedRegionData.color} p-6 text-white`}>
              <h2 className="text-2xl font-bold mb-2">{selectedRegionData.name}</h2>
              <p className="text-white/90">{selectedRegionData.description}</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {selectedRegionData.rules.map((rule, index) => (
                  <div key={index} className="border-l-4 border-gray-200 pl-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-orange-500" />
                      {rule.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{rule.description}</p>
                    <ul className="space-y-2">
                      {rule.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <Info className="h-5 w-5 mr-2 text-orange-500" />
          主要差异对比
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">特征</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">云南麻将</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">四川麻将</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">广东麻将</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">贵州麻将</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">牌数</td>
                <td className="py-3 px-4 text-center">136张</td>
                <td className="py-3 px-4 text-center">108张</td>
                <td className="py-3 px-4 text-center">108张</td>
                <td className="py-3 px-4 text-center">108张</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">字牌</td>
                <td className="py-3 px-4 text-center">无</td>
                <td className="py-3 px-4 text-center">无/有</td>
                <td className="py-3 px-4 text-center">无</td>
                <td className="py-3 px-4 text-center">有</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">起手牌数</td>
                <td className="py-3 px-4 text-center">13张</td>
                <td className="py-3 px-4 text-center">13张</td>
                <td className="py-3 px-4 text-center">13张</td>
                <td className="py-3 px-4 text-center">13张</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">特色规则</td>
                <td className="py-3 px-4 text-center">飘胡/烂牌胡</td>
                <td className="py-3 px-4 text-center">血战到底</td>
                <td className="py-3 px-4 text-center">推倒胡</td>
                <td className="py-3 px-4 text-center">捉鸡/豆</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
        <h3 className="text-lg font-semibold text-orange-800 mb-3">学习建议</h3>
        <ul className="text-orange-700 space-y-2">
          <li>• 建议先掌握其中一种地区规则，再学习其他变种</li>
          <li>• 广东麻将和四川麻将较为简单，适合初学者</li>
          <li>• 日本麻将规则复杂但竞技性强，适合进阶学习</li>
          <li>• 在不同地区游戏时，记得先确认当地规则</li>
        </ul>
      </div>
    </div>
  );
};

export default RegionalDifferences;