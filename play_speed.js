(function () {
    console.log("Enhancer custom script loaded");

    let count = 1;
    const wait = (selector) => new Promise(resolve => {
        const timer = setInterval(() => {
            const el = document.querySelector(selector);
            if (el) {
                console.log("intervalCount:", count);
                clearInterval(timer);
                resolve(el);
            }
            count++;
        }, 500);
    });

    // 例：動画タイトルを取得してログに出す
    wait('h1.title').then(el => {
        console.log("Video title:", el.innerText);

        videoSkip();
    });
})();


function videoSkip() {
    document.addEventListener('mousedown', function (e) {
        const btn = e.target.closest('#efyt-custom-script');
        if (!btn) {
            return;
        }

        var player = document.querySelector('video');
        if (!player) return;

        let time = 0;
        if (e.button === 0) {
            time = 5;
        } else if (e.button === 1) {
            time = -10;
        } else if (e.button === 2) {
            time = -5;
        } else if (e.button === 3) {
            time = -5;
        } else if (e.button === 4) {
            time = 5;
        }
        player.currentTime += time;
    });
}
