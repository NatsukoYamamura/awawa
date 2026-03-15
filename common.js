/**
 * 半笺绘梦 - 共用功能脚本 (纯白背景版)
 * 功能：导航高亮 | 工具函数
 */

// ===== 配置项 =====
const CommonConfig = {
  enableAutoRefresh: false // 已禁用背景切换
};

// ===== 核心功能 =====

/**
 * 设置导航栏高亮
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
 */
function initCommon() {
  setActiveNav();
}

// ===== 工具函数 =====

/**
 * 平滑滚动到指定元素
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
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    alert('已复制到剪贴板！');
    return true;
  } catch (err) {
    console.error('复制失败:', err);
    alert('复制失败，请手动复制');
    return false;
  }
}

// ===== 页面初始化 =====
document.addEventListener('DOMContentLoaded', initCommon);