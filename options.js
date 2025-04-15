// Sayfa yüklendiğinde kayıtlı ayarları yükle
document.addEventListener('DOMContentLoaded', function() {
    // Extension durumunu yükle
    chrome.storage.sync.get(['extensionEnabled'], function(data) {
        document.getElementById('extensionEnabled').checked = data.extensionEnabled !== false;
        updateStatusText();
    });

    // Extension durumu değişikliğini kaydet
    document.getElementById('extensionEnabled').addEventListener('change', function() {
        chrome.storage.sync.set({
            extensionEnabled: this.checked
        });
        updateStatusText();
    });
});

// Durum metnini güncelle
function updateStatusText() {
    const statusText = document.getElementById('statusText');
    const isEnabled = document.getElementById('extensionEnabled').checked;
    statusText.textContent = isEnabled ? 'Extension aktif' : 'Extension devre dışı';
    statusText.style.color = isEnabled ? '#2196F3' : '#666';
} 