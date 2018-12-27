/*global chrome*/
/**
 * chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
            console.log(message);
        });
 */

class Tool {

    instance = null;
    tab = null;

    init() {
        return new Promise((resolve) => {
            chrome.devtools.panels.create("PostMessage", "", "index.html", (panel) => {
                this.instance = panel;
            });

            chrome.tabs.getSelected(null, (tab) => {
                this.tab = tab;
                console.log(tab.url);

                resolve();
            });
        });
    }

    getPageUrl() {
        return this.tab ? this.tab.url : '';
    }

    postMessage(message) {
        chrome.runtime.sendMessage(message);
    }
}

export const $tool = new Tool();