document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const character = document.querySelector('.character');
    const message = document.querySelector('.message');
    const buttons = document.querySelector('.buttons');
    
    let noClickCount = 0;
    
    // 点击"可以"按钮的效果
    yesBtn.addEventListener('click', function() {
        // 更改消息内容
        message.innerHTML = '<p>!!!喜欢你!!! (>ω<)♡°1></p>';
        
        // 更改卡通形象为两个拥抱的形象
        character.innerHTML = `
            <svg width="200" height="200" viewBox="0 0 100 100">
                <!-- 左边的小猫 -->
                <circle cx="35" cy="45" r="15" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                <circle cx="30" cy="40" r="2" fill="#333"/>
                <circle cx="40" cy="40" r="2" fill="#333"/>
                <path d="M32 45 Q35 48 38 45" stroke="#333" stroke-width="1" fill="none"/>
                <rect x="30" y="55" width="10" height="10" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                <path d="M30 60 L25 65" stroke="#333" stroke-width="1"/>
                <path d="M40 60 L45 65" stroke="#333" stroke-width="1"/>
                <circle cx="25" cy="45" r="3" fill="#e0e0e0"/>
                <path d="M22 50 Q20 55 18 60" stroke="#333" stroke-width="1"/>
                
                <!-- 右边的小猫 -->
                <circle cx="65" cy="45" r="15" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                <circle cx="60" cy="40" r="2" fill="#333"/>
                <circle cx="70" cy="40" r="2" fill="#333"/>
                <path d="M62 45 Q65 48 68 45" stroke="#333" stroke-width="1" fill="none"/>
                <rect x="60" y="55" width="10" height="10" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                <path d="M60 60 L55 65" stroke="#333" stroke-width="1"/>
                <path d="M70 60 L75 65" stroke="#333" stroke-width="1"/>
                <circle cx="75" cy="45" r="3" fill="#e0e0e0"/>
                <path d="M78 50 Q80 55 82 60" stroke="#333" stroke-width="1"/>
                
                <!-- 心形 -->
                <path d="M50 35 Q55 30 60 35 T50 45" fill="#ff6b81" stroke="#333" stroke-width="1"/>
            </svg>
        `;
        
        // 更改按钮
        buttons.innerHTML = '<button id="shareBtn" class="yes-btn">分享给朋友</button>';
        
        // 添加分享按钮的功能
        document.getElementById('shareBtn').addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: '新年奶茶请求',
                    text: '快来看看这个搞怪的新年奶茶请求游戏！',
                    url: window.location.href
                });
            } else {
                // 复制链接到剪贴板
                navigator.clipboard.writeText(window.location.href).then(function() {
                    alert('链接已复制到剪贴板，快去分享给朋友吧！');
                });
            }
        });
        
        // 添加庆祝动画
        character.style.animation = 'celebrate 0.5s ease-in-out 3';
        
        // 添加庆祝动画的CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes celebrate {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    });
    
    // 点击"不要"按钮的效果
    noBtn.addEventListener('click', function() {
        noClickCount++;
        
        // 检查是否是最后一次点击（第10次）
        if (noClickCount === 10) {
            // 隐藏蓝色按钮
            noBtn.style.display = 'none';
            
            // 显示消息
            message.innerHTML = '<p>因为你拒绝太多次，所以自动同意</p>';
            
            // 短暂延迟后自动触发同意按钮的点击事件
            setTimeout(() => {
                yesBtn.click();
            }, 1000);
            return;
        }
        
        // 增加"可以"按钮的大小（每次增大更多）
        const currentFontSize = parseInt(window.getComputedStyle(yesBtn).fontSize);
        const currentPadding = parseInt(window.getComputedStyle(yesBtn).padding);
        yesBtn.style.fontSize = (currentFontSize + 8) + 'px';
        yesBtn.style.padding = (currentPadding + 8) + 'px ' + (currentPadding * 2 + 16) + 'px';
        
        // 根据点击次数决定蓝色按钮的位置
        setTimeout(() => {
            // 确保蓝色按钮可见
            noBtn.style.display = 'block';
            noBtn.style.opacity = '1';
            noBtn.style.position = 'absolute';
            noBtn.style.zIndex = '10';
            
            // 获取容器和按钮的尺寸
            const container = document.querySelector('.container');
            const containerRect = container.getBoundingClientRect();
            const yesBtnRect = yesBtn.getBoundingClientRect();
            
            // 计算蓝色按钮相对于容器的位置
            const yesBtnLeft = yesBtnRect.left - containerRect.left;
            const yesBtnTop = yesBtnRect.top - containerRect.top;
            const yesBtnWidth = yesBtnRect.width;
            const yesBtnHeight = yesBtnRect.height;
            
            // 获取蓝色按钮自身的尺寸
            const buttonWidth = noBtn.offsetWidth || 100;
            const buttonHeight = noBtn.offsetHeight || 50;
            
            // 计算蓝色按钮的位置
            let finalX, finalY;
            
            // 如果点击次数小于等于10，前9次只上下移动，第10次移到右边
            if (noClickCount <= 9) {
                // 前9次不设置X位置，只设置Y位置，让按钮在红色按钮上方或下方
                if (noClickCount % 2 === 1) { // 奇数次点击，在红色按钮上方
                    finalY = yesBtnTop - buttonHeight - 10; // 上方10px
                } else { // 偶数次点击，在红色按钮下方
                    finalY = yesBtnTop + yesBtnHeight + 10; // 下方10px
                }
            } else if (noClickCount === 10) {
                // 第10次点击，蓝色按钮移动到红色按钮右边
                finalX = yesBtnLeft + yesBtnWidth + 20; // 在红色按钮右边，稍微远一点
                finalY = yesBtnTop; // 与红色按钮顶部对齐
            } else {
                // 超过10次点击，蓝色按钮被隐藏
                noBtn.style.display = 'none';
            }
            
            // 使用 left 和 top 属性替代 transform 定位
            if (noClickCount <= 9) {
                // 前9次只设置top，不设置left
                noBtn.style.top = finalY + 'px';
            } else if (noClickCount === 10) {
                // 第10次同时设置left和top
                noBtn.style.left = finalX + 'px';
                noBtn.style.top = finalY + 'px';
            } else {
                // 超过10次，按钮隐藏，不需要设置位置
            }
        }, 10); // 使用短暂延迟确保样式更新完成
        
        // 根据点击次数更新"不要"按钮的文字
        switch(noClickCount) {
            case 1:
                // 更新按钮文字
                noBtn.textContent = '要不再想想？';
                
                // 更改卡通形象的表情（添加可怜的效果）
                character.innerHTML = `
                    <svg width="200" height="200" viewBox="0 0 100 100">
                        <circle cx="50" cy="40" r="25" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <circle cx="42" cy="37" r="3" fill="#333"/>
                        <circle cx="58" cy="37" r="3" fill="#333"/>
                        <path d="M45 48 Q50 45 55 48" stroke="#333" stroke-width="1" fill="none"/>
                        <rect x="40" y="60" width="20" height="15" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <path d="M45 65 L40 75" stroke="#333" stroke-width="1"/>
                        <path d="M55 65 L60 75" stroke="#333" stroke-width="1"/>
                        <path d="M45 25 L55 25" stroke="#333" stroke-width="1"/>
                        <path d="M48 20 L52 20" stroke="#333" stroke-width="1"/>
                        <circle cx="65" cy="25" r="5" fill="#e0e0e0"/>
                        <path d="M70 20 L75 15 M70 30 L75 35" stroke="#333" stroke-width="1"/>
                        <path d="M43 32 L41 30 M59 32 L57 30" stroke="#333" stroke-width="1"/>
                    </svg>
                `;
                break;
            case 2:
                // 更新按钮文字
                noBtn.textContent = '不许点这个！';
                
                // 更改卡通形象的表情（添加更伤心的效果）
                character.innerHTML = `
                    <svg width="200" height="200" viewBox="0 0 100 100">
                        <circle cx="50" cy="40" r="25" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <circle cx="42" cy="37" r="3" fill="#333"/>
                        <circle cx="58" cy="37" r="3" fill="#333"/>
                        <path d="M45 50 Q50 46 55 50" stroke="#333" stroke-width="1" fill="none"/>
                        <rect x="40" y="60" width="20" height="15" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <path d="M45 65 L40 75" stroke="#333" stroke-width="1"/>
                        <path d="M55 65 L60 75" stroke="#333" stroke-width="1"/>
                        <path d="M45 25 L55 25" stroke="#333" stroke-width="1"/>
                        <path d="M48 20 L52 20" stroke="#333" stroke-width="1"/>
                        <circle cx="65" cy="25" r="5" fill="#e0e0e0"/>
                        <path d="M70 20 L75 15 M70 30 L75 35" stroke="#333" stroke-width="1"/>
                        <path d="M43 32 L41 31 M59 32 L57 31" stroke="#333" stroke-width="1"/>
                        <path d="M43 40 Q44 41 45 40" stroke="#ff6b81" stroke-width="1" fill="none"/>
                        <path d="M53 40 Q54 41 55 40" stroke="#ff6b81" stroke-width="1" fill="none"/>
                    </svg>
                `;
                break;
            case 3:
                // 更新按钮文字
                noBtn.textContent = '我会很伤心的...';
                
                // 更改卡通形象的表情（添加伤心的效果）
                character.innerHTML = `
                    <svg width="200" height="200" viewBox="0 0 100 100">
                        <circle cx="50" cy="40" r="25" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <circle cx="42" cy="37" r="3" fill="#333"/>
                        <circle cx="58" cy="37" r="3" fill="#333"/>
                        <path d="M45 50 Q50 45 55 50" stroke="#333" stroke-width="1" fill="none"/>
                        <rect x="40" y="60" width="20" height="15" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <path d="M45 65 L40 75" stroke="#333" stroke-width="1"/>
                        <path d="M55 65 L60 75" stroke="#333" stroke-width="1"/>
                        <path d="M45 25 L55 25" stroke="#333" stroke-width="1"/>
                        <path d="M48 20 L52 20" stroke="#333" stroke-width="1"/>
                        <circle cx="65" cy="25" r="5" fill="#e0e0e0"/>
                        <path d="M70 20 L75 15 M70 30 L75 35" stroke="#333" stroke-width="1"/>
                        <path d="M43 32 L41 30 M59 32 L57 30" stroke="#333" stroke-width="1"/>
                        <path d="M43 40 Q45 42 47 40" stroke="#ff6b81" stroke-width="1" fill="none"/>
                        <path d="M53 40 Q55 42 57 40" stroke="#ff6b81" stroke-width="1" fill="none"/>
                    </svg>
                `;
                break;
            case 4:
                noBtn.textContent = '嘤嘤嘤...';
                
                // 更改卡通形象的表情（添加更伤心的效果）
                character.innerHTML = `
                    <svg width="200" height="200" viewBox="0 0 100 100">
                        <circle cx="50" cy="40" r="25" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <circle cx="42" cy="37" r="3" fill="#333"/>
                        <circle cx="58" cy="37" r="3" fill="#333"/>
                        <path d="M45 50 Q50 45 55 50" stroke="#333" stroke-width="1" fill="none"/>
                        <rect x="40" y="60" width="20" height="15" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <path d="M45 65 L40 75" stroke="#333" stroke-width="1"/>
                        <path d="M55 65 L60 75" stroke="#333" stroke-width="1"/>
                        <path d="M45 25 L55 25" stroke="#333" stroke-width="1"/>
                        <path d="M48 20 L52 20" stroke="#333" stroke-width="1"/>
                        <circle cx="65" cy="25" r="5" fill="#e0e0e0"/>
                        <path d="M70 20 L75 15 M70 30 L75 35" stroke="#333" stroke-width="1"/>
                        <path d="M43 32 L41 30 M59 32 L57 30" stroke="#333" stroke-width="1"/>
                        <path d="M43 40 Q45 43 47 40" stroke="#ff6b81" stroke-width="1" fill="none"/>
                        <path d="M53 40 Q55 43 57 40" stroke="#ff6b81" stroke-width="1" fill="none"/>
                    </svg>
                `;
                break;
            case 5:
                noBtn.textContent = '人家只是想喝奶茶嘛';
                
                // 更改卡通形象的表情（添加更伤心的效果）
                character.innerHTML = `
                    <svg width="200" height="200" viewBox="0 0 100 100">
                        <circle cx="50" cy="40" r="25" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <circle cx="42" cy="37" r="3" fill="#333"/>
                        <circle cx="58" cy="37" r="3" fill="#333"/>
                        <path d="M45 50 Q50 45 55 50" stroke="#333" stroke-width="1" fill="none"/>
                        <rect x="40" y="60" width="20" height="15" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <path d="M45 65 L40 75" stroke="#333" stroke-width="1"/>
                        <path d="M55 65 L60 75" stroke="#333" stroke-width="1"/>
                        <path d="M45 25 L55 25" stroke="#333" stroke-width="1"/>
                        <path d="M48 20 L52 20" stroke="#333" stroke-width="1"/>
                        <circle cx="65" cy="25" r="5" fill="#e0e0e0"/>
                        <path d="M70 20 L75 15 M70 30 L75 35" stroke="#333" stroke-width="1"/>
                        <path d="M43 32 L41 30 M59 32 L57 30" stroke="#333" stroke-width="1"/>
                        <path d="M43 40 L43 50" stroke="#ff6b81" stroke-width="1"/>
                        <path d="M57 40 L57 50" stroke="#ff6b81" stroke-width="1"/>
                    </svg>
                `;
                break;
            case 6:
                noBtn.textContent = 'QAQ 好可怜';
                
                // 更改卡通形象的表情（添加更伤心的效果）
                character.innerHTML = `
                    <svg width="200" height="200" viewBox="0 0 100 100">
                        <circle cx="50" cy="40" r="25" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <circle cx="42" cy="37" r="3" fill="#333"/>
                        <circle cx="58" cy="37" r="3" fill="#333"/>
                        <path d="M45 50 Q50 45 55 50" stroke="#333" stroke-width="1" fill="none"/>
                        <rect x="40" y="60" width="20" height="15" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <path d="M45 65 L40 75" stroke="#333" stroke-width="1"/>
                        <path d="M55 65 L60 75" stroke="#333" stroke-width="1"/>
                        <path d="M45 25 L55 25" stroke="#333" stroke-width="1"/>
                        <path d="M48 20 L52 20" stroke="#333" stroke-width="1"/>
                        <circle cx="65" cy="25" r="5" fill="#e0e0e0"/>
                        <path d="M70 20 L75 15 M70 30 L75 35" stroke="#333" stroke-width="1"/>
                        <path d="M43 32 L41 30 M59 32 L57 30" stroke="#333" stroke-width="1"/>
                        <circle cx="40" cy="35" r="2" fill="#ffcccc" stroke="#333" stroke-width="0.5"/>
                        <circle cx="60" cy="35" r="2" fill="#ffcccc" stroke="#333" stroke-width="0.5"/>
                        <path d="M43 40 L43 50" stroke="#ff6b81" stroke-width="1"/>
                        <path d="M57 40 L57 50" stroke="#ff6b81" stroke-width="1"/>
                    </svg>
                `;
                break;
            case 7:
                noBtn.textContent = '求你了好不好';
                
                // 更改卡通形象的表情（添加更伤心的效果）
                character.innerHTML = `
                    <svg width="200" height="200" viewBox="0 0 100 100">
                        <circle cx="50" cy="40" r="25" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <circle cx="42" cy="37" r="3" fill="#333"/>
                        <circle cx="58" cy="37" r="3" fill="#333"/>
                        <path d="M45 50 Q50 45 55 50" stroke="#333" stroke-width="1" fill="none"/>
                        <rect x="40" y="60" width="20" height="15" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <path d="M45 65 L40 75" stroke="#333" stroke-width="1"/>
                        <path d="M55 65 L60 75" stroke="#333" stroke-width="1"/>
                        <path d="M45 25 L55 25" stroke="#333" stroke-width="1"/>
                        <path d="M48 20 L52 20" stroke="#333" stroke-width="1"/>
                        <circle cx="65" cy="25" r="5" fill="#e0e0e0"/>
                        <path d="M70 20 L75 15 M70 30 L75 35" stroke="#333" stroke-width="1"/>
                        <path d="M43 32 L41 30 M59 32 L57 30" stroke="#333" stroke-width="1"/>
                        <circle cx="40" cy="35" r="3" fill="#ffcccc" stroke="#333" stroke-width="0.5"/>
                        <circle cx="60" cy="35" r="3" fill="#ffcccc" stroke="#333" stroke-width="0.5"/>
                        <path d="M43 40 L43 55" stroke="#ff6b81" stroke-width="1.5"/>
                        <path d="M57 40 L57 55" stroke="#ff6b81" stroke-width="1.5"/>
                    </svg>
                `;
                break;
            case 8:
                noBtn.textContent = '再点我就哭了';
                
                // 更改卡通形象的表情（添加更伤心的效果）
                character.innerHTML = `
                    <svg width="200" height="200" viewBox="0 0 100 100">
                        <circle cx="50" cy="40" r="25" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <circle cx="42" cy="37" r="3" fill="#333"/>
                        <circle cx="58" cy="37" r="3" fill="#333"/>
                        <path d="M45 50 Q50 47 55 50" stroke="#333" stroke-width="1" fill="none"/>
                        <rect x="40" y="60" width="20" height="15" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <path d="M45 65 L40 75" stroke="#333" stroke-width="1"/>
                        <path d="M55 65 L60 75" stroke="#333" stroke-width="1"/>
                        <path d="M45 25 L55 25" stroke="#333" stroke-width="1"/>
                        <path d="M48 20 L52 20" stroke="#333" stroke-width="1"/>
                        <circle cx="65" cy="25" r="5" fill="#e0e0e0"/>
                        <path d="M70 20 L75 15 M70 30 L75 35" stroke="#333" stroke-width="1"/>
                        <path d="M43 32 L41 30 M59 32 L57 30" stroke="#333" stroke-width="1"/>
                        <circle cx="40" cy="35" r="3" fill="#ffcccc" stroke="#333" stroke-width="0.5"/>
                        <circle cx="60" cy="35" r="3" fill="#ffcccc" stroke="#333" stroke-width="0.5"/>
                        <path d="M43 40 L43 55" stroke="#ff6b81" stroke-width="1.5"/>
                        <path d="M57 40 L57 55" stroke="#ff6b81" stroke-width="1.5"/>
                        <path d="M42 45 Q43 46 44 45" stroke="#ff6b81" stroke-width="1" fill="none"/>
                        <path d="M56 45 Q57 46 58 45" stroke="#ff6b81" stroke-width="1" fill="none"/>
                    </svg>
                `;
                break;
            case 9:
                noBtn.textContent = '最后一次机会了';
                
                // 更改卡通形象的表情（添加最伤心的效果）
                character.innerHTML = `
                    <svg width="200" height="200" viewBox="0 0 100 100">
                        <circle cx="50" cy="40" r="25" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <circle cx="42" cy="38" r="3" fill="#333"/>
                        <circle cx="58" cy="38" r="3" fill="#333"/>
                        <path d="M45 52 Q50 48 55 52" stroke="#333" stroke-width="1" fill="none"/>
                        <rect x="40" y="60" width="20" height="15" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                        <path d="M45 65 L40 75" stroke="#333" stroke-width="1"/>
                        <path d="M55 65 L60 75" stroke="#333" stroke-width="1"/>
                        <path d="M45 25 L55 25" stroke="#333" stroke-width="1"/>
                        <path d="M48 20 L52 20" stroke="#333" stroke-width="1"/>
                        <circle cx="65" cy="25" r="5" fill="#e0e0e0"/>
                        <path d="M70 20 L75 15 M70 30 L75 35" stroke="#333" stroke-width="1"/>
                        <path d="M43 32 L41 30 M59 32 L57 30" stroke="#333" stroke-width="1"/>
                        <circle cx="40" cy="35" r="4" fill="#ffcccc" stroke="#333" stroke-width="0.5"/>
                        <circle cx="60" cy="35" r="4" fill="#ffcccc" stroke="#333" stroke-width="0.5"/>
                        <path d="M43 40 L43 55" stroke="#ff6b81" stroke-width="2"/>
                        <path d="M57 40 L57 55" stroke="#ff6b81" stroke-width="2"/>
                        <path d="M42 45 Q43 46 44 45" stroke="#ff6b81" stroke-width="1" fill="none"/>
                        <path d="M56 45 Q57 46 58 45" stroke="#ff6b81" stroke-width="1" fill="none"/>
                        <path d="M41 50 Q42 51 43 50" stroke="#ff6b81" stroke-width="1" fill="none"/>
                        <path d="M57 50 Q58 51 59 50" stroke="#ff6b81" stroke-width="1" fill="none"/>
                    </svg>
                `;
                break;
            case 10:
                noBtn.textContent = '不要抛弃我...';
                break;
            default:
                // 超过10次后，蓝色按钮被隐藏
                noBtn.style.display = 'none';
                break;
        }
    });
});