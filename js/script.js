// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播图
    initCarousel();
    
    // 初始化评分系统
    initRating();
    
    // 初始化筛选功能
    initFilters();
    
    // 初始化搜索功能
    initSearch();
});

// 轮播图功能
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.carousel-control.prev');
    const nextBtn = carousel.querySelector('.carousel-control.next');
    let currentIndex = 0;
    const itemCount = items.length;
    
    // 显示当前轮播项
    function showItem(index) {
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // 下一张
    function nextItem() {
        currentIndex = (currentIndex + 1) % itemCount;
        showItem(currentIndex);
    }
    
    // 上一张
    function prevItem() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        showItem(currentIndex);
    }
    
    // 自动轮播
    let autoSlide = setInterval(nextItem, 5000);
    
    // 点击事件
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            clearInterval(autoSlide);
            nextItem();
            autoSlide = setInterval(nextItem, 5000);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(autoSlide);
            prevItem();
            autoSlide = setInterval(nextItem, 5000);
        });
    }
    
    // 初始化显示第一张
    showItem(currentIndex);
}

// 评分系统功能
function initRating() {
    const ratingStars = document.querySelectorAll('.rating-stars .star');
    const ratingValue = document.getElementById('rating-value');
    if (!ratingStars.length) return;
    
    ratingStars.forEach((star, index) => {
        star.addEventListener('click', function() {
            // 移除所有星星的active类
            ratingStars.forEach(s => s.classList.remove('active'));
            // 为当前及之前的星星添加active类
            for (let i = 0; i <= index; i++) {
                ratingStars[i].classList.add('active');
            }
            // 更新评分值显示
            if (ratingValue) {
                ratingValue.textContent = (index + 1) + '/5';
            }
        });
    });
}

// 筛选功能
function initFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    if (!filterOptions.length) return;
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 切换active类
            this.classList.toggle('active');
            // 执行筛选逻辑
            performFilter();
        });
    });
}

// 执行筛选
function performFilter() {
    // 获取所有选中的筛选选项
    const selectedFilters = document.querySelectorAll('.filter-option.active');
    const selectedFilterTexts = Array.from(selectedFilters).map(option => option.textContent.toLowerCase());
    
    // 获取所有游戏卡片
    const gameCards = document.querySelectorAll('.game-card');
    let visibleCount = 0;
    
    gameCards.forEach(card => {
        // 获取卡片中的文本内容
        const cardText = card.textContent.toLowerCase();
        
        // 检查是否匹配所有选中的筛选条件
        let isMatch = true;
        
        for (const filter of selectedFilterTexts) {
            // 特殊处理"全部"选项
            if (filter === '全部') {
                continue;
            }
            // 检查卡片文本是否包含筛选条件
            if (!cardText.includes(filter)) {
                isMatch = false;
                break;
            }
        }
        
        if (isMatch) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // 显示筛选结果提示
    if (selectedFilterTexts.length > 0) {
        alert(`筛选结果: ${visibleCount} 个游戏`);
    }
}

// 搜索功能
function initSearch() {
    const searchForm = document.querySelector('.search-form');
    if (!searchForm) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchInput = this.querySelector('.search-input');
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            console.log('搜索:', searchTerm);
            // 执行搜索逻辑
            performSearch(searchTerm);
        }
    });
}

// 执行搜索
function performSearch(searchTerm) {
    // 获取所有游戏卡片或评测卡片
    const gameCards = document.querySelectorAll('.game-card, .review-card, .ranking-item');
    let foundCount = 0;
    
    gameCards.forEach(card => {
        // 获取卡片中的文本内容
        const cardText = card.textContent.toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        
        // 检查是否包含搜索词
        if (cardText.includes(searchLower)) {
            card.style.display = 'block';
            foundCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // 显示搜索结果提示
    if (foundCount > 0) {
        alert(`找到 ${foundCount} 个相关结果`);
    } else {
        alert('未找到相关结果');
    }
}

// 平滑滚动
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 导航栏滚动效果
function navScrollEffect() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(26, 26, 26, 1)';
            header.style.boxShadow = 'none';
        }
    });
}

// 加载更多功能
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', function() {
        // 这里可以添加加载更多逻辑
        console.log('加载更多');
        // 模拟加载中
        this.innerHTML = '加载中...';
        
        // 模拟异步加载
        setTimeout(() => {
            this.innerHTML = '加载更多';
            // 这里可以添加新内容
        }, 1000);
    });
}

// 表单验证
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#f44336';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('请填写所有必填字段');
            }
        });
    });
}

// 页面加载时初始化所有功能
window.onload = function() {
    smoothScroll();
    navScrollEffect();
    initLoadMore();
    initFormValidation();
};
