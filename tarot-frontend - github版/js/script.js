const API_BASE_URL = 'http://12dw26gb70566.vicp.fun/api';

let currentCards = [];
let currentQuestion = '';

// DOM 元素
const drawBtn = document.getElementById('drawBtn');
const resetBtn = document.getElementById('resetBtn');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const cardsContainer = document.getElementById('cardsContainer');
const readingContent = document.getElementById('readingContent');
const questionDisplay = document.getElementById('questionDisplay');
const aiAnalysisToggle = document.getElementById('aiAnalysisToggle');

// 获取位置文字
function getPositionText(index, total) {
    const positions = ['过去', '现在', '未来', '第四张', '第五张', '第六张', '第七张', '第八张', '第九张', '第十张'];
    if (total === 3 && index < 3) return positions[index];
    if (index < 10) return positions[index];
    return `第${index + 1}张`;
}

// 创建卡牌元素
function createCardElement(card, index, total) {
    const div = document.createElement('div');
    div.className = 'card-item';
    
    const positionText = getPositionText(index, total);
    const realImagePath = getCardImagePath(card.imageKey);
    const backImagePath = '/images/卡背/卡背-1.webp';  // 卡背图片路径
    const displayText = `${card.name} ${card.upright ? '正位' : '逆位'}`;
    
    div.innerHTML = `
        <div class="card-image-container">
            <img 
                data-src="${realImagePath}"
                src="${backImagePath}" 
                alt="${displayText}" 
                class="card-image lazy-load"
                onerror="this.src='${backImagePath}'; this.parentElement.classList.add('fallback-mode');">
            <div class="card-text-fallback">
                <div class="text-fallback-content">
                    <div class="tarot-symbol">🔮</div>
                    <div class="card-name-large">${card.name}</div>
                    <div class="card-orientation ${card.upright ? 'upright' : 'reversed'}">
                        ${card.upright ? '正位' : '逆位'}
                    </div>
                    <div class="card-type-badge">${card.type}</div>
                    <div class="card-short-meaning">${card.meaning.split('、')[0]}</div>
                </div>
            </div>
            <div class="card-overlay ${card.upright ? 'upright' : 'reversed'}">
                ${card.upright ? '正位' : '逆位'}
            </div>
        </div>
        <div class="card-info">
            <div class="card-name">${card.name}</div>
            <div class="card-type ${card.type === '大阿卡那' ? 'major' : 'minor'}">${card.type}</div>
            <div class="card-meaning">${card.meaning}</div>
            <div class="card-position">📌 ${positionText}</div>
        </div>
    `;
    
    // 懒加载：图片进入视口才加载
    const img = div.querySelector('.lazy-load');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImg = entry.target;
                const realSrc = lazyImg.dataset.src;
                
                // 创建一个新图片来预加载
                const tempImg = new Image();
                tempImg.onload = () => {
                    // 预加载完成后，先添加过渡效果，再替换 src
                    lazyImg.style.transition = 'opacity 0.3s ease';
                    lazyImg.style.opacity = '0.6';
                    lazyImg.src = realSrc;
                    // 强制重绘后改变透明度
                    setTimeout(() => {
                        lazyImg.style.opacity = '1';
                    }, 10);
                    // 加载完成后清除过渡（避免影响 hover 效果）
                    setTimeout(() => {
                        lazyImg.style.transition = '';
                    }, 350);
                };
                tempImg.src = realSrc;
                
                lazyImg.classList.remove('lazy-load');
                observer.unobserve(lazyImg);
            }
        });
    });
    observer.observe(img);
} else {
    img.src = img.dataset.src;
}
    
    // 点击放大（保持不变）
    const imgForClick = div.querySelector('.card-image');
    const fallback = div.querySelector('.card-text-fallback');
    imgForClick.addEventListener('click', () => showFullImage(realImagePath, card.name));
    fallback.addEventListener('click', () => showFullImage(null, card.name, card));
    
    return div;
}

// 显示全屏图片或文字
function showFullImage(imagePath, cardName, card) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    
    if (imagePath && imagePath !== '/images/back.jpg') {
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${imagePath}" alt="${cardName}" onerror="this.src=''">
                <div class="modal-caption">${cardName}</div>
            </div>
        `;
    } else if (card) {
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 40px; border-radius: 20px; text-align: center; min-width: 250px;">
                    <div style="font-size: 48px; margin-bottom: 20px;">🔮</div>
                    <div style="font-size: 28px; font-weight: bold; margin-bottom: 10px; color: white;">${card.name}</div>
                    <div style="font-size: 18px; color: ${card.upright ? '#00b894' : '#d63031'}; margin-bottom: 15px;">${card.upright ? '正位' : '逆位'}</div>
                    <div style="font-size: 14px; color: rgba(255,255,255,0.8);">${card.type}</div>
                    <div style="font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 15px;">${card.meaning}</div>
                </div>
                <div class="modal-caption">${cardName}</div>
            </div>
        `;
    }
    
    document.body.appendChild(modal);
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// 生成基础解读
function generateBasicReading(cards, question) {
    let reading = '';
    
    if (cards.length === 1) {
        const card = cards[0];
        reading = `✨ 您抽到了 ${card.name}（${card.upright ? '正位' : '逆位'}）。\n\n`;
        reading += `📖 牌意解读：${card.meaning}。\n\n`;
        reading += card.upright 
            ? `💫 正位的${card.name}预示着积极的发展方向。建议您保持开放的心态，勇敢地迎接即将到来的机会。`
            : `💫 逆位的${card.name}提醒您需要重新审视当前的情况。也许有一些被忽视的问题需要您的关注。`;
    } 
    else if (cards.length === 3) {
        reading = `🔮 三牌阵解读（过去-现在-未来）🔮\n\n`;
        reading += `【过去】${cards[0].name}（${cards[0].upright ? '正位' : '逆位'}）：${cards[0].meaning}\n\n`;
        reading += `【现在】${cards[1].name}（${cards[1].upright ? '正位' : '逆位'}）：${cards[1].meaning}\n\n`;
        reading += `【未来】${cards[2].name}（${cards[2].upright ? '正位' : '逆位'}）：${cards[2].meaning}\n\n`;
        
        const uprightCount = cards.filter(c => c.upright).length;
        if (uprightCount >= 2) {
            reading += `📈 整体趋势：牌面显示积极能量较强，${question ? '您所问之事' : '当前的情况'}有较好的发展前景。`;
        } else if (uprightCount <= 1) {
            reading += `⚠️ 整体趋势：牌面显示当前存在一些挑战，需要您更加谨慎地应对。不要气馁，逆位牌往往是成长的机会。`;
        } else {
            reading += `⚖️ 整体趋势：牌面显示吉凶参半，结果取决于您的选择和行动。`;
        }
    }
    else {
        const uprightCount = cards.filter(c => c.upright).length;
        reading = `🎴 ${cards.length}张牌解读 🎴\n\n`;
        reading += `抽牌统计：正位 ${uprightCount} 张，逆位 ${cards.length - uprightCount} 张。\n\n`;
        reading += uprightCount > cards.length / 2 
            ? `整体能量偏向积极，多个正面牌的出现预示着好的发展趋势。`
            : `当前能量较为复杂，需要您静心思考，梳理当前的处境。`;
        reading += `\n\n建议您结合每张牌的具体含义，思考它们与您生活的关联。`;
    }
    
    if (question) {
        reading += `\n\n💭 针对您的问题「${question}」：\n塔罗牌为您提供了一个思考的框架，真正的答案往往在您的内心深处。`;
    }
    
    reading += `\n\n---\n✨ 温馨提示：占卜结果仅供参考，命运掌握在自己手中 ✨`;
    
    return reading;
}

function formatMarkdown(text) {
    if (!text) return '';
    
    let html = text;
    
    // 1. 处理粗体 **text** 
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 2. 处理斜体 *text*（但不影响列表标记）
    html = html.replace(/^[^*].*?(\*[^\*].*?\*).*?$/gm, function(match) {
        return match.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
    });
    // 简单的斜体处理
    html = html.replace(/(?<!\*)\*([^\*\n]+)\*(?!\*)/g, '<em>$1</em>');
    
    // 3. 处理换行
    html = html.replace(/\n/g, '<br>');
    
    // 4. 清理多余的空格
    html = html.replace(/<br><strong>/g, '<strong>');
    html = html.replace(/<\/strong><br>/g, '</strong>');
    html = html.replace(/<br><em>/g, '<em>');
    html = html.replace(/<\/em><br>/g, '</em>');
    
    return html;
}

// AI分析
async function analyzeWithAI() {
    if (!currentCards.length) return;
    
    const aiSection = document.getElementById('aiReadingSection');
    if (aiSection) aiSection.remove();
    
    const aiReadingDiv = document.createElement('div');
    aiReadingDiv.id = 'aiReadingSection';
    aiReadingDiv.className = 'ai-reading-section';
    aiReadingDiv.innerHTML = `
    <div class="ai-reading-header">
        <div class="ai-loading"></div>
        <h3>🤖 AI智能分析中</h3>
        <span class="ai-badge">生成中...</span>
    </div>
    <div class="ai-reading-content">AI正在结合牌面和您的问题进行分析，请稍候...</div>
`;
    
    const readingDiv = document.getElementById('reading');
    readingDiv.parentNode.insertBefore(aiReadingDiv, readingDiv.nextSibling);
    
    try {
        const spreadType = currentCards.length === 1 ? 'single' : 
                          currentCards.length === 3 ? 'three' : 'multi';
        
        const response = await fetch(`${API_BASE_URL}/ai/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                question: currentQuestion,
                cards: currentCards.map(card => ({
                    name: card.name,
                    type: card.type,
                    orientation: card.upright ? '正位' : '逆位',
                    meaning: card.meaning
                })),
                spreadType: spreadType
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
    const formattedContent = formatMarkdown(data.analysis);
    aiReadingDiv.innerHTML = `
        <div class="ai-reading-header">
            <h3>🤖 AI智能解读</h3>
            <span class="ai-badge">AI生成</span>
        </div>
        <div class="ai-reading-content">${formattedContent}</div>
        <button class="retry-ai-btn" onclick="analyzeWithAI()">🔄 重新生成AI解读</button>
    `;
        } else {
            throw new Error(data.message || 'AI分析失败');
        }
    } catch (error) {
        console.error('AI分析错误:', error);
        aiReadingDiv.innerHTML = `
            <div class="ai-reading-header">
                <h3>🤖 AI智能解读</h3>
                <span class="ai-badge">不可用</span>
            </div>
            <div class="ai-reading-content">
                ⚠️ AI服务暂时不可用，当前使用基础解读模式。<br>
                如需使用AI分析，请在后端配置OpenAI API Key。
            </div>
            <button class="retry-ai-btn" onclick="analyzeWithAI()">🔄 重试AI分析</button>
        `;
    }
}

// 抽牌
async function drawCards() {
    const deckType = parseInt(document.querySelector('input[name="deckType"]:checked').value);
    let drawCount;
    const selectValue = document.getElementById('drawCountSelect').value;
    if (selectValue === 'custom') {
        drawCount = parseInt(document.getElementById('customDrawCount').value);
        // 验证自定义数量
        if (isNaN(drawCount) || drawCount < 1) {
            drawCount = 1;
        } else if (drawCount > 78) {
            drawCount = 78;
            const warning = document.getElementById('countWarning');
            warning.textContent = '⚠️ 最多只能抽78张，已自动调整为78';
            warning.style.display = 'block';
            setTimeout(() => {
                warning.style.display = 'none';
            }, 3000);
        }
    } else {
        drawCount = parseInt(selectValue);
    }
    currentQuestion = document.getElementById('question').value.trim();
    
    drawBtn.disabled = true;
    loading.classList.remove('hidden');
    result.classList.add('hidden');
    
    try {
        const response = await fetch(`${API_BASE_URL}/tarot/draw`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deckType: deckType, drawCount: drawCount })
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentCards = data.cards;
            displayResult(currentCards, currentQuestion);
        } else {
            alert('抽牌失败：' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('连接失败，请确保后端服务已启动（http://localhost:8081）');
    } finally {
        drawBtn.disabled = false;
        loading.classList.add('hidden');
    }
}

// 显示结果
function displayResult(cards, question) {
    if (question) {
        questionDisplay.textContent = `📌 问题：${question}`;
        questionDisplay.classList.remove('hidden');
    } else {
        questionDisplay.classList.add('hidden');
    }
    
    cardsContainer.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = createCardElement(card, index, cards.length);
        cardsContainer.appendChild(cardElement);
    });
    
    const basicReading = generateBasicReading(cards, question);
    readingContent.innerHTML = basicReading.replace(/\n/g, '<br>');
    
    aiAnalysisToggle.checked = false;
    const existingAiSection = document.getElementById('aiReadingSection');
    if (existingAiSection) existingAiSection.remove();
    
    result.classList.remove('hidden');
    result.scrollIntoView({ behavior: 'smooth' });
    
    // 预加载图片
    cards.forEach(card => {
        const img = new Image();
        img.src = getCardImagePath(card.imageKey);
    });
}

// 重置
function reset() {
    result.classList.add('hidden');
    document.getElementById('question').value = '';
    document.querySelector('input[value="3"]').checked = true;
    drawCountSelect.value = '3';
    customDrawCount.style.display = 'none';
    customDrawCount.value = '3';
    aiAnalysisToggle.checked = false;
    currentCards = [];
    currentQuestion = '';
}
// 事件监听
drawBtn.addEventListener('click', drawCards);
resetBtn.addEventListener('click', reset);
aiAnalysisToggle.addEventListener('change', function() {
    if (this.checked) analyzeWithAI();
    else {
        const aiSection = document.getElementById('aiReadingSection');
        if (aiSection) aiSection.remove();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔮 塔罗牌应用已加载');
    
    // 获取元素
    const drawCountSelect = document.getElementById('drawCountSelect');
    const customDrawCount = document.getElementById('customDrawCount');
    
    // 初始化：如果不是自定义模式，禁用输入框
    function updateCustomInputState() {
    const selectedValue = drawCountSelect.value;
    
    if (selectedValue === 'custom') {
        customDrawCount.disabled = false;
        customDrawCount.style.background = 'white';
        customDrawCount.style.color = '#333';
        customDrawCount.style.borderColor = '#764ba2';
        // 如果输入框为空或无效，给个默认值
        if (!customDrawCount.value || parseInt(customDrawCount.value) < 1) {
            customDrawCount.value = '3';
        }
    } else {
        customDrawCount.disabled = true;
        customDrawCount.style.background = '#f5f5f5';
        customDrawCount.style.color = '#999';
        customDrawCount.style.borderColor = '#e0e0e0';
        // 关键：把输入框的值改成当前选中的数量
        customDrawCount.value = selectedValue;
    }
}
    
    // 监听下拉框变化
    drawCountSelect.addEventListener('change', updateCustomInputState);
    
    // 初始化状态
    updateCustomInputState();
});

// 修改 drawCards 函数
async function drawCards() {
    const deckType = parseInt(document.querySelector('input[name="deckType"]:checked').value);
    
    // 获取 drawCount
    let drawCount;
    const selectValue = document.getElementById('drawCountSelect').value;
    
    if (selectValue === 'custom') {
        drawCount = parseInt(document.getElementById('customDrawCount').value);
        // 验证
        if (isNaN(drawCount) || drawCount < 1) {
            drawCount = 1;
            document.getElementById('customDrawCount').value = '1';
        } else if (drawCount > 78) {
            drawCount = 78;
            document.getElementById('customDrawCount').value = '78';
            const warning = document.getElementById('countWarning');
            warning.textContent = '⚠️ 最多只能抽78张，已自动调整';
            warning.style.display = 'block';
            setTimeout(() => {
                warning.style.display = 'none';
            }, 3000);
        }
    } else {
        drawCount = parseInt(selectValue);
    }
    
    currentQuestion = document.getElementById('question').value.trim();
    
    drawBtn.disabled = true;
    loading.classList.remove('hidden');
    result.classList.add('hidden');
    
    try {
        const response = await fetch(`${API_BASE_URL}/tarot/draw`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deckType: deckType, drawCount: drawCount })
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentCards = data.cards;
            displayResult(currentCards, currentQuestion);
        } else {
            alert('抽牌失败：' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('连接失败，请确保后端服务已启动');
    } finally {
        drawBtn.disabled = false;
        loading.classList.add('hidden');
    }
}

function reset() {
    result.classList.add('hidden');
    document.getElementById('question').value = '';
    document.querySelector('input[value="3"]').checked = true;
    
    const drawCountSelect = document.getElementById('drawCountSelect');
    const customDrawCount = document.getElementById('customDrawCount');
    drawCountSelect.value = '3';
    customDrawCount.value = '3';  // 这行已经有了，没问题
    
    // 触发状态更新
    const event = new Event('change');
    drawCountSelect.dispatchEvent(event);
    
    aiAnalysisToggle.checked = false;
    currentCards = [];
    currentQuestion = '';
}