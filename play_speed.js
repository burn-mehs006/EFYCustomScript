(function () {
    console.log("Enhancer custom script loaded");

    const wait = (selector) => new Promise(resolve => {
        const timer = setInterval(() => {
            const el = document.querySelector(selector);
            if (el) {
                clearInterval(timer);
                resolve(el);
            }
        }, 500);
    });

    // 例：動画タイトルを取得してログに出す
    wait('h1.title').then(title => {
        console.log("Video title:", title.innerText);
    });
})();