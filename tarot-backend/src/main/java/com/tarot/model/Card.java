package com.tarot.model;

import java.util.HashMap;
import java.util.Map;

public class Card {
    private String name;
    private String type;
    private boolean upright;
    private String meaning;
    private String imageKey;
    
    public Card() {}
    
    public Card(String name, String type, boolean upright, String meaning) {
        this.name = name;
        this.type = type;
        this.upright = upright;
        this.meaning = meaning;
        this.imageKey = generateImageKey(name, upright);
    }
    
    private String generateImageKey(String name, boolean upright) {
        Map<String, String> nameMap = new HashMap<>();
     // 大阿卡那
        nameMap.put("愚者", "fool");
        nameMap.put("魔术师", "magician");
        nameMap.put("女祭司", "high_priestess");
        nameMap.put("女皇", "empress");
        nameMap.put("皇帝", "emperor");
        nameMap.put("教皇", "hierophant");
        nameMap.put("恋人", "lovers");
        nameMap.put("战车", "chariot");
        nameMap.put("力量", "strength");
        nameMap.put("隐士", "hermit");
        nameMap.put("命运之轮", "wheel_of_fortune");
        nameMap.put("正义", "justice");
        nameMap.put("倒吊人", "hanged_man");
        nameMap.put("死神", "death");
        nameMap.put("节制", "temperance");
        nameMap.put("恶魔", "devil");
        nameMap.put("高塔", "tower");
        nameMap.put("星星", "star");
        nameMap.put("月亮", "moon");
        nameMap.put("太阳", "sun");
        nameMap.put("审判", "judgement");
        nameMap.put("世界", "world");
        
        // 权杖组
        nameMap.put("权杖一", "wand_01");
        nameMap.put("权杖二", "wand_02");
        nameMap.put("权杖三", "wand_03");
        nameMap.put("权杖四", "wand_04");
        nameMap.put("权杖五", "wand_05");
        nameMap.put("权杖六", "wand_06");
        nameMap.put("权杖七", "wand_07");
        nameMap.put("权杖八", "wand_08");
        nameMap.put("权杖九", "wand_09");
        nameMap.put("权杖十", "wand_10");
        nameMap.put("权杖侍从", "wand_page");
        nameMap.put("权杖骑士", "wand_knight");
        nameMap.put("权杖王后", "wand_queen");
        nameMap.put("权杖国王", "wand_king");
        
        // 圣杯组
        nameMap.put("圣杯一", "cup_01");
        nameMap.put("圣杯二", "cup_02");
        nameMap.put("圣杯三", "cup_03");
        nameMap.put("圣杯四", "cup_04");
        nameMap.put("圣杯五", "cup_05");
        nameMap.put("圣杯六", "cup_06");
        nameMap.put("圣杯七", "cup_07");
        nameMap.put("圣杯八", "cup_08");
        nameMap.put("圣杯九", "cup_09");
        nameMap.put("圣杯十", "cup_10");
        nameMap.put("圣杯侍从", "cup_page");
        nameMap.put("圣杯骑士", "cup_knight");
        nameMap.put("圣杯王后", "cup_queen");
        nameMap.put("圣杯国王", "cup_king");
        
        // 宝剑组
        nameMap.put("宝剑一", "sword_01");
        nameMap.put("宝剑二", "sword_02");
        nameMap.put("宝剑三", "sword_03");
        nameMap.put("宝剑四", "sword_04");
        nameMap.put("宝剑五", "sword_05");
        nameMap.put("宝剑六", "sword_06");
        nameMap.put("宝剑七", "sword_07");
        nameMap.put("宝剑八", "sword_08");
        nameMap.put("宝剑九", "sword_09");
        nameMap.put("宝剑十", "sword_10");
        nameMap.put("宝剑侍从", "sword_page");
        nameMap.put("宝剑骑士", "sword_knight");
        nameMap.put("宝剑王后", "sword_queen");
        nameMap.put("宝剑国王", "sword_king");
        
        // 星币组
        nameMap.put("星币一", "pentacle_01");
        nameMap.put("星币二", "pentacle_02");
        nameMap.put("星币三", "pentacle_03");
        nameMap.put("星币四", "pentacle_04");
        nameMap.put("星币五", "pentacle_05");
        nameMap.put("星币六", "pentacle_06");
        nameMap.put("星币七", "pentacle_07");
        nameMap.put("星币八", "pentacle_08");
        nameMap.put("星币九", "pentacle_09");
        nameMap.put("星币十", "pentacle_10");
        nameMap.put("星币侍从", "pentacle_page");
        nameMap.put("星币骑士", "pentacle_knight");
        nameMap.put("星币王后", "pentacle_queen");
        nameMap.put("星币国王", "pentacle_king");
        
        String englishName = nameMap.getOrDefault(name, name.replaceAll("[^a-zA-Z]", "_"));
        String orientation = upright ? "upright" : "reversed";
        return englishName + "_" + orientation;
    }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public boolean isUpright() { return upright; }
    public void setUpright(boolean upright) { this.upright = upright; }
    public String getMeaning() { return meaning; }
    public void setMeaning(String meaning) { this.meaning = meaning; }
    public String getImageKey() { return imageKey; }
    public void setImageKey(String imageKey) { this.imageKey = imageKey; }
    public String getOrientation() { return upright ? "正位" : "逆位"; }
}