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

// element span / class name
// ytp-time-current
// ytp-time-separator
// ytp-time-duration

function playSpeed() {

    const d = document.querySelector('#player-container.ytd-watch-flexy, #player-container.ytd-watch-grid');
    d.addEventListener("wheel", showTimeAtSpeed, true);
    d.addEventListener("click", showTimeAtSpeed);

    const player = document.querySelector('video');

    const ytpTimeDuration = document.querySelector(".ytp-time-duration");
    if (!ytpTimeDuration) {
        console.error("not found ytpTimeDuration element");
        return;
    }


    const timeFormatter = (seconds) => {
        // 時間までやるかは一旦保留
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return m + ':' + s.toString().padStart(2, '0');
    }

    const ytpTimeBracketBeginAtSpeed = document.createElement("span");
    {
        ytpTimeBracketBeginAtSpeed.textContent = ' (';
        ytpTimeBracketBeginAtSpeed.classList = 'ytp-time-bracketBeginAtSpeed';
        ytpTimeDuration.after(ytpTimeBracketBeginAtSpeed);
    }

    const ytpTimeCurrentAtSpeed = document.createElement("span");
    {
        const ytpTimeCurrent = document.querySelector('.ytp-time-current');
        if (ytpTimeCurrent) {
            const observer = new MutationObserver(() => {
                ytpTimeCurrentAtSpeed.textContent = timeFormatter(player.currentTime / player.playbackRate);
            });

            observer.observe(ytpTimeCurrent, {
                childList: true,
                characterData: true,
                subtree: false
            });
        }
        ytpTimeCurrentAtSpeed.classList = 'ytp-time-CurrentAtSpeed';
        ytpTimeCurrentAtSpeed.textContent = timeFormatter(player.currentTime / player.playbackRate);
        ytpTimeBracketBeginAtSpeed.after(ytpTimeCurrentAtSpeed);
    }

    const ytpTimeSeparatorAtSpeed = document.createElement("span");
    {
        ytpTimeSeparatorAtSpeed.textContent = '/';
        ytpTimeSeparatorAtSpeed.classList = 'ytp-time-SeparatorAtSpeed';
        ytpTimeCurrentAtSpeed.after(ytpTimeSeparatorAtSpeed);
    }

    const ytpTimeDurationAtSpeed = document.createElement("span");
    {
        //ytpTimeDurationAtSpeed.textContent = document.querySelector('span.ytp-time-duration').textContent;
        ytpTimeDurationAtSpeed.textContent = timeFormatter(player.duration / player.playbackRate);
        ytpTimeDurationAtSpeed.classList = 'ytp-time-durationAtSpeed';
        ytpTimeSeparatorAtSpeed.after(ytpTimeDurationAtSpeed);
    }

    const ytpTimeInnerBracketBeginAtSpeed = document.createElement("span");
    {
        ytpTimeInnerBracketBeginAtSpeed.textContent = '[';
        ytpTimeDurationAtSpeed.after(ytpTimeInnerBracketBeginAtSpeed);
    }
    const ytpTimePercentAtSpeed = document.createElement("span");
    {
        ytpTimePercentAtSpeed.textContent = '%';
        ytpTimeInnerBracketBeginAtSpeed.after(ytpTimePercentAtSpeed);
    }
    const ytpTimeinnerBracketEndAtSpeed = document.createElement("span");
    {
        ytpTimeinnerBracketEndAtSpeed.textContent = ']';
        ytpTimePercentAtSpeed.after(ytpTimeinnerBracketEndAtSpeed);
    }

    const ytpTimeBracketEndAtSpeed = document.createElement("span");
    {
        ytpTimeBracketEndAtSpeed.textContent = ')';
        ytpTimeBracketEndAtSpeed.classList = 'ytp-time-bracketEndAtSpeed';
        ytpTimeinnerBracketEndAtSpeed.after(ytpTimeBracketEndAtSpeed);
    }


    function showTimeAtSpeed() {
        console.log('B wheel playbackRate:', player.playbackRate, " duration:", player.duration, " currentTime:", player.currentTime);

        ytpTimeCurrentAtSpeed.textContent = timeFormatter(player.currentTime / player.playbackRate);
        ytpTimeDurationAtSpeed.textContent = timeFormatter(player.duration / player.playbackRate);
    }

    // function speedClick() {
    //     const durationAtSpeed = player.duration / player.playbackRate;
    //     //ytpTimeDurationAtSpeed.textContent = Math.floor(durationAtSpeed / 60) + ":" + Math.floor(durationAtSpeed % 60).toString().padStart(2, '0');
    //     ytpTimeDurationAtSpeed.textContent = timeFormatter(durationAtSpeed);
    // }
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
