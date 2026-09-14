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
    });
})();