export const isInWebViewOrIframe = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    const isTelegram = /Telegram/i.test(userAgent);
    const isIframe = window.self !== window.top;

    return isTelegram || isIframe;
};
