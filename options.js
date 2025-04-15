// Sayfa yüklendiğinde kayıtlı ayarları yükle
document.addEventListener('DOMContentLoaded', function() {
    // Extension durumunu ve siteleri yükle
    chrome.storage.sync.get(['extensionEnabled', 'sites'], function(data) {
        // Extension durumunu ayarla
        document.getElementById('extensionEnabled').checked = data.extensionEnabled !== false;
        updateStatusText();

        // Siteleri yükle veya varsayılan olarak instagram.com'u ekle
        const sites = data.sites || ['instagram.com'];
        sites.forEach(site => addSiteInput(site));
    });

    // Extension durumu değişikliğini kaydet
    document.getElementById('extensionEnabled').addEventListener('change', function() {
        chrome.storage.sync.set({
            extensionEnabled: this.checked
        }, function() {
            updateStatusText();
        });
    });

    // Yeni site ekleme butonu
    document.getElementById('addSite').addEventListener('click', function() {
        addSiteInput('');
    });
});

// Durum metnini güncelle
function updateStatusText() {
    const statusText = document.getElementById('statusText');
    const isEnabled = document.getElementById('extensionEnabled').checked;
    statusText.textContent = isEnabled ? 'Work Mode' : 'Ayıp ediyorsun...';
    statusText.style.color = isEnabled ? '#2196F3' : '#666';
}

// Site input alanı ekle
function addSiteInput(siteUrl) {
    const sitesList = document.getElementById('sitesList');
    const siteDiv = document.createElement('div');
    siteDiv.className = 'site-input';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = siteUrl;
    input.placeholder = 'örn: instagram.com';
    input.addEventListener('input', saveSites);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '×';
    deleteButton.title = 'Siteyi Sil';
    deleteButton.onclick = function() {
        siteDiv.remove();
        saveSites();
    };

    siteDiv.appendChild(input);
    siteDiv.appendChild(deleteButton);
    sitesList.appendChild(siteDiv);
}

// Siteleri kaydet
function saveSites() {
    const inputs = document.querySelectorAll('.site-input input');
    const sites = Array.from(inputs).map(input => input.value.trim()).filter(site => site !== '');
    
    chrome.storage.sync.set({
        sites: sites
    });
} 