(function () {
    // chrome.runtime.onConnect.addListener(function(devToolsConnection) {
    //     console.log(devToolsConnection);
    //     // assign the listener function to a variable so we can remove it later
    //     const devToolsListener = function(message, sender, sendResponse) {
    //         console.error(message);
    //     };
    //     // add the listener
    //     devToolsConnection.onMessage.addListener(devToolsListener);
    //
    //     devToolsConnection.onDisconnect.addListener(function() {
    //         devToolsConnection.onMessage.removeListener(devToolsListener);
    //     });
    // });

    chrome.runtime.onMessage.addListener(function(message) {
        // console.log(message);
        chrome.tabs.executeScript(null,{
            code: `window.postMessage(${JSON.stringify(message)}, '*')`
        });
    });
})();