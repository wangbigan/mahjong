import React from 'react';
import { BookOpen, Search, MapPin, Lightbulb, Target, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const features = [
    {
      id: 'rules',
      title: '基础规则',
      description: '从零开始学习麻将的基本规则，包括牌型介绍、胡牌条件等',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'terminology',
      title: '术语大全',
      description: '收录完整的麻将术语，支持快速搜索和详细解释',
      icon: Search,
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'regional',
      title: '地区差异',
      description: '了解不同地区麻将的规则差异，掌握各地玩法',
      icon: MapPin,
      color: 'from-orange-500 to-orange-600',
    },
    {
      id: 'tips',
      title: '实用口诀',
      description: '记忆技巧和实用口诀，帮助快速提升麻将水平',
      icon: Lightbulb,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      id: 'practice',
      title: '实战练习',
      description: '通过练习题和场景模拟，检验学习成果',
      icon: Target,
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
            欢迎来到<span className="text-green-600">麻将学院</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            专为新手打造的麻将学习平台，从基础规则到实战技巧，让你轻松掌握麻将精髓
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-green-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">5</div>
                <div className="text-gray-600">个学习模块</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
                <div className="text-gray-600">个术语解释</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-gray-600">道练习题</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">学习模块</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group border-l-4 border-green-500"
                onClick={() => onNavigate(feature.id)}
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                  <span>开始学习</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-green-500">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">快速入门指南</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 font-bold">1</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">学习基础规则</h3>
            <p className="text-sm text-gray-600">了解麻将的基本概念和规则</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 font-bold">2</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">掌握术语</h3>
            <p className="text-sm text-gray-600">熟悉常用的麻将术语和概念</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 font-bold">3</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">记忆口诀</h3>
            <p className="text-sm text-gray-600">通过口诀快速记忆重要知识点</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 font-bold">4</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">实战练习</h3>
            <p className="text-sm text-gray-600">通过练习巩固学习成果</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;