// Extension yüklendiğinde veya güncellendiğinde
chrome.runtime.onInstalled.addListener(function() {
    // Varsayılan ayarları kaydet
    chrome.storage.sync.get(['extensionEnabled', 'sites'], function(data) {
        if (data.extensionEnabled === undefined) {
            chrome.storage.sync.set({
                extensionEnabled: true
            });
        }
        if (!data.sites) {
            chrome.storage.sync.set({
                sites: ['instagram.com']
            });
        }
    });
});

// Tab değişikliklerini dinle
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        chrome.storage.sync.get(['extensionEnabled', 'sites'], function(data) {
            // Extension aktifse ve URL engellenecek sitelerden birini içeriyorsa yönlendir
            if (data.extensionEnabled && tab.url) {
                const sites = data.sites || ['instagram.com'];
                
                try {
                    // Create a URL object to properly parse the domain
                    const url = new URL(tab.url);
                    
                    for (const site of sites) {
                        if (site) {
                            // Check if the hostname is exactly the site (e.g., "instagram.com")
                            // Or if it's "www." + site (e.g., "www.instagram.com")
                            if (url.hostname === site || url.hostname === `www.${site}`) {
                                chrome.tabs.update(tabId, { url: "https://oidb.metu.edu.tr/akademik-takvim" }, function() {
                                    // Yönlendirme tamamlandıktan sonra popup.html'i aç
                                    chrome.windows.create({
                                        url: 'popup.html',
                                        type: 'popup',
                                        width: 400,
                                        height: 400
                                    });
                                });
                                break;
                            }
                        }
                    }
                } catch (error) {
                    // URL parsing hatası olduğunda sessizce devam et
                    console.log("URL parsing error:", error);
                }
            }
        });
    }
});

console.log("Instagram yönlendirici eklentisi aktif.");