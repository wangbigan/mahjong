# 麻将学院 🀄

一个专为新手打造的麻将学习平台，从基础规则到实战技巧，让你轻松掌握麻将精髓。

## 🎯 项目简介

麻将学院是一个现代化的麻将教学网站，采用 React + TypeScript + Tailwind CSS 构建。项目提供了完整的麻将学习体系，包括基础规则、术语大全、地区差异、实用口诀和实战练习等模块，帮助初学者系统性地学习麻将。

## ✨ 主要功能

### 🏠 首页
- 精美的响应式设计
- 学习模块导航
- 快速入门指南
- 学习进度统计

### 📚 基础规则
- 麻将牌组成详解
- 游戏流程说明
- 牌型组合介绍
- 胡牌条件解析
- 可折叠的分章节学习

### 🔍 术语大全
- 100+ 个麻将术语收录
- 智能搜索功能
- 分类筛选（基础术语、牌型术语、游戏术语、计分术语）
- 详细定义和使用示例

### 🗺️ 地区差异
- 不同地区麻将规则对比
- 特色玩法介绍
- 地方规则详解

### 💡 实用口诀
- 前辈经验总结
- 朗朗上口的记忆口诀
- 按难度和类别分类
- 详细的技巧解释

### 🎯 实战练习
- 多难度练习题（新手/进阶/高级）
- 选择题和场景分析
- 即时答案反馈
- 详细解题思路
- 学习进度跟踪

## 🛠️ 技术栈

- **前端框架**: React 18.3.1
- **开发语言**: TypeScript 5.5.3
- **构建工具**: Vite 5.4.2
- **样式框架**: Tailwind CSS 3.4.1
- **图标库**: Lucide React 0.344.0
- **代码规范**: ESLint + TypeScript ESLint

## 📁 项目结构

```
mahjong/
├── public/                 # 静态资源
├── src/
│   ├── components/         # React 组件
│   │   ├── Header.tsx      # 页面头部
│   │   ├── Navigation.tsx  # 导航菜单
│   │   ├── HomePage.tsx    # 首页组件
│   │   ├── BasicRules.tsx  # 基础规则
│   │   ├── Terminology.tsx # 术语大全
│   │   ├── RegionalDifferences.tsx # 地区差异
│   │   ├── Tips.tsx        # 实用口诀
│   │   └── Practice.tsx    # 实战练习
│   ├── App.tsx            # 主应用组件
│   ├── main.tsx           # 应用入口
│   ├── index.css          # 全局样式
│   └── vite-env.d.ts      # TypeScript 声明
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── tailwind.config.js     # Tailwind 配置
├── tsconfig.json          # TypeScript 配置
└── vite.config.ts         # Vite 配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 🎨 设计特色

- **响应式设计**: 完美适配桌面端和移动端
- **现代化UI**: 采用渐变色彩和卡片式布局
- **交互友好**: 丰富的动画效果和状态反馈
- **可访问性**: 良好的键盘导航和屏幕阅读器支持
- **性能优化**: 组件懒加载和状态管理优化

## 📱 功能亮点

### 智能搜索
- 术语大全支持模糊搜索
- 实时搜索结果更新
- 搜索历史记录

### 个性化学习
- 多难度级别选择
- 学习进度跟踪
- 个性化推荐

### 实战导向
- 场景化练习题
- 实用技巧总结
- 口诀记忆法

## 🔧 开发说明

### 组件设计原则

1. **单一职责**: 每个组件专注于特定功能
2. **可复用性**: 通用组件抽象化设计
3. **类型安全**: 完整的 TypeScript 类型定义
4. **性能优化**: 合理使用 React Hooks

### 状态管理

- 使用 React useState 进行本地状态管理
- 通过 props 进行组件间通信
- 合理使用 useMemo 和 useCallback 优化性能

### 样式规范

- 使用 Tailwind CSS 实用类
- 响应式设计优先
- 一致的颜色主题和间距

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 感谢所有为麻将文化传承做出贡献的前辈
- 感谢开源社区提供的优秀工具和库
- 感谢所有用户的反馈和建议

## 📞 联系我们

如有问题或建议，请通过以下方式联系：

- 提交 GitHub Issue
- 发送邮件至项目维护者

---

**让学习麻将变得简单有趣！** 🎉