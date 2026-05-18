// 塔罗牌占卜 - script.js

//const API_BASE_URL = 'http://12dw26gb70566.vicp.fun/api';
const API_BASE_URL = 'http://127.0.0.1:8081/api';

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
const drawCountSelect = document.getElementById('drawCountSelect');
const customDrawCount = document.getElementById('customDrawCount');

// ========== 工具函数 ==========

// HTML 转义（用浏览器引擎，比手写正则更稳）
function escapeHtml(text) {
    if (text == null) return '';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

// Markdown → HTML（先转义防 XSS，再转格式）
function formatMarkdown(text) {
    if (!text) return '';
    let html = escapeHtml(text);
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
    html = html.replace(/\n/g, '<br>');
    return html;
}

// Toast 提示（替代 alert）
function showToast(message, type = 'error') {
    const existing = document.querySelector('.toast-msg');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.style.cssText = `
        position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
        padding: 12px 24px; border-radius: 25px; font-size: 14px; z-index: 9999;
        animation: fadeIn 0.3s ease-out; max-width: 90%; text-align: center;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    if (type === 'error') {
        toast.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        toast.style.color = 'white';
    }
    else if (type === 'info') {
    toast.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';  // 橙色
    }    
    else {
        toast.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        toast.style.color = 'white';
    }
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

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
    const displayText = `${card.name} ${card.upright ? '正位' : '逆位'}`;

    // 安全拼接：只转义数据值，HTML 结构保留
    const safeName = escapeHtml(card.name);
    const safeType = escapeHtml(card.type);
    const safeMeaning = escapeHtml(card.meaning);
    const safeShortMeaning = escapeHtml(card.meaning.split('、')[0]);
    const safePosition = escapeHtml(positionText);
    const orientation = card.upright ? '正位' : '逆位';
    const orientationClass = card.upright ? 'upright' : 'reversed';

    div.innerHTML = `
        <div class="card-image-container ${!realImagePath ? 'fallback-mode' : ''}">
            ${realImagePath ? `
                <img class="card-image lazy-load" data-src="${realImagePath}" alt="${safeName}"
                     src="/images/卡背/卡背-1.webp" onerror="this.parentElement.classList.add('fallback-mode')">
            ` : ''}
            <div class="card-text-fallback">
                <div class="text-fallback-content">
                    <div class="tarot-symbol">🔮</div>
                    <div class="card-name-large">${safeName}</div>
                    <div class="card-orientation ${orientationClass}">${orientation}</div>
                    <div class="card-type-badge">${safeType}</div>
                    <div class="card-short-meaning">${safeShortMeaning}</div>
                </div>
            </div>
            <div class="card-overlay ${orientationClass}">${orientation}</div>
        </div>
        <div class="card-info">
            <div class="card-name">${safeName}</div>
            <span class="card-type ${card.type === '大阿卡那' ? 'major' : 'minor'}">${safeType}</span>
            <p class="card-meaning">${safeMeaning}</p>
            <div class="card-position">📌 ${safePosition}</div>
        </div>
    `;

    // 懒加载
    const img = div.querySelector('.lazy-load');
    if (img && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImg = entry.target;
                    const realSrc = lazyImg.dataset.src;
                    const tempImg = new Image();
                    tempImg.onload = () => {
                        lazyImg.style.transition = 'opacity 0.3s ease';
                        lazyImg.style.opacity = '0.6';
                        lazyImg.src = realSrc;
                        setTimeout(() => { lazyImg.style.opacity = '1'; }, 10);
                        setTimeout(() => { lazyImg.style.transition = ''; }, 350);
                    };
                    tempImg.src = realSrc;
                    lazyImg.classList.remove('lazy-load');
                    observer.unobserve(lazyImg);
                }
            });
        });
        observer.observe(img);
    } else if (img) {
        img.src = img.dataset.src;
    }

    // 点击放大
    const imgForClick = div.querySelector('.card-image');
    const fallback = div.querySelector('.card-text-fallback');
    if (imgForClick) imgForClick.addEventListener('click', () => showFullImage(realImagePath, card.name));
    if (fallback) fallback.addEventListener('click', () => showFullImage(null, card.name, card));

    return div;
}

// 显示全屏图片或文字
function showFullImage(imagePath, cardName, card) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    const safeName = escapeHtml(cardName);

    if (imagePath && imagePath !== '/images/back.jpg') {
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${imagePath}" alt="${safeName}">
                <div class="modal-caption">${safeName}</div>
            </div>
        `;
    } else if (card) {
        modal.innerHTML = `
            <div class="modal-content" style="text-align:center; color:white; padding:40px;">
                <span class="close-modal">&times;</span>
                <div style="font-size:48px; margin:20px;">🔮</div>
                <div style="font-size:24px; font-weight:bold; margin:10px;">${escapeHtml(card.name)}</div>
                <div style="font-size:16px; margin:10px; padding:5px 15px; border-radius:20px; display:inline-block;
                     background:${card.upright ? 'rgba(0,184,148,0.9)' : 'rgba(214,48,49,0.9)'}">
                    ${card.upright ? '正位' : '逆位'}
                </div>
                <div style="margin:10px; opacity:0.7;">${escapeHtml(card.type)}</div>
                <div style="margin:15px; line-height:1.8;">${escapeHtml(card.meaning)}</div>
            </div>
        `;
    }

    document.body.appendChild(modal);
    modal.querySelector('.close-modal').onclick = () => modal.remove();
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

    } else if (cards.length === 3) {
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

    } else {
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

// AI 分析
async function analyzeWithAI() {
    if (!currentCards.length) return;

    const aiSection = document.getElementById('aiReadingSection');
    if (aiSection) aiSection.remove();

    const aiReadingDiv = document.createElement('div');
    aiReadingDiv.id = 'aiReadingSection';
    aiReadingDiv.className = 'ai-reading-section';
    aiReadingDiv.innerHTML = `
        <div class="ai-reading-header">
            <h3>🤖 AI智能解读</h3>
            <span class="ai-badge">生成中...</span>
        </div>
        <div style="display:flex; align-items:center; gap:10px; color:#999;">
            <span class="ai-loading"></span>
            AI正在结合牌面和您的问题进行分析，请稍候...
        </div>
    `;

    const readingDiv = document.getElementById('reading');
    readingDiv.parentNode.insertBefore(aiReadingDiv, readingDiv.nextSibling);

    try {
        const spreadType = currentCards.length === 1 ? 'single'
            : currentCards.length === 3 ? 'three' : 'multi';

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
            <p>⚠️ AI服务暂时不可用，当前使用基础解读模式。</p>
            <p style="color:#999; font-size:0.8rem;">如需使用AI分析，请在后端配置DeepSeek API Key。</p>
            <button class="retry-ai-btn" onclick="analyzeWithAI()">🔄 重试AI分析</button>
        `;
    }
}

// 抽牌
async function drawCards() {
    const deckType = parseInt(document.querySelector('input[name="deckType"]:checked').value);

    let drawCount;
    const selectValue = drawCountSelect.value;
    if (selectValue === 'custom') {
        drawCount = parseInt(customDrawCount.value);
        if (isNaN(drawCount) || drawCount < 1) {
            drawCount = 1;
            customDrawCount.value = '1';
        } else if (drawCount > 78) {
            drawCount = 78;
            customDrawCount.value = '78';
            showToast('⚠️ 最多只能抽78张，已自动调整', 'info');
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
            showToast('抽牌失败：' + (data.message || '未知错误'));
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('连接失败，请确保后端服务已启动');
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
        cardsContainer.appendChild(createCardElement(card, index, cards.length));
    });

    // 基础解读：先转义再换行
    const basicReading = generateBasicReading(cards, question);
    readingContent.innerHTML = escapeHtml(basicReading).replace(/\n/g, '<br>');

    aiAnalysisToggle.checked = false;
    const existingAiSection = document.getElementById('aiReadingSection');
    if (existingAiSection) existingAiSection.remove();

    result.classList.remove('hidden');
    result.scrollIntoView({ behavior: 'smooth' });

    // 预加载图片
    cards.forEach(card => {
        const img = new Image();
        const path = getCardImagePath(card.imageKey);
        if (path) img.src = path;
    });
}

// 重置
function reset() {
    result.classList.add('hidden');
    document.getElementById('question').value = '';
    document.querySelector('input[value="3"]').checked = true;
    drawCountSelect.value = '3';
    customDrawCount.value = '3';
    // 触发状态更新
    updateCustomInputState();
    aiAnalysisToggle.checked = false;
    currentCards = [];
    currentQuestion = '';
}

// 自定义输入框状态
function updateCustomInputState() {
    const selectedValue = drawCountSelect.value;
    if (selectedValue === 'custom') {
        customDrawCount.disabled = false;
        customDrawCount.style.background = 'white';
        customDrawCount.style.color = '#333';
        customDrawCount.style.borderColor = '#764ba2';
        if (!customDrawCount.value || parseInt(customDrawCount.value) < 1) {
            customDrawCount.value = '3';
        }
    } else {
        customDrawCount.disabled = true;
        customDrawCount.style.background = '#f5f5f5';
        customDrawCount.style.color = '#999';
        customDrawCount.style.borderColor = '#e0e0e0';
        customDrawCount.value = selectedValue;
    }
}

// ========== 事件监听 ==========
drawBtn.addEventListener('click', drawCards);
resetBtn.addEventListener('click', reset);

aiAnalysisToggle.addEventListener('change', function () {
    if (this.checked) {
        analyzeWithAI();
    } else {
        const aiSection = document.getElementById('aiReadingSection');
        if (aiSection) aiSection.remove();
    }
});

drawCountSelect.addEventListener('change', updateCustomInputState);

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔮 塔罗牌应用已加载');
    updateCustomInputState();
});
