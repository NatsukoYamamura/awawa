/**
 * 半笺绘梦 - 共用功能脚本
 * 功能：随机背景切换 | 导航高亮 | 工具函数
 */

// ===== 配置项 =====
const CommonConfig = {
    backgroundAPI: 'https://www.loliapi.com/acg/',
    autoRefreshInterval: 300000, // 5分钟自动切换（毫秒）
    enableAutoRefresh: false     // 默认关闭，按需开启
};

// ===== 核心功能 =====

/**
 * 刷新随机背景图
 * @param {boolean} force - 是否强制刷新（忽略缓存）
 */
function refreshBackground(force = true) {
    const param = force ? `?_=${Date.now()}` : '';
    document.body.style.backgroundImage = `url('${CommonConfig.backgroundAPI}${param}')`;
}

/**
 * 设置导航栏高亮
 * 根据当前页面路径自动添加 .active 类
 */
function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });
}

/**
 * 初始化共用功能
 * 页面加载完成后自动调用
 */
function initCommon() {
    refreshBackground();
    setActiveNav();

    // 可选：定时自动切换背景
    if (CommonConfig.enableAutoRefresh) {
        setInterval(() => refreshBackground(true), CommonConfig.autoRefreshInterval);
    }
}

// ===== 工具函数 =====

/**
 * 防抖函数 - 限制函数执行频率
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 平滑滚动到指定元素
 * @param {string} selector - CSS选择器
 * @param {number} offset - 滚动偏移量（用于固定导航栏）
 */
function smoothScrollTo(selector, offset = 80) {
    const el = document.querySelector(selector);
    if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} 是否成功
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('复制失败:', err);
        return false;
    }
}

// ===== 页面初始化 =====
document.addEventListener('DOMContentLoaded', initCommon);

// ===== 导出（便于其他脚本调用） =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { refreshBackground, setActiveNav, debounce, smoothScrollTo, copyToClipboard };
}