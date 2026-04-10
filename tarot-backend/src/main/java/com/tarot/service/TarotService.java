package com.tarot.service;

import com.tarot.model.Card;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TarotService {
    
    private static final String[] MAJOR_ARCANA = {
        "愚者", "魔术师", "女祭司", "女皇", "皇帝", "教皇", "恋人", "战车",
        "力量", "隐士", "命运之轮", "正义", "倒吊人", "死神", "节制", "恶魔",
        "高塔", "星星", "月亮", "太阳", "审判", "世界"
    };
    
    private static final String[] MINOR_ARCANA = {
        "权杖一", "权杖二", "权杖三", "权杖四", "权杖五", "权杖六", "权杖七", "权杖八", "权杖九", "权杖十",
        "权杖侍从", "权杖骑士", "权杖王后", "权杖国王",
        "圣杯一", "圣杯二", "圣杯三", "圣杯四", "圣杯五", "圣杯六", "圣杯七", "圣杯八", "圣杯九", "圣杯十",
        "圣杯侍从", "圣杯骑士", "圣杯王后", "圣杯国王",
        "宝剑一", "宝剑二", "宝剑三", "宝剑四", "宝剑五", "宝剑六", "宝剑七", "宝剑八", "宝剑九", "宝剑十",
        "宝剑侍从", "宝剑骑士", "宝剑王后", "宝剑国王",
        "星币一", "星币二", "星币三", "星币四", "星币五", "星币六", "星币七", "星币八", "星币九", "星币十",
        "星币侍从", "星币骑士", "星币王后", "星币国王"
    };
    
    private static final Map<String, String[]> MEANINGS = new HashMap<>();
    
    static {
        MEANINGS.put("愚者", new String[]{"新的开始、冒险、天真、自由", "愚蠢、轻率、冒险、不成熟"});
        MEANINGS.put("魔术师", new String[]{"创造力、技能、资源、沟通", "欺骗、操纵、才能误用"});
        MEANINGS.put("女祭司", new String[]{"直觉、智慧、神秘、潜意识", "压抑直觉、隐藏的秘密"});
        MEANINGS.put("女皇", new String[]{"丰饶、母性、自然、感官", "依赖、缺乏成长、冷漠"});
        MEANINGS.put("皇帝", new String[]{"权威、领导、结构、父亲", "专制、 僵化、控制欲"});
        MEANINGS.put("教皇", new String[]{"传统、信仰、教育、规范", "叛逆、非传统、束缚"});
        MEANINGS.put("恋人", new String[]{"爱情、选择、结合、价值观", "失衡、冲突、分离"});
        MEANINGS.put("战车", new String[]{"意志、胜利、控制、决心", "失控、冲突、缺乏方向"});
        MEANINGS.put("力量", new String[]{"勇气、耐心、 同理心、影响力", "软弱、怀疑、失控"});
        MEANINGS.put("隐士", new String[]{"内省、指引、孤独、智慧", "孤立、逃避、拒绝帮助"});
        MEANINGS.put("命运之轮", new String[]{"转变、命运、机会、循环", "坏运、阻力、失控"});
        MEANINGS.put("正义", new String[]{"公正、真相、因果、责任", "不公、谎言、推卸责任"});
        MEANINGS.put("倒吊人", new String[]{"牺牲、换个角度、等待、放手", "抗拒、停滞、无谓牺牲"});
        MEANINGS.put("死神", new String[]{"结束、转变、放手、新生", "抗拒改变、停滞、恐惧"});
        MEANINGS.put("节制", new String[]{"平衡、耐心、适度、调和", "失衡、冲突、急躁"});
        MEANINGS.put("恶魔", new String[]{"束缚、物质、上瘾、黑暗", "解脱、觉醒、打破束缚"});
        MEANINGS.put("高塔", new String[]{"突变、崩塌、觉醒、真相", "灾难、抗拒、避免改变"});
        MEANINGS.put("星星", new String[]{"希望、灵感、平静、疗愈", "绝望、缺乏信心、消极"});
        MEANINGS.put("月亮", new String[]{"直觉、梦境、恐惧、未知", "混乱、幻觉、逃避"});
        MEANINGS.put("太阳", new String[]{"快乐、成功、活力、清晰", "悲伤、拖延、缺乏热情"});
        MEANINGS.put("审判", new String[]{"觉醒、重生、宽恕、召唤", "逃避、自我怀疑、拒绝"});
        MEANINGS.put("世界", new String[]{"完成、整合、成就、旅行", "未完成、停滞、缺乏闭环"});
        
        // ==================== 权杖组 ====================
        MEANINGS.put("权杖一", new String[]{"新计划、开始、创造、灵感", "延迟、计划受阻、缺乏动力"});
        MEANINGS.put("权杖二", new String[]{"决定、计划、未来规划", "恐惧未知、犹豫不决"});
        MEANINGS.put("权杖三", new String[]{"进展、旅行、探索、领导力", "障碍、延误、过于乐观"});
        MEANINGS.put("权杖四", new String[]{"稳定、庆祝、和谐、回家", "不稳定、冲突、过渡期"});
        MEANINGS.put("权杖五", new String[]{"竞争、冲突、分歧、挑战", "逃避冲突、内部矛盾"});
        MEANINGS.put("权杖六", new String[]{"胜利、成功、认可、好消息", "失败、傲慢、延迟的胜利"});
        MEANINGS.put("权杖七", new String[]{"坚持、防御、勇气、挑战", "放弃、 不堪重负、软弱"});
        MEANINGS.put("权杖八", new String[]{"速度、行动、消息、进展", "延迟、停滞、错失机会"});
        MEANINGS.put("权杖九", new String[]{"防御、韧性、坚持、怀疑", "偏执、准备不足、精疲力尽"});
        MEANINGS.put("权杖十", new String[]{"负担、责任、压力、成就", "崩溃、逃避责任、过度劳累"});
        MEANINGS.put("权杖侍从", new String[]{"热情、新消息、探索、活力", "坏消息、不成熟、嫉妒"});
        MEANINGS.put("权杖骑士", new String[]{"行动、冒险、热情、冲动", "鲁莽、冲突、缺乏方向"});
        MEANINGS.put("权杖王后", new String[]{"自信、独立、温暖、魅力", "嫉妒、占有欲、情绪化"});
        MEANINGS.put("权杖国王", new String[]{"领导力、远见、成熟、权威", "独裁、冲动、不成熟"});

        // ==================== 圣杯组 ====================
        MEANINGS.put("圣杯一", new String[]{"爱、新感情、喜悦、直觉", "情感阻塞、空虚、压抑"});
        MEANINGS.put("圣杯二", new String[]{"结合、吸引、友谊、平等", "失衡、分离、沟通不良"});
        MEANINGS.put("圣杯三", new String[]{"庆祝、友谊、团体、快乐", "过度放纵、八卦、孤立"});
        MEANINGS.put("圣杯四", new String[]{"冷漠、反思、不满、机会", "觉醒、新机会、行动"});
        MEANINGS.put("圣杯五", new String[]{"悲伤、失落、遗憾、悔恨", "接受、向前看、希望"});
        MEANINGS.put("圣杯六", new String[]{"回忆、怀旧、纯真、礼物", "困在过去、不切实际"});
        MEANINGS.put("圣杯七", new String[]{"幻想、选择、混乱、白日梦", "清醒、决定、专注"});
        MEANINGS.put("圣杯八", new String[]{"离开、寻找、放下、勇气", "恐惧改变、停滞、逃避"});
        MEANINGS.put("圣杯九", new String[]{"满足、愿望实现、快乐", "贪婪、不满、过度自信"});
        MEANINGS.put("圣杯十", new String[]{"幸福、家庭、和谐、满足", "冲突、家庭问题、破碎"});
        MEANINGS.put("圣杯侍从", new String[]{"敏感、创意、新消息、善良", "情绪化、脆弱、缺乏创意"});
        MEANINGS.put("圣杯骑士", new String[]{"浪漫、魅力、理想主义", "情绪波动、失望、欺骗"});
        MEANINGS.put("圣杯王后", new String[]{"直觉、慈悲、情感丰富", "依赖、情绪化、不安全感"});
        MEANINGS.put("圣杯国王", new String[]{"智慧、慈悲、控制情感", "操纵、情绪勒索、冷漠"});

        // ==================== 宝剑组 ====================
        MEANINGS.put("宝剑一", new String[]{"清晰、真相、决断、理智", "混乱、偏执、残酷真相"});
        MEANINGS.put("宝剑二", new String[]{"僵局、逃避、难以抉择", "释放、决定、面对真相"});
        MEANINGS.put("宝剑三", new String[]{"心碎、悲伤、背叛、痛苦", "疗愈、原谅、放下"});
        MEANINGS.put("宝剑四", new String[]{"休息、恢复、沉思、避难", "失眠、焦虑、过度劳累"});
        MEANINGS.put("宝剑五", new String[]{"冲突、失败、自私、损失", "和解、放下、吸取教训"});
        MEANINGS.put("宝剑六", new String[]{"过渡、疗愈、前进、平静", "停滞、无法前进、困住"});
        MEANINGS.put("宝剑七", new String[]{"欺骗、策略、逃避、狡猾", "诚实、面对、揭露真相"});
        MEANINGS.put("宝剑八", new String[]{"束缚、限制、无助、被困", "解放、突破、看清真相"});
        MEANINGS.put("宝剑九", new String[]{"焦虑、噩梦、担忧、内疚", "释放、面对、寻求帮助"});
        MEANINGS.put("宝剑十", new String[]{"结束、毁灭、低谷、重生", "复苏、成长、新的开始"});
        MEANINGS.put("宝剑侍从", new String[]{"警觉、新想法、好奇心", "八卦、欺骗、缺乏洞察"});
        MEANINGS.put("宝剑骑士", new String[]{"冲动、直接、追求真相", "鲁莽、争吵、破坏性"});
        MEANINGS.put("宝剑王后", new String[]{"独立、清晰、诚实、智慧", "冷酷、偏见、刻薄"});
        MEANINGS.put("宝剑国王", new String[]{"权威、逻辑、理性、公正", "专制、残忍、滥用权力"});

        // ==================== 星币组 ====================
        MEANINGS.put("星币一", new String[]{"新工作、财富、机会、物质", "错失机会、财务问题"});
        MEANINGS.put("星币二", new String[]{"平衡、适应、多重任务", "失衡、财务混乱、压力"});
        MEANINGS.put("星币三", new String[]{"团队、计划、技能、学习", "缺乏合作、质量差、延误"});
        MEANINGS.put("星币四", new String[]{"节俭、控制、占有、稳定", "贪婪、僵化、财务焦虑"});
        MEANINGS.put("星币五", new String[]{"贫困、孤立、困难、担忧", "复苏、希望、接受帮助"});
        MEANINGS.put("星币六", new String[]{"给予、接受、慷慨、共享", "不平衡、债务、剥削"});
        MEANINGS.put("星币七", new String[]{"评估、耐心、投资、等待", "急躁、糟糕投资、停滞"});
        MEANINGS.put("星币八", new String[]{"专注、技能、勤奋、细节", "无聊、质量差、缺乏野心"});
        MEANINGS.put("星币九", new String[]{"独立、奢华、自律、成就", "依赖、挥霍、孤独"});
        MEANINGS.put("星币十", new String[]{"财富、家族、传承、稳定", "家庭冲突、财务危机"});
        MEANINGS.put("星币侍从", new String[]{"学习、新机会、专注", "拖延、不成熟、错失"});
        MEANINGS.put("星币骑士", new String[]{"勤奋、可靠、保守、耐心", "懒惰、停滞、不负责"});
        MEANINGS.put("星币王后", new String[]{"务实、养育、自然、丰盛", "依赖、物质主义、吝啬"});
        MEANINGS.put("星币国王", new String[]{"财富、成功、稳定、务实", "贪婪、固执、物质主义"});
        // 小阿卡那默认牌意
        for (String name : MINOR_ARCANA) {
            MEANINGS.putIfAbsent(name, new String[]{"积极发展、新的机遇", "挑战、需要反思"});
        }
    }
    
    private String getCardMeaning(String cardName, boolean upright) {
        String[] meanings = MEANINGS.getOrDefault(cardName, 
            new String[]{"积极发展、新的机遇", "挑战、需要反思"});
        return upright ? meanings[0] : meanings[1];
    }
    
    private String getCardType(String cardName) {
        for (String major : MAJOR_ARCANA) {
            if (major.equals(cardName)) return "大阿卡那";
        }
        return "小阿卡那";
    }
    
    public List<Card> drawCards(int deckType, int drawCount) {
        List<String> deck = new ArrayList<>();
        
        if (deckType == 1 || deckType == 3) {
            deck.addAll(Arrays.asList(MAJOR_ARCANA));
        }
        if (deckType == 2 || deckType == 3) {
            deck.addAll(Arrays.asList(MINOR_ARCANA));
        }
        
        if (drawCount > deck.size()) {
            drawCount = deck.size();
        }
        
        Random random = new Random();
        List<Card> result = new ArrayList<>();
        
        for (int i = 0; i < drawCount && !deck.isEmpty(); i++) {
            int index = random.nextInt(deck.size());
            String cardName = deck.get(index);
            boolean upright = random.nextBoolean();
            String meaning = getCardMeaning(cardName, upright);
            String type = getCardType(cardName);
            
            result.add(new Card(cardName, type, upright, meaning));
            deck.remove(index);
        }
        
        return result;
    }
}