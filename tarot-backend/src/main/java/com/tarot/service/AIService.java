package com.tarot.service;

import com.tarot.model.Card;
import org.springframework.stereotype.Service;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@Service
public class AIService {
    
    // DeepSeek API 配置
    private static final String DEEPSEEK_API_KEY = System.getenv("DEEPSEEK_API_KEY");
    private static final String DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
    
    public String analyzeReading(String question, java.util.List<Card> cards, String spreadType) {
        String prompt = buildPrompt(question, cards, spreadType);
        
        try {
            return callDeepSeekAPI(prompt);
        } catch (Exception e) {
            e.printStackTrace();
            return getMockAnalysis(question, cards, spreadType);
        }
    }
    
    private String buildPrompt(String question, java.util.List<Card> cards, String spreadType) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("你是一位专业的塔罗牌占卜师，请根据以下信息进行占卜解读：\n\n");
        
        if (question != null && !question.isEmpty()) {
            prompt.append("用户问题：").append(question).append("\n\n");
        }
        
        prompt.append("抽到的牌：\n");
        for (int i = 0; i < cards.size(); i++) {
            Card card = cards.get(i);
            String position = "";
            if (spreadType.equals("three")) {
                if (i == 0) position = "（过去）";
                else if (i == 1) position = "（现在）";
                else if (i == 2) position = "（未来）";
            } else {
                position = "（第" + (i+1) + "张）";
            }
            prompt.append(i+1).append(". ").append(card.getName())
                  .append(card.isUpright() ? "（正位）" : "（逆位）")
                  .append(position).append("\n");
            prompt.append("   牌意：").append(card.getMeaning()).append("\n");
        }
        
        prompt.append("\n请给出专业、温暖、有洞察力的占卜解读，");
        prompt.append("结合牌面含义和用户问题（如果有），");
        prompt.append("给出具体建议。解读要详细、有逻辑、富有启发性。\n");
        prompt.append("请用中文回答，保持亲切自然的语气，字数在200-300字之间。");
        
        return prompt.toString();
    }
    
    private String callDeepSeekAPI(String prompt) throws Exception {
        URL url = new URL(DEEPSEEK_API_URL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Authorization", "Bearer " + DEEPSEEK_API_KEY);
        conn.setDoOutput(true);
        
        // DeepSeek 使用 deepseek-chat 模型
        String jsonBody = String.format(
            "{\"model\":\"deepseek-chat\",\"messages\":[{\"role\":\"user\",\"content\":\"%s\"}],\"temperature\":0.7,\"max_tokens\":1000}",
            escapeJson(prompt)
        );
        
        System.out.println("请求DeepSeek API...");
        
        try (OutputStream os = conn.getOutputStream()) {
            os.write(jsonBody.getBytes(StandardCharsets.UTF_8));
            os.flush();
        }
        
        int responseCode = conn.getResponseCode();
        System.out.println("响应码: " + responseCode);
        
        if (responseCode != 200) {
            // 读取错误信息
            StringBuilder errorResponse = new StringBuilder();
            try (BufferedReader errorReader = new BufferedReader(new InputStreamReader(conn.getErrorStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = errorReader.readLine()) != null) {
                    errorResponse.append(line);
                }
            }
            throw new Exception("DeepSeek API调用失败: " + responseCode + " - " + errorResponse.toString());
        }
        
        StringBuilder response = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = br.readLine()) != null) {
                response.append(line);
            }
        }
        
        return extractContentFromDeepSeek(response.toString());
    }
    
    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }
    
    private String extractContentFromDeepSeek(String response) {
        try {
            System.out.println("开始解析响应...");
            
            // 方法1：查找 "content" 字段
            int contentIndex = response.indexOf("\"content\"");
            if (contentIndex == -1) {
                System.err.println("未找到 content 字段");
                System.err.println("完整响应: " + response);
                return "AI服务响应格式异常";
            }
            
            // 找到 content 后面的冒号
            int colonIndex = response.indexOf(":", contentIndex);
            if (colonIndex == -1) {
                return "解析失败";
            }
            
            // 找到第一个引号
            int firstQuote = response.indexOf("\"", colonIndex);
            if (firstQuote == -1) {
                return "解析失败";
            }
            
            // 找到结束引号
            int lastQuote = response.indexOf("\"", firstQuote + 1);
            if (lastQuote == -1) {
                return "解析失败";
            }
            
            String content = response.substring(firstQuote + 1, lastQuote);
            // 处理转义字符
            content = content.replace("\\n", "\n")
                            .replace("\\\"", "\"")
                            .replace("\\\\", "\\");
            
            System.out.println("解析成功，内容长度: " + content.length());
            if (content.isEmpty()) {
                return "AI返回内容为空";
            }
            
            return content;
            
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("解析响应时出错: " + response);
            return "AI服务解析异常: " + e.getMessage();
        }
    }
    
    private String getMockAnalysis(String question, java.util.List<Card> cards, String spreadType) {
        StringBuilder analysis = new StringBuilder();
        
        if (cards.size() == 1) {
            Card card = cards.get(0);
            analysis.append("✨ 单牌解读 ✨\n\n");
            analysis.append("您抽到了 ").append(card.getName()).append(card.isUpright() ? "（正位）" : "（逆位）").append("。\n");
            analysis.append("这张牌代表：").append(card.getMeaning()).append("。\n\n");
            if (card.isUpright()) {
                analysis.append("正位的").append(card.getName()).append("预示着积极的发展方向。");
                analysis.append("建议您保持开放的心态，勇敢地迎接即将到来的机会。");
            } else {
                analysis.append("逆位的").append(card.getName()).append("提醒您需要重新审视当前的情况。");
                analysis.append("也许有一些被忽视的问题需要您的关注。");
            }
        } else if (cards.size() == 3) {
            analysis.append("🔮 三牌阵解读（过去-现在-未来）🔮\n\n");
            analysis.append("【过去】").append(cards.get(0).getName()).append(cards.get(0).isUpright() ? "（正位）" : "（逆位）");
            analysis.append("：").append(cards.get(0).getMeaning()).append("\n\n");
            analysis.append("【现在】").append(cards.get(1).getName()).append(cards.get(1).isUpright() ? "（正位）" : "（逆位）");
            analysis.append("：").append(cards.get(1).getMeaning()).append("\n\n");
            analysis.append("【未来】").append(cards.get(2).getName()).append(cards.get(2).isUpright() ? "（正位）" : "（逆位）");
            analysis.append("：").append(cards.get(2).getMeaning()).append("\n\n");
            
            int uprightCount = 0;
            for (Card c : cards) if (c.isUpright()) uprightCount++;
            
            if (uprightCount >= 2) {
                analysis.append("📈 整体趋势：牌面显示积极能量较强，");
                if (question != null && !question.isEmpty()) {
                    analysis.append("您所问之事有较好的发展前景。");
                } else {
                    analysis.append("您当前的生活状态整体向好。");
                }
            } else if (uprightCount <= 1) {
                analysis.append("⚠️ 整体趋势：牌面显示当前存在一些挑战，");
                analysis.append("但逆位牌往往蕴含着成长的机会。建议您冷静分析，找出问题的根源。");
            } else {
                analysis.append("⚖️ 整体趋势：吉凶参半，结果取决于您的选择和行动。");
            }
        } else {
            int uprightCount = 0;
            for (Card c : cards) if (c.isUpright()) uprightCount++;
            
            analysis.append("🎴 ").append(cards.size()).append("张牌阵解读 🎴\n\n");
            analysis.append("抽牌统计：正位 ").append(uprightCount).append(" 张，逆位 ").append(cards.size() - uprightCount).append(" 张。\n\n");
            
            if (uprightCount > cards.size() / 2) {
                analysis.append("整体能量偏向积极，多个正面牌的出现预示着好的发展趋势。");
            } else {
                analysis.append("当前能量较为复杂，需要您静心思考，梳理当前的处境。");
            }
            analysis.append("建议您结合每张牌的具体含义，思考它们与您生活的关联。");
        }
        
        if (question != null && !question.isEmpty()) {
            analysis.append("\n\n💭 针对您的问题「").append(question).append("」：\n");
            analysis.append("塔罗牌为您提供了一个思考的框架，真正的答案往往在您的内心深处。");
        }
        
        analysis.append("\n\n---\n✨ 温馨提示：占卜结果仅供参考，命运掌握在自己手中 ✨");
        
        return analysis.toString();
    }
}