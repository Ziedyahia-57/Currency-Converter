const browser = chrome || browser;

browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
        id: "convertSelection",
        title: "Convert Currency",
        contexts: ["selection"]
    });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "convertSelection") {
        browser.scripting.executeScript({
            target: { tabId: tab.id },
            function: handleTextSelection
        });
    }
});
