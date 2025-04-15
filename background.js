// Extension yüklendiğinde veya güncellendiğinde
chrome.runtime.onInstalled.addListener(function() {
    // Varsayılan ayarları kaydet
    chrome.storage.sync.get(['extensionEnabled'], function(data) {
        if (data.extensionEnabled === undefined) {
            chrome.storage.sync.set({
                extensionEnabled: true
            });
        }
    });
});

// Tab değişikliklerini dinle
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        chrome.storage.sync.get(['extensionEnabled'], function(data) {
            // Extension aktifse ve URL instagram.com içeriyorsa yönlendir
            if (data.extensionEnabled && tab.url && tab.url.includes("instagram.com")) {
                chrome.tabs.update(tabId, { url: "https://oidb.metu.edu.tr/akademik-takvim" });
            }
        });
    }
});

console.log("Instagram yönlendirici eklentisi aktif.");