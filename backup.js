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



// 動作時間をクリックした時のイベントリスナー
Bn() {
    this.B = !this.B;
    this.X4()
}

var O = g.iP(H);
this.N !== O && (this.updateValue("currenttime", O), this.N = O);
r = nf(this) ? (this.Hl.endTimeMs - this.Hl.startTimeMs) / 1E3 : this.api.getDurationForUx({
    playerType: r,
    Ye: !1
});