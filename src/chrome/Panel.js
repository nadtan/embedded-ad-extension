/*global chrome*/
/**
 * chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
            console.log(message);
        });
 */

class Panel {

    instance = null;

    init() {
        chrome.devtools.panels.create("PostMessage", "", "index.html", (panel) => {
            this.instance = panel;
        });
    }

    postMessage(message) {
        chrome.runtime.sendMessage(message);
    }
}

export const $panel = new Panel();