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
    //wait('video').then(el => {
    wait('#efyt-cards-end-screens').then(el => {
        console.log("Video title:", el.innerText);

        playSpeed();

        videoSkip();
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
        // 時までやるかは一旦保留
        //const h = Math.floor(seconds / 3600);
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
                showTimeAtSpeed();
            });

            observer.observe(ytpTimeCurrent, {
                childList: true,
                characterData: true,
                subtree: false
            });
        }
        ytpTimeCurrentAtSpeed.classList = 'ytp-time-CurrentAtSpeed';
        ytpTimeCurrentAtSpeed.textContent = '--';
        ytpTimeBracketBeginAtSpeed.after(ytpTimeCurrentAtSpeed);
    }

    const ytpTimeSeparatorAtSpeed = document.createElement("span");
    {
        ytpTimeSeparatorAtSpeed.textContent = ' / ';
        ytpTimeSeparatorAtSpeed.classList = 'ytp-time-SeparatorAtSpeed';
        ytpTimeCurrentAtSpeed.after(ytpTimeSeparatorAtSpeed);
    }

    const ytpTimeDurationAtSpeed = document.createElement("span");
    {
        ytpTimeDurationAtSpeed.textContent = '--';
        ytpTimeDurationAtSpeed.classList = 'ytp-time-durationAtSpeed';
        ytpTimeSeparatorAtSpeed.after(ytpTimeDurationAtSpeed);
    }

    const ytpTimeBracketEndAtSpeed = document.createElement("span");
    {
        ytpTimeBracketEndAtSpeed.textContent = ')';
        ytpTimeBracketEndAtSpeed.classList = 'ytp-time-bracketEndAtSpeed';
        ytpTimeDurationAtSpeed.after(ytpTimeBracketEndAtSpeed);
    }

    // パーセント表示
    const ytpTimeInnerBracketBeginAtSpeed = document.createElement("span");
    {
        ytpTimeInnerBracketBeginAtSpeed.textContent = ' [';
        ytpTimeBracketEndAtSpeed.after(ytpTimeInnerBracketBeginAtSpeed);
    }
    const ytpTimePercentAtSpeed = document.createElement("span");
    {
        ytpTimePercentAtSpeed.textContent = '--';
        ytpTimeInnerBracketBeginAtSpeed.after(ytpTimePercentAtSpeed);
    }
    const ytpTimeinnerBracketEndAtSpeed = document.createElement("span");
    {
        ytpTimeinnerBracketEndAtSpeed.textContent = ']';
        ytpTimePercentAtSpeed.after(ytpTimeinnerBracketEndAtSpeed);
    }

    //
    function showTimeAtSpeed() {
        //console.log('B wheel playbackRate:', player.playbackRate, " duration:", player.duration, " currentTime:", player.currentTime);

        if (player.playbackRate === 1) {
            ytpTimeBracketBeginAtSpeed.setAttribute('hidden');
            ytpTimeCurrentAtSpeed.setAttribute('hidden');
            ytpTimeSeparatorAtSpeed.setAttribute('hidden');
            ytpTimeDurationAtSpeed.setAttribute('hidden');
            ytpTimeBracketEndAtSpeed.setAttribute('hidden');

        } else {
            ytpTimeBracketBeginAtSpeed.removeAttribute('hidden');
            ytpTimeCurrentAtSpeed.removeAttribute('hidden');
            ytpTimeSeparatorAtSpeed.removeAttribute('hidden');
            ytpTimeDurationAtSpeed.removeAttribute('hidden');
            ytpTimeBracketEndAtSpeed.removeAttribute('hidden');

            ytpTimeCurrentAtSpeed.textContent = timeFormatter(player.currentTime / player.playbackRate);
            ytpTimeDurationAtSpeed.textContent = timeFormatter(player.duration / player.playbackRate);
        }

        // パーセント表示
        ytpTimePercentAtSpeed.textContent = Math.ceil(player.currentTime / player.duration * 100) + '%';
    }
}

function videoSkip() {
    const player = document.querySelector('video');

    const ytpRightControls = document.querySelector('#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-right-controls');
    const fastForward = document.createElement('button');
    {
        fastForward.textContent = '>';
        fastForward.type = 'button';
        fastForward.style.width = '50px';

        fastForward.addEventListener('click', function (e) {
            moveProgress(5);
        });
        ytpRightControls.before(fastForward);
    }

    const rewind = document.createElement('button');
    {
        rewind.textContent = '<';
        rewind.type = 'button';
        rewind.style.width = '50px';

        rewind.addEventListener('click', function (e) {
            moveProgress(-5);
        });
        fastForward.before(rewind);
    }

    let clickTimeout = null;
    function moveProgress(baseTime) {
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            clickTimeout = null;
            player.currentTime += baseTime * 2;
        } else {
            clickTimeout = setTimeout(() => {
                clickTimeout = null;
                player.currentTime += baseTime;
            }, 250);
        }
    }
}
