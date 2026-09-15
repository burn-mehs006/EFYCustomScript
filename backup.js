/**
// 20260914 Enhancer for YouTubeのカスタムスクリプトに書いていたいコード
*/
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

const sleep = (time) => new Promise((r) => setTimeout(r, time));

(async function () {
    await sleep(1000);

    const ytpTimeDuration = document.querySelector(".ytp-time-duration");
    if (!ytpTimeDuration) {
        console.log("erro ytpTimeDuration ");
    }
    else {
        const timeA = document.createElement("span");
        timeA.textContent = "ABCDEFG";
        ytpTimeDuration.after(timeA);
    }
}());

(async () => {
    console.log('[Custom] スクリプト実行開始');

    const SCRIPT_URL = `https://raw.githubusercontent.com/burn-mehs006/EFYCustomScript/main/play_speed.js?t=${Date.now()}`;

    // 二重実行防止
    if (window.__myCustomScriptLoaded) {
        console.log('[Custom] スクリプト実行済み');
        return;
    } else {
        window.__myCustomScriptLoaded = true;
    }

    try {
        const res = await fetch(SCRIPT_URL, { cache: 'no-store' }); // キャッシュ回避
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        // script取得
        const code = await res.text();
        // Trusted Types 対応
        if (window.trustedTypes && trustedTypes.createPolicy) {
            try {
                const policy = trustedTypes.defaultPolicy || trustedTypes.createPolicy('default', {
                    createScript: (s) => s,
                    createScriptURL: (u) => u,
                    createHTML: (h) => h
                });
                // createScript が使える場合
                if (policy.createScript) {
                    eval(policy.createScript(code));
                } else {
                    eval(code);
                }
            } catch (e) {
                console.warn('[Custom] TrustedTypes失敗、直接evalします', e);
                eval(code);
            }
        } else {
            eval(code);
        }

        console.log('[Custom] スクリプト実行完了');
    } catch (e) {
        console.error('[Custom] 失敗:', e);
    }
})();



// D = document.querySelector("#player-container.ytd-watch-flexy, #player-container.ytd-watch-grid");
// D.addEventListener("wheel", xxx, !0);


// function xxx(){
//     console.log("wheel", );
// }