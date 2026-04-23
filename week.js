/**
 * 礼拝資料サイト インタラクション統合スクリプト
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. きらきら背景の動的生成 ---
    const container = document.getElementById('sparkle-container');
    const particleCount = 20; // 粒子の数

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('sparkle-particle');
        
        // 色をランダムに選ぶ
        const isWhite = Math.random() > 0.5;
        particle.style.background = isWhite ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 215, 0, 0.6)';
        particle.style.boxShadow = isWhite ? '0 0 15px 5px rgba(255, 255, 255, 0.8)' : '0 0 15px 5px rgba(255, 215, 0, 0.6)';

        // 配置とアニメーションをランダムに
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${10 + Math.random() * 5}s`; // 10s 〜 15s
        particle.style.animationDelay = `${Math.random() * 10}s`;

        container.appendChild(particle);
    }


    // --- 1. 週の切り替え & スムーススクロール ---
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.week-section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            // ナビゲーションボタンの「光のライン」切り替え
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // コンテンツセクションの表示切り替え
            sections.forEach(s => {
                s.classList.remove('active');
                if (s.id === targetId) {
                    setTimeout(() => s.classList.add('active'), 50);
                }
            });

            // ターゲット位置へスムーズにスクロール
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });


    


    // --- 3. トップへ戻る（羽ボタン） ---
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // スクロール量に応じてボタンを表示/非表示にする
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.transform = 'translateY(20px)';
            }
        });
    }
});


// 目次の行をクリックした時の処理
const indexRows = document.querySelectorAll('.index-row');

indexRows.forEach(row => {
    row.addEventListener('click', () => {
        const targetId = row.getAttribute('data-target');

        // 1. 左上のナビゲーションボタン（.nav-button）をすべて取得
        const navButtons = document.querySelectorAll('.nav-button');
        const targetBtn = document.querySelector(`.nav-button[data-target="${targetId}"]`);

        // 2. ナビボタンのアクティブ状態を切り替える
        navButtons.forEach(btn => btn.classList.remove('active'));
        if (targetBtn) targetBtn.classList.add('active');

        // 3. コンテンツ（.week-section）の表示を切り替える
        const sections = document.querySelectorAll('.week-section');
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });

        // 4. そのセクションへスムーズにスクロール
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            // 操作パネルの高さを考慮して、少し上で止まるように調整
            const offset = 100;
            const targetPos = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        }
    });
});




// --- 2. お話エリア：本のページめくり（ページフリップ） ---
    const pages = document.querySelectorAll('.page');
    const nextBtn = document.querySelector('.page-nav.next');
    const prevBtn = document.querySelector('.page-nav.prev');
    let currentPageIndex = 0;

    function showPage(index) {
        pages.forEach((page, i) => {
            if (i < index) {
                page.classList.add('flipped');
                page.classList.remove('active');
            } else if (i === index) {
                page.classList.add('active');
                page.classList.remove('flipped');
            } else {
                page.classList.remove('flipped', 'active');
            }
        });
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPageIndex < pages.length - 1) {
                currentPageIndex++;
                showPage(currentPageIndex);
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentPageIndex > 0) {
                currentPageIndex--;
                showPage(currentPageIndex);
            }
        });
    }

    // 初回実行
    showPage(currentPageIndex);


    // --- トップへ戻る（羽ボタン）の確実な動作設定 ---
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        // 1. クリックした時の動作
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // ふわっと滑らかに戻る
            });
        });

        // 2. スクロール量に応じて表示/非表示（最初は隠しておく）
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.pointerEvents = 'auto'; // クリック可能にする
                scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.pointerEvents = 'none'; // 隠れている間はクリック不可
                scrollToTopBtn.style.transform = 'translateY(20px) scale(0.8)';
            }
        });
    }
});


// 目次のクリックイベント（前回のコードを微調整）
document.querySelectorAll('.index-row').forEach(row => {
    row.addEventListener('click', () => {
        const targetId = row.getAttribute('data-target');
        
        // 1. セクションを表示
        document.querySelectorAll('.week-section').forEach(s => s.classList.remove('active'));
        const targetSection = document.getElementById(targetId);
        if (targetSection) targetSection.classList.add('active');

        // 2. スムーススクロール（操作パネルの高さを避ける）
        const offset = 80; 
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetSection.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});





document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.index-row');
    
    rows.forEach(row => {
        row.addEventListener('click', () => {
            const targetId = row.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // 操作パネルの高さを考慮してスクロール
                const offset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});









function startPrayer() {
  let timeLeft = 180; // 3分 = 180秒
  const display = document.getElementById('timer-display');
  const btn = document.getElementById('start-btn');
  btn.style.display = 'none'; // 始まるとボタンを隠す（集中するため）

  const timer = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    // 00:00 の形式に整える
    display.textContent = 
      (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    if (timeLeft <= 0) {
      clearInterval(timer);
      display.textContent = "アーメン";
      // ここで星里さんが録音した「歌」やベルの音を鳴らす設定ができます
    }
    timeLeft--;
  }, 1000);
}

  // ステップを強調する関数
    function activateStep(element) {
        document.querySelectorAll('.step-card').forEach(card => card.classList.remove('active-step'));
        element.classList.add('active-step');
    }

    // タイマー制御
    let timerInterval;
    function toggleTimer() {
        const timerBox = document.getElementById('timer-box');
        if (timerBox.style.display === 'block') return; // 重複防止
        
        timerBox.style.display = 'block';
        let timeLeft = 180;
        const display = document.getElementById('display');

        timerInterval = setInterval(() => {
            let mins = Math.floor(timeLeft / 60);
            let secs = timeLeft % 60;
            display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                display.textContent = "アーメン";
                alert("神様からのプレゼントを胸に、今日も一歩進みましょう。");
            }
            timeLeft--;
        }, 1000);
    }








 
    function scrollToTimer() {
        // IDが "prayer-timer-section" の場所までスムーズに動く
        const element = document.getElementById("prayer-timer-section");
        element.scrollIntoView({ behavior: 'smooth' });
    }
function scrollToTimer(event) {
    // ページがリロードされるのを防ぎます
    event.preventDefault();
    
    // 目印（ID）がついた場所を探します
    const element = document.getElementById("prayer-timer-section");
    
    if (element) {
        // スルスルと滑らかに移動します
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error("タイマーのセクション（id='prayer-timer-section'）が見つかりません。確認してみてね！");
    }
}

let timerRunning = false;

function startTimer() {
    if (timerRunning) return; // 二重起動防止
    
    timerRunning = true;
    let timeLeft = 180; // 3分 = 180秒
    const display = document.getElementById('timer-display');
    const btn = document.getElementById('timer-btn');
    const finishMsg = document.getElementById('finish-message');
    
    btn.style.opacity = '0.5';
    btn.innerText = 'お祈り中...';
    finishMsg.innerText = '';

    const countdown = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        
        display.textContent = 
            (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerRunning = false;
            display.textContent = "00:00";
            btn.style.opacity = '1';
            btn.innerText = 'もう一度祈る';
            finishMsg.innerText = 'アーメン。心の中が光で満たされました。いってらっしゃい！';
            
            // 星里さんが録音した歌を流す場合はここに追加！
            // new Audio('your-song.mp3').play();
        }
        timeLeft--;
    }, 1000);
}

function scrollToTimer(event) {
    if (event) event.preventDefault();
    const element = document.getElementById("prayer-timer-section");
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}