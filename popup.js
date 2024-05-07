document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save-button');

    // Carrega os valores salvos, se existirem
    const savedApiKey = localStorage.getItem('api_key');
    const savedSellerId = localStorage.getItem('seller_id');
    const createOption = localStorage.getItem('create_option');
    const priceOption = localStorage.getItem('price_option');
    const tcg = localStorage.getItem('tcg');
    const modo = localStorage.getItem('modo');

    if (savedApiKey) {
        document.getElementById('api-key-input').value = savedApiKey;
    }
    if (savedSellerId) {
        document.getElementById('seller-id-input').value = savedSellerId;
    }
    if (createOption === 'true') {
        document.getElementById('create-product').checked = true;
    }
    if (priceOption === 'true') {
        document.getElementById('update-price').checked = true;
    }
    if (tcg) {
        document.getElementById('tcg-select').value = tcg;
    }
    if (modo) {
        document.getElementById('mode-select').value = modo;
    }

    // Envia uma mensagem para o content.js com os valores salvos
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, 
    //         {
    //             apiKey: savedApiKey, 
    //             sellerId: savedSellerId,
    //             createOption: createOption,
    //             priceOption: priceOption
    //         }, function(response) {
            
    //     });
    // })

    saveButton.addEventListener('click', function() {
        // Obtém os valores dos inputs
        const apiKey = document.getElementById('api-key-input').value;
        const sellerId = document.getElementById('seller-id-input').value;
        const tcg = document.getElementById('tcg-select').value;
        const createOption = document.getElementById('create-product').checked;
        const priceOption = document.getElementById('update-price').checked;
        const modo = document.getElementById('mode-select').value;

        // Envia uma mensagem para o content.js com os valores salvos
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, 
                {
                    apiKey: apiKey, 
                    sellerId: sellerId,
                    createOption: createOption,
                    priceOption: priceOption,
                    tcg: tcg,
                    modo: modo
                }, function(response) {
                
            });
        })

        // Salva os valores no armazenamento local
        localStorage.setItem('api_key', apiKey);
        localStorage.setItem('seller_id', sellerId);
        localStorage.setItem('create_option', createOption);
        localStorage.setItem('price_option', priceOption);
        localStorage.setItem('tcg', tcg);
        localStorage.setItem('modo', modo);

    });

});