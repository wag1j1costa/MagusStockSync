// Encontrar todas as linhas da tabela
const rows = document.querySelectorAll('.table-allTCG-order-0 tbody tr');
const urlParams = new URLSearchParams(window.location.search);
const currentPage = urlParams.get('page');
const emailParam = urlParams.get('email');
const apiKeyParam = urlParams.get('key');
const passwordParam = urlParams.get('password');
const createOptionParam = urlParams.get('create_option');
const priceOptionParam = urlParams.get('price_option');
const filtroPreco1 = 'txt_filtro_preco_tipo';
const filtroPreco2 = 'txt_filtro_preco';
const filtroOp = 'txt_filtro_operacao';
const searchType = 'search_type';
const modoParam = urlParams.get('modo');
const syncOrdersParam = urlParams.get('sync_orders');

<<<<<<< Updated upstream
<<<<<<< Updated upstream
// URL base para requisições
const API_BASE = 'https://magusshop.com.br/';

=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
let apiKey, email, password, createOption, priceOption, tcg, modo, syncOrders;

// Verificar se estamos na página de login e precisamos fazer login automático
function checkLoginPage() {
    if (window.location.href.includes('view=ecom/logar')) {
        const emailStorage = localStorage.getItem('email');
        const passwordStorage = localStorage.getItem('password');
        
        if (emailStorage && passwordStorage && syncOrders === 'true') {
            // Aguardar a página carregar completamente
            setTimeout(() => {
                try {
                    // Aceitar cookies se necessário
                    const cookieButton = document.querySelector('#lgpd-cookie button');
                    if (cookieButton) {
                        cookieButton.click();
                    }
                    
                    // Preencher formulário de login
                    const form = document.querySelector('.box-login form');
                    if (form) {
                        const usernameField = form.querySelector('input[name="lnick"]');
                        const passwordField = form.querySelector('input[name="lsenha"]');
                        
                        if (usernameField && passwordField) {
                            usernameField.value = emailStorage;
                            passwordField.value = passwordStorage;
                            
                            // Enviar formulário
                            form.submit();
                        }
                    }
                } catch (error) {
                    console.error('Erro ao realizar login automático:', error);
                }
            }, 2000);
        }
    }
}

// Verificar se estamos na página de pedidos e precisamos sincronizar
function checkOrdersPage() {
    if (!syncOrders) {
        syncOrders = localStorage.getItem('sync_orders');
    }
    console.log("Verificando página de pedidos, syncOrders =", syncOrders);
    if (window.location.href.includes('view=ecom/admin/pedidos') && syncOrders === 'true') {
        // Aguardar um tempo maior para garantir que a página esteja carregada
        console.log("Página de pedidos detectada, aguardando para iniciar scraping...");
        setTimeout(() => {
            console.log("Iniciando scrapeOrders()");
            scrapeOrders();
        }, 3000); // Aumentado para 3 segundos
    }
}

// Função para obter configurações do vendedor
async function getSellerConfig() {
    try {
        const emailStorage = localStorage.getItem('email');
        const apiKeyStorage = localStorage.getItem('api_key');
        
        if (!emailStorage || !apiKeyStorage) {
            Swal.fire({
                icon: 'error',
                title: 'Configuração incompleta',
                text: 'É necessário configurar email e chave de API antes de sincronizar pedidos.'
            });
            return null;
        }
        
        console.log(`Obtendo configurações do vendedor: ${emailStorage}`);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        const response = await fetch(`${API_BASE}hub/seller/config?email=${emailStorage}&key=${apiKeyStorage}`);
=======
        const response = await fetch(`https://magusshop.com.br/hub/seller/config?email=${emailStorage}&key=${apiKeyStorage}`);
>>>>>>> Stashed changes
=======
        const response = await fetch(`https://magusshop.com.br/hub/seller/config?email=${emailStorage}&key=${apiKeyStorage}`);
>>>>>>> Stashed changes
        const data = await response.json();
        console.log('Resposta da configuração:', data);
        
        if (!data.success) {
            Swal.fire({
                icon: 'error',
                title: 'Erro ao obter configurações',
                text: data.message || 'Não foi possível obter as configurações do vendedor.'
            });
            return null;
        }
        
        return data;
    } catch (error) {
        console.error('Erro ao obter configurações do vendedor:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro de conexão',
            text: 'Não foi possível conectar ao servidor da Magus Shop.'
        });
        return null;
    }
}

function extractOrderDetails(orderWindow) {
    try {
        const doc = orderWindow.document;
        
        // Extrair informações básicas
        const shipping = doc.querySelector('.container b')?.textContent.trim() || '';
        const payment = doc.querySelector('.payment-label')?.textContent.trim() || '';
        const customer = doc.querySelector('.user-name')?.textContent.trim().replace('(', '').replace(')', '') || '';
        const orderDate = doc.querySelector('.text-center.order-datetime i')?.textContent.trim() || '';
        const orderNumber = new URLSearchParams(orderWindow.location.search).get('cod');
        
        // Capturar status do pedido
        const statusElement = doc.querySelector('.panel-order--success');
        const status = statusElement ? statusElement.textContent.trim() : 'pending';
        
        // Dados do usuário
        const userElements = doc.querySelectorAll('.user-cep');
        let cep = '', cpf = '', telefone = '';
        
        userElements.forEach(el => {
            const text = el.textContent.trim();
            if (text.startsWith('CEP')) cep = text.replace('CEP ', '');
            else if (text.startsWith('CPF')) cpf = text.replace('CPF: ', '');
            else telefone = text;
        });
        
        // Dados de preço
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        const priceElements = doc.querySelectorAll('.td-sum-small b');
        const valorItens = priceElements[0] ? parseFloat(priceElements[0].textContent.replace('R$ ', '').replace(',', '.')) : 0;
        const valorFrete = priceElements[priceElements.length - 1] ? parseFloat(priceElements[priceElements.length - 1].textContent.replace('R$ ', '').replace(',', '.')) : 0;
=======
=======
>>>>>>> Stashed changes
        // Specifically target the summary table
        const summaryTable = doc.querySelector('.table-summary');
        
        if (!summaryTable) {
            console.error('Summary table not found');
            let valorItens = 0;
            let valorFrete = 0;
            let creditoUtilizado = 0;
            let valorTotal = 0;
        }
        
        // Get all rows within this specific table
        const rows = summaryTable.querySelectorAll('tr');
        let valorItens = 0;
        let valorFrete = 0;
        let creditoUtilizado = 0;
        let valorTotal = 0;

        // Iterate through each row to find specific labels
        rows.forEach(row => {
            const label = row.querySelector('td:first-child');
            
            if (!label) return;
            
            const labelText = label.textContent.trim();
            const valueElement = row.querySelector('td:last-child b');
            
            if (!valueElement) return;
            
            // Convert price text to number
            const value = parseFloat(valueElement.textContent.replace('R$ ', '').replace(',', '.'));
            
            // Assign values based on label text
            if (labelText.includes('Valor dos Itens:')) {
            valorItens = value;
            } else if (labelText.includes('Frete:')) {
            valorFrete = value;
            } else if (labelText.includes('Crédito utilizado:')) {
            creditoUtilizado = value;
            } else if (labelText.includes('Valor Total:')) {
            valorTotal = value;
            }
        });
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        
        // Processamento de endereço
        const addressElement = doc.querySelector('.user-address');
        const addressText = addressElement ? addressElement.textContent.trim() : '';
        const address = {};
        
        if (addressText) {
            const lines = addressText.split('\n').map(line => line.trim());
            
            if (lines.length >= 3) {
                const endereco = lines[0].split(',');
                address.rua = endereco[0].trim();
                address.numero = '';
                address.complemento = '';
                
                if (endereco.length > 1) {
                    const infoAdicional = endereco[1].trim();
                    if (infoAdicional.includes(' - ')) {
                        const [num, comp] = infoAdicional.split(' - ');
                        address.numero = num.trim();
                        address.complemento = comp.trim();
                    } else {
                        address.numero = infoAdicional;
                    }
                }
                
                if (endereco.length > 2) {
                    address.complemento = endereco[2].trim();
                }
                
                address.bairro = lines[1].trim();
                
                const cidadeUf = lines[2].split('-');
                address.cidade = cidadeUf[0].trim();
                address.uf = cidadeUf.length > 1 ? cidadeUf[1].trim() : '';
            }
        }
        
        // Extração dos itens
        const items = [];
        const itemElements = doc.querySelectorAll('.panel-order--content');
        
        itemElements.forEach(item => {
            // Pular o elemento de resumo
            if (item.querySelector('.table-summary')) return;
            
            try {
                // Quantidade
                const quantityText = item.querySelector('span.bold')?.textContent || '';
                const quantity = parseInt(quantityText.replace('x', '').trim());
                
                // Nome em inglês
                const englishName = item.querySelector('.link-produto .bold')?.textContent.trim() || '';
                
                // Código do produto
                const codeText = item.querySelector('.input-infoaux')?.textContent || '';
                const code = codeText.replace('(Código: ', '').replace(')', '').trim();
                
                // Preços
                const priceElements = item.querySelectorAll('.col-xs-6.col-sm-3.col-md-3 p');
                let oldPrice = null;
                let price = null;
                
                priceElements.forEach(p => {
                    const text = p.textContent.trim();
                    if (!text.includes('R$')) return;
                    
                    const priceText = text.replace('R$ ', '')
                        .replace(' (unid.)', '')
                        .replace(' (subtotal)', '')
                        .replace(',', '.');
                    
                    if (p.classList.contains('price--old')) {
                        oldPrice = parseFloat(priceText);
                    } else if (p.classList.contains('price--new')) {
                        price = parseFloat(priceText);
                    }
                });
                
                // Estoque
                const stockText = item.querySelector('.order-functions-aux a[title="Estoque"]')
                    ?.textContent.replace('Estoque: ', '') || '0';
                const stock = parseInt(stockText);
                
                // Verificar se é lacrado
                let isSealed = false;
                let quality = null;
                let qualityCode = null;
                let language = '';
                
                const editionElement = item.querySelector('.icon-edicao');
                if (editionElement) {
                    isSealed = editionElement.title.toLowerCase().includes('lacrado');
                }
                
                if (!isSealed) {
                    const qualityElement = item.querySelector('.icon_qualid');
                    if (qualityElement) {
                        quality = qualityElement.title;
                        qualityCode = qualityElement.textContent.trim();
                    }
                }
                
                const langElement = item.querySelector('.col-xs-3.col-sm-1 img');
                if (langElement) {
                    language = langElement.getAttribute('alt');
                }
                
                items.push({
                    quantity,
                    english_name: englishName,
                    code,
                    quality,
                    quality_code: qualityCode,
                    old_price: oldPrice,
                    price: price || oldPrice,
                    stock,
                    is_sealed: isSealed,
                    language
                });
            } catch (error) {
                console.error('Erro ao processar item:', error);
            }
        });
        
        return {
            numero_pedido: orderNumber,
            order_date: orderDate,
            cliente: customer,
            envio: shipping,
            pagamento: payment,
            status: status,
            cep: cep,
            cpf: cpf,
            telefone: telefone,
            valor_itens: valorItens,
            valor_frete: valorFrete,
            endereco: address,
            items: items
        };
        
    } catch (error) {
        console.error(`Erro ao extrair detalhes do pedido:`, error);
        return null;
    }
}

// Função para extrair e processar os pedidos da página
async function scrapeOrders() {
    console.log("Iniciando a extração de pedidos");
    Swal.fire({
        icon: "info",
        title: "Sincronizando pedidos",
        html: "Aguarde, estamos obtendo os pedidos da loja...",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    
    try {
        // Extrair números dos pedidos da página
        const orderNumbers = [];
        const orderLinks = document.querySelectorAll('.txt-order-id a, a[href*="compra&cod"]');
        
        orderLinks.forEach(link => {
            const text = link.textContent.trim();
            if (text && text.includes('#')) {
                const orderNumber = text.replace('#', '').trim();
                orderNumbers.push(orderNumber);
            }
        });
        
        console.log("Pedidos encontrados:", orderNumbers);
        
        if (orderNumbers.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Nenhum pedido encontrado',
                text: 'Não foram encontrados pedidos para sincronizar nesta página.'
            });
            return;
        }
        
        // Obter configurações do vendedor
        const config = await getSellerConfig();
        if (!config) return;
        
        console.log("Configuração do vendedor:", config);
        
        // Extrair detalhes de cada pedido individualmente para evitar problemas de navegação
        const successOrders = [];
        const errorOrders = [];
        
        // Processar um pedido por vez para evitar problemas de navegação
        for (let i = 0; i < orderNumbers.length; i++) {
            const orderNumber = orderNumbers[i];
            console.log(`Processando pedido ${i+1}/${orderNumbers.length}: #${orderNumber}`);
            
            try {
                // Armazenar a URL atual para voltar depois
                const currentUrl = window.location.href;
                
                // Navegar para a página do pedido
                const orderUrl = `${window.location.origin}/?view=ecom/admin/compra&cod=${orderNumber}`;
                console.log("Acessando:", orderUrl);
                
                // Usar janela temporária para obter detalhes do pedido sem perder a página atual
                const orderWindow = window.open(orderUrl, '_blank');
                
                if (!orderWindow) {
                    throw new Error("Não foi possível abrir a janela do pedido. Verifique se o bloqueador de pop-ups está desativado.");
                }
                
                // Aguardar a página carregar
                await new Promise(resolve => setTimeout(resolve, 3000));
                
                // Extrair detalhes do pedido da janela temporária
                const orderDetails = extractOrderDetails(orderWindow);
                orderWindow.close();
                
                if (!orderDetails) {
                    errorOrders.push({
                        number: orderNumber,
                        error: 'Não foi possível obter detalhes do pedido'
                    });
                    continue;
                }
                
                console.log(`Detalhes do pedido #${orderNumber} obtidos com sucesso`);
                
                // Enviar pedido para o Magento
                const result = await sendOrderToMagento(orderDetails, config.seller_id);
                
                if (result.success) {
                    successOrders.push({
                        number: orderNumber,
                        details: orderDetails
                    });
                    console.log(`Pedido #${orderNumber} sincronizado com sucesso`);
                } else {
                    errorOrders.push({
                        number: orderNumber,
                        error: result.message || 'Erro ao sincronizar pedido'
                    });
                    console.error(`Erro ao sincronizar pedido #${orderNumber}:`, result.message);
                }
            } catch (error) {
                console.error(`Erro ao processar pedido ${orderNumber}:`, error);
                errorOrders.push({
                    number: orderNumber,
                    error: error.message || 'Erro desconhecido'
                });
            }
        }
        
        // Exibir resultados
        Swal.fire({
            icon: successOrders.length > 0 ? 'success' : 'warning',
            title: 'Sincronização concluída',
            html: `
                <p><b>Pedidos sincronizados: ${successOrders.length}</b></p>
                ${successOrders.map(order => `<p>Pedido #${order.number}</p>`).join('')}
                <p><b>Erros: ${errorOrders.length}</b></p>
                ${errorOrders.map(order => `<p>Pedido #${order.number}: ${order.error}</p>`).join('')}
            `,
            footer: '<a href="#">Precisa de ajuda?</a>'
        });
        
    } catch (error) {
        console.error('Erro ao sincronizar pedidos:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro na sincronização',
            text: error.message || 'Ocorreu um erro durante a sincronização dos pedidos.'
        });
    }
}

// Função para obter detalhes de um pedido
async function getOrderDetails(orderNumber) {
    try {
        const baseUrl = window.location.origin;
        window.location.href = `${baseUrl}/?view=ecom/admin/compra&cod=${orderNumber}`;
        
        // Aguardar carregamento da página
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Extrair informações básicas
        const shipping = document.querySelector('.container b')?.textContent.trim() || '';
        const payment = document.querySelector('.payment-label')?.textContent.trim() || '';
        const customer = document.querySelector('.user-name')?.textContent.trim().replace('(', '').replace(')', '') || '';
        const orderDate = document.querySelector('.text-center.order-datetime i')?.textContent.trim() || '';
        
        // Capturar status do pedido
        const statusElement = document.querySelector('.panel-order--success');
        const status = statusElement ? statusElement.textContent.trim() : 'pending';
        
        // Dados do usuário
        const userElements = document.querySelectorAll('.user-cep');
        let cep = '', cpf = '', telefone = '';
        
        userElements.forEach(el => {
            const text = el.textContent.trim();
            if (text.startsWith('CEP')) cep = text.replace('CEP ', '');
            else if (text.startsWith('CPF')) cpf = text.replace('CPF: ', '');
            else telefone = text;
        });
        
        // Dados de preço
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        const priceElements = document.querySelectorAll('.td-sum-small b');
        const valorItens = priceElements[0] ? parseFloat(priceElements[0].textContent.replace('R$ ', '').replace(',', '.')) : 0;
        const valorFrete = priceElements[1] ? parseFloat(priceElements[1].textContent.replace('R$ ', '').replace(',', '.')) : 0;
=======
=======
>>>>>>> Stashed changes
        // Specifically target the summary table
        const summaryTable = doc.querySelector('.table-summary');
        
        if (!summaryTable) {
            console.error('Summary table not found');
            let valorItens = 0;
            let valorFrete = 0;
            let creditoUtilizado = 0;
            let valorTotal = 0;
        }
        
        // Get all rows within this specific table
        const rows = summaryTable.querySelectorAll('tr');
        let valorItens = 0;
        let valorFrete = 0;
        let creditoUtilizado = 0;
        let valorTotal = 0;

        // Iterate through each row to find specific labels
        rows.forEach(row => {
            const label = row.querySelector('td:first-child');
            
            if (!label) return;
            
            const labelText = label.textContent.trim();
            const valueElement = row.querySelector('td:last-child b');
            
            if (!valueElement) return;
            
            // Convert price text to number
            const value = parseFloat(valueElement.textContent.replace('R$ ', '').replace(',', '.'));
            
            // Assign values based on label text
            if (labelText.includes('Valor dos Itens:')) {
            valorItens = value;
            } else if (labelText.includes('Frete:')) {
            valorFrete = value;
            } else if (labelText.includes('Crédito utilizado:')) {
            creditoUtilizado = value;
            } else if (labelText.includes('Valor Total:')) {
            valorTotal = value;
            }
        });
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        
        // Processamento de endereço
        const addressElement = document.querySelector('.user-address');
        const addressText = addressElement ? addressElement.textContent.trim() : '';
        const address = {};
        
        if (addressText) {
            const lines = addressText.split('\n').map(line => line.trim());
            
            if (lines.length >= 3) {
                const endereco = lines[0].split(',');
                address.rua = endereco[0].trim();
                address.numero = '';
                address.complemento = '';
                
                if (endereco.length > 1) {
                    const infoAdicional = endereco[1].trim();
                    if (infoAdicional.includes(' - ')) {
                        const [num, comp] = infoAdicional.split(' - ');
                        address.numero = num.trim();
                        address.complemento = comp.trim();
                    } else {
                        address.numero = infoAdicional;
                    }
                }
                
                if (endereco.length > 2) {
                    address.complemento = endereco[2].trim();
                }
                
                address.bairro = lines[1].trim();
                
                const cidadeUf = lines[2].split('-');
                address.cidade = cidadeUf[0].trim();
                address.uf = cidadeUf.length > 1 ? cidadeUf[1].trim() : '';
            }
        }
        
        // Extração dos itens
        const items = [];
        const itemElements = document.querySelectorAll('.panel-order--content');
        
        itemElements.forEach(item => {
            // Pular o elemento de resumo
            if (item.querySelector('.table-summary')) return;
            
            try {
                // Quantidade
                const quantityText = item.querySelector('span.bold')?.textContent || '';
                const quantity = parseInt(quantityText.replace('x', '').trim());
                
                // Nome em inglês
                const englishName = item.querySelector('.link-produto .bold')?.textContent.trim() || '';
                
                // Código do produto
                const codeText = item.querySelector('.input-infoaux')?.textContent || '';
                const code = codeText.replace('(Código: ', '').replace(')', '').trim();
                
                // Preços
                const priceElements = item.querySelectorAll('.col-xs-6.col-sm-3.col-md-3 p');
                let oldPrice = null;
                let price = null;
                
                priceElements.forEach(p => {
                    const text = p.textContent.trim();
                    if (!text.includes('R$')) return;
                    
                    const priceText = text.replace('R$ ', '')
                        .replace(' (unid.)', '')
                        .replace(' (subtotal)', '')
                        .replace(',', '.');
                    
                    if (p.classList.contains('price--old')) {
                        oldPrice = parseFloat(priceText);
                    } else if (p.classList.contains('price--new')) {
                        price = parseFloat(priceText);
                    }
                });
                
                // Estoque
                const stockText = item.querySelector('.order-functions-aux a[title="Estoque"]')
                    ?.textContent.replace('Estoque: ', '') || '0';
                const stock = parseInt(stockText);
                
                // Verificar se é lacrado
                let isSealed = false;
                let quality = null;
                let qualityCode = null;
                let language = '';
                
                const editionElement = item.querySelector('.icon-edicao');
                if (editionElement) {
                    isSealed = editionElement.title.toLowerCase().includes('lacrado');
                }
                
                if (!isSealed) {
                    const qualityElement = item.querySelector('.icon_qualid');
                    if (qualityElement) {
                        quality = qualityElement.title;
                        qualityCode = qualityElement.textContent.trim();
                    }
                }
                
                const langElement = item.querySelector('.col-xs-3.col-sm-1 img');
                if (langElement) {
                    language = langElement.getAttribute('alt');
                }
                
                items.push({
                    quantity,
                    english_name: englishName,
                    code,
                    quality,
                    quality_code: qualityCode,
                    old_price: oldPrice,
                    price: price || oldPrice,
                    stock,
                    is_sealed: isSealed,
                    language
                });
            } catch (error) {
                console.error('Erro ao processar item:', error);
            }
        });
        
        return {
            numero_pedido: orderNumber,
            order_date: orderDate,
            cliente: customer,
            envio: shipping,
            pagamento: payment,
            status: status,
            cep: cep,
            cpf: cpf,
            telefone: telefone,
            valor_itens: valorItens,
            valor_frete: valorFrete,
            endereco: address,
            items: items
        };
        
    } catch (error) {
        console.error(`Erro ao obter detalhes do pedido ${orderNumber}:`, error);
        return null;
    }
}

// Função para enviar pedido para o Magento
async function sendOrderToMagento(orderDetails, sellerId) {
    try {
        const emailStorage = localStorage.getItem('email');
        const apiKeyStorage = localStorage.getItem('api_key');
        
        if (!emailStorage || !apiKeyStorage) {
            throw new Error('Credenciais não configuradas');
        }
        
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        const response = await fetch(API_BASE + 'hub/orders/import', {
=======
        const response = await fetch('https://magusshop.com.br/hub/orders/import', {
>>>>>>> Stashed changes
=======
        const response = await fetch('https://magusshop.com.br/hub/orders/import', {
>>>>>>> Stashed changes
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                seller_id: sellerId,
                orders: [orderDetails],
                email: emailStorage,
                key: apiKeyStorage
            })
        });
        
        const result = await response.json();
        
        return {
            success: result.success,
            message: result.message,
            savedOrders: result.saved_orders || [],
            errors: result.errors || []
        };
    } catch (error) {
        console.error('Erro ao enviar pedido para o Magento:', error);
        return {
            success: false,
            message: `Erro ao enviar pedido: ${error.message}`
        };
    }
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.apiKey && message.email) {
        // Use os valores recebidos como desejar
        apiKey = message.apiKey;
        email = message.email;
        password = message.password || '';
        createOption = message.createOption;
        priceOption = message.priceOption;
        tcg = message.tcg;
        modo = message.modo;
        syncOrders = message.syncOrders || 'false';

        // Salvar valores no localStorage
        localStorage.setItem('api_key', apiKey);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('sync_orders', syncOrders);

        // Faça algo com apiKey e email
        console.log('Valores recebidos em content.js:', apiKey, email, createOption, priceOption, tcg, modo, syncOrders);

        // Se a sincronização de pedidos estiver ativada, iniciar o processo
        if (syncOrders === 'true') {
            // Iniciar o processo de sincronização em segundo plano
            initSyncProcess();
            return true; // Mantém a conexão ativa para operações assíncronas
        }

        // Para outros modos, continuar com o comportamento original
        let params = new URLSearchParams();
        if(modo == 1 || modo == 2) {
            params.append('view', 'ecom/admin/cartas/all');
        }
        if(modo == 3) {
            params.append('view', 'ecom/admin/cartas/missingM');
            params.append('tipo', 1);
        }
        params.append('page', 1);
        params.append('tcg', tcg);
        params.append('key', apiKey);
        params.append('email', email);
        params.append('password', password);
        params.append('create_option', createOption);
        params.append('price_option', priceOption);
       
        if(modo && modo == 2) {
            params.append(filtroPreco1, 1);
            params.append(filtroPreco2, '0,00');
            params.append(filtroOp, 2);
            params.append(searchType, 1);
        }
        params.append('modo', modo);
        params.append('sync_orders', syncOrders);

        // adicionar todos os parametros ainda não adicionados
        urlParams.forEach((value, key) => {
            if (!params.has(key)) {
                params.append(key, value);
            }
        });

        // Adicione os parâmetros à URL atual e recarregue a página
        let url = window.location.href.split('?')[0] + '?' + params.toString();
        window.location.href = url;
    }
});

if (apiKeyParam && emailParam) {
    // Use os parametros para preencher as variáveis
    apiKey = apiKeyParam;
    email = emailParam;
    password = passwordParam || '';
    createOption = createOptionParam;
    priceOption = priceOptionParam;
    modo = modoParam;
    syncOrders = syncOrdersParam || 'false';
    
    // Salvar valores no localStorage
    localStorage.setItem('api_key', apiKey);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('sync_orders', syncOrders);
    
    // Se estiver no modo de sincronização de pedidos, iniciar o processo
    if (syncOrders === 'true' && !window.location.href.includes('view=ecom/admin/cartas')) {
        // Verificar se já estamos na página principal após login
        if (window.location.href.includes('view=ecom/admin/pedidos') || 
            window.location.href.includes(config?.base_url) || 
            window.location.href === window.location.origin + '/') {
            
            // Iniciar processo de sincronização em segundo plano
            setTimeout(() => {
                initSyncProcess();
            }, 1000);
        }
    }
}

// Verificar página atual
checkLoginPage();

// Apenas criar o indicador de status se a sincronização estiver ativada
if (syncOrders === 'true' && !document.getElementById('magus-status-indicator')) {
    createStatusIndicator();
    
    // Se estamos na página principal, iniciar o processo de sincronização
    if (window.location.href === window.location.origin + '/' || 
        window.location.href.includes('view=ecom/admin/home')) {
        
        setTimeout(() => {
            initSyncProcess();
        }, 1000);
    }
}

const tableHeader = document.querySelector('.table-allTCG-order-0 thead tr');

// Iterar sobre cada linha, começando do terceiro elemento (índice 2)
function modoCadastro(tcgCode) {
    const headerCell = document.createElement('th');
    headerCell.textContent = 'Ações da magus';
    if (!tableHeader) return;
    tableHeader.appendChild(headerCell);
    if (!apiKey && !email) {
        apiKey = localStorage.getItem('api_key');
        email = localStorage.getItem('email');
    }

    const submitButton = document.querySelector('#btSalvar');
    if (!submitButton) return false;
    
    // Criar o botão MAGUS
    const magusButton = document.createElement('button');
    magusButton.type = 'button';
    magusButton.id = 'btAplicarMagus';
    magusButton.className = 'btn btn-primary btAplicarMagus';
    magusButton.style.marginLeft = '20px';
    magusButton.style.marginTop = '20px';
    magusButton.textContent = 'Salvar MAGUS';
    
    // Adicionar o botão ao lado do submit
    submitButton.insertAdjacentElement('afterend', magusButton);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
    // Adicionar botão para visualizar preços em cache
    const viewPricesButton = document.createElement('button');
    viewPricesButton.type = 'button';
    viewPricesButton.id = 'btVisualizarPrecos';
    viewPricesButton.className = 'btn btn-info';
    viewPricesButton.style.marginLeft = '20px';
    viewPricesButton.style.marginTop = '20px';
    viewPricesButton.textContent = 'Ver Preços Salvos';
    
    magusButton.insertAdjacentElement('afterend', viewPricesButton);
    
    // Event listener para mostrar preços em cache
    viewPricesButton.addEventListener('click', () => showCachedPrices());

=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    for (let i = 0; i < rows.length; i++) {
        if (i === 0) {
            const topBodyCell = document.createElement('td');
            // const magusButton = document.createElement('button');
            // magusButton.type = 'button';
            // magusButton.className = 'btn-acao btn btn-primary';
            // magusButton.textContent = 'Aplicar MAGUS';
            const topBodyCellRow = rows[i];
            //topBodyCell.appendChild(magusButton);
            topBodyCellRow.appendChild(topBodyCell);
    
            magusButton.addEventListener('click', async () => {
                const successArray = [];
                const errorArray = [];
                const batchSize = 25;
                const productsToProcess = [];
            
                Swal.fire({
                    icon: "info",
                    title: "Atualizando estoque na Magus Market",
                    html: "Aguarde, estamos atualizando o estoque na Magus Market...",
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
            
                // Collect products
                for (let i = 2; i < rows.length; i++) {
                    const row = rows[i];
                    const productData = extractProductData(row);
                    if (productData && productData.precoLiga != null) {
                        productsToProcess.push(productData);
                    }
                }
            
                // Process in batches
                for (let i = 0; i < productsToProcess.length; i += batchSize) {
                    const batch = productsToProcess.slice(i, i + batchSize);
                    
                    // Parallel verification
                    const verificationResults = await Promise.all(batch.map(async (productData) => {
                        try {
                            const sellerstockUrl = tcgCode === '2'
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                                ? `${API_BASE}catalog/collection/sellerstock/?sku=${productData.code}&email=${email}&key=${apiKey}&card_id=${productData.cardId}&edition_id=${productData.editionId}&card_number=${productData.cardNumber}&tcg=2`
                                : `${API_BASE}catalog/collection/sellerstock/?sku=${productData.code}&email=${email}&key=${apiKey}`;
=======
                                ? `https://magusshop.com.br/catalog/collection/sellerstock/?sku=${productData.code}&email=${email}&key=${apiKey}&card_id=${productData.cardId}&edition_id=${productData.editionId}&card_number=${productData.cardNumber}&tcg=2`
                                : `https://magusshop.com.br/catalog/collection/sellerstock/?sku=${productData.code}&email=${email}&key=${apiKey}`;
>>>>>>> Stashed changes
=======
                                ? `https://magusshop.com.br/catalog/collection/sellerstock/?sku=${productData.code}&email=${email}&key=${apiKey}&card_id=${productData.cardId}&edition_id=${productData.editionId}&card_number=${productData.cardNumber}&tcg=2`
                                : `https://magusshop.com.br/catalog/collection/sellerstock/?sku=${productData.code}&email=${email}&key=${apiKey}`;
>>>>>>> Stashed changes
                            
                            const response = await fetch(sellerstockUrl);
                            const data = await response.json();
                            return { productData, existingData: data[0] };
                        } catch (error) {
                            errorArray.push(productData.nomeProdutoLiga);
                            return null;
                        }
                    }));
            
                    // Sequential updates
                    for (const result of verificationResults) {
                        if (!result || !result.existingData) continue;
            
                        try {
                            const { productData, existingData } = result;
                            const newStock = productData.estoqueLiga;
                            const newPrice = productData.precoLiga === null ? '' : '&price=' + formatPrice(productData.precoLiga);
            
                            const stockUrl = tcgCode === '2'
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                                ? `${API_BASE}catalog/save/sellerproduct/?id=${existingData.id}&sku=${existingData.sku}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}&tcg=2`
                                : `${API_BASE}catalog/save/sellerproduct/?id=${existingData.id}&sku=${existingData.sku}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
=======
                                ? `https://magusshop.com.br/catalog/save/sellerproduct/?id=${existingData.id}&sku=${existingData.sku}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}&tcg=2`
                                : `https://magusshop.com.br/catalog/save/sellerproduct/?id=${existingData.id}&sku=${existingData.sku}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
>>>>>>> Stashed changes
=======
                                ? `https://magusshop.com.br/catalog/save/sellerproduct/?id=${existingData.id}&sku=${existingData.sku}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}&tcg=2`
                                : `https://magusshop.com.br/catalog/save/sellerproduct/?id=${existingData.id}&sku=${existingData.sku}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
>>>>>>> Stashed changes
            
                            await fetch(stockUrl);
                            successArray.push(productData.nomeProdutoLiga);
                            
                            await new Promise(resolve => setTimeout(resolve, 100));
                        } catch (error) {
                            errorArray.push(result.productData.nomeProdutoLiga);
                        }
                    }
                }
            
                Swal.fire({
                    icon: "success",
                    title: "Resultado da atualização",
                    html: `
                        <p><b>Atualizados com sucesso: ${successArray.length}</b></p>
                        ${successArray.map(item => `<p>${item}</p>`).join('')}
                        <p><b>Não atualizados: ${errorArray.length}</b></p>
                        ${errorArray.map(item => `<p>${item}</p>`).join('')}
                    `,
                    footer: '<a href="#">Precisa de ajuda?</a>'
                });
            });
            continue;
        }
    
        if (i === 1) {
            continue;
        }
    
        const row = rows[i];
    
        // Criar um elemento de botão
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn-acao btn btn-primary';
        button.textContent = 'MAGUS';
    
        button.addEventListener('click', () => {
            Swal.fire({
                icon: "info",
                title: "Procurando produto na Magus Market",
                html: "Verificando se o produto está no seu estoque...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            
            let cardIdElement = row.querySelector('td:nth-child(1) input[name^="h_ide_carta"]');
            let editionIdElement = row.querySelector('td:nth-child(1) input[name^="h_ide_edicao"]');
            let numberElement = row.querySelector('td:nth-child(1) input[name^="h_numero_carta"]');

            let cardNumberElement = row.querySelector('td:nth-child(8) font.card-number-small');
            let cardNumber = cardNumberElement ? cardNumberElement.innerHTML : null;
            let code = cardNumber ? cardNumber.replace(/\((.+?)<b>(\S+)<\/b>\)/g, "$1_$2") : null; // Formata cada linha e junta novamente
            const nomeProdutoLigaElement = row.querySelector('td:nth-child(8) a:last-of-type');
            const nomeProdutoLiga = nomeProdutoLigaElement ? nomeProdutoLigaElement.textContent : null;
            const precoLigaElement = row.querySelector('td:nth-child(3) input[type="text"]');
            const precoLiga = precoLigaElement ? precoLigaElement.value : null;
    
            const idiomaLigaElement = row.querySelector('td:nth-child(5) select option[selected]');
            const idiomaLiga = idiomaLigaElement ? idiomaLigaElement.value : null;
    
            const qualidadeLigaElement = row.querySelector('td:nth-child(6) select option[selected]');
            const qualidadeLiga = qualidadeLigaElement ? qualidadeLigaElement.value : null;
    
            const extrasLigaElement = row.querySelector('td:nth-child(7) select');
            let extrasLiga = [];
    
            if (extrasLigaElement) {
                for (let option of extrasLigaElement.options) {
                    if (option.selected) {
                        extrasLiga.push(option.value);
                    }
                }
            }
    
            const estoqueLigaElement = row.querySelector('td:nth-child(1) input[type="text"]');
            const estoqueLiga = estoqueLigaElement ? estoqueLigaElement.value : 0;
    
            if (!apiKey || !email) {
                // alert('Por favor, configure a extensão com a sua chave de API e ID de vendedor.');
                Swal.fire({
                    icon: "question",
                    title: "Ative a extensão!",
                    text: "Por favor, configure a extensão com a sua chave de API e ID de vendedor.",
                    footer: '<a href="#">Precisa de ajuda?</a>'
                });
                return;
            }
    
            //montar parametros idioma, qualidade e extras
            if (idiomaLiga) {
                code += `&idiom=${idiomaLiga}`;
            }
            if (qualidadeLiga) {
                code += `&quality=${qualidadeLiga}`;
            }
            if (extrasLiga) {
                code += `&extras=${extrasLiga}`;
            }
    
            // Faz a requisição AJAX
            let sellerstockUrl = tcgCode === '2'
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                ? `${API_BASE}catalog/collection/sellerstock/?sku=${code}&email=${email}&key=${apiKey}&card_id=${cardIdElement.value}&edition_id=${editionIdElement.value}&card_number=${numberElement.value}&tcg=2`
                : `${API_BASE}catalog/collection/sellerstock/?sku=${code}&email=${email}&key=${apiKey}`;
=======
                ? `https://magusshop.com.br/catalog/collection/sellerstock/?sku=${code}&email=${email}&key=${apiKey}&card_id=${cardIdElement.value}&edition_id=${editionIdElement.value}&card_number=${numberElement.value}&tcg=2`
                : `https://magusshop.com.br/catalog/collection/sellerstock/?sku=${code}&email=${email}&key=${apiKey}`;
>>>>>>> Stashed changes
=======
                ? `https://magusshop.com.br/catalog/collection/sellerstock/?sku=${code}&email=${email}&key=${apiKey}&card_id=${cardIdElement.value}&edition_id=${editionIdElement.value}&card_number=${numberElement.value}&tcg=2`
                : `https://magusshop.com.br/catalog/collection/sellerstock/?sku=${code}&email=${email}&key=${apiKey}`;
>>>>>>> Stashed changes
            fetch(sellerstockUrl)
                .then(response => response.json())
                .then(data => {
                    // Manipula os dados recebidos
                    var nomeProduto = data[0].name;
                    var precoProduto = data[0].price;
                    var preco_valor = data[0].price_value;
                    var skuProduto = data[0].sku;
                    var idProduto = data[0].id;
                    var qualidadeProduto = data[0].quality;
                    var extrasProduto = data[0].extras;
                    var estoqueProduto = data[0].stock;
                    var idiomaProduto = data[0].idiom;
                    var imgProduto = data[0].image;
                    
                    Swal.fire({
                        title: "<h2>Meu estoque na Magus Market</h2>",
                        icon: "info",
                        width: 520,
                        padding: "3em",
                        html: `
                            <div>
                            <div class="modal-content-wrp" style="
                                display: flex;
                                flex-direction: row;
                                align-items: flex-start;
                                gap: 36px;
                                margin: 24px 0;">
                                <div class="modal-img">
                                <img src="${imgProduto}" alt="${nomeProduto}">
                                </div>
                                <div class="modal-content" style="
                                    display: flex;
                                    flex-direction: column;
                                    align-items: flex-start;">
                                    <p><b>Produto: </b>${nomeProduto}</p>
                                    <p><b>Preço na Magus: </b>${precoProduto}</p>
                                    <p><b>SKU: </b>${skuProduto}</p>
                                    <p><b>Qualidade: </b>${qualidadeProduto}</p>
                                    <p><b>Extras: </b>${extrasProduto}</p>
                                    <p><b>Estoque: </b>${estoqueProduto}</p>
                                    <p><b>Idioma: </b>${idiomaProduto}</p>
                                    <label for="swal-input1" style="margin-top: 24px;">Novo estoque:</label>
                                    <input type="number" value="${estoqueLiga}" id="swal-input1" class="swal2-input" style="width: 200px; margin: 0;" placeholder="novo estoque" min="0" max="9999" required>
                                    <label for="swal-input2" style="margin-top: 10px;">Novo preço:</label>
                                    <input value="${precoLiga.replace(',','.')}" id="swal-input2" type="text" class="swal2-input" style="width: 200px; margin: 0;" placeholder="novo preço">
                                </div>
                            </div>
                        </div>
                        `,
                        showDenyButton: false,
                        showCancelButton: true,
                        confirmButtonText: "Salvar",
                        denyButtonText: `Don't save`,
                        cancelButtonText: "Cancelar",
                        focusConfirm: true,
                        showLoaderOnConfirm: true,
                        preConfirm: async () => {
                            try {
                                const newStock = document.getElementById("swal-input1").value;
                                const newPrice = document.getElementById("swal-input2").value;
    
                                if(!newStock && !newPrice) {
                                    Swal.showValidationMessage("Preencha pelo menos um campo!");
                                }
    
                                const stockUrl =  tcgCode === '2'
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                                    ? `${API_BASE}catalog/save/sellerproduct/?id=${idProduto}&sku=${skuProduto}&email=${email}&key=${apiKey}&stock=${newStock}&price=${newPrice}&tcg=2`
                                    : `${API_BASE}catalog/save/sellerproduct/?id=${idProduto}&sku=${skuProduto}&email=${email}&key=${apiKey}&stock=${newStock}&price=${newPrice}`;
=======
                                    ? `https://magusshop.com.br/catalog/save/sellerproduct/?id=${idProduto}&sku=${skuProduto}&email=${email}&key=${apiKey}&stock=${newStock}&price=${newPrice}&tcg=2`
                                    : `https://magusshop.com.br/catalog/save/sellerproduct/?id=${idProduto}&sku=${skuProduto}&email=${email}&key=${apiKey}&stock=${newStock}&price=${newPrice}`;
>>>>>>> Stashed changes
=======
                                    ? `https://magusshop.com.br/catalog/save/sellerproduct/?id=${idProduto}&sku=${skuProduto}&email=${email}&key=${apiKey}&stock=${newStock}&price=${newPrice}&tcg=2`
                                    : `https://magusshop.com.br/catalog/save/sellerproduct/?id=${idProduto}&sku=${skuProduto}&email=${email}&key=${apiKey}&stock=${newStock}&price=${newPrice}`;
>>>>>>> Stashed changes
                                const response = await fetch(stockUrl);
                                if (!response.ok) {
                                  return Swal.showValidationMessage(`
                                    ${JSON.stringify(await response.json())}
                                  `);
                                }
                                return response.json();
                              } catch (error) {
                                Swal.showValidationMessage(`
                                  Request failed: ${error}
                                `);
                              }
                        },
                        allowOutsideClick: () => !Swal.isLoading()
                    }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            icon: "success",
                            title: `Produto ${nomeProduto} atualizado com sucesso!`,
                            showConfirmButton: false,
                          });
                        }
                    });
    
                    code = null;
    
                })
                .catch(error => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Produto não encontrado na Magus Market!",
                        footer: '<a href="#">Vamos lá cadastrar?</a>'
                      });
                    code = null;
                });
        });
    
        // Criar uma nova célula na coluna de ações e inserir o botão
        const cell = document.createElement('td');
        cell.appendChild(button);
        
        // Inserir a nova célula na linha
        row.appendChild(cell);
    }
}

async function modoSincronizar(tcgCode) {
    // Show loading modal
    Swal.fire({
        icon: "info",
        title: "Atualizando estoque na Magus Market",
        html: "Aguarde, estamos atualizando o estoque na Magus Market...",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    const successArray = [];
    const errorArray = [];
    const productsToProcess = [];

    // First, collect all products that need processing
    for (let i = 2; i < rows.length; i++) {
        const row = rows[i];
        const productData = extractProductData(row);
        
        if (productData && productData.precoLiga != null) {
            productsToProcess.push(productData);
        }
    }

    // Process each product sequentially
    for (const productData of productsToProcess) {
        try {
            // Check if product exists in Magus
            const baseUrl = tcgCode === '2' 
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                ? `${API_BASE}catalog/collection/sellerstock/?sku=${productData.code}&email=${email}&key=${apiKey}&card_id=${productData.cardId}&edition_id=${productData.editionId}&card_number=${productData.cardNumber}&tcg=2`
                : `${API_BASE}catalog/collection/sellerstock/?sku=${productData.code}&email=${email}&key=${apiKey}`;
=======
                ? `https://magusshop.com.br/catalog/collection/sellerstock/?sku=${productData.code}&email=${email}&key=${apiKey}&card_id=${productData.cardId}&edition_id=${productData.editionId}&card_number=${productData.cardNumber}&tcg=2`
                : `https://magusshop.com.br/catalog/collection/sellerstock/?sku=${productData.code}&email=${email}&key=${apiKey}`;
>>>>>>> Stashed changes
=======
                ? `https://magusshop.com.br/catalog/collection/sellerstock/?sku=${productData.code}&email=${email}&key=${apiKey}&card_id=${productData.cardId}&edition_id=${productData.editionId}&card_number=${productData.cardNumber}&tcg=2`
                : `https://magusshop.com.br/catalog/collection/sellerstock/?sku=${productData.code}&email=${email}&key=${apiKey}`;
>>>>>>> Stashed changes
            
            const response = await fetch(baseUrl);
            const data = await response.json();
            const existingData = data[0];

            const newStock = productData.estoqueLiga;
            const newPrice = productData.precoLiga === null ? '' : '&price=' + formatPrice(productData.precoLiga);

            if (!existingData) {
                if (createOptionParam === 'true' && newStock > 0) {
                    // Create new product
                    const createUrl = tcgCode === '2'
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                        ? `${API_BASE}catalog/save/createsellerproduct/?sku=${productData.code}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}&card_id=${productData.cardId}&edition_id=${productData.editionId}&card_number=${productData.cardNumber}&tcg=2`
                        : `${API_BASE}catalog/save/createsellerproduct/?sku=${productData.code}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
=======
                        ? `https://magusshop.com.br/catalog/save/createsellerproduct/?sku=${productData.code}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}&card_id=${productData.cardId}&edition_id=${productData.editionId}&card_number=${productData.cardNumber}&tcg=2`
                        : `https://magusshop.com.br/catalog/save/createsellerproduct/?sku=${productData.code}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
>>>>>>> Stashed changes
=======
                        ? `https://magusshop.com.br/catalog/save/createsellerproduct/?sku=${productData.code}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}&card_id=${productData.cardId}&edition_id=${productData.editionId}&card_number=${productData.cardNumber}&tcg=2`
                        : `https://magusshop.com.br/catalog/save/createsellerproduct/?sku=${productData.code}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
>>>>>>> Stashed changes
                    
                    await fetch(createUrl);
                    successArray.push(productData.nomeProdutoLiga);
                    
                    // Add small delay between operations
                    await new Promise(resolve => setTimeout(resolve, 100));
                } else {
                    errorArray.push(productData.nomeProdutoLiga);
                }
                continue;
            }

            // Check if update is needed
            // Normalize price comparison by converting both prices to same decimal precision
            const normalizedNewPrice = newPrice ? parseFloat(newPrice.replace('&price=', '')).toFixed(2) : '0.00';
            const normalizedExistingPrice = existingData.price_value ? parseFloat(existingData.price_value).toFixed(2) : '0.00';
            
            if ((existingData.stock && existingData.stock == newStock) && 
                (normalizedExistingPrice === normalizedNewPrice)) {
                successArray.push(productData.nomeProdutoLiga);
                console.log('produto ' + productData.nomeProdutoLiga + ' com Estoque e preço igual, não atualizado');
                continue;
            }

            // Update existing product
            const stockUrl = tcgCode === '2'
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                ? `${API_BASE}catalog/save/sellerproduct/?id=${existingData.id}&sku=${existingData.sku}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}&tcg=2`
                : `${API_BASE}catalog/save/sellerproduct/?id=${existingData.id}&sku=${existingData.sku}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
=======
                ? `https://magusshop.com.br/catalog/save/sellerproduct/?id=${existingData.id}&sku=${existingData.sku}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}&tcg=2`
                : `https://magusshop.com.br/catalog/save/sellerproduct/?id=${existingData.id}&sku=${existingData.sku}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
>>>>>>> Stashed changes
=======
                ? `https://magusshop.com.br/catalog/save/sellerproduct/?id=${existingData.id}&sku=${existingData.sku}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}&tcg=2`
                : `https://magusshop.com.br/catalog/save/sellerproduct/?id=${existingData.id}&sku=${existingData.sku}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
>>>>>>> Stashed changes
            
            await fetch(stockUrl);
            successArray.push(productData.nomeProdutoLiga);
            
            // Add small delay between operations
            await new Promise(resolve => setTimeout(resolve, 100));

        } catch (error) {
            console.error('Error processing product:', error);
            errorArray.push(productData.nomeProdutoLiga);
        }
    }

    // Show results
    let successHtml = successArray.map(item => `<p>${item}</p>`).join('');
    let errorHtml = errorArray.map(item => `<p>${item}</p>`).join('');

    Swal.fire({
        icon: "success",
        title: "Resultado da atualização",
        html: `
            <p><b>Atualizados com sucesso: ${successArray.length}</b></p>
            ${successHtml}
            <p><b>Não atualizados: ${errorArray.length}</b></p>
            ${errorHtml}
        `,
        footer: '<a href="#">Precisa de ajuda?</a>'
    });

    // Navigate to next page if available
    let nextPage = document.querySelector('.bg_pagination .page_mais');
    if (nextPage) {
        setTimeout(() => {
            nextPage.click();
        }, 2000);
    }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
}

// Helper function to extract product data from row
function extractProductData(row) {
    // Capturar ID da edição e número da carta quando tcg=2
    const cardIdElement = row.querySelector('td:nth-child(1) input[name^="h_ide_carta"]');
    const editionIdElement = row.querySelector('td:nth-child(1) input[name^="h_ide_edicao"]');
    const numberElement = row.querySelector('td:nth-child(1) input[name^="h_numero_carta"]');
    
    const cardId = cardIdElement ? cardIdElement.value : null;
    const editionId = editionIdElement ? editionIdElement.value : null;
    const cardNumber = numberElement ? numberElement.value : null;
    
    const cardNumberElement = row.querySelector('td:nth-child(8) font.card-number-small');
    const cardNumberText = cardNumberElement ? cardNumberElement.innerHTML : null;
    const code = cardNumberText ? cardNumberText.replace(/\((.+?)<b>(\S+)<\/b>\)/g, "$1_$2") : null;
    
    const nomeProdutoLigaElement = row.querySelector('td:nth-child(8) a:last-of-type');
    const nomeProdutoLiga = nomeProdutoLigaElement ? nomeProdutoLigaElement.textContent : null;
    
    const precoLigaElement = row.querySelector('td:nth-child(3) input[type="text"]');
    const precoLiga = precoLigaElement ? precoLigaElement.value : null;

    if (precoLiga == null) {
        return null;
    }

    const idiomaLigaElement = row.querySelector('td:nth-child(5) select option[selected]');
    const idiomaLiga = idiomaLigaElement ? idiomaLigaElement.value : null;

    const qualidadeLigaElement = row.querySelector('td:nth-child(6) select option[selected]');
    const qualidadeLiga = qualidadeLigaElement ? qualidadeLigaElement.value : null;

    const extrasLigaElement = row.querySelector('td:nth-child(7) select');
    let extrasLiga = [];

    if (extrasLigaElement) {
        for (let option of extrasLigaElement.options) {
            if (option.selected) {
                extrasLiga.push(option.value);
            }
        }
    }

    const estoqueLigaElement = row.querySelector('td:nth-child(1) input[type="text"]');
    let estoqueLiga = estoqueLigaElement ? estoqueLigaElement.value : null;

    if (estoqueLiga === null || estoqueLiga === '' || estoqueLiga === '0') {
        estoqueLiga = 0;
    }

    if (!apiKey || !email) {
        Swal.fire({
            icon: "question",
            title: "Ative a extensão!",
            text: "Por favor, configure a extensão com a sua chave de API e ID de vendedor.",
            footer: '<a href="#">Precisa de ajuda?</a>'
        });
        return null;
    }

    let finalCode = code;
    if (idiomaLiga) {
        finalCode += `&idiom=${idiomaLiga}`;
    }
    if (qualidadeLiga) {
        finalCode += `&quality=${qualidadeLiga}`;
    }
    if (extrasLiga.length > 0) {
        finalCode += `&extras=${extrasLiga}`;
    }

    return {
        code: finalCode,
        nomeProdutoLiga,
        precoLiga,
        estoqueLiga,
        idiomaLiga,
        qualidadeLiga,
        extrasLiga,
        cardId,
        editionId,
        cardNumber
    };
>>>>>>> Stashed changes
}

// Helper function to extract product data from row
function extractProductData(row) {
    // Capturar ID da edição e número da carta quando tcg=2
    const cardIdElement = row.querySelector('td:nth-child(1) input[name^="h_ide_carta"]');
    const editionIdElement = row.querySelector('td:nth-child(1) input[name^="h_ide_edicao"]');
    const numberElement = row.querySelector('td:nth-child(1) input[name^="h_numero_carta"]');
    
    const cardId = cardIdElement ? cardIdElement.value : null;
    const editionId = editionIdElement ? editionIdElement.value : null;
    const cardNumber = numberElement ? numberElement.value : null;
    
    const cardNumberElement = row.querySelector('td:nth-child(8) font.card-number-small');
    const cardNumberText = cardNumberElement ? cardNumberElement.innerHTML : null;
    const code = cardNumberText ? cardNumberText.replace(/\((.+?)<b>(\S+)<\/b>\)/g, "$1_$2") : null;
    
    const nomeProdutoLigaElement = row.querySelector('td:nth-child(8) a:last-of-type');
    const nomeProdutoLiga = nomeProdutoLigaElement ? nomeProdutoLigaElement.textContent : null;
    
    const precoLigaElement = row.querySelector('td:nth-child(3) input[type="text"]');
    const precoLiga = precoLigaElement ? precoLigaElement.value : null;

    if (precoLiga == null) {
        return null;
    }

    const idiomaLigaElement = row.querySelector('td:nth-child(5) select option[selected]');
    const idiomaLiga = idiomaLigaElement ? idiomaLigaElement.value : null;

    const qualidadeLigaElement = row.querySelector('td:nth-child(6) select option[selected]');
    const qualidadeLiga = qualidadeLigaElement ? qualidadeLigaElement.value : null;

    const extrasLigaElement = row.querySelector('td:nth-child(7) select');
    let extrasLiga = [];

    if (extrasLigaElement) {
        for (let option of extrasLigaElement.options) {
            if (option.selected) {
                extrasLiga.push(option.value);
            }
        }
    }

    const estoqueLigaElement = row.querySelector('td:nth-child(1) input[type="text"]');
    let estoqueLiga = estoqueLigaElement ? estoqueLigaElement.value : null;

    if (estoqueLiga === null || estoqueLiga === '' || estoqueLiga === '0') {
        estoqueLiga = 0;
    }

    if (!apiKey || !email) {
        Swal.fire({
            icon: "question",
            title: "Ative a extensão!",
            text: "Por favor, configure a extensão com a sua chave de API e ID de vendedor.",
            footer: '<a href="#">Precisa de ajuda?</a>'
        });
        return null;
    }

    let finalCode = code;
    if (idiomaLiga) {
        finalCode += `&idiom=${idiomaLiga}`;
    }
    if (qualidadeLiga) {
        finalCode += `&quality=${qualidadeLiga}`;
    }
    if (extrasLiga.length > 0) {
        finalCode += `&extras=${extrasLiga}`;
    }

    return {
        code: finalCode,
        nomeProdutoLiga,
        precoLiga,
        estoqueLiga,
        idiomaLiga,
        qualidadeLiga,
        extrasLiga,
        cardId,
        editionId,
        cardNumber
    };
>>>>>>> Stashed changes
}

// Helper function to extract product data from row
// function extractProductData(row) {
//     // Capturar ID da edição e número da carta quando tcg=2
//     const cardIdElement = row.querySelector('td:nth-child(1) input[name^="h_ide_carta"]');
//     const editionIdElement = row.querySelector('td:nth-child(1) input[name^="h_ide_edicao"]');
//     const numberElement = row.querySelector('td:nth-child(1) input[name^="h_numero_carta"]');
    
//     const cardId = cardIdElement ? cardIdElement.value : null;
//     const editionId = editionIdElement ? editionIdElement.value : null;
//     const cardNumber = numberElement ? numberElement.value : null;
    
//     const cardNumberElement = row.querySelector('td:nth-child(8) font.card-number-small');
//     const cardNumberText = cardNumberElement ? cardNumberElement.innerHTML : null;
//     const code = cardNumberText ? cardNumberText.replace(/\((.+?)<b>(\S+)<\/b>\)/g, "$1_$2") : null;
    
//     const nomeProdutoLigaElement = row.querySelector('td:nth-child(8) a:last-of-type');
//     const nomeProdutoLiga = nomeProdutoLigaElement ? nomeProdutoLigaElement.textContent : null;
    
//     const precoLigaElement = row.querySelector('td:nth-child(3) input[type="text"]');
//     const precoLiga = precoLigaElement ? precoLigaElement.value : null;

//     if (precoLiga == null) {
//         return null;
//     }

//     const idiomaLigaElement = row.querySelector('td:nth-child(5) select option[selected]');
//     const idiomaLiga = idiomaLigaElement ? idiomaLigaElement.value : null;

//     const qualidadeLigaElement = row.querySelector('td:nth-child(6) select option[selected]');
//     const qualidadeLiga = qualidadeLigaElement ? qualidadeLigaElement.value : null;

//     const extrasLigaElement = row.querySelector('td:nth-child(7) select');
//     let extrasLiga = [];

//     if (extrasLigaElement) {
//         for (let option of extrasLigaElement.options) {
//             if (option.selected) {
//                 extrasLiga.push(option.value);
//             }
//         }
//     }

//     const estoqueLigaElement = row.querySelector('td:nth-child(1) input[type="text"]');
//     let estoqueLiga = estoqueLigaElement ? estoqueLigaElement.value : null;

//     if (estoqueLiga === null || estoqueLiga === '' || estoqueLiga === '0') {
//         estoqueLiga = 0;
//     }

//     if (!apiKey || !email) {
//         Swal.fire({
//             icon: "question",
//             title: "Ative a extensão!",
//             text: "Por favor, configure a extensão com a sua chave de API e ID de vendedor.",
//             footer: '<a href="#">Precisa de ajuda?</a>'
//         });
//         return null;
//     }

//     let finalCode = code;
//     if (idiomaLiga) {
//         finalCode += `&idiom=${idiomaLiga}`;
//     }
//     if (qualidadeLiga) {
//         finalCode += `&quality=${qualidadeLiga}`;
//     }
//     if (extrasLiga.length > 0) {
//         finalCode += `&extras=${extrasLiga}`;
//     }

//     return {
//         code: finalCode,
//         nomeProdutoLiga,
//         precoLiga,
//         estoqueLiga,
//         idiomaLiga,
//         qualidadeLiga,
//         extrasLiga,
//         cardId,
//         editionId,
//         cardNumber
//     };
// }

async function modoFaltantes() {
    const rowsM = document.querySelectorAll('.table-limitar tbody tr');
    
    //ativar Swal com loading
    // Swal.fire({
    //     icon: "info",
    //     title: "Atualizando estoque na Magus Market",
    //     html: "Aguarde, estamos atualizando o estoque na Magus Market...",
    //     allowOutsideClick: false,
    //     didOpen: () => {
    //         Swal.showLoading();
    //     }
    // });

    for (let i = 2; i < rowsM.length; i++) {

        //percorre todas as linhas da tabela e atualiza todos os cards na magus de acordo com o estoque e preço da tabela
        
        const row = rowsM[i];

        const cardIdElement = row.querySelector('td:nth-child(1) input[type="hidden"]:nth-child(7)');
        const cardId = cardIdElement ? cardIdElement.value : null;
        const cardEditionIdElement = row.querySelector('td:nth-child(1) input[type="hidden"]:nth-child(6)');
        const cardEditionId = cardEditionIdElement ? cardEditionIdElement.value : null;
        const estoqueLigaElement = row.querySelector('td:nth-child(1) input[type="hidden"]:nth-child(4)');
        let estoqueLiga = estoqueLigaElement ? estoqueLigaElement.value : null;
        const nomeProdutoLigaElement = row.querySelector('td:nth-child(8) a:last-of-type');
        const nomeProdutoLiga = nomeProdutoLigaElement ? nomeProdutoLigaElement.textContent : null;
        const precoLigaElement = row.querySelector('td:nth-child(2) input[type="text"]');
        let precoLiga = precoLigaElement ? precoLigaElement.value : null;

        if (precoLiga == null) {
            continue;
        }

        const idiomaLigaElement = row.querySelector('td:nth-child(5) input[type="hidden"]');
        const idiomaLiga = idiomaLigaElement ? idiomaLigaElement.value : null;

        const qualidadeLigaElement = row.querySelector('td:nth-child(6) input[type="hidden"]');
        const qualidadeLiga = qualidadeLigaElement ? qualidadeLigaElement.value : null;

        const extrasLigaElement = row.querySelectorAll('td:nth-child(7) input[type="hidden"]');
        let extrasLiga = [];

        if (extrasLigaElement) {
            for (let option of extrasLigaElement) {
                if (option.value && option.value !== '0') {
                    extrasLiga.push(option.value);
                }
            }
        }

        //imprimir todos os valores para debug
        console.log('cardId: ' + cardId, 'cardEditionId: ' + cardEditionId, 'estoqueLiga: ' + estoqueLiga, 'nomeProdutoLiga: ' + nomeProdutoLiga, 'precoLiga: ' + precoLiga, 'idiomaLiga: ' + idiomaLiga, 'qualidadeLiga: ' + qualidadeLiga, 'extrasLiga: ' + extrasLiga);

        // Faz a requisição AJAX
        
        try {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            let response = await fetch(`${API_BASE}catalog/collection/sellerstock/?limite=1&email=${email}&key=${apiKey}&card_id=${cardId}&edition_id=${cardEditionId}&idiom=${idiomaLiga}&quality=${qualidadeLiga}&extras=${extrasLiga}`);
=======
            let response = await fetch(`https://magusshop.com.br/catalog/collection/sellerstock/?limite=1&email=${email}&key=${apiKey}&card_id=${cardId}&edition_id=${cardEditionId}&idiom=${idiomaLiga}&quality=${qualidadeLiga}&extras=${extrasLiga}`);
>>>>>>> Stashed changes
=======
            let response = await fetch(`https://magusshop.com.br/catalog/collection/sellerstock/?limite=1&email=${email}&key=${apiKey}&card_id=${cardId}&edition_id=${cardEditionId}&idiom=${idiomaLiga}&quality=${qualidadeLiga}&extras=${extrasLiga}`);
>>>>>>> Stashed changes
            let data = await response.json();
            console.log(data);

            const newStock = estoqueLiga;
            let newPrice = '';
            if(precoLiga === null) {
                newPrice = '';
            }else{
                newPrice = '&price=' + formatPrice(precoLiga);
            }

            let skuForUpdate = data[0] ? data[0].sku : null;
            let code = data[0] ? data[0].code : null;
            //se não encontrar o card na magus, tentar criar
            if(!code) {
                continue; //o codigo é necessário para a sincronização perfeita
            }
            if (skuForUpdate === null) {
                if (createOptionParam === 'true') {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                    let createUrl = `${API_BASE}catalog/save/createsellerproduct/?sku=${code}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
=======
                    let createUrl = `https://magusshop.com.br/catalog/save/createsellerproduct/?sku=${code}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
>>>>>>> Stashed changes
=======
                    let createUrl = `https://magusshop.com.br/catalog/save/createsellerproduct/?sku=${code}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
>>>>>>> Stashed changes
                    response = await fetch(createUrl);
                    data = await response.json();
                    row.style.backgroundColor = 'lightgreen';
                    const span = document.createElement('span');
                    span.textContent = 'sincronizado';
                    span.style.color = 'red';
                    row.appendChild(span);
                    continue;
                }else{
                    row.style.backgroundColor = 'lightcoral';
                    const span = document.createElement('span');
                    span.textContent = 'não encontrado';
                    span.style.color = 'red';
                    row.appendChild(span);
                    continue;
                }
            }

            //verificar se o preco e o estoque estão diferentes
            if (data[0].stock && data[0].stock == newStock) {
                //muda cor da row e insere um span com o texto na ultima coluna
                row.style.backgroundColor = 'lightgreen';
                const span = document.createElement('span');
                span.textContent = 'sincronizado';
                span.style.color = 'red';
                row.appendChild(span);
                continue;
            }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
            const stockUrl = `${API_BASE}catalog/save/sellerproduct/?sku=${skuForUpdate}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
=======
            const stockUrl = `https://magusshop.com.br/catalog/save/sellerproduct/?sku=${skuForUpdate}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
>>>>>>> Stashed changes
=======
            const stockUrl = `https://magusshop.com.br/catalog/save/sellerproduct/?sku=${skuForUpdate}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
>>>>>>> Stashed changes

            response = await fetch(stockUrl);
            data = await response.json();

            row.style.backgroundColor = 'lightgreen';
            const span = document.createElement('span');
            span.textContent = 'sincronizado';
            span.style.color = 'red';
            row.appendChild(span);
            
        } catch (error) {
            row.style.backgroundColor = 'lightcoral';
            const span = document.createElement('span');
            span.textContent = 'não encontrado';
            span.style.color = 'red';
            console.log(error);
            row.appendChild(span);
        }
        
    }

        
}

/**
 * Remove todos os caracteres não numéricos
 * @param {string} str
 * @returns {string}
 */
function onlyNumbers(str) {
    return str.replace(/\D/g, '');
<<<<<<< Updated upstream
<<<<<<< Updated upstream
}

/**
 * Formata preço
 * @param {string|number} price
 * @returns {number}
 */
function formatPrice(price) {
    if (!price) {
        return 0.0;
    }

    try {
        if (price) {
            price = onlyNumbers(price);
            price = (Number(price) / 100).toFixed(2);
            price = parseFloat(price);
        }
        return price;
    } catch (error) {
        return 0.0;
    }
=======
=======
>>>>>>> Stashed changes
}

/**
 * Formata preço
 * @param {string|number} price
 * @returns {number}
 */
function formatPrice(price) {
    if (!price) {
        return 0.0;
    }

    try {
        if (price) {
            price = onlyNumbers(price);
            price = (Number(price) / 100).toFixed(2);
            price = parseFloat(price);
        }
        return price;
    } catch (error) {
        return 0.0;
    }
}
    
if (modo === '1' || !modo) {
    tcg = urlParams.get('tcg');
    modoCadastro(tcg);
}

if (modo === '2') {
    tcg = urlParams.get('tcg');
    modoSincronizar(tcg);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}
    
// if (modo === '1' || !modo) {
//     tcg = urlParams.get('tcg');
//     // Esperar a inicialização do productCache
//     productCache.init().then(() => {
//         modoCadastro(tcg);
//         // Pré-carregar cache se for modo de cadastro
//         setTimeout(() => {
//             preloadProductCache();
//         }, 1000);
//     });
// }

// if (modo === '2') {
//     tcg = urlParams.get('tcg');
//     // Esperar a inicialização do productCache
//     productCache.init().then(() => {
//         modoSincronizar(tcg);
//     });
// }

if (modo === '3') {
    modoFaltantes();
}

function createStatusIndicator() {
    // Verificar se o indicador já existe
    if (document.getElementById('magus-status-indicator')) {
        return document.getElementById('magus-status-indicator');
    }

    // Criar o contêiner principal do indicador
    const indicator = document.createElement('div');
    indicator.id = 'magus-status-indicator';
    indicator.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 9999;
        background-color: #ffffff;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        padding: 10px;
        width: 300px;
        font-family: Arial, sans-serif;
        font-size: 12px;
        transition: all 0.3s ease;
    `;

    // Cabeçalho
    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
    `;
    
    // Título
    const title = document.createElement('div');
    title.textContent = 'Magus Market Sync';
    title.style.fontWeight = 'bold';
    
    // Botão minimizar/maximizar
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '-';
    toggleBtn.style.cssText = `
        background: none;
        border: none;
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
    `;
    
    // Conteúdo do status
    const content = document.createElement('div');
    content.id = 'magus-status-content';
    
    // Status atual
    const status = document.createElement('div');
    status.id = 'magus-sync-status';
    status.innerHTML = '<span style="color: #888;">Aguardando sincronização...</span>';
    
    // Progresso
    const progress = document.createElement('div');
    progress.id = 'magus-sync-progress';
    progress.style.cssText = `
        margin-top: 5px;
        display: none;
    `;
    
    // Contador de tempo para próxima sincronização
    const nextSync = document.createElement('div');
    nextSync.id = 'magus-next-sync';
    nextSync.style.cssText = `
        margin-top: 5px;
        color: #888;
        font-size: 11px;
    `;
    nextSync.textContent = 'Próxima sincronização: --:--:--';
    
    // Botões de ação
    const actions = document.createElement('div');
    actions.style.cssText = `
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    `;
    
    // Botão para sincronizar agora
    const syncNowBtn = document.createElement('button');
    syncNowBtn.textContent = 'Sincronizar agora';
    syncNowBtn.id = 'magus-sync-now';
    syncNowBtn.style.cssText = `
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
    `;
    
    // Botão para pausar/retomar sincronização automática
    const toggleAutoSyncBtn = document.createElement('button');
    toggleAutoSyncBtn.textContent = 'Pausar auto';
    toggleAutoSyncBtn.id = 'magus-toggle-auto';
    toggleAutoSyncBtn.style.cssText = `
        background-color: #f0ad4e;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
    `;
    
    // Construir a hierarquia de elementos
    header.appendChild(title);
    header.appendChild(toggleBtn);
    
    content.appendChild(status);
    content.appendChild(progress);
    content.appendChild(nextSync);
    
    actions.appendChild(syncNowBtn);
    actions.appendChild(toggleAutoSyncBtn);
    
    indicator.appendChild(header);
    indicator.appendChild(content);
    indicator.appendChild(actions);
    
    // Adicionar ao corpo do documento
    document.body.appendChild(indicator);
    
    // Estado minimizado/maximizado
    let minimized = false;
    
    // Event listener para minimizar/maximizar
    toggleBtn.addEventListener('click', () => {
        minimized = !minimized;
        if (minimized) {
            content.style.display = 'none';
            actions.style.display = 'none';
            toggleBtn.textContent = '+';
            indicator.style.width = 'auto';
        } else {
            content.style.display = 'block';
            actions.style.display = 'flex';
            toggleBtn.textContent = '-';
            indicator.style.width = '300px';
        }
    });
    
    // Event listener para sincronizar agora
    syncNowBtn.addEventListener('click', () => {
        startSyncProcess();
    });
    
    // Event listener para pausar/retomar sincronização automática
    toggleAutoSyncBtn.addEventListener('click', () => {
        const autoSyncEnabled = localStorage.getItem('magus_auto_sync') !== 'false';
        
        if (autoSyncEnabled) {
            localStorage.setItem('magus_auto_sync', 'false');
            toggleAutoSyncBtn.textContent = 'Retomar auto';
            toggleAutoSyncBtn.style.backgroundColor = '#5bc0de';
            updateNextSyncTimer(null);
        } else {
            localStorage.setItem('magus_auto_sync', 'true');
            toggleAutoSyncBtn.textContent = 'Pausar auto';
            toggleAutoSyncBtn.style.backgroundColor = '#f0ad4e';
            scheduleNextSync();
        }
    });
    
    // Verificar e definir o estado inicial do botão de auto-sincronização
    const autoSyncEnabled = localStorage.getItem('magus_auto_sync') !== 'false';
    if (!autoSyncEnabled) {
        toggleAutoSyncBtn.textContent = 'Retomar auto';
        toggleAutoSyncBtn.style.backgroundColor = '#5bc0de';
    }
    
    return indicator;
}

// Função para atualizar o status no indicador
function updateStatus(message, type = 'info') {
    const statusElement = document.getElementById('magus-sync-status');
    if (!statusElement) return;
    
    let color;
    switch (type) {
        case 'success':
            color = '#4CAF50';
            break;
        case 'error':
            color = '#f44336';
            break;
        case 'warning':
            color = '#ff9800';
            break;
        case 'info':
        default:
            color = '#2196F3';
            break;
    }
    
    statusElement.innerHTML = `<span style="color: ${color};">${message}</span>`;
}

// Função para atualizar o progresso no indicador
function updateProgress(current, total) {
    const progressElement = document.getElementById('magus-sync-progress');
    if (!progressElement) return;
    
    if (current === 0 && total === 0) {
        progressElement.style.display = 'none';
        return;
    }
    
    progressElement.style.display = 'block';
    const percent = total > 0 ? Math.round((current / total) * 100) : 0;
    
    progressElement.innerHTML = `
        <div style="margin-bottom: 5px;">Progresso: ${current}/${total} (${percent}%)</div>
        <div style="background-color: #e0e0e0; border-radius: 3px; height: 10px; width: 100%;">
            <div style="background-color: #4CAF50; height: 100%; width: ${percent}%; border-radius: 3px;"></div>
        </div>
    `;
}

// Função para atualizar o temporizador de próxima sincronização
function updateNextSyncTimer(nextSyncTime) {
    const nextSyncElement = document.getElementById('magus-next-sync');
    if (!nextSyncElement) return;
    
    if (!nextSyncTime) {
        nextSyncElement.textContent = 'Sincronização automática desativada';
        return;
    }
    
    // Atualizar o temporizador a cada segundo
    const updateTimer = () => {
        const now = new Date();
        const diff = nextSyncTime - now;
        
        if (diff <= 0) {
            nextSyncElement.textContent = 'Sincronizando...';
            return;
        }
        
        // Calcular horas, minutos e segundos
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Formatar com zeros à esquerda
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        
        nextSyncElement.textContent = `Próxima sincronização em: ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };
    
    // Atualizar imediatamente e configurar intervalo
    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    
    // Armazenar o ID do timer para poder cancelá-lo posteriormente
    nextSyncElement.dataset.timerId = timerId;
}

// Função para agendar a próxima sincronização
function scheduleNextSync() {
    // Verificar se a sincronização automática está habilitada
    if (localStorage.getItem('magus_auto_sync') === 'false') {
        updateNextSyncTimer(null);
        return;
    }
    
    // Cancelar qualquer temporizador existente
    const nextSyncElement = document.getElementById('magus-next-sync');
    if (nextSyncElement && nextSyncElement.dataset.timerId) {
        clearInterval(parseInt(nextSyncElement.dataset.timerId));
    }
    
    // Definir o próximo tempo de sincronização (1 hora a partir de agora)
    const nextSyncTime = new Date();
    nextSyncTime.setHours(nextSyncTime.getHours() + 1);
    
    // Armazenar o próximo tempo de sincronização
    localStorage.setItem('magus_next_sync', nextSyncTime.getTime());
    
    // Atualizar o temporizador de contagem regressiva
    updateNextSyncTimer(nextSyncTime);
    
    // Configurar o timeout para a próxima sincronização
    const timeUntilNextSync = nextSyncTime - new Date();
    
    setTimeout(() => {
        // Verificar novamente se a sincronização automática está habilitada
        if (localStorage.getItem('magus_auto_sync') !== 'false') {
            startSyncProcess();
        } else {
            scheduleNextSync(); // Re-agendar mesmo quando desabilitado para manter a UI atualizada
        }
    }, timeUntilNextSync);
}

// Função para criar um iframe oculto
function createHiddenIframe(url) {
    return new Promise((resolve, reject) => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = url;
        
        iframe.onload = function() {
            resolve(iframe);
        };
        
        iframe.onerror = function() {
            reject(new Error('Falha ao carregar o iframe'));
        };
        
        document.body.appendChild(iframe);
    });
}

function formatProductCode(codeText) {
    // Remove texto "Código: " e parênteses
    let code = codeText.replace(/\(Código:\s*/i, '').replace(/\)/g, '').trim();
    
    // Procura por padrão com <b> tag
    const boldMatch = code.match(/(.+?)<b>(\S+)<\/b>/);
    if (boldMatch) {
        // Formata como parte1_parte2
        return `${boldMatch[1]}_${boldMatch[2]}`;
    }
    
    // Procura por padrão sem tags HTML
    const noTagsMatch = code.match(/([A-Za-z]+)(\d+)/);
    if (noTagsMatch) {
        return `${noTagsMatch[1]}_${noTagsMatch[2]}`;
    }
    
    // Se não conseguiu formatar, retorna o código original
    return code;
}

// Função para extrair detalhes do pedido do iframe
function extractOrderDetailsFromIframe(iframe) {
    try {
        const iframeDoc = iframe.contentWindow.document;
        
        // Extrair informações básicas
        const shipping = iframeDoc.querySelector('.container b')?.textContent.trim() || '';
        const payment = iframeDoc.querySelector('.payment-label')?.textContent.trim() || '';
        const customer = iframeDoc.querySelector('.user-name')?.textContent.trim().replace('(', '').replace(')', '') || '';
        const orderDate = iframeDoc.querySelector('.text-center.order-datetime i')?.textContent.trim() || '';
        const orderNumber = new URLSearchParams(iframe.contentWindow.location.search).get('cod');
        
        // Capturar status do pedido
        const statusElement = iframeDoc.querySelector('.panel-order--success');
        const status = statusElement ? statusElement.textContent.trim() : 'pending';
        
        // Dados do usuário
        const userElements = iframeDoc.querySelectorAll('.user-cep');
        let cep = '', cpf = '', telefone = '';
        
        userElements.forEach(el => {
            const text = el.textContent.trim();
            if (text.startsWith('CEP')) cep = text.replace('CEP ', '');
            else if (text.startsWith('CPF')) cpf = text.replace('CPF: ', '');
            else telefone = text;
        });
        
        // Dados de preço
        // Specifically target the summary table
        const summaryTable = iframeDoc.querySelector('.table-summary');
            
        // if (!summaryTable) {
        //     //console.error('Summary table not found');
        //     let valorItens = 0;
        //     let valorFrete = 0;
        //     let creditoUtilizado = 0;
        //     let valorTotal = 0;
        // }
        
        // Get all rows within this specific table
        const rows = summaryTable.querySelectorAll('tr');
        let valorItens = 0;
        let valorFrete = 0;
        let creditoUtilizado = 0;
        let valorTotal = 0;

        // Iterate through each row to find specific labels
        rows.forEach(row => {
            const label = row.querySelector('td:first-child');
            
            if (!label) return;
            
            const labelText = label.textContent.trim();
            const valueElement = row.querySelector('td:last-child b');
            
            if (!valueElement) return;
            
            // Convert price text to number
            const value = parseFloat(valueElement.textContent.replace('R$ ', '').replace(',', '.'));
            
            // Assign values based on label text
            if (labelText.includes('Valor dos Itens:')) {
            valorItens = value;
            } else if (labelText.includes('Frete:')) {
            valorFrete = value;
            } else if (labelText.includes('Crédito utilizado:')) {
            creditoUtilizado = value;
            } else if (labelText.includes('Valor Total:')) {
            valorTotal = value;
            }
        });
        
        // Processamento de endereço
        const addressElement = iframeDoc.querySelector('.user-address');
        const addressText = addressElement ? addressElement.textContent.trim() : '';
        const address = {};
        
        if (addressText) {
            const lines = addressText.split('\n').map(line => line.trim());
            
            if (lines.length >= 3) {
                const endereco = lines[0].split(',');
                address.rua = endereco[0].trim();
                address.numero = '';
                address.complemento = '';
                
                if (endereco.length > 1) {
                    const infoAdicional = endereco[1].trim();
                    if (infoAdicional.includes(' - ')) {
                        const [num, comp] = infoAdicional.split(' - ');
                        address.numero = num.trim();
                        address.complemento = comp.trim();
                    } else {
                        address.numero = infoAdicional;
                    }
                }
                
                if (endereco.length > 2) {
                    address.complemento = endereco[2].trim();
                }
                
                address.bairro = lines[1].trim();
                
                const cidadeUf = lines[2].split('-');
                address.cidade = cidadeUf[0].trim();
                address.uf = cidadeUf.length > 1 ? cidadeUf[1].trim() : '';
            }
        }
        
        // Extração dos itens
        const items = [];
        const itemElements = iframeDoc.querySelectorAll('.panel-order--content');
        
        itemElements.forEach(item => {
            // Pular o elemento de resumo
            if (item.querySelector('.table-summary')) return;
            
            try {
                // Quantidade
                const quantityText = item.querySelector('span.bold')?.textContent || '';
                const quantity = parseInt(quantityText.replace('x', '').trim());
                
                // Nome em inglês
                const englishName = item.querySelector('.link-produto .bold')?.textContent.trim() || '';
                
                // Código do produto - extração e formatação
                let codeRaw = '';
                let codeFormatted = '';
                
                const codeElement = item.querySelector('.input-infoaux');
                if (codeElement) {
                    codeRaw = codeElement.textContent || '';
                    
                    // Para obter o HTML interno com as tags <b>
                    const codeHtml = codeElement.innerHTML || '';
                    
                    // Usar uma função específica para formatar o código
                    codeFormatted = formatProductCode(codeHtml);
                }
                
                // Preços
                const priceElements = item.querySelectorAll('.col-xs-6.col-sm-3.col-md-3 p');
                let oldPrice = null;
                let price = null;
                
                priceElements.forEach(p => {
                    const text = p.textContent.trim();
                    if (!text.includes('R$')) return;
                    
                    const priceText = text.replace('R$ ', '')
                        .replace(' (unid.)', '')
                        .replace(' (subtotal)', '')
                        .replace(',', '.');
                    
                    if (p.classList.contains('price--old')) {
                        oldPrice = parseFloat(priceText);
                    } else if (p.classList.contains('price--new')) {
                        price = parseFloat(priceText);
                    }
                });
                
                // Estoque
                const stockText = item.querySelector('.order-functions-aux a[title="Estoque"]')
                    ?.textContent.replace('Estoque: ', '') || null;
                const stock = parseInt(stockText);
                
                // Verificar se é lacrado
                let isSealed = false;
                let quality = null;
                let qualityCode = null;
                let language = '';
                
                const editionElement = item.querySelector('.icon-edicao');
                if (editionElement) {
                    isSealed = editionElement.title.toLowerCase().includes('lacrado');
                }
                
                if (!isSealed) {
                    const qualityElement = item.querySelector('.icon_qualid');
                    if (qualityElement) {
                        quality = qualityElement.title;
                        qualityCode = qualityElement.textContent.trim();
                    }
                }
                
                const langElement = item.querySelector('.col-xs-3.col-sm-1 img');
                if (langElement) {
                    langName = langElement.getAttribute('alt') || '';
                    
                    // Obter o código de idioma do texto ao lado da imagem
                    const langContainer = langElement.closest('div');
                    if (langContainer) {
                        // Extrair código de idioma (EN, PT, etc.)
                        const langText = langContainer.textContent.trim();
                        const langMatch = langText.match(/\b([A-Z]{2,4})\b/);
                        if (langMatch && langMatch[1]) {
                            languageCode = langMatch[1];
                        } else if (langName.includes('Português / Inglês') || langName.includes('Portuguese / English')) {
                            languageCode = 'PTEN';
                        } else if (langName.includes('/')) {
                            // Handle other combined languages
                            const langParts = langName.split('/').map(part => part.trim().substring(0, 2).toUpperCase());
                            languageCode = langParts.join('');
                        }
                        if (langMatch && langMatch[1]) {
                            languageCode = langMatch[1];
                        }
                    }
                    
                    language = langName; 
                }

                // Extrair informações de extras (Foil, Pre Release, etc.)
                let extrasList = [];
                let extrasRaw = '';
                const extrasElement = item.querySelector('.extras-pedido');
                if (extrasElement) {
                    extrasRaw = extrasElement.textContent.trim();

                    // Separar os extras por vírgula
                    extrasList = extrasRaw.split(',').map(extra => extra.trim()).filter(extra => extra);
                    
                    // Remover possíveis strings vazias ou espaços em branco
                    extrasList = extrasList.filter(item => item && item !== '');
                }
                
                items.push({
                    quantity,
                    english_name: englishName,
                    code: codeFormatted,
                    quality,
                    quality_code: qualityCode,
                    old_price: oldPrice,
                    price: price || oldPrice,
                    total_stock: stock,
                    is_sealed: isSealed,
                    language,
                    language_code: languageCode, // Código do idioma (EN, PT, etc.)
                    extras: extrasList, // Lista de extras como array
                    extras_raw: extrasRaw // String original com os extras
                });
            } catch (error) {
                console.error('Erro ao processar item:', error);
            }
        });
        
        return {
            numero_pedido: orderNumber,
            order_date: orderDate,
            cliente: customer,
            envio: shipping,
            pagamento: payment,
            status: status,
            cep: cep,
            cpf: cpf,
            telefone: telefone,
            valor_itens: valorItens,
            valor_frete: valorFrete,
            endereco: address,
            items: items
        };
        
    } catch (error) {
        console.error(`Erro ao extrair detalhes do pedido:`, error);
        return null;
    }
}

// Função principal para iniciar o processo de sincronização
async function startSyncProcess() {
    // Criar o indicador de status se ainda não existir
    createStatusIndicator();
    
    updateStatus('Iniciando sincronização...', 'info');
    updateProgress(0, 0);
    
    try {
        // Obter configurações do vendedor
        const config = await getSellerConfig();
        if (!config) {
            updateStatus('Não foi possível obter configurações do vendedor', 'error');
            scheduleNextSync();
            return;
        }
        
        // Verificar se o usuário está logado
        const baseUrl = config.base_url;
        const ordersUrl = `${baseUrl}/?view=ecom/admin/pedidos&txt_status=${config.status_id}`;
        
        // Criar iframe oculto para a página de pedidos
        updateStatus('Acessando página de pedidos...', 'info');
        
        let ordersIframe;
        try {
            ordersIframe = await createHiddenIframe(ordersUrl);
        } catch (error) {
            // Tentar verificar se é necessário login
            const loginUrl = `${baseUrl}/?view=ecom/logar`;
            const loginIframe = await createHiddenIframe(loginUrl);
            
            // Preencher o formulário de login
            const loginDoc = loginIframe.contentWindow.document;
            const form = loginDoc.querySelector('.box-login form');
            
            if (!form) {
                throw new Error('Formulário de login não encontrado');
            }
            
            // Tentar aceitar os cookies primeiro
            const cookieButton = loginDoc.querySelector('#lgpd-cookie button');
            if (cookieButton) {
                cookieButton.click();
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
            const usernameField = form.querySelector('input[name="lnick"]');
            const passwordField = form.querySelector('input[name="lsenha"]');
            
            if (!usernameField || !passwordField) {
                throw new Error('Campos de login não encontrados');
            }
            
            const emailStorage = localStorage.getItem('email');
            const passwordStorage = localStorage.getItem('password');
            
            if (!emailStorage || !passwordStorage) {
                throw new Error('Credenciais de login não configuradas');
            }
            
            usernameField.value = emailStorage;
            passwordField.value = passwordStorage;
            
            // Enviar formulário
            form.submit();
            
            // Aguardar redirecionamento
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Tentar novamente a página de pedidos
            ordersIframe = await createHiddenIframe(ordersUrl);
        }
        
        // Extrair os números dos pedidos
        updateStatus('Identificando pedidos...', 'info');
        
        const ordersDoc = ordersIframe.contentWindow.document;
        const orderLinks = ordersDoc.querySelectorAll('.txt-order-id a, a[href*="compra&cod"]');
        const orderNumbers = [];

        if (config.update && Array.isArray(config.update)) {
            for (let i = 0; i < config.update.length; i++) {
                const orderNumberUpdate = config.update[i];
                orderNumbers.push(orderNumberUpdate);
            }
        }
        
        orderLinks.forEach(link => {
            const text = link.textContent.trim();
            if (text && text.includes('#')) {
                const orderNumber = text.replace('#', '').trim();
                orderNumbers.push(orderNumber);
            }
        });
        
        if (orderNumbers.length === 0) {
            updateStatus('Nenhum pedido encontrado para sincronização', 'warning');
            document.body.removeChild(ordersIframe);
            scheduleNextSync();
            return;
        }
        
        updateStatus(`Encontrados ${orderNumbers.length} pedidos para sincronizar`, 'info');
        updateProgress(0, orderNumbers.length);
        
        // Limpar o iframe de pedidos após extrair os números
        document.body.removeChild(ordersIframe);
        
        // Processar cada pedido individualmente
        const successOrders = [];
        const errorOrders = [];
        
        for (let i = 0; i < orderNumbers.length; i++) {
            const orderNumber = orderNumbers[i];
            updateStatus(`Processando pedido ${i+1}/${orderNumbers.length}: #${orderNumber}`, 'info');
            updateProgress(i, orderNumbers.length);
            
            try {
                // Criar um iframe oculto para o pedido específico
                const orderUrl = `${baseUrl}/?view=ecom/admin/compra&cod=${orderNumber}`;
                const orderIframe = await createHiddenIframe(orderUrl);
                
                // Extrair detalhes do pedido
                const orderDetails = extractOrderDetailsFromIframe(orderIframe);
                
                // Limpar o iframe
                document.body.removeChild(orderIframe);
                
                if (!orderDetails) {
                    errorOrders.push({
                        number: orderNumber,
                        error: 'Não foi possível obter detalhes do pedido'
                    });
                    continue;
                }
                
                // Enviar pedido para o Magento
                const result = await sendOrderToMagento(orderDetails, config.seller_id);
                
                if (result.success) {
                    successOrders.push({
                        number: orderNumber,
                        details: orderDetails
                    });
                } else {
                    errorOrders.push({
                        number: orderNumber,
                        error: result.message || 'Erro ao sincronizar pedido'
                    });
                }
            } catch (error) {
                console.error(`Erro ao processar pedido ${orderNumber}:`, error);
                errorOrders.push({
                    number: orderNumber,
                    error: error.message || 'Erro desconhecido'
                });
            }
            
            // Pequena pausa entre os pedidos para evitar sobrecarga
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Atualizar o status final
        updateProgress(orderNumbers.length, orderNumbers.length);
        
        if (successOrders.length > 0) {
            updateStatus(`Sincronização concluída: ${successOrders.length} pedidos sincronizados, ${errorOrders.length} erros`, 'success');
        } else if (errorOrders.length > 0) {
            updateStatus(`Falha na sincronização: ${errorOrders.length} erros`, 'error');
        } else {
            updateStatus('Nenhum pedido processado', 'warning');
        }
        
        // Mostrar uma notificação com os resultados
        const totalProcessed = successOrders.length + errorOrders.length;
        if (totalProcessed > 0) {
            // Usar a API de Notificações se disponível
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Magus Market - Sincronização de Pedidos', {
                    body: `${successOrders.length} pedidos sincronizados, ${errorOrders.length} erros`,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                    icon: API_BASE + 'skin/frontend/default/magus/favicon.ico'
=======
                    icon: 'https://magusshop.com.br/skin/frontend/default/magus/favicon.ico'
>>>>>>> Stashed changes
=======
                    icon: 'https://magusshop.com.br/skin/frontend/default/magus/favicon.ico'
>>>>>>> Stashed changes
                });
            } else if ('Notification' in window && Notification.permission !== 'denied') {
                Notification.requestPermission();
            }
        }
        
    } catch (error) {
        console.error('Erro no processo de sincronização:', error);
        updateStatus(`Erro na sincronização: ${error.message}`, 'error');
    } finally {
        // Agendar a próxima sincronização
        scheduleNextSync();
    }
}

// Inicialização do processo quando a extensão é ativada
function initSyncProcess() {
    // Criar o indicador de status
    createStatusIndicator();
    
    // Verificar se a sincronização automática está habilitada (padrão: ativada)
    if (localStorage.getItem('magus_auto_sync') === null) {
        localStorage.setItem('magus_auto_sync', 'true');
    }
    
    // Verificar se há um tempo de sincronização agendado
    const nextSyncTimeStr = localStorage.getItem('magus_next_sync');
    let nextSyncTime = null;
    
    if (nextSyncTimeStr) {
        nextSyncTime = new Date(parseInt(nextSyncTimeStr));
        
        // Se o tempo agendado já passou, sincronizar imediatamente
        if (nextSyncTime <= new Date()) {
            startSyncProcess();
        } else {
            // Caso contrário, agendar para o tempo definido
            updateNextSyncTimer(nextSyncTime);
            const timeUntilNextSync = nextSyncTime - new Date();
            
            setTimeout(() => {
                if (localStorage.getItem('magus_auto_sync') !== 'false') {
                    startSyncProcess();
                } else {
                    scheduleNextSync();
                }
            }, timeUntilNextSync);
        }
    } else {
        // Se não houver sincronização agendada, sincronizar imediatamente
        startSyncProcess();
    }
}
<<<<<<< Updated upstream
<<<<<<< Updated upstream

// Versão otimizada da extensão de sincronização
const CACHE_DB_NAME = 'MagusProductCache';
const CACHE_DB_VERSION = 1;
const CACHE_STORE_NAME = 'products';
const CACHE_LIFETIME = 2 * 60 * 60 * 1000; // 2 horas

// IndexedDB helper para cache de produtos
class ProductCacheDB {
    constructor() {
        this.dbName = CACHE_DB_NAME;
        this.version = CACHE_DB_VERSION;
        this.storeName = CACHE_STORE_NAME;
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, { keyPath: 'cacheKey' });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                }
            };
        });
    }

    async setCache(key, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put({
                cacheKey: key,
                data: data,
                timestamp: Date.now()
            });
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getCache(key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(key);
            
            request.onsuccess = () => {
                const result = request.result;
                if (result && Date.now() - result.timestamp < CACHE_LIFETIME) {
                    resolve(result.data);
                } else {
                    resolve(null);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    async getAllCache() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();
            
            request.onsuccess = () => {
                const results = request.result.filter(item => Date.now() - item.timestamp < CACHE_LIFETIME);
                resolve(results.map(item => item.data));
            };
            request.onerror = () => reject(request.error);
        });
    }
}

// Inicialização da cache
let productCache;

// Função para extrair todos os produtos da página
function extractAllProducts() {
    const rows = document.querySelectorAll('.table-allTCG-order-0 tbody tr');
    const products = [];
    
    for (let i = 2; i < rows.length; i++) {
        const row = rows[i];
        const productData = extractProductData(row);
        if (productData) {
            products.push(productData);
        }
    }
    
    return products;
}

// Função para extrair dados de um produto (otimizada)
function extractProductData(row) {
    try {
        // Elementos base
        const cardNumberElement = row.querySelector('td:nth-child(8) font.card-number-small');
        const cardNumberText = cardNumberElement ? cardNumberElement.innerHTML : null;
        let codeBase = cardNumberText ? cardNumberText.replace(/\((.+?)<b>(\S+)<\/b>\)/g, "$1_$2") : null;
        
        // Se não tiver o código base, não pode prosseguir
        if (!codeBase) return null;
        
        const nomeProdutoLigaElement = row.querySelector('td:nth-child(8) a:last-of-type');
        const nomeProdutoLiga = nomeProdutoLigaElement ? nomeProdutoLigaElement.textContent : null;
        
        const precoLigaElement = row.querySelector('td:nth-child(3) input[type="text"]');
        const precoLiga = precoLigaElement ? precoLigaElement.value : null;
        
        if (!precoLiga) return null;
        
        const idiomaLigaElement = row.querySelector('td:nth-child(5) select option[selected]');
        const idiomaLiga = idiomaLigaElement ? idiomaLigaElement.value : null;
        
        const qualidadeLigaElement = row.querySelector('td:nth-child(6) select option[selected]');
        const qualidadeLiga = qualidadeLigaElement ? qualidadeLigaElement.value : null;
        
        const extrasLigaElement = row.querySelector('td:nth-child(7) select');
        let extrasLiga = [];
        
        if (extrasLigaElement) {
            for (let option of extrasLigaElement.options) {
                if (option.selected) {
                    extrasLiga.push(option.value);
                }
            }
        }
        
        const estoqueLigaElement = row.querySelector('td:nth-child(1) input[type="text"]');
        let estoqueLiga = estoqueLigaElement ? estoqueLigaElement.value : null;
        
        if (estoqueLiga === null || estoqueLiga === '' || estoqueLiga === '0') {
            estoqueLiga = 0;
        }
        
        // Capturar ID da edição e número da carta quando tcg=2
        const cardIdElement = row.querySelector('td:nth-child(1) input[name^="h_ide_carta"]');
        const editionIdElement = row.querySelector('td:nth-child(1) input[name^="h_ide_edicao"]');
        const numberElement = row.querySelector('td:nth-child(1) input[name^="h_numero_carta"]');
        
        const cardId = cardIdElement ? cardIdElement.value : null;
        const editionId = editionIdElement ? editionIdElement.value : null;
        const cardNumber = numberElement ? numberElement.value : null;
        
        // Construir o SKU completo conforme o formato mostrado no exemplo
        let finalCode = codeBase;
        if (idiomaLiga) finalCode += `&idiom=${idiomaLiga}`;
        if (qualidadeLiga) finalCode += `&quality=${qualidadeLiga}`;
        if (extrasLiga.length > 0) finalCode += `&extras=${extrasLiga.join(',')}`;

        // Extrair preços do produto
        const prices = extractProductPrices(row);
        
        return {
            sku: finalCode,
            code: codeBase,
            nomeProdutoLiga,
            precoLiga,
            estoqueLiga,
            idiomaLiga,
            qualidadeLiga,
            extrasLiga: extrasLiga.join(','),
            cardId,
            editionId,
            cardNumber,
            prices,
            // Adicionar estas linhas:
            product_id: null, // Será preenchido quando encontrado no cache
            // Hash para identificar mudanças
            hash: generateHash(finalCode, precoLiga, estoqueLiga)
        };
    } catch (error) {
        console.error('Erro ao obter cache de produtos:', error);
    }
}

// Função para pré-carregar cache
async function preloadProductCache() {
    const cacheStatus = document.getElementById('cache-status');
    if (cacheStatus) {
        cacheStatus.textContent = 'Carregando cache de produtos...';
    }
    
    const cache = await getLocalProductsCache();
    
    if (cacheStatus) {
        cacheStatus.textContent = cache ? 'Cache atualizado' : 'Cache indisponível';
    }
}

// Modificar modo de sincronização para usar batch processing
async function modoSincronizar(tcgCode) {
    await syncPageProducts();
}

// Atualizar modo de cadastro para usar batch processing
function modoCadastro(tcgCode) {
    const headerCell = document.createElement('th');
    headerCell.textContent = 'Ações da Magus';
    if (!tableHeader) return;
    tableHeader.appendChild(headerCell);

    if (!apiKey && !email) {
        apiKey = localStorage.getItem('api_key');
        email = localStorage.getItem('email');
    }

    
    const submitButton = document.querySelector('#btSalvar');
    if (!submitButton) return false;
    
    const magusButton = document.createElement('button');
    magusButton.type = 'button';
    magusButton.id = 'btAplicarMagus';
    magusButton.className = 'btn btn-primary btAplicarMagus';
    magusButton.style.marginLeft = '20px';
    magusButton.style.marginTop = '20px';
    magusButton.textContent = 'Salvar alterações Magus';
    
    submitButton.insertAdjacentElement('afterend', magusButton);
    
    magusButton.addEventListener('click', () => syncPageProducts());
    
    // Adicionar indicador de status de cache
    const cacheIndicator = document.createElement('div');
    cacheIndicator.id = 'cache-status';
    cacheIndicator.style.marginTop = '10px';
    cacheIndicator.style.color = '#333';
    cacheIndicator.style.fontWeight = '600';
    cacheIndicator.style.position = 'fixed';
    cacheIndicator.style.top = '16px';
    cacheIndicator.style.right = '24px';
    cacheIndicator.style.background = 'orangered';
    cacheIndicator.style.padding = '8px 16px';
    cacheIndicator.style.borderRadius = '4px';
    cacheIndicator.textContent = 'Cache: Inicializando...';
    magusButton.insertAdjacentElement('afterend', cacheIndicator);

    for (let i = 0; i < rows.length; i++) {

        if (i === 1) {
            continue;
        }
    
        const row = rows[i];
    
        // Criar um elemento de botão
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn-acao btn btn-primary';
        button.textContent = 'MAGUS';
    
        button.addEventListener('click', () => {
            Swal.fire({
                icon: "info",
                title: "Procurando produto na Magus Market",
                html: "Verificando se o produto está no seu estoque...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            
            let cardIdElement = row.querySelector('td:nth-child(1) input[name^="h_ide_carta"]');
            let editionIdElement = row.querySelector('td:nth-child(1) input[name^="h_ide_edicao"]');
            let numberElement = row.querySelector('td:nth-child(1) input[name^="h_numero_carta"]');

            let cardNumberElement = row.querySelector('td:nth-child(8) font.card-number-small');
            let cardNumber = cardNumberElement ? cardNumberElement.innerHTML : null;
            let code = cardNumber ? cardNumber.replace(/\((.+?)<b>(\S+)<\/b>\)/g, "$1_$2") : null; // Formata cada linha e junta novamente
            const nomeProdutoLigaElement = row.querySelector('td:nth-child(8) a:last-of-type');
            const nomeProdutoLiga = nomeProdutoLigaElement ? nomeProdutoLigaElement.textContent : null;
            const precoLigaElement = row.querySelector('td:nth-child(3) input[type="text"]');
            const precoLiga = precoLigaElement ? precoLigaElement.value : null;
    
            const idiomaLigaElement = row.querySelector('td:nth-child(5) select option[selected]');
            const idiomaLiga = idiomaLigaElement ? idiomaLigaElement.value : null;
    
            const qualidadeLigaElement = row.querySelector('td:nth-child(6) select option[selected]');
            const qualidadeLiga = qualidadeLigaElement ? qualidadeLigaElement.value : null;
    
            const extrasLigaElement = row.querySelector('td:nth-child(7) select');
            let extrasLiga = [];
    
            if (extrasLigaElement) {
                for (let option of extrasLigaElement.options) {
                    if (option.selected) {
                        extrasLiga.push(option.value);
                    }
                }
            }
    
            const estoqueLigaElement = row.querySelector('td:nth-child(1) input[type="text"]');
            const estoqueLiga = estoqueLigaElement ? estoqueLigaElement.value : 0;
    
            if (!apiKey || !email) {
                // alert('Por favor, configure a extensão com a sua chave de API e ID de vendedor.');
                Swal.fire({
                    icon: "question",
                    title: "Ative a extensão!",
                    text: "Por favor, configure a extensão com a sua chave de API e ID de vendedor.",
                    footer: '<a href="#">Precisa de ajuda?</a>'
                });
                return;
            }
    
            //montar parametros idioma, qualidade e extras
            if (idiomaLiga) {
                code += `&idiom=${idiomaLiga}`;
            }
            if (qualidadeLiga) {
                code += `&quality=${qualidadeLiga}`;
            }
            if (extrasLiga) {
                code += `&extras=${extrasLiga}`;
            }
    
            // Faz a requisição AJAX
            let sellerstockUrl = tcgCode === '2'
                ? `${API_BASE}catalog/collection/sellerstock/?sku=${code}&email=${email}&key=${apiKey}&card_id=${cardIdElement.value}&edition_id=${editionIdElement.value}&card_number=${numberElement.value}&tcg=2`
                : `${API_BASE}catalog/collection/sellerstock/?sku=${code}&email=${email}&key=${apiKey}`;
            fetch(sellerstockUrl)
                .then(response => response.json())
                .then(data => {
                    // Manipula os dados recebidos
                    var nomeProduto = data[0].name;
                    var precoProduto = data[0].price;
                    var preco_valor = data[0].price_value;
                    var skuProduto = data[0].sku;
                    var idProduto = data[0].id;
                    var qualidadeProduto = data[0].quality;
                    var extrasProduto = data[0].extras;
                    var estoqueProduto = data[0].stock;
                    var idiomaProduto = data[0].idiom;
                    var imgProduto = data[0].image;
                    
                    Swal.fire({
                        title: "<h2>Meu estoque na Magus Market</h2>",
                        icon: "info",
                        width: 520,
                        padding: "3em",
                        html: `
                            <div>
                            <div class="modal-content-wrp" style="
                                display: flex;
                                flex-direction: row;
                                align-items: flex-start;
                                gap: 36px;
                                margin: 24px 0;">
                                <div class="modal-img">
                                <img src="${imgProduto}" alt="${nomeProduto}">
                                </div>
                                <div class="modal-content" style="
                                    display: flex;
                                    flex-direction: column;
                                    align-items: flex-start;">
                                    <p><b>Produto: </b>${nomeProduto}</p>
                                    <p><b>Preço na Magus: </b>${precoProduto}</p>
                                    <p><b>SKU: </b>${skuProduto}</p>
                                    <p><b>Qualidade: </b>${qualidadeProduto}</p>
                                    <p><b>Extras: </b>${extrasProduto}</p>
                                    <p><b>Estoque: </b>${estoqueProduto}</p>
                                    <p><b>Idioma: </b>${idiomaProduto}</p>
                                    <label for="swal-input1" style="margin-top: 24px;">Novo estoque:</label>
                                    <input type="number" value="${estoqueLiga}" id="swal-input1" class="swal2-input" style="width: 200px; margin: 0;" placeholder="novo estoque" min="0" max="9999" required>
                                    <label for="swal-input2" style="margin-top: 10px;">Novo preço:</label>
                                    <input value="${precoLiga.replace(',','.')}" id="swal-input2" type="text" class="swal2-input" style="width: 200px; margin: 0;" placeholder="novo preço">
                                </div>
                            </div>
                        </div>
                        `,
                        showDenyButton: false,
                        showCancelButton: true,
                        confirmButtonText: "Salvar",
                        denyButtonText: `Don't save`,
                        cancelButtonText: "Cancelar",
                        focusConfirm: true,
                        showLoaderOnConfirm: true,
                        preConfirm: async () => {
                            try {
                                const newStock = document.getElementById("swal-input1").value;
                                const newPrice = document.getElementById("swal-input2").value;
    
                                if(!newStock && !newPrice) {
                                    Swal.showValidationMessage("Preencha pelo menos um campo!");
                                }
    
                                const stockUrl =  tcgCode === '2'
                                    ? `${API_BASE}catalog/save/sellerproduct/?id=${idProduto}&sku=${skuProduto}&email=${email}&key=${apiKey}&stock=${newStock}&price=${newPrice}&tcg=2`
                                    : `${API_BASE}catalog/save/sellerproduct/?id=${idProduto}&sku=${skuProduto}&email=${email}&key=${apiKey}&stock=${newStock}&price=${newPrice}`;
                                const response = await fetch(stockUrl);
                                if (!response.ok) {
                                  return Swal.showValidationMessage(`
                                    ${JSON.stringify(await response.json())}
                                  `);
                                }
                                return response.json();
                              } catch (error) {
                                Swal.showValidationMessage(`
                                  Request failed: ${error}
                                `);
                              }
                        },
                        allowOutsideClick: () => !Swal.isLoading()
                    }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            icon: "success",
                            title: `Produto ${nomeProduto} atualizado com sucesso!`,
                            showConfirmButton: false,
                          });
                        }
                    });
    
                    code = null;
    
                })
                .catch(error => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Produto não encontrado na Magus Market!",
                        footer: '<a href="#">Vamos lá cadastrar?</a>'
                      });
                    code = null;
                });
        });
    
        // Criar uma nova célula na coluna de ações e inserir o botão
        const cell = document.createElement('td');
        cell.appendChild(button);
        
        // Inserir a nova célula na linha
        row.appendChild(cell);

    }
}

// Atualizar código de execução
// Espera productCache ser inicializado primeiro
const initProductCache = new ProductCacheDB();
    initProductCache.init().then(() => {
        productCache = initProductCache;
        
        if (modo === '1' || !modo) {
            tcg = urlParams.get('tcg');
            modoCadastro(tcg);
            
            // Pré-carregar cache se for modo de cadastro
            setTimeout(() => {
                preloadProductCache();
            }, 1000);
        }

        if (modo === '2') {
            tcg = urlParams.get('tcg');
            modoSincronizar(tcg);
        }
});

// Adicionar listener para limpar cache
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'clearCache') {
        productCache.setCache('products_cache', {})
            .then(() => sendResponse({ success: true }))
            .catch(error => sendResponse({ success: false, error: error.message }));
        return true;
    }
});

// Função para gerar hash simples dos dados do produto
function generateHash(code, price, stock) {
    return btoa(`${code}-${price}-${stock}`);
}

// Função para extrair preços de um produto na página
function extractProductPrices(row) {
    const prices = {
        n: { min: 0, med: 0, max: 0 },
        f: { min: 0, med: 0, max: 0 },
        e: { min: 0, med: 0, max: 0 }
    };

    const priceSelectors = [
        { type: 'n', selector: '1' },
        { type: 'f', selector: '2' },
        { type: 'e', selector: '3' }
    ];

    for (const {type, selector} of priceSelectors) {
        // Menor preço (min)
        let minElement = row.querySelector(`td:nth-child(4) .analise-preco-tipo:nth-child(${selector}) .preco:nth-child(1) .menor`);
        let minPrice = minElement ? minElement.textContent : '0';
        if (minPrice !== '0' && minPrice !== 'R$ 0,00') {
            let formattedPrice = formatPrice(minPrice);
            if (formattedPrice > 0) {
                prices[type].min = formattedPrice;
            }
        }

        // Preço médio
        let medElement = row.querySelector(`td:nth-child(4) .analise-preco-tipo:nth-child(${selector}) .preco:nth-child(2) .medio`);
        let medPrice = medElement ? medElement.textContent : '0';
        if (medPrice !== '0' && medPrice !== 'R$ 0,00') {
            let formattedPrice = formatPrice(medPrice);
            if (formattedPrice > 0) {
                prices[type].med = formattedPrice;
            }
        }

        // Maior preço (max)
        let maxElement = row.querySelector(`td:nth-child(4) .analise-preco-tipo:nth-child(${selector}) .preco:nth-child(3) .maior`);
        let maxPrice = maxElement ? maxElement.textContent : '0';
        if (maxPrice !== '0' && maxPrice !== 'R$ 0,00') {
            let formattedPrice = formatPrice(maxPrice);
            if (formattedPrice > 0) {
                prices[type].max = formattedPrice;
            }
        }
    }

    return prices;
}

// Sincronização otimizada por página
async function syncPageProducts() {
    const tcg = urlParams.get('tcg');
    const emailStorage = localStorage.getItem('email');
    const apiKeyStorage = localStorage.getItem('api_key');
    
    if (!emailStorage || !apiKeyStorage) {
        Swal.fire({
            icon: 'error',
            title: 'Configuração incompleta',
            text: 'É necessário configurar email e chave de API primeiro.'
        });
        return;
    }
    
    try {
        // Garantir que IndexedDB está inicializado
        if (!productCache.db) {
            await productCache.init();
        }
        
        // Extrair todos os produtos da página
        const products = extractAllProducts();
        
        if (products.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Nenhum produto encontrado',
                text: 'Não foram encontrados produtos para sincronizar nesta página.'
            });
            return;
        }
        
        Swal.fire({
            icon: "info",
            title: "Sincronizando produtos",
            html: `Processando ${products.length} produtos...`,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        
        // Obter cache global dos produtos do vendedor
        const sellerProductsCache = await productCache.getCache('seller_products_cache');
        
        // Obter cache da página atual
        const cacheKey = `products_cache_page_${urlParams.get('page') || 1}`;
        const cachedProducts = await productCache.getCache(cacheKey) || {};
        
        // Identificar produtos que mudaram
        const productsToUpdate = [];
        const changedProducts = [];
        const newProducts = [];
        const unchangedProducts = [];
        
        for (const product of products) {
            // Verificar se o produto existe no cache do vendedor
            const sellerProduct = sellerProductsCache ? sellerProductsCache[product.sku] : null;
            
            // Atualizar o product_id se encontrado no cache do vendedor
            if (sellerProduct) {
                product.product_id = sellerProduct.id;
            }
            
            const productKey = `product_${product.code}`;
            const cachedProduct = cachedProducts && cachedProducts[productKey];
            
            if (!cachedProduct) {
                newProducts.push(product);
                productsToUpdate.push(product);
            } else if (cachedProduct.hash !== product.hash) {
                // Transferir o product_id do cache para o produto atual, se existir
                if (cachedProduct.product_id) {
                    product.product_id = cachedProduct.product_id;
                }
                
                changedProducts.push(product);
                productsToUpdate.push(product);
            } else {
                // Produto não mudou, não precisa atualizar
                console.log(`Produto ${product.nomeProdutoLiga} com preço ${product.precoLiga} e estoque ${product.estoqueLiga} igual ao cache, não será atualizado`);
                unchangedProducts.push(product);
            }
        }
        
        if (productsToUpdate.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Nenhuma alteração',
                text: 'Nenhum produto precisa ser atualizado.'
            });
            return;
        }
        
        // Preparar dados para envio em lote
        const batchData = productsToUpdate.map(product => ({
            sku: product.sku, // Usar o SKU completo
            code: product.code,
            price: formatPrice(product.precoLiga),
            qty: parseInt(product.estoqueLiga) || 0,
            card_id: product.cardId,
            edition_id: product.editionId,
            card_number: product.cardNumber,
            idiom: product.idiomaLiga,
            quality: product.qualidadeLiga,
            extras: product.extrasLiga,
            tcg: tcg,
            // Adicionar o ID do produto se disponível
            product_id: product.product_id || null
        }));

        // Enviar requisição em lote
        let response = await fetch(`${API_BASE}catalog/save/sellerproductbatch/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                email: emailStorage,
                key: apiKeyStorage,
                products: batchData,
                create_option: urlParams.get('create_option') || 'false'
            })
        });
        
        let result = await response.json();
        console.log('Resultado da sincronização:', result);

        if (!result || !result.success) {
            throw new Error(result.message || 'Erro ao sincronizar produtos');
        }
        
        // Atualizar o product_id no cache para produtos atualizados e criados
        if (result.updated_products && result.updated_products.length > 0) {
            for (const updatedProduct of result.updated_products) {
                // Encontrar o produto correspondente
                const product = productsToUpdate.find(p => p.sku === updatedProduct.original_sku);
                if (product) {
                    product.product_id = updatedProduct.id;
                }
            }
        }
        
        if (result.created_products && result.created_products.length > 0) {
            for (const createdProduct of result.created_products) {
                // Encontrar o produto correspondente
                const product = productsToUpdate.find(p => p.sku === createdProduct.original_sku);
                if (product) {
                    product.product_id = createdProduct.id;
                }
            }
        }
        
        // Atualizar cache
        const newCache = cachedProducts || {};
        for (const product of products) {
            newCache[`product_${product.code}`] = {
                code: product.code,
                hash: product.hash,
                prices: product.prices,
                product_id: product.product_id || null,
                id: product.product_id || null,
                idiom: product.idiomaLiga,
                quality: product.qualidadeLiga,
                extras: product.extrasLiga,
                timestamp: Date.now()
            };
        }
        await productCache.setCache(cacheKey, newCache);
        
        // Mostrar resultados
        const successCount = result.success_count || productsToUpdate.length;
        const errorCount = result.error_count || 0;
        
        Swal.fire({
            icon: successCount > 0 ? 'success' : 'error',
            title: 'Sincronização concluída',
            html: `
                <p><b>Total processado: ${productsToUpdate.length}</b></p>
                <p><b>Sucesso: ${successCount}</b></p>
                <p><b>Erros: ${errorCount}</b></p>
                <p><b>Sem alterações: ${unchangedProducts.length}</b></p>
                ${newProducts.length > 0 ? `<p><b>Novos produtos: ${newProducts.length}</b></p>` : ''}
                ${changedProducts.length > 0 ? `<p><b>Produtos alterados: ${changedProducts.length}</b></p>` : ''}
                ${result.errors && result.errors.length > 0 ? `<hr><p><b>Erros:</b></p>${result.errors.map(e => `<p>${e}</p>`).join('')}` : ''}
            `,
            footer: '<a href="#">Precisa de ajuda?</a>'
        });
        
        // Navegar para próxima página se existir
        const nextPage = document.querySelector('.bg_pagination .page_mais');
        if (nextPage && modo === '2') {
            setTimeout(() => {
                nextPage.click();
            }, 2000);
        }
        
    } catch (error) {
        console.error('Erro na sincronização:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.message ?? 'Ocorreu um erro durante a sincronização.'
        });

        const nextPage = document.querySelector('.bg_pagination .page_mais');
        if (nextPage && modo === '2') {
            setTimeout(() => {
                nextPage.click();
            }, 2000);
        }
    }
}

// Função para obter cache local de produtos
async function getLocalProductsCache() {
    const emailStorage = localStorage.getItem('email');
    const apiKeyStorage = localStorage.getItem('api_key');
    
    if (!emailStorage || !apiKeyStorage) return;
    
    try {
        const response = await fetch(`${API_BASE}catalog/collection/productscache?email=${emailStorage}&key=${apiKeyStorage}`, {
            method: 'GET'
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Transformar o resultado em um objeto indexado por SKU completo
            const productsCache = {};
            
            // O resultado vem como um objeto onde a chave já é o SKU completo
            for (const sku in result.products) {
                const product = result.products[sku];
                productsCache[sku] = {
                    id: product.id,
                    product_id: product.id,
                    sku: product.sku,
                    code: product.code,
                    price: product.price_value,
                    stock: product.stock,
                    name: product.name,
                    quality: product.quality,
                    idiom: product.idiom,
                    extras: product.extras,
                    timestamp: Date.now()
                };
            }
            
            // Salvar no cache local
            await productCache.setCache('seller_products_cache', productsCache);
            return productsCache;
        }
    } catch (error) {
        console.error('Erro ao obter cache de produtos:', error);
        return null;
    }
}

// Função para mostrar preços em cache
async function showCachedPrices() {
    Swal.fire({
        title: 'Carregando preços...',
        text: 'Aguarde enquanto carregamos os preços em cache',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    
    try {
        // Verificar se o cache está inicializado
        if (!productCache.db) {
            await productCache.init();
        }
        
        // Extrair todos os produtos da página
        const products = extractAllProducts();
        
        if (products.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Nenhum produto encontrado',
                text: 'Não foram encontrados produtos para mostrar preços.'
            });
            return;
        }
        
        // Obter cache da página atual
        const cacheKey = `products_cache_page_${urlParams.get('page') || 1}`;
        const cachedProducts = await productCache.getCache(cacheKey) || {};
        
        const priceData = [];
        
        // Extrair dados de preço de produtos em cache
        for (const product of products) {
            const cachedProduct = cachedProducts[`product_${product.code}`];
            if (cachedProduct && cachedProduct.prices) {
                priceData.push({
                    nome: product.nomeProdutoLiga,
                    code: product.code,
                    prices: cachedProduct.prices
                });
            }
        }
        
        if (priceData.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Sem dados de preço',
                text: 'Nenhum preço em cache encontrado para estes produtos.'
            });
            return;
        }
        
        // Construir HTML para mostrar os preços
        const priceHTML = priceData.map(item => `
            <div class="price-item" style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <h4>${item.nome}</h4>
                <p><strong>Código:</strong> ${item.code}</p>
                <div style="display: flex; justify-content: space-between;">
                    <div>
                        <h5>Normal</h5>
                        <p>Min: R$ ${item.prices.n.min.toFixed(2)}</p>
                        <p>Med: R$ ${item.prices.n.med.toFixed(2)}</p>
                        <p>Max: R$ ${item.prices.n.max.toFixed(2)}</p>
                    </div>
                    <div>
                        <h5>Foil</h5>
                        <p>Min: R$ ${item.prices.f.min.toFixed(2)}</p>
                        <p>Med: R$ ${item.prices.f.med.toFixed(2)}</p>
                        <p>Max: R$ ${item.prices.f.max.toFixed(2)}</p>
                    </div>
                    <div>
                        <h5>Especial</h5>
                        <p>Min: R$ ${item.prices.e.min.toFixed(2)}</p>
                        <p>Med: R$ ${item.prices.e.med.toFixed(2)}</p>
                        <p>Max: R$ ${item.prices.e.max.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        `).join('');
        
        Swal.fire({
            title: 'Preços em Cache',
            html: `
                <div style="max-height: 70vh; overflow-y: auto;">
                    ${priceHTML}
                </div>
            `,
            width: '80%',
            confirmButtonText: 'Fechar'
        });
        
    } catch (error) {
        console.error('Erro ao mostrar preços:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Ocorreu um erro ao carregar os preços em cache.'
        });
    }
}
////////////////////////////////////////////////
// Produtos Selados
////////////////////////////////////////////////

// Função para extrair informações de produtos selados
function extractSealedProductData(row) {
    try {
        // Extrair ID do produto (SID)
        const sidInput = row.querySelector('input[name^="h_sid"]');
        const sid = sidInput ? sidInput.value : null;
        
        if (!sid) return null;
        
        // Extrair informações básicas
        const nameElement = row.querySelector('a[id^="txt_name_"]');
        const name = nameElement ? nameElement.textContent.trim() : null;
        
        // Extrair estoque
        const stockInput = row.querySelector('input[id^="txt_qty_"]');
        const stock = stockInput ? stockInput.value : '0';
        
        // Extrair preço
        const priceInput = row.querySelector('input[name^="txt_preco"]');
        const price = priceInput ? priceInput.value : '0,00';
        
        // Extrair idioma
        const idiomSelect = row.querySelector('select[name^="txt_idioma"]');
        const idiom = idiomSelect && idiomSelect.selectedOptions.length > 0 ? 
                    idiomSelect.selectedOptions[0].value : null;
        
        // Extrair qualidade/condição
        const qualitySelect = row.querySelector('select[name^="txt_qualidade"]');
        const quality = qualitySelect && qualitySelect.selectedOptions.length > 0 ? 
                       qualitySelect.selectedOptions[0].value : null;
        
        // Extrair imagem (opcional)
        const imgElement = row.querySelector('td:nth-child(6) img');
        const imgUrl = imgElement ? imgElement.src : null;
        
        // Extrair categoria
        const categoryElement = row.querySelector('span[id^="txt_cad_categoria_categ_info_"]');
        const category = categoryElement ? categoryElement.textContent.trim() : null;
        
        return {
            sid: sid,
            name: name,
            stock: parseInt(stock) || 0,
            price: formatPrice(price),
            idiom: idiom,
            quality: quality,
            imgUrl: imgUrl,
            category: category,
            // Hash para comparação
            hash: generateHashSealed(sid, stock, price, idiom, quality)
        };
    } catch (error) {
        console.error('Erro ao extrair dados do produto selado:', error);
        return null;
    }
}

// Função para gerar hash para produtos selados
function generateHashSealed(sid, stock, price, idiom, quality) {
    return btoa(`${sid}-${stock}-${price}-${idiom}-${quality}`);
}

// Função para sincronizar produtos selados em lote
async function syncSealedProducts() {
    const emailStorage = localStorage.getItem('email');
    const apiKeyStorage = localStorage.getItem('api_key');
    
    if (!emailStorage || !apiKeyStorage) {
        Swal.fire({
            icon: 'error',
            title: 'Configuração incompleta',
            text: 'É necessário configurar email e chave de API primeiro.'
        });
        return;
    }
    
    try {
        // Verificar se o cache está inicializado
        if (!sealedProductsCache.db) {
            await sealedProductsCache.init();
        }
        
        Swal.fire({
            icon: "info",
            title: "Sincronizando produtos selados",
            html: `Analisando produtos... 
                  <br><button id="stopProcess" class="btn btn-danger">Parar</button>`,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
                document.getElementById('stopProcess').addEventListener('click', () => {
                    stopSync = true;
                });
            }
        });
        
        // Extrair produtos da página atual
        const products = [];
        const rows = document.querySelectorAll('.table-all-prod tbody tr');
        
        for (let i = 0; i < rows.length; i++) {
            const productData = extractSealedProductData(rows[i]);
            if (productData) {
                products.push(productData);
            }
        }
        
        if (products.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Nenhum produto encontrado',
                text: 'Não foram encontrados produtos para sincronizar nesta página.'
            });
            return;
        }
        
        // Obter produtos em cache
        const currentPage = new URLSearchParams(window.location.search).get('page') || 1;
        const cacheKey = `sealed_products_page_${currentPage}`;
        const cachedProducts = await sealedProductsCache.getCache(cacheKey) || {};
        
        // Identificar produtos alterados
        const productsToUpdate = [];
        const skippedProducts = [];
        
        for (const product of products) {
            const cachedProduct = cachedProducts[`product_${product.sid}`];
            
            if (!cachedProduct || cachedProduct.hash !== product.hash) {
                productsToUpdate.push(product);
            } else {
                skippedProducts.push(product);
            }
        }
        
        if (productsToUpdate.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Nenhuma alteração',
                text: 'Nenhum produto precisa ser atualizado.'
            });
            
            // proxima página se existir
            const nextPage = document.querySelector('.bg_pagination .page_mais');
            if (nextPage) {
                setTimeout(() => {
                    nextPage.click();
                }, 2000);
            }
            return;
        }
        
        Swal.update({
            html: `Enviando ${productsToUpdate.length} produtos para atualização...
                  <br><button id="stopProcess" class="btn btn-danger">Parar</button>`
        });
        
        // Enviar todos os produtos em um único request
        const response = await fetch(`${API_BASE}catalog/save/sellersealedbatch/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: emailStorage,
                key: apiKeyStorage,
                products: productsToUpdate,
                create_option: 'true'  // Permitir criação de produtos
            })
        });
        
        const result = await response.json();
        
        // Atualizar cache com os novos valores
        const newCache = cachedProducts || {};
        for (const product of products) {
            newCache[`product_${product.sid}`] = {
                hash: product.hash,
                timestamp: Date.now(),
                data: product
            };
        }
        await sealedProductsCache.setCache(cacheKey, newCache);
        
        // Mostrar resultados
        if (result.success) {
            Swal.fire({
                icon: result.success_count > 0 ? 'success' : 'warning',
                title: 'Sincronização concluída',
                html: `
                    <p><b>Atualizados com sucesso: ${result.success_count}</b></p>
                    <p><b>Erros: ${result.error_count}</b></p>
                    ${result.error_count > 0 ? `
                        <div style="max-height: 200px; overflow-y: auto; text-align: left; margin-top: 10px;">
                            ${result.errors.map(e => `<p>${e}</p>`).join('')}
                        </div>
                    ` : ''}
                    <p><b>Ignorados (sem alterações): ${skippedProducts.length}</b></p>
                `,
                confirmButtonText: 'OK',
                showCancelButton: false
            }).then((result) => {
                // Navegar para próxima página se existir
                if (result.isConfirmed) {
                    const nextPage = document.querySelector('.bg_pagination .page_mais');
                    if (nextPage) {
                        nextPage.click();
                    }
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro na sincronização',
                text: result.error || 'Ocorreu um erro durante a sincronização.'
            });
        }
        
    } catch (error) {
        console.error('Erro na sincronização de produtos selados:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.message || 'Ocorreu um erro durante a sincronização.'
        });
    }
}

// Criar cache separado para produtos selados
class SealedProductCacheDB {
    constructor() {
        this.dbName = 'MagusSealedProductCache';
        this.version = 1;
        this.storeName = 'sealed_products';
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, { keyPath: 'cacheKey' });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                }
            };
        });
    }

    async setCache(key, data) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put({
                cacheKey: key,
                data: data,
                timestamp: Date.now()
            });
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getCache(key) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(key);
            
            request.onsuccess = () => {
                const result = request.result;
                if (result && Date.now() - result.timestamp < CACHE_LIFETIME) {
                    resolve(result.data);
                } else {
                    resolve(null);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }
}

// Inicializar cache de produtos selados
const sealedProductsCache = new SealedProductCacheDB();
sealedProductsCache.init();

// Função para exibir produtos selados em cache
async function showSealedProductsCache() {
    try {
        // Verificar se o cache está inicializado
        if (!sealedProductsCache.db) {
            await sealedProductsCache.init();
        }
        
        Swal.fire({
            title: 'Carregando produtos selados...',
            text: 'Aguarde enquanto carregamos os dados do cache',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        
        // Buscar todas as chaves de cache para produtos selados
        const currentPage = new URLSearchParams(window.location.search).get('page') || 1;
        const cacheKey = `sealed_products_page_${currentPage}`;
        const cachedProducts = await sealedProductsCache.getCache(cacheKey) || {};
        
        const productsData = [];
        
        for (const key in cachedProducts) {
            if (key.startsWith('product_') && cachedProducts[key].data) {
                productsData.push(cachedProducts[key].data);
            }
        }
        
        if (productsData.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Sem dados em cache',
                text: 'Não há produtos selados armazenados em cache para esta página.'
            });
            return;
        }
        
        // Construir HTML para exibir produtos
        const productsHTML = productsData.map(product => `
            <div class="product-item" style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <div style="display: flex; align-items: center;">
                    ${product.imgUrl ? `<img src="${product.imgUrl}" alt="${product.name}" style="width: 60px; margin-right: 15px;">` : ''}
                    <div>
                        <h4 style="margin: 0 0 5px 0;">${product.name}</h4>
                        <p style="margin: 0;"><strong>ID:</strong> ${product.sid}</p>
                        <p style="margin: 0;"><strong>Categoria:</strong> ${product.category || 'N/A'}</p>
                    </div>
                </div>
                <div style="display: flex; flex-wrap: wrap; margin-top: 10px;">
                    <div style="margin-right: 20px;">
                        <p style="margin: 0;"><strong>Preço:</strong> R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                        <p style="margin: 0;"><strong>Estoque:</strong> ${product.stock}</p>
                    </div>
                    <div>
                        <p style="margin: 0;"><strong>Idioma:</strong> ${getIdiomLabel(product.idiom)}</p>
                        <p style="margin: 0;"><strong>Condição:</strong> ${getQualityLabel(product.quality)}</p>
                    </div>
                </div>
            </div>
        `).join('');
        
        Swal.fire({
            title: 'Produtos Selados em Cache',
            html: `
                <div style="max-height: 70vh; overflow-y: auto; text-align: left;">
                    ${productsHTML}
                </div>
            `,
            width: '80%',
            confirmButtonText: 'Fechar'
        });
    } catch (error) {
        console.error('Erro ao mostrar produtos selados:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Ocorreu um erro ao carregar os produtos selados: ' + error.message
        });
    }
}

// Função para obter label de idioma
function getIdiomLabel(idiomId) {
    const idioms = {
        '1': 'Alemão',
        '2': 'Inglês',
        '3': 'Espanhol',
        '4': 'Francês',
        '5': 'Italiano',
        '6': 'Japonês',
        '7': 'Coreano',
        '8': 'Português',
        '9': 'Russo',
        '10': 'Chinês',
        '11': 'Português / Inglês',
        '17': 'Tailandês',
        '19': 'Indonésio'
    };
    
    return idioms[idiomId] || `ID: ${idiomId}`;
}

// Função para obter label de qualidade
function getQualityLabel(qualityId) {
    const qualities = {
        '1': 'Aberto',
        '2': 'Lacrado',
        '3': 'Novo',
        '4': 'Novo com embalagem aberta',
        '5': 'Novo sem embalagem',
        '6': 'Usado',
        '7': 'Com defeito / avaria'
    };
    
    return qualities[qualityId] || `ID: ${qualityId}`;
}

// Verificar se estamos na página de produtos selados e adicionar botão
function checkForSealedProductsPage() {
    const url = window.location.href;
    console.log('URL atual:', url);
    if (url.includes('view=ecom%2Fadmin%2Fprod%2Fall') || url.includes('view=ecom/admin/prod/all')) {
        // Estamos na página de produtos selados
        console.log('Página de produtos selados detectada.');
        // Adicionar botão de sincronização
        const topActions = document.querySelector('.head-cad-cards');
        if (topActions) {
            console.log('Elemento encontrado para adicionar botões de sincronização.');
            const syncButton = document.createElement('button');
            syncButton.type = 'button';
            syncButton.className = 'btn btn-primary';
            syncButton.style.marginRight = '10px';
            syncButton.textContent = 'Sincronizar com Magus';
            syncButton.addEventListener('click', syncSealedProducts);
            
            const viewCacheButton = document.createElement('button');
            viewCacheButton.type = 'button';
            viewCacheButton.className = 'btn btn-info';
            viewCacheButton.style.marginRight = '10px';
            viewCacheButton.textContent = 'Ver Cache';
            viewCacheButton.addEventListener('click', showSealedProductsCache);
            
            topActions.insertBefore(viewCacheButton, topActions.firstChild);
            topActions.insertBefore(syncButton, topActions.firstChild);
        } else {
            // Se não encontrar o elemento padrão, tentar inserir em outro lugar
            console.log('Elemento padrão não encontrado, tentando adicionar em outro lugar.');
            const contentHeader = document.querySelector('.title-box-page');
            if (contentHeader) {
                const buttonDiv = document.createElement('div');
                buttonDiv.style.cssText = 'margin: 15px 0; display: flex; gap: 10px;';
                
                const syncButton = document.createElement('button');
                syncButton.type = 'button';
                syncButton.className = 'btn btn-primary';
                syncButton.textContent = 'Sincronizar com Magus';
                syncButton.addEventListener('click', syncSealedProducts);
                
                const viewCacheButton = document.createElement('button');
                viewCacheButton.type = 'button';
                viewCacheButton.className = 'btn btn-info';
                viewCacheButton.textContent = 'Ver Cache';
                viewCacheButton.addEventListener('click', showSealedProductsCache);
                
                buttonDiv.appendChild(syncButton);
                buttonDiv.appendChild(viewCacheButton);
                
                contentHeader.appendChild(buttonDiv);
            }
        }
    }
}

// Verificar se o script foi carregado
console.log('Magus Extension: Content script carregado');

// Adicionar identificador para debug
window.magusExtensionLoaded = true;

// Adicionar botao para envio de preços em cache
const sendCachedPricesButton = document.createElement('button');
sendCachedPricesButton.type = 'button';
sendCachedPricesButton.className = 'btn btn-success';
sendCachedPricesButton.style.marginRight = '10px';
sendCachedPricesButton.textContent = '📤 Enviar Preços em Cache';
sendCachedPricesButton.addEventListener('click', async () => {
    const emailStorage = localStorage.getItem('email');
    const apiKeyStorage = localStorage.getItem('api_key');
    
    if (!emailStorage || !apiKeyStorage) {
        Swal.fire({
            icon: 'error',
            title: 'Configuração incompleta',
            text: 'É necessário configurar email e chave de API primeiro.'
        });
        return;
    }
    
    Swal.fire({
        icon: "info",
        title: "Enviando preços em cache",
        html: `Aguarde enquanto enviamos os preços em cache...`,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    
    const result = await handleSendCachedPrices(emailStorage, apiKeyStorage);
    
    Swal.close();
    
    if (result.success) {
        Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: result.message
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: result.error || 'Ocorreu um erro ao enviar os preços.'
        });
    }
});

// Adicionar botão na barra de ações
const topActions = document.querySelector('.head-cad-cards');
if (topActions) {
    topActions.insertBefore(sendCachedPricesButton, topActions.firstChild);
}

// Função para processar e enviar preços em cache
async function handleSendCachedPrices(email, apiKey) {
    try {
        // Verificar se o cache está inicializado
        if (!productCache.db) {
            await productCache.init();
        }
        
        let allPrices = [];
        let totalProducts = 0;
        let processedPages = 0;
        
        // Obter todos os dados do cache
        let productCacheAll = await productCache.getAllCache();

        console.log('Verificando produtos em cache...');
        console.log('Tipo de dados do cache:', typeof productCacheAll);
        console.log('Cache é array?', Array.isArray(productCacheAll));
        console.log('Tamanho do array:', productCacheAll.length);

        // Verificar se o cache está vazio
        if (!productCacheAll || (Array.isArray(productCacheAll) && productCacheAll.length === 0)) {
            return {
                success: false,
                error: 'Cache não inicializado ou vazio'
            };
        }

        // getAllCache() retorna um array de objetos data
        if (Array.isArray(productCacheAll)) {
            console.log('Processando cache como array de dados...');
            
            // Verificar primeiro item para debug
            if (productCacheAll.length > 0) {
                console.log('Primeiro item do cache:', productCacheAll[0]);
                console.log('Tipo do primeiro item:', typeof productCacheAll[0]);
                console.log('Chaves do primeiro item:', Object.keys(productCacheAll[0]));
            }
            
            // Processar cada item do cache
            for (const cacheItem of productCacheAll) {
                // cacheItem é um objeto que pode ser:
                // 1. Um objeto com produtos (chaves product_*)
                // 2. Um produto individual
                
                if (cacheItem && typeof cacheItem === 'object') {
                    // Verificar se é um produto individual (tem code e prices)
                    if (cacheItem.code && cacheItem.prices) {
                        const code = cacheItem.code.split('&')[0];
                        
                        const priceData = {
                            code: code,
                            prices: {
                                price_min_n: cacheItem.prices.n.min,
                                price_n: cacheItem.prices.n.med,
                                price_max_n: cacheItem.prices.n.max,
                                price_min_f: cacheItem.prices.f.min,
                                price_f: cacheItem.prices.f.med,
                                price_max_f: cacheItem.prices.f.max,
                                price_min_e: cacheItem.prices.e.min,
                                price_e: cacheItem.prices.e.med,
                                price_max_e: cacheItem.prices.e.max
                            }
                        };
                        
                        allPrices.push(priceData);
                        totalProducts++;
                    }
                    // Verificar se é um objeto contendo produtos (como uma página de cache)
                    else {
                        processedPages++;
                        
                        // Iterar sobre as propriedades do objeto
                        for (const key in cacheItem) {
                            if (key.startsWith('product_')) {
                                const product = cacheItem[key];
                                
                                if (product && product.prices) {
                                    const code = product.code ? product.code.split('&')[0] : key.replace('product_', '');
                                    
                                    const priceData = {
                                        code: code,
                                        prices: {
                                            price_min_n: product.prices.n.min,
                                            price_n: product.prices.n.med,
                                            price_max_n: product.prices.n.max,
                                            price_min_f: product.prices.f.min,
                                            price_f: product.prices.f.med,
                                            price_max_f: product.prices.f.max,
                                            price_min_e: product.prices.e.min,
                                            price_e: product.prices.e.med,
                                            price_max_e: product.prices.e.max
                                        }
                                    };
                                    
                                    allPrices.push(priceData);
                                    totalProducts++;
                                }
                            }
                        }
                    }
                }
            }
        }
        
        console.log(`Produtos processados: ${totalProducts}`);
        console.log(`Páginas processadas: ${processedPages}`);
        
        if (allPrices.length === 0) {
            // Debug detalhado se não encontrar preços
            let debugInfo = '';
            if (productCacheAll.length > 0) {
                const firstItem = productCacheAll[0];
                debugInfo = `Primeiro item do cache: ${JSON.stringify(firstItem, null, 2)}`;
            }
            
            return {
                success: false,
                error: `Nenhum preço encontrado no cache. Itens processados: ${productCacheAll.length}. ${debugInfo}`
            };
        }
        
        // Enviar preços para o servidor em lotes
        const batchSize = 100; // Tamanho do lote para envio
        let successCount = 0;
        let errorCount = 0;
        let errors = [];

        console.log('Enviando preços em lotes...', allPrices.length, 'preços encontrados.');
        
        for (let i = 0; i < allPrices.length; i += batchSize) {
            const batch = allPrices.slice(i, i + batchSize);
            
            try {
                const response = await fetch(`${API_BASE}catalog/save/cachedprices`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        key: apiKey,
                        prices: batch,
                        source: 'cache'
                    })
                });
                
                const result = await response.json();
                
                if (result.success !== false) {
                    successCount += batch.length;
                } else {
                    errorCount += batch.length;
                    errors.push(`Lote ${Math.floor(i / batchSize) + 1}: ${result.error || 'Erro desconhecido'}`);
                }
            } catch (error) {
                errorCount += batch.length;
                errors.push(`Lote ${Math.floor(i / batchSize) + 1}: ${error.message}`);
            }
            
            // Pequeno delay entre lotes
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        return {
            success: true,
            message: `Processamento concluído! 
                    Total de produtos: ${totalProducts}
                    Páginas processadas: ${processedPages}
                    Sucessos: ${successCount}
                    Erros: ${errorCount}
                    ${errors.length > 0 ? '\nErros: ' + errors.join(', ') : ''}`,
            details: {
                totalProducts,
                processedPages,
                successCount,
                errorCount,
                errors
            }
        };
        
    } catch (error) {
        console.error('Erro na função handleSendCachedPrices:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
// Manter a função handleSendCachedPrices que já foi criada anteriormente
// (a função que foi fornecida no código anterior)

// Inicializar quando a página estiver carregada
checkForSealedProductsPage();
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
