const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('pageDots');

let currentIndex = 0;

// ドットを動的に作成
if (dotsContainer) {
    pages.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
}

const dots = document.querySelectorAll('.dot');

function updateViewer() {
    pages.forEach((page, index) => {
        page.classList.toggle('active', index === currentIndex);
    });
    
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // ボタンの有効・無効を切り替え
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === pages.length - 1;

    // ページの上に戻る（スマホで見やすいホスピタリティ！）
    window.scrollTo(0, 0);
}

// 「次へ」の動き
function nextPage() {
    if (currentIndex < pages.length - 1) {
        currentIndex++;
        updateViewer();
    } else {
        alert("おしまい！読んでくれてありがとう。");
    }
}

// 「前へ」の動き
function prevPage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateViewer();
    }
}

// イベントリスナーの設定
if (nextBtn) {
    nextBtn.addEventListener('click', nextPage);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevPage);
}

// 最初に一度実行して状態を整える
updateViewer();