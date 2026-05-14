// 1. ハンバーガーメニューの開閉処理
const hamburger = document.getElementById('hamburger-btn');
const fullMenu = document.getElementById('full-menu');

hamburger.addEventListener('click', () => {
    // ボタンの形をXに変える
    hamburger.classList.toggle('active');
    // メニューを表示/非表示にする
    fullMenu.classList.toggle('active');
});

// メニュー内のリンクをクリックしたらメニューを自動で閉じる
document.querySelectorAll('.full-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        fullMenu.classList.remove('active');
    });
});

// 2. 背景に星を生成する処理
document.addEventListener('DOMContentLoaded', () => {
    const starsContainer = document.getElementById('stars-js');
    const starCount = 60; // 星の数

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.innerHTML = '★';
        star.style.position = 'absolute';
        // 白か薄い黄色の星をランダムに配置
        star.style.color = Math.random() > 0.5 ? '#fff' : '#fff9c4';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.fontSize = (Math.random() * 20 + 10) + 'px';
        star.style.opacity = Math.random();
        // またたくスピードをバラバラにする
        star.style.animation = `blink ${Math.random() * 3 + 2}s infinite`;
        
        starsContainer.appendChild(star);
    }
});

// デザインギャラリーへスクロールする関数
function scrollToGallery() {
    const gallerySection = document.querySelector('.gallery');
    if (gallerySection) {
        gallerySection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}
// トップに戻るボタンの制御
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // 300px以上スクロールしたらボタンを表示
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// クリックしたらトップへ戻る
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/**
 * 週ごとのメッセージを切り替える関数
 * @param {number} weekNum - 何週目か (1-5)
 * @param {string} title - メッセージのタイトル
 */
function changeWeek(weekNum, title) {
    // 1. 全てのナビボタンから「active」クラスを外す
    const items = document.querySelectorAll('.cycle-item');
    items.forEach(item => {
        item.classList.remove('active');
    });

    // 2. クリックされたボタンに「active」クラスをつけて色を変える
    items[weekNum - 1].classList.add('active');

    // 3. 雲のボタンの中のテキストを書き換える
    const weekTitleElement = document.getElementById('weekTitle');
    weekTitleElement.innerText = `第${weekNum}週：${title}`;

    // コンソールにログを出す（動作確認用）
    console.log(`救霊会館：第${weekNum}週「${title}」のメッセージを選択中🌟`);
}
function checkQuiz() {
    const form = document.getElementById('bible-quiz');
    const resultArea = document.getElementById('quiz-result');
    const message = document.getElementById('result-message');
    const detail = document.getElementById('result-detail');
    const stamp = document.getElementById('pass-stamp');
    
    let score = 0;
    const total = 4;
    const answers = new FormData(form);

    // 採点
    for (let value of answers.values()) {
        if (value === 'correct') score++;
    }

    resultArea.style.display = 'block';
    
    if (score === total) {
        message.innerText = "✨ おめでとうございます！ ✨";
        detail.innerText = "きみは聖書ものがたりマスターだ！初級クリアをパートナーや先生に伝えてね。";
        stamp.style.display = 'block';
        form.style.display = 'none'; // テストを隠して合格証っぽくする
    } else {
        message.innerText = "おしいっ！";
        detail.innerText = score + "問正解！ あともう少しでクリアだよ。絵本をもう一度読んでみてね。";
        stamp.style.display = 'none';
    }
}

function resetQuiz() {
    document.getElementById('bible-quiz').reset();
    document.getElementById('bible-quiz').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
}function checkMiddleQuiz() {
    const form = document.getElementById('bible-quiz-middle');
    const resultArea = document.getElementById('middle-result');
    const message = document.getElementById('middle-message');
    const detail = document.getElementById('middle-detail');
    const stamp = document.getElementById('middle-stamp');
    
    let score = 0;
    const total = 5;
    const formData = new FormData(form);

    for (let value of formData.values()) {
        if (value === 'correct') score++;
    }

    resultArea.style.display = 'block';
    
    if (score === total) {
        message.innerText = "✨ 素晴らしい！中級マスターです ✨";
        detail.innerText = "聖書全体の大きな物語と、黙示録の希望を理解しましたね。あなたはもう、聖書を一つの「約束の書」として読むことができます。";
        stamp.style.display = 'block';
        form.style.display = 'none';
    } else {
        message.innerText = "あと少し！";
        detail.innerText = total + "問中 " + score + "問正解です。テキストを読み返して、神さまの約束を再確認してみましょう。";
        stamp.style.display = 'none';
    }
}

function resetMiddleQuiz() {
    document.getElementById('bible-quiz-middle').reset();
    document.getElementById('bible-quiz-middle').style.display = 'block';
    document.getElementById('middle-result').style.display = 'none';
}

function checkAdvancedQuiz() {
    const form = document.getElementById('bible-quiz-advanced');
    const resultArea = document.getElementById('advanced-result');
    const message = document.getElementById('advanced-message');
    const detail = document.getElementById('advanced-detail');
    
    let score = 0;
    const total = 5;
    const formData = new FormData(form);

    for (let value of formData.values()) {
        if (value === 'correct') score++;
    }

    resultArea.style.display = 'block';
    
    if (score === total) {
        message.innerText = "🎊 おめでとうございます！ 🎊";
        detail.innerText = "あなたは知識・理解・実践のすべてにおいて、上級コースを修了しました。キリストの愛を伝えるリーダーとして、新しい一歩を踏み出しましょう！";
        form.style.display = 'none';
    } else {
        message.innerText = "再確認しましょう";
        detail.innerText = "あと少しです。御霊の実を結ぶ歩みについて、もう一度テキストを確認してみましょう。";
    }
}
function checkGrandQuiz() {
    const form = document.getElementById('bible-quiz-grand');
    const resultArea = document.getElementById('grand-result');
    const message = document.getElementById('grand-message');
    const detail = document.getElementById('grand-detail');
    
    let score = 0;
    const total = 15;
    const formData = new FormData(form);

    for (let value of formData.values()) {
        if (value === 'correct') score++;
    }

    resultArea.style.display = 'block';
    
    if (score === total) {
        message.innerText = "✨ 至高の知恵に到達しました ✨";
        detail.innerText = "ヘブライ語とギリシャ語の深み、そして神の国の神秘を理解したあなたに、グランドマスターの称号を贈ります。";
        form.style.display = 'none';
    } else {
        message.innerText = "さらなる探求を";
        detail.innerText = score + "/" + total + " 正解です。原典が語る真のメッセージに、もう一度耳を傾けてみましょう。";
    }
}
function checkTheologyQuiz() {
    const form = document.getElementById('bible-quiz-grand-theology');
    const resultArea = document.getElementById('theology-result');
    const scoreDisplay = document.getElementById('th-score');
    const message = document.getElementById('th-message');
    
    let score = 0;
    const pointsPerQuestion = 10;
    const formData = new FormData(form);

    for (let value of formData.values()) {
        if (value === 'correct') score += pointsPerQuestion;
    }

    resultArea.style.display = 'block';
    scoreDisplay.innerText = score + " 点";
    
    if (score >= 70) {
        message.innerHTML = "✨ <strong>合格です！神学博士（超級）に認定します。</strong> ✨<br><br>イエスさまの神性と人性、三位一体の神秘を正しく理解されました。<br>100問相当の難問テストで70点を超えたあなたは、もう超級を修了し、指導者としての道を歩む準備ができています。";
        form.style.display = 'none';
        window.scrollTo({ top: resultArea.offsetTop - 100, behavior: 'smooth' });
    } else {
        message.innerHTML = "<strong>あと少しです！</strong><br>合格ラインは70点です。キリストの二性や、三位一体の交わりについてもう一度黙想し、再挑戦してみましょう。";
    }
}