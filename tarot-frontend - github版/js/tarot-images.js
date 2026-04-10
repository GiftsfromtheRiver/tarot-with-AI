// 塔罗牌图片映射表 - 完整版
const TAROT_IMAGES = {
    // ==================== 大阿卡那 (22张) ====================
    // 正位
    'fool_upright': '/images/major/正位/0-愚人.png',
    'magician_upright': '/images/major/正位/1-魔法师.jpg',
    'high_priestess_upright': '/images/major/正位/2-女祭司.png',
    'empress_upright': '/images/major/正位/3-女皇.png',
    'emperor_upright': '/images/major/正位/4-皇帝.png',
    'hierophant_upright': '/images/major/正位/5-教皇.jpg',
    'lovers_upright': '/images/major/正位/6-恋人.jpg',
    'chariot_upright': '/images/major/正位/7-战车.jpg',
    'strength_upright': '/images/major/正位/8-力量.jpg',
    'hermit_upright': '/images/major/正位/9-隐士.jpg',
    'wheel_of_fortune_upright': '/images/major/正位/10-命运之轮.jpg',
    'justice_upright': '/images/major/正位/11-正义.jpg',
    'hanged_man_upright': '/images/major/正位/12-倒吊人.png',
    'death_upright': '/images/major/正位/13-死神.png',
    'temperance_upright': '/images/major/正位/14-节制.png',
    'devil_upright': '/images/major/正位/15-恶魔.jpg',
    'tower_upright': '/images/major/正位/16-高塔.png',
    'star_upright': '/images/major/正位/17-星星.jpg',
    'moon_upright': '/images/major/正位/18-月亮.png',
    'sun_upright': '/images/major/正位/19-太阳.png',
    'judgement_upright': '/images/major/正位/20-审判.png',
    'world_upright': '/images/major/正位/21-世界.jpg',
    
    // 逆位
    'fool_reversed': '/images/major/逆位/0-愚人.png',
    'magician_reversed': '/images/major/逆位/1-魔法师.jpg',
    'high_priestess_reversed': '/images/major/逆位/2-女祭司.png',
    'empress_reversed': '/images/major/逆位/3-女皇.png',
    'emperor_reversed': '/images/major/逆位/4-皇帝.png',
    'hierophant_reversed': '/images/major/逆位/5-教皇.jpg',
    'lovers_reversed': '/images/major/逆位/6-恋人.jpg',
    'chariot_reversed': '/images/major/逆位/7-战车.jpg',
    'strength_reversed': '/images/major/逆位/8-力量.jpg',
    'hermit_reversed': '/images/major/逆位/9-隐士.jpg',
    'wheel_of_fortune_reversed': '/images/major/逆位/10-命运之轮.jpg',
    'justice_reversed': '/images/major/逆位/11-正义.jpg',
    'hanged_man_reversed': '/images/major/逆位/12-倒吊人.png',
    'death_reversed': '/images/major/逆位/13-死神.png',
    'temperance_reversed': '/images/major/逆位/14-节制.png',
    'devil_reversed': '/images/major/逆位/15-恶魔.jpg',
    'tower_reversed': '/images/major/逆位/16-高塔.png',
    'star_reversed': '/images/major/逆位/17-星星.jpg',
    'moon_reversed': '/images/major/逆位/18-月亮.png',
    'sun_reversed': '/images/major/逆位/19-太阳.png',
    'judgement_reversed': '/images/major/逆位/20-审判.png',
    'world_reversed': '/images/major/逆位/21-世界.jpg',

    // ==================== 权杖组 ====================
    // 正位
    'wand_01_upright': '/images/minor/权杖/正位/权杖-1.png',
    'wand_02_upright': '/images/minor/权杖/正位/权杖-2.png',
    'wand_03_upright': '/images/minor/权杖/正位/权杖-3.png',
    'wand_04_upright': '/images/minor/权杖/正位/权杖-4.png',
    'wand_05_upright': '/images/minor/权杖/正位/权杖-5.png',
    'wand_06_upright': '/images/minor/权杖/正位/权杖-6.png',
    'wand_07_upright': '/images/minor/权杖/正位/权杖-7.png',
    'wand_08_upright': '/images/minor/权杖/正位/权杖-8.png',
    'wand_09_upright': '/images/minor/权杖/正位/权杖-9.png',
    'wand_10_upright': '/images/minor/权杖/正位/权杖-10.png',
    'wand_page_upright': '/images/minor/权杖/正位/权杖-弄臣.png',
    'wand_knight_upright': '/images/minor/权杖/正位/权杖-骑士.png',
    'wand_queen_upright': '/images/minor/权杖/正位/权杖-女王.png',
    'wand_king_upright': '/images/minor/权杖/正位/权杖-国王.png',
    
    // 逆位
    'wand_01_reversed': '/images/minor/权杖/逆位/权杖-1.png',
    'wand_02_reversed': '/images/minor/权杖/逆位/权杖-2.png',
    'wand_03_reversed': '/images/minor/权杖/逆位/权杖-3.png',
    'wand_04_reversed': '/images/minor/权杖/逆位/权杖-4.png',
    'wand_05_reversed': '/images/minor/权杖/逆位/权杖-5.png',
    'wand_06_reversed': '/images/minor/权杖/逆位/权杖-6.png',
    'wand_07_reversed': '/images/minor/权杖/逆位/权杖-7.png',
    'wand_08_reversed': '/images/minor/权杖/逆位/权杖-8.png',
    'wand_09_reversed': '/images/minor/权杖/逆位/权杖-9.png',
    'wand_10_reversed': '/images/minor/权杖/逆位/权杖-10.png',
    'wand_page_reversed': '/images/minor/权杖/逆位/权杖-弄臣.png',
    'wand_knight_reversed': '/images/minor/权杖/逆位/权杖-骑士.png',
    'wand_queen_reversed': '/images/minor/权杖/逆位/权杖-女王.png',
    'wand_king_reversed': '/images/minor/权杖/逆位/权杖-国王.png',

    // ==================== 圣杯组 ====================
    // 正位
    'cup_01_upright': '/images/minor/圣杯/正位/圣杯-1.png',
    'cup_02_upright': '/images/minor/圣杯/正位/圣杯-2.png',
    'cup_03_upright': '/images/minor/圣杯/正位/圣杯-3.png',
    'cup_04_upright': '/images/minor/圣杯/正位/圣杯-4.png',
    'cup_05_upright': '/images/minor/圣杯/正位/圣杯-5.png',
    'cup_06_upright': '/images/minor/圣杯/正位/圣杯-6.png',
    'cup_07_upright': '/images/minor/圣杯/正位/圣杯-7.png',
    'cup_08_upright': '/images/minor/圣杯/正位/圣杯-8.png',
    'cup_09_upright': '/images/minor/圣杯/正位/圣杯-9.png',
    'cup_10_upright': '/images/minor/圣杯/正位/圣杯-10.png',
    'cup_page_upright': '/images/minor/圣杯/正位/圣杯-弄臣.png',
    'cup_knight_upright': '/images/minor/圣杯/正位/圣杯-骑士.png',
    'cup_queen_upright': '/images/minor/圣杯/正位/圣杯-女王.png',
    'cup_king_upright': '/images/minor/圣杯/正位/圣杯-国王.png',
    
    // 逆位
    'cup_01_reversed': '/images/minor/圣杯/逆位/圣杯-1.png',
    'cup_02_reversed': '/images/minor/圣杯/逆位/圣杯-2.png',
    'cup_03_reversed': '/images/minor/圣杯/逆位/圣杯-3.png',
    'cup_04_reversed': '/images/minor/圣杯/逆位/圣杯-4.png',
    'cup_05_reversed': '/images/minor/圣杯/逆位/圣杯-5.png',
    'cup_06_reversed': '/images/minor/圣杯/逆位/圣杯-6.png',
    'cup_07_reversed': '/images/minor/圣杯/逆位/圣杯-7.png',
    'cup_08_reversed': '/images/minor/圣杯/逆位/圣杯-8.png',
    'cup_09_reversed': '/images/minor/圣杯/逆位/圣杯-9.png',
    'cup_10_reversed': '/images/minor/圣杯/逆位/圣杯-10.png',
    'cup_page_reversed': '/images/minor/圣杯/逆位/圣杯-弄臣.png',
    'cup_knight_reversed': '/images/minor/圣杯/逆位/圣杯-骑士.png',
    'cup_queen_reversed': '/images/minor/圣杯/逆位/圣杯-女王.png',
    'cup_king_reversed': '/images/minor/圣杯/逆位/圣杯-国王.png',

    // ==================== 宝剑组 ====================
    // 正位
    'sword_01_upright': '/images/minor/宝剑/正位/宝剑-1.png',
    'sword_02_upright': '/images/minor/宝剑/正位/宝剑-2.png',
    'sword_03_upright': '/images/minor/宝剑/正位/宝剑-3.png',
    'sword_04_upright': '/images/minor/宝剑/正位/宝剑-4.png',
    'sword_05_upright': '/images/minor/宝剑/正位/宝剑-5.png',
    'sword_06_upright': '/images/minor/宝剑/正位/宝剑-6.png',
    'sword_07_upright': '/images/minor/宝剑/正位/宝剑-7.png',
    'sword_08_upright': '/images/minor/宝剑/正位/宝剑-8.png',
    'sword_09_upright': '/images/minor/宝剑/正位/宝剑-9.png',
    'sword_10_upright': '/images/minor/宝剑/正位/宝剑-10.png',
    'sword_page_upright': '/images/minor/宝剑/正位/宝剑-弄臣.png',
    'sword_knight_upright': '/images/minor/宝剑/正位/宝剑-骑士.png',
    'sword_queen_upright': '/images/minor/宝剑/正位/宝剑-女王.png',
    'sword_king_upright': '/images/minor/宝剑/正位/宝剑-国王.png',
    
    // 逆位
    'sword_01_reversed': '/images/minor/宝剑/逆位/宝剑-1.png',
    'sword_02_reversed': '/images/minor/宝剑/逆位/宝剑-2.png',
    'sword_03_reversed': '/images/minor/宝剑/逆位/宝剑-3.png',
    'sword_04_reversed': '/images/minor/宝剑/逆位/宝剑-4.png',
    'sword_05_reversed': '/images/minor/宝剑/逆位/宝剑-5.png',
    'sword_06_reversed': '/images/minor/宝剑/逆位/宝剑-6.png',
    'sword_07_reversed': '/images/minor/宝剑/逆位/宝剑-7.png',
    'sword_08_reversed': '/images/minor/宝剑/逆位/宝剑-8.png',
    'sword_09_reversed': '/images/minor/宝剑/逆位/宝剑-9.png',
    'sword_10_reversed': '/images/minor/宝剑/逆位/宝剑-10.png',
    'sword_page_reversed': '/images/minor/宝剑/逆位/宝剑-弄臣.png',
    'sword_knight_reversed': '/images/minor/宝剑/逆位/宝剑-骑士.png',
    'sword_queen_reversed': '/images/minor/宝剑/逆位/宝剑-女王.png',
    'sword_king_reversed': '/images/minor/宝剑/逆位/宝剑-国王.png',

    // ==================== 星币组 ====================
    // 正位
    'pentacle_01_upright': '/images/minor/星币/正位/星币-1.png',
    'pentacle_02_upright': '/images/minor/星币/正位/星币-2.png',
    'pentacle_03_upright': '/images/minor/星币/正位/星币-3.png',
    'pentacle_04_upright': '/images/minor/星币/正位/星币-4.png',
    'pentacle_05_upright': '/images/minor/星币/正位/星币-5.png',
    'pentacle_06_upright': '/images/minor/星币/正位/星币-6.png',
    'pentacle_07_upright': '/images/minor/星币/正位/星币-7.png',
    'pentacle_08_upright': '/images/minor/星币/正位/星币-8.png',
    'pentacle_09_upright': '/images/minor/星币/正位/星币-9.png',
    'pentacle_10_upright': '/images/minor/星币/正位/星币-10.png',
    'pentacle_page_upright': '/images/minor/星币/正位/星币-弄臣.png',
    'pentacle_knight_upright': '/images/minor/星币/正位/星币-骑士.png',
    'pentacle_queen_upright': '/images/minor/星币/正位/星币-女王.png',
    'pentacle_king_upright': '/images/minor/星币/正位/星币-国王.png',
    
    // 逆位
    'pentacle_01_reversed': '/images/minor/星币/逆位/星币-1.png',
    'pentacle_02_reversed': '/images/minor/星币/逆位/星币-2.png',
    'pentacle_03_reversed': '/images/minor/星币/逆位/星币-3.png',
    'pentacle_04_reversed': '/images/minor/星币/逆位/星币-4.png',
    'pentacle_05_reversed': '/images/minor/星币/逆位/星币-5.png',
    'pentacle_06_reversed': '/images/minor/星币/逆位/星币-6.png',
    'pentacle_07_reversed': '/images/minor/星币/逆位/星币-7.png',
    'pentacle_08_reversed': '/images/minor/星币/逆位/星币-8.png',
    'pentacle_09_reversed': '/images/minor/星币/逆位/星币-9.png',
    'pentacle_10_reversed': '/images/minor/星币/逆位/星币-10.png',
    'pentacle_page_reversed': '/images/minor/星币/逆位/星币-弄臣.png',
    'pentacle_knight_reversed': '/images/minor/星币/逆位/星币-骑士.png',
    'pentacle_queen_reversed': '/images/minor/星币/逆位/星币-女王.png',
    'pentacle_king_reversed': '/images/minor/星币/逆位/星币-国王.png',
};

// 获取图片路径
function getCardImagePath(imageKey) {
    const path = TAROT_IMAGES[imageKey];
    if (path) {
        return path;
    }
    // 没有图片时返回空字符串，触发文字降级显示
    console.warn('未找到图片:', imageKey);
    return '';
}

// 预加载单张图片
function preloadImage(imageKey) {
    return new Promise((resolve) => {
        const path = getCardImagePath(imageKey);
        if (!path) {
            resolve(false);
            return;
        }
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = path;
    });
}

// 批量预加载
async function preloadImages(imageKeys) {
    const promises = imageKeys.map(key => preloadImage(key));
    const results = await Promise.all(promises);
    return results.filter(r => r === true).length;
}