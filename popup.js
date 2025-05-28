document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save-button');
    const syncOrdersSwitch = document.getElementById('sync-orders');
    const autoSyncSwitch = document.getElementById('auto-sync');
    
    // Carrega os valores salvos, se existirem
    const savedApiKey = localStorage.getItem('api_key');
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const createOption = localStorage.getItem('create_option');
    const priceOption = localStorage.getItem('price_option');
    const tcg = localStorage.getItem('tcg');
    const modo = localStorage.getItem('modo');
    const syncOrders = localStorage.getItem('sync_orders');
    const autoSync = localStorage.getItem('magus_auto_sync');
    
    if (savedApiKey) {
        document.getElementById('api-key-input').value = savedApiKey;
    }
    if (savedEmail) {
        document.getElementById('seller-id-input').value = savedEmail;
    }
    if (savedPassword) {
        document.getElementById('password-input').value = savedPassword;
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
    if (syncOrders === 'true') {
        document.getElementById('sync-orders').checked = true;
    }
    if (autoSync !== 'false') {
        document.getElementById('auto-sync').checked = true;
    }
    
    // Mostrar/esconder campos relacionados à sincronização conforme o estado dos switches
    toggleSyncFields();
    
    // Event listener para o switch de sincronização de pedidos
    syncOrdersSwitch.addEventListener('change', toggleSyncFields);
    
    function toggleSyncFields() {
        const passwordContainer = document.getElementById('password-container');
        const autoSyncContainer = document.getElementById('auto-sync-container');
        const syncIntervalContainer = document.getElementById('sync-interval-container');
        
        if (syncOrdersSwitch.checked) {
            passwordContainer.style.display = 'block';
            autoSyncContainer.style.display = 'block';
            
            if (autoSyncSwitch.checked) {
                syncIntervalContainer.style.display = 'block';
            } else {
                syncIntervalContainer.style.display = 'none';
            }
        } else {
            passwordContainer.style.display = 'none';
            autoSyncContainer.style.display = 'none';
            syncIntervalContainer.style.display = 'none';
        }
    }
    
    // Event listener para o switch de sincronização automática
    autoSyncSwitch.addEventListener('change', function() {
        const syncIntervalContainer = document.getElementById('sync-interval-container');
        
        if (this.checked && syncOrdersSwitch.checked) {
            syncIntervalContainer.style.display = 'block';
        } else {
            syncIntervalContainer.style.display = 'none';
        }
    });
    
    saveButton.addEventListener('click', function() {
        // Obtém os valores dos inputs
        const apiKey = document.getElementById('api-key-input').value;
        const email = document.getElementById('seller-id-input').value;
        const password = document.getElementById('password-input').value;
        const tcg = document.getElementById('tcg-select').value;
        const createOption = document.getElementById('create-product').checked;
        const priceOption = document.getElementById('update-price').checked;
        const modo = document.getElementById('mode-select').value;
        const syncOrders = document.getElementById('sync-orders').checked;
        const autoSync = document.getElementById('auto-sync').checked;
        const syncInterval = document.getElementById('sync-interval').value;
        
        // Validação de campos
        if (!apiKey || !email) {
<<<<<<< Updated upstream
            showMessage('❌ Erro: API Key e E-mail são obrigatórios!', 'error');
=======
            showMessage('Erro', 'API Key e E-mail são obrigatórios!', 'error');
>>>>>>> Stashed changes
            return;
        }
        
        if (syncOrders && !password) {
<<<<<<< Updated upstream
            showMessage('❌ Erro: Para sincronização de pedidos, a senha é obrigatória!', 'error');
=======
            showMessage('Erro', 'Para sincronização de pedidos, a senha é obrigatória!', 'error');
>>>>>>> Stashed changes
            return;
        }
        
        // Salva os valores no armazenamento local
        localStorage.setItem('api_key', apiKey);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('create_option', createOption);
        localStorage.setItem('price_option', priceOption);
        localStorage.setItem('tcg', tcg);
        localStorage.setItem('modo', modo);
        localStorage.setItem('sync_orders', syncOrders ? 'true' : 'false');
        localStorage.setItem('magus_auto_sync', autoSync ? 'true' : 'false');
        localStorage.setItem('magus_sync_interval', syncInterval);
        
<<<<<<< Updated upstream
        // Salvar também com as chaves alternativas
        localStorage.setItem('magus_email', email);
        localStorage.setItem('magus_api_key', apiKey);
        
=======
>>>>>>> Stashed changes
        // Limpar qualquer sincronização agendada anterior
        if (syncOrders && autoSync) {
            // Definir a próxima sincronização de acordo com o intervalo
            const nextSyncTime = new Date();
            nextSyncTime.setHours(nextSyncTime.getHours() + parseInt(syncInterval));
            localStorage.setItem('magus_next_sync', nextSyncTime.getTime());
        } else {
            localStorage.removeItem('magus_next_sync');
        }
        
<<<<<<< Updated upstream
        // Tentar enviar mensagem para o content.js
        if (chrome && chrome.tabs) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (tabs && tabs.length > 0) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        apiKey: apiKey,
                        email: email,
                        password: password,
                        createOption: createOption,
                        priceOption: priceOption,
                        tcg: tcg,
                        modo: modo,
                        syncOrders: syncOrders ? 'true' : 'false'
                    }, function(response) {
                        // Callback opcional
                    });
                }
            });
        }
        
        // Mostra mensagem de confirmação
        showMessage('✅ Configurações salvas com sucesso!', 'success');
    });
    
    // Versão corrigida do botão de envio de preços
    document.getElementById('send-prices-button').addEventListener('click', async function() {
        const button = this;
        const originalText = button.textContent;
        
        try {
            button.disabled = true;
            button.textContent = '⏳ Iniciando...';
            
            // Obter dados das configurações
            let email = document.getElementById('seller-id-input').value.trim();
            let apiKey = document.getElementById('api-key-input').value.trim();
            
            // Fallback para localStorage se não estiverem preenchidos
            if (!email || !apiKey) {
                email = email || localStorage.getItem('email') || localStorage.getItem('magus_email');
                apiKey = apiKey || localStorage.getItem('api_key') || localStorage.getItem('magus_api_key');
            }
            
            if (!email || !apiKey) {
                showMessage('⚠️ Por favor, preencha o e-mail e a chave de API primeiro', 'error');
                return;
            }
            
            button.textContent = '📡 Verificando página...';
            
            // Primeiro, verificar se estamos em uma página válida
            const tabs = await new Promise((resolve) => {
                if (chrome && chrome.tabs) {
                    chrome.tabs.query({active: true, currentWindow: true}, resolve);
                } else {
                    resolve([]);
                }
            });
            
            if (!tabs || tabs.length === 0) {
                showMessage('❌ Erro: Nenhuma aba ativa encontrada', 'error');
                return;
            }
            
            const currentTab = tabs[0];
            
            button.textContent = '🚀 Enviando dados...';
            
            // Método 1: Tentar via chrome.tabs (preferido)
            if (chrome && chrome.tabs) {
                try {
                    const response = await new Promise((resolve, reject) => {
                        const timeout = setTimeout(() => {
                            reject(new Error('Timeout na comunicação'));
                        }, 25000);
                        
                        chrome.tabs.sendMessage(currentTab.id, {
                            action: 'sendCachedPrices',
                            email: email,
                            apiKey: apiKey
                        }, function(response) {
                            clearTimeout(timeout);
                            if (chrome.runtime.lastError) {
                                reject(new Error(chrome.runtime.lastError.message));
                            } else {
                                resolve(response);
                            }
                        });
                    });
                    
                    if (response) {
                        if (response.success) {
                            showMessage('✅ ' + response.message, 'success');
                        } else {
                            showMessage('❌ ' + response.error, 'error');
                        }
                        return;
                    }
                } catch (error) {
                    console.log('Método chrome.tabs falhou, tentando postMessage...');
                }
            }
            
            // Método 2: Fallback via postMessage
            button.textContent = '🔄 Tentando via postMessage...';
            
            const response = await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('Timeout aguardando resposta da página'));
                }, 15000);
                
                const messageHandler = (event) => {
                    if (event.data.type === 'MAGUS_SEND_PRICES_RESPONSE') {
                        clearTimeout(timeout);
                        window.removeEventListener('message', messageHandler);
                        resolve(event.data);
                    }
                };
                
                window.addEventListener('message', messageHandler);
                
                // Enviar mensagem
                window.postMessage({
                    type: 'MAGUS_SEND_PRICES',
                    email: email,
                    apiKey: apiKey
                }, '*');
            });
            
            if (response.success) {
                showMessage('✅ ' + response.message, 'success');
            } else {
                showMessage('❌ ' + response.error, 'error');
            }
            
        } catch (error) {
            console.error('Erro completo:', error);
            showMessage('❌ Erro de comunicação: ' + error.message + '\n\n' +
                       'Possíveis soluções:\n' +
                       '• Recarregue a página e tente novamente\n' +
                       '• Recarregue a extensão', 'error');
        } finally {
            button.disabled = false;
            button.textContent = originalText;
        }
    });
    
    // Função para mostrar mensagens
    function showMessage(text, type) {
        const messageDiv = document.getElementById('message');
        messageDiv.innerHTML = text.replace(/\n/g, '<br>');
        messageDiv.className = 'message message-' + type;
        messageDiv.style.display = 'block';
        
        // Auto-ocultar sucesso após 8 segundos
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 8000);
        }
    }
    
    // Salvar configurações quando mudarem
    document.getElementById('seller-id-input').addEventListener('change', function() {
        localStorage.setItem('magus_email', this.value);
        localStorage.setItem('email', this.value);
    });
    
    document.getElementById('api-key-input').addEventListener('change', function() {
        localStorage.setItem('magus_api_key', this.value);
        localStorage.setItem('api_key', this.value);
    });
=======
        // Envia uma mensagem para o content.js com os valores salvos
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                apiKey: apiKey,
                email: email,
                password: password,
                createOption: createOption,
                priceOption: priceOption,
                tcg: tcg,
                modo: modo,
                syncOrders: syncOrders ? 'true' : 'false'
            }, function(response) {
                // Callback opcional
            });
        });
        
        // Mostra mensagem de confirmação
        showMessage('Sucesso', 'Configurações salvas com sucesso!', 'success');
    });
    
    function showMessage(title, message, type) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;
        messageElement.className = `message message-${type}`;
        messageElement.style.display = 'block';
        
        // Oculta a mensagem após 3 segundos
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 3000);
    }
>>>>>>> Stashed changes
});