# 🔮 塔罗 - 智能塔罗牌占卜系统

基于 Spring Boot + DeepSeek API 的智能塔罗牌占卜系统，支持灵活接入多种 AI 服务。

## ✨ 功能特点

- 🃏 **完整 78 张塔罗牌**：22 张大阿卡那 + 56 张小阿卡那，正逆位随机
- 🎲 **不重复抽牌算法**：采用删除法保证同一占卜内牌不重复
- 🤖 **AI 智能解读**：支持 DeepSeek、OpenAI 等多种 AI 服务，可灵活切换
- 📱 **响应式设计**：完美支持 PC 和手机端访问
- 🖼️ **智能图片加载**：卡背占位 + 懒加载，加载失败自动降级为文字卡片
- 🔧 **可插拔 AI**：只需修改配置即可切换不同的 AI 服务

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| Java 11 | 后端语言 |
| Spring Boot 2.7.0 | 后端框架 |
| Maven | 项目管理 |
| HTML5/CSS3/JavaScript | 前端技术 |
| Intersection Observer API | 图片懒加载 |
| DeepSeek API | AI 解读（可替换） |

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/你的用户名/tarot-project.git
cd tarot-project

2. 配置 AI API（可选）
编辑 backend/src/main/java/com/tarot/service/AIService.java

java
// 修改这三行即可切换不同的 AI 服务
private static final String API_KEY = "your-api-key";
private static final String API_URL = "https://api.deepseek.com/v1/chat/completions";
private static final String MODEL = "deepseek-chat";
3. 启动后端
bash
cd backend
mvn spring-boot:run
控制台出现以下信息表示启动成功：

text
Tomcat started on port(s): 8081 (http)
塔罗牌后端服务已启动: http://localhost:8081
4. 访问前端
开发环境：使用 VS Code Live Server 打开 frontend/index.html

生产环境：将 frontend 目录部署到任意静态服务器

🔌 切换 AI 服务
只需修改 AIService.java 中的三个常量即可：

参数	说明
API_KEY	你的 API 密钥
API_URL	API 接口地址
MODEL	模型名称
支持的 AI 服务示例
AI 服务	API_URL	MODEL
DeepSeek	https://api.deepseek.com/v1/chat/completions	deepseek-chat
OpenAI	https://api.openai.com/v1/chat/completions	gpt-3.5-turbo
智谱 AI	https://open.bigmodel.cn/api/paas/v4/chat/completions	glm-4
通义千问	https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions	qwen-turbo
本地 Ollama	http://localhost:11434/v1/chat/completions	llama2
💡 不配置 API Key 时，系统会自动降级为模拟解读模式。

📁 项目结构
text
tarot-project/
├── backend/                    # Spring Boot 后端
│   ├── src/main/java/com/tarot/
│   │   ├── TarotApplication.java
│   │   ├── controller/         # API 控制器
│   │   │   ├── TarotController.java
│   │   │   └── AIController.java
│   │   ├── service/            # 业务逻辑
│   │   │   ├── TarotService.java
│   │   │   └── AIService.java
│   │   └── model/              # 数据模型
│   │       └── Card.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                   # 前端静态文件
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── script.js
│   │   └── tarot-images.js
│   └── images/                 # 图片文件夹（详见下方说明）
└── README.md
📷 图片说明
本项目使用私人塔罗牌稿件，不包含在开源代码中，但保留了完整的文件夹结构。

文件夹结构
text
frontend/images/
├── major/                      # 大阿卡那（22张）
│   ├── 正位/
│   └── 逆位/
├── minor/                      # 小阿卡那（56张）
│   ├── 权杖/
│   │   ├── 正位/
│   │   └── 逆位/
│   ├── 圣杯/
│   │   ├── 正位/
│   │   └── 逆位/
│   ├── 宝剑/
│   │   ├── 正位/
│   │   └── 逆位/
│   └── 星币/
│       ├── 正位/
│       └── 逆位/
└── 卡背/
使用自己的图片
按上述结构放置图片

命名规则：0-愚人.png、1-魔法师.jpg 等

建议使用 WebP 格式，单张控制在 50KB 以内

无图片时运行
完全不放置图片也不影响功能，系统会自动降级为文字卡片显示（紫色渐变背景 + 牌名 + 牌意）。

🎯 API 接口
抽牌接口
URL：POST /api/tarot/draw

Content-Type：application/json

请求体：

json
{
    "deckType": 3,    // 1:大阿卡那, 2:小阿卡那, 3:全部
    "drawCount": 3    // 1-78
}
响应：

json
{
    "success": true,
    "cards": [
        {
            "name": "愚者",
            "type": "大阿卡那",
            "upright": true,
            "meaning": "新的开始、冒险、天真、自由",
            "imageKey": "fool_upright"
        }
    ]
}
AI 解读接口
URL：POST /api/ai/analyze

请求体：

json
{
    "question": "我的感情运势如何？",
    "cards": [...],
    "spreadType": "three"
}
🔧 常见问题
Q：如何切换不同的 AI 服务？
只需修改 AIService.java 中的 API_URL 和 MODEL，其他代码无需改动。

Q：没有 API Key 能使用吗？
可以，系统会自动降级为模拟解读，功能完整可用。

Q：图片加载慢怎么办？
已实现卡背占位 + 懒加载

建议将图片压缩到 50KB 以下

或使用 WebP 格式

Q：如何修改牌意？
编辑 TarotService.java 中的 MEANINGS 静态块。

📄 开源协议
MIT License

🙏 致谢
DeepSeek - AI 服务支持

塔罗牌图片为私人稿件

📧 联系方式
如有问题，欢迎提 Issue
