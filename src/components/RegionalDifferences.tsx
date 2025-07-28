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
  const [selectedRegion, setSelectedRegion] = useState('guangdong');

  const regions: Region[] = [
    {
      id: 'guangdong',
      name: '广东麻将',
      description: '流行于广东地区，以推倒胡为主要玩法',
      color: 'from-red-500 to-red-600',
      rules: [
        {
          name: '基本规则',
          description: '广东麻将的基本特点',
          details: [
            '只有万、条、筒三种花色，没有字牌',
            '总共108张牌（每种花色36张）',
            '可以吃、碰、杠',
            '推倒胡：任意牌型都可以胡牌'
          ]
        },
        {
          name: '计分方式',
          description: '广东麻将的计分特点',
          details: [
            '按番数计分，1番起胡',
            '自摸加1番',
            '清一色、七对子等特殊牌型加番',
            '庄家胡牌或自摸加番'
          ]
        }
      ]
    },
    {
      id: 'sichuan',
      name: '四川麻将',
      description: '四川地区特有玩法，以血战到底著称',
      color: 'from-orange-500 to-orange-600',
      rules: [
        {
          name: '基本规则',
          description: '四川麻将的独特规则',
          details: [
            '只有万、条、筒，无字牌（部分地区有）',
            '血战到底：一人胡牌后其他人继续',
            '可以吃、碰、杠',
            '必须缺一门才能胡牌'
          ]
        },
        {
          name: '特色玩法',
          description: '四川麻将的特殊规则',
          details: [
            '刮风下雨：特定杠牌有额外奖励',
            '天胡、地胡：开局特殊胡牌',
            '血流成河：所有人都要胡完才结束',
            '换三张：开局前换牌'
          ]
        }
      ]
    },
    {
      id: 'japanese',
      name: '日本麻将',
      description: '日式麻将，规则复杂精密，竞技性强',
      color: 'from-blue-500 to-blue-600',
      rules: [
        {
          name: '基本特色',
          description: '日本麻将的核心规则',
          details: [
            '144张牌，包含字牌和花牌',
            '立直：宣告听牌，增加1番',
            '振听：放弃胡牌权利的状态',
            '役：必须有特定牌型才能胡牌'
          ]
        },
        {
          name: '计分系统',
          description: '复杂的点数计算',
          details: [
            '点数制：8000点、12000点等',
            '役满：最高等级的牌型',
            '里宝牌：立直后的额外宝牌',
            '流局满贯：特殊流局情况'
          ]
        }
      ]
    },
    {
      id: 'taiwan',
      name: '台湾麻将',
      description: '台湾地区流行的十六张麻将',
      color: 'from-green-500 to-green-600',
      rules: [
        {
          name: '基本规则',
          description: '台湾麻将的特点',
          details: [
            '十六张牌：每人起手16张',
            '可以吃、碰、杠、胡',
            '花牌：春夏秋冬梅兰竹菊',
            '台数计分：不同牌型不同台数'
          ]
        },
        {
          name: '特殊规则',
          description: '台湾麻将独有规则',
          details: [
            '花牌算台：每朵花加1台',
            '包牌制度：特定情况包赔',
            '连庄：庄家胡牌继续连庄',
            '摸岭上开花：杠后自摸特殊牌型'
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
                <th className="text-center py-3 px-4 font-semibold text-gray-800">广东麻将</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">四川麻将</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">日本麻将</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">台湾麻将</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">牌数</td>
                <td className="py-3 px-4 text-center">108张</td>
                <td className="py-3 px-4 text-center">108张</td>
                <td className="py-3 px-4 text-center">144张</td>
                <td className="py-3 px-4 text-center">144张</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">字牌</td>
                <td className="py-3 px-4 text-center">无</td>
                <td className="py-3 px-4 text-center">无/有</td>
                <td className="py-3 px-4 text-center">有</td>
                <td className="py-3 px-4 text-center">有</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">起手牌数</td>
                <td className="py-3 px-4 text-center">13张</td>
                <td className="py-3 px-4 text-center">13张</td>
                <td className="py-3 px-4 text-center">13张</td>
                <td className="py-3 px-4 text-center">16张</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">特色规则</td>
                <td className="py-3 px-4 text-center">推倒胡</td>
                <td className="py-3 px-4 text-center">血战到底</td>
                <td className="py-3 px-4 text-center">立直/役</td>
                <td className="py-3 px-4 text-center">花牌/台数</td>
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