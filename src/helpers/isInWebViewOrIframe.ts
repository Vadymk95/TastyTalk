export const isInWebViewOrIframe = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    const isTelegram = /telegram/i.test(userAgent.toLowerCase());
    const isIframe = window.self !== window.top;

    return isTelegram || isIframe;
};
