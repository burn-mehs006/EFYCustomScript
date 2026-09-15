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
    //#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate > div > div > 
    wait('span.ytp-time-duration').then(el => {
        console.log("Video title:", el.innerText);

        videoSkip();

        playSpeed();
    });
})();

function playSpeed() {

    const d = document.querySelector('#player-container.ytd-watch-flexy, #player-container.ytd-watch-grid');
    d.addEventListener("wheel", xxx, !0);

    // element span / class name
    // ytp-time-current
    // ytp-time-separator
    // ytp-time-duration

    const ytpTimeDuration = document.querySelector(".ytp-time-duration");
    if (!ytpTimeDuration) {
        console.error("not found ytpTimeDuration element");
        return;
    }

    const ytpTimeBracketBeginAtSpeed = document.createElement("span");
    const ytpTimeCurrentAtSpeed = document.createElement("span");
    const ytpTimeSeparatorAtSpeed = document.createElement("span");
    const ytpTimeDurationAtSpeed = document.createElement("span");
    const ytpTimeBracketEndAtSpeed = document.createElement("span");

    ytpTimeBracketBeginAtSpeed.textContent = '(';
    ytpTimeBracketBeginAtSpeed.classList = 'ytp-time-bracketBeginAtSpeed';
    ytpTimeDuration.after(ytpTimeBracketBeginAtSpeed);

    {
        const player = document.querySelector('video');
        console.log('A wheel playbackRate:', player.playbackRate, " duration:", player.duration, " currentTime:", player.currentTime);

        ytpTimeDurationAtSpeed.textContent = Math.floor(player.duration / 60) + ":" + Math.floor(player.duration % 60);
        ytpTimeDurationAtSpeed.classList = 'ytp-time-durationAtSpeed';
        ytpTimeBracketBeginAtSpeed.after(ytpTimeDurationAtSpeed);
    }

    ytpTimeBracketEndAtSpeed.textContent = ')';
    ytpTimeBracketEndAtSpeed.classList = 'ytp-time-bracketEndAtSpeed';
    ytpTimeDurationAtSpeed.after(ytpTimeBracketEndAtSpeed);

    function xxx() {
        //const video = document.querySelector("#movie_player > div.html5-video-container > video");
        const player = document.querySelector('video');
        console.log('wheel playbackRate:', player.playbackRate, " duration:", player.duration, " currentTime:", player.currentTime);

        const aaa = player.duration / player.playbackRate;
        ytpTimeDurationAtSpeed.textContent = Math.floor(aaa / 60) + ":" + Math.floor(aaa % 60);
    }
}

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
        console.log("e.button:", e.button, " time:", time);
        player.currentTime += time;
    });
}
