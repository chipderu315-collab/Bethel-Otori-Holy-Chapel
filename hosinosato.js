/**
 * ほしのさと☆オンラインチャーチ 
 * 礼拝ガイド & お祈りタイマー 制御スクリプト
 */

(() => {
    // 状態管理を一元化
    const CONFIG = {
        DEFAULT_TIME: 300,
        SELECTORS: {
            minutes: 'minutes',
            seconds: 'seconds',
            progress: 'progress-bar',
            btn: 'startBtn',
            status: 'timerStatus'
        }
    };

    let timeLeft = CONFIG.DEFAULT_TIME;
    let timerId = null;
    let isRunning = false;

    // --- 1. 礼拝ステップの制御（アコーディオン形式） ---
    window.activateStep = (element) => {
        if (!element) return;

        // 他のステップを閉じる（1つずつ集中して読んでいただくため）
        const allCards = document.querySelectorAll('.step-card');
        allCards.forEach(card => {
            if (card !== element) {
                card.classList.remove('active');
                card.setAttribute('aria-expanded', 'false');
            }
        });

        // クリックした要素の開閉
        const isActive = element.classList.toggle('active');
        element.setAttribute('aria-expanded', isActive);

        // 開いた時に、そのステップが画面の中央付近に来るように調整
        if (isActive) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300); // アニメーション完了を待ってからスクロール
        }
    };

    // --- 2. お祈りタイマーのロジック ---
    window.toggleTimer = () => {
        const btn = document.getElementById(CONFIG.SELECTORS.btn);
        
        if (isRunning) {
            pauseTimer(btn);
        } else {
            startTimer(btn);
        }
    };

    const startTimer = (btn) => {
        isRunning = true;
        btn.textContent = '一時停止';
        btn.classList.add('running'); // CSSでボタンの色を優しく変える用
        timerId = setInterval(countDown, 1000);
        
        // お祈り中にページを閉じようとしたら確認を出す（誤操作防止）
        window.onbeforeunload = () => "お祈りの最中ですが、ページを閉じますか？";
    };

    const pauseTimer = (btn) => {
        isRunning = false;
        clearInterval(timerId);
        btn.textContent = 'お祈りを再開する';
        btn.classList.remove('running');
        window.onbeforeunload = null; // 警告解除
    };

    const countDown = () => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            completeTimer();
        }
    };

    const updateTimerDisplay = () => {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        
        document.getElementById(CONFIG.SELECTORS.minutes).textContent = String(mins).padStart(2, '0');
        document.getElementById(CONFIG.SELECTORS.seconds).textContent = String(secs).padStart(2, '0');

        // プログレスバー（100%から0%へ減っていく視覚効果）
        const progress = (timeLeft / CONFIG.DEFAULT_TIME) * 100;
        document.getElementById(CONFIG.SELECTORS.progress).style.width = `${progress}%`;
    };

    const completeTimer = () => {
        clearInterval(timerId);
        isRunning = false;
        window.onbeforeunload = null;

        const status = document.getElementById(CONFIG.SELECTORS.status);
        const btn = document.getElementById(CONFIG.SELECTORS.btn);

        status.textContent = 'アーメン。共にお祈りできて感謝します。';
        status.classList.add('completed');
        btn.textContent = 'お祈りを終了';
        
        // デザイナーのこだわり：完了時に優しくアラート
        setTimeout(() => {
            alert("5分間のお祈りの時間が終わりました。心に平安がありますように。");
        }, 500);
    };

    window.resetTimer = () => {
        pauseTimer(document.getElementById(CONFIG.SELECTORS.btn));
        timeLeft = CONFIG.DEFAULT_TIME;
        updateTimerDisplay();
        document.getElementById(CONFIG.SELECTORS.status).textContent = '「祈りなさい」 — イエス様の御言葉を胸に。';
        document.getElementById(CONFIG.SELECTORS.status).classList.remove('completed');
    };

    // --- 3. ナビゲーション・UI制御 ---
    
    // スムーズスクロール
    window.scrollToSection = (id) => {
        const target = document.querySelector(id);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // トップに戻るボタン
    const topBtn = document.getElementById("backToTop");
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }
    });

    window.scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 初期化メッセージ
    console.log("✨ 星里さんのオンラインチャーチへようこそ。準備が整いました。");
})();


/**
 * トップに戻るボタンの制御
 */
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        // 300px以上スクロールしたら表示
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('is-visible');
        } else {
            backToTopBtn.classList.remove('is-visible');
        }
    });
});

// スムーズスクロール関数
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * ほしのさと☆オンラインチャーチ 
 * スクリプト統合版
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 星を降らせる魔法（動的生成）
    const createFallingStars = () => {
        const section = document.querySelector('.benediction-section');
        if (!section) return;

        // 星を3つ追加
        for (let i = 0; i < 3; i++) {
            const star = document.createElement('span');
            star.innerText = '☆';
            star.className = `falling-star star-${i}`;
            
            // ランダムな位置とアニメーション遅延
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            star.style.fontSize = `${0.8 + Math.random() * 1}rem`;
            
            section.appendChild(star);
        }
    };
    createFallingStars();

    // 2. トップに戻るボタンの表示・非表示
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('is-visible');
            } else {
                backToTopBtn.classList.remove('is-visible');
            }
        });
    }

    // 3. お祈りガイドへのスムーズスクロール
    // (aタグのonclick="scrollToTimer(event)"に対応)
    window.scrollToTimer = (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80; // ヘッダーの高さ分調整
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };
});

/**
 * 4. お祈りタイマーの基本ロジック（簡易版）
 * 星里さんのタイマー実装に合わせて調整してください
 */
let timerInterval;
function startPrayerTimer(minutes) {
    let seconds = minutes * 60;
    const display = document.querySelector('.timer-display'); // 表示用のクラス名

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        
        if (display) {
            display.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
        }

        if (--seconds < 0) {
            clearInterval(timerInterval);
            alert("お祈りの時間が終了しました。素晴らしい一週間になりますように☆");
        }
    }, 1000);
}
// --- 物理ロック：右クリック禁止 ---
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// --- 物理ロック：ドラッグ＆ドロップ禁止（画像保存対策） ---
document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});
