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
    wait('video').then(el => {
        console.log("Video title:", el.innerText);

        videoSkip();

        playSpeed();
    });
})();

function playSpeed() {

    const d = document.querySelector('#player-container.ytd-watch-flexy, #player-container.ytd-watch-grid');
    d.addEventListener("wheel", speedWheel, true);
    d.addEventListener("click", speedClick);

    const player = document.querySelector('video');
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

    {
        ytpTimeBracketBeginAtSpeed.textContent = '　(';
        ytpTimeBracketBeginAtSpeed.classList = 'ytp-time-bracketBeginAtSpeed';
        ytpTimeDuration.after(ytpTimeBracketBeginAtSpeed);
    }

    {

        const ytpTimeCurrent = document.querySelector('.ytp-time-current');
        if (ytpTimeCurrent) {
            const observer = new MutationObserver(() => {
                const currentTimeAtSpeed = player.currentTime / player.playbackRate;
                ytpTimeCurrentAtSpeed.textContent = Math.floor(currentTimeAtSpeed / 60) + ":" + Math.floor(currentTimeAtSpeed % 60).toString().padStart(2, '0');
            });

            observer.observe(ytpTimeCurrent, {
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        ytpTimeCurrentAtSpeed.classList = 'ytp-time-CurrentAtSpeed';
        const currentTimeAtSpeed = player.currentTime / player.playbackRate;
        ytpTimeCurrentAtSpeed.textContent = Math.floor(currentTimeAtSpeed / 60) + ":" + Math.floor(currentTimeAtSpeed % 60).toString().padStart(2, '0');
        ytpTimeBracketBeginAtSpeed.after(ytpTimeCurrentAtSpeed);
    }

    {
        ytpTimeSeparatorAtSpeed.textContent = ' / ';
        ytpTimeSeparatorAtSpeed.classList = 'ytp-time-SeparatorAtSpeed';
        ytpTimeCurrentAtSpeed.after(ytpTimeSeparatorAtSpeed);
    }

    {
        ytpTimeDurationAtSpeed.textContent = document.querySelector('span.ytp-time-duration').textContent;
        ytpTimeDurationAtSpeed.classList = 'ytp-time-durationAtSpeed';
        ytpTimeSeparatorAtSpeed.after(ytpTimeDurationAtSpeed);
    }

    {
        ytpTimeBracketEndAtSpeed.textContent = ')';
        ytpTimeBracketEndAtSpeed.classList = 'ytp-time-bracketEndAtSpeed';
        ytpTimeDurationAtSpeed.after(ytpTimeBracketEndAtSpeed);
    }

    function speedWheel() {
        //const player = document.querySelector('video');
        console.log('B wheel playbackRate:', player.playbackRate, " duration:", player.duration, " currentTime:", player.currentTime);

        const durationAtSpeed = player.duration / player.playbackRate;
        ytpTimeDurationAtSpeed.textContent = Math.floor(durationAtSpeed / 60) + ":" + Math.floor(durationAtSpeed % 60).toString().padStart(2, '0');
    }

    function speedClick() {
        //const player = document.querySelector('video');

        const durationAtSpeed = player.duration / player.playbackRate;
        ytpTimeDurationAtSpeed.textContent = Math.floor(durationAtSpeed / 60) + ":" + Math.floor(durationAtSpeed % 60).toString().padStart(2, '0');
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
