// Encontrar todas as linhas da tabela
const rows = document.querySelectorAll('.table-allTCG-order-0 tbody tr');
const urlParams = new URLSearchParams(window.location.search);
const currentPage = urlParams.get('page');
const emailParam = urlParams.get('email');
const apiKeyParam = urlParams.get('key');
const createOptionParam = urlParams.get('create_option');
const priceOptionParam = urlParams.get('price_option');
const filtroPreco1 = 'txt_filtro_preco_tipo';
const filtroPreco2 = 'txt_filtro_preco';
const filtroOp = 'txt_filtro_operacao';
const searchType = 'search_type';
const modoParam = urlParams.get('modo');

let apiKey, email, createOption, priceOption, tcg, modo;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.apiKey && message.email) {
        // Use os valores recebidos como desejar
        apiKey = message.apiKey;
        email = message.email;
        createOption = message.createOption;
        priceOption = message.priceOption;
        tcg = message.tcg;
        modo = message.modo;

        // Faça algo com apiKey e email
        console.log('Valores recebidos em content.js:', apiKey, email, createOption, priceOption, tcg, modo);

        // adicionar variaveis como parametro e recarregar a página
        // Crie um objeto URLSearchParams
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
        params.append('create_option', createOption);
        params.append('price_option', priceOption);
        if(modo && modo == 2) {
            params.append(filtroPreco1, 1);
            params.append(filtroPreco2, '0,00');
            params.append(filtroOp, 2);
            params.append(searchType, 1);
        }
        params.append('modo', modo);

        // Adicione os parâmetros à URL atual e recarregue a página
        let url = window.location.href.split('?')[0] + '?' + params.toString();
        window.location.href = url;
    }
});

if (apiKeyParam && emailParam) {
    // Use os parametros para preencher as variáveis
    apiKey = apiKeyParam;
    email = emailParam;
    createOption = createOptionParam;
    priceOption = priceOptionParam;
    modo = modoParam;
}

const tableHeader = document.querySelector('.table-allTCG-order-0 thead tr');

// Iterar sobre cada linha, começando do terceiro elemento (índice 2)
function modoCadastro() {
    const headerCell = document.createElement('th');
    headerCell.textContent = 'Ações da magus';
    tableHeader.appendChild(headerCell);
    for (let i = 0; i < rows.length; i++) {
        if (i === 0) {
            const topBodyCell = document.createElement('td');
            const magusButton = document.createElement('button');
            magusButton.type = 'button';
            magusButton.className = 'btn-acao btn btn-primary';
            magusButton.textContent = 'Aplicar MAGUS';
            const topBodyCellRow = rows[i];
            topBodyCell.appendChild(magusButton);
            topBodyCellRow.appendChild(topBodyCell);
    
            magusButton.addEventListener('click', () => {
                const successArray = [];
                const errorArray = [];
                let promises = [];
    
                //ativar Swal com loading
                Swal.fire({
                    icon: "info",
                    title: "Atualizando estoque na Magus Market",
                    html: "Aguarde, estamos atualizando o estoque na Magus Market...",
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
    
                //percorre todas as linhas da tabela e atualiza todos os cards na magus de acordo com o estoque e preço da tabela
                //linhas sem estoque não são atualizadas
                //todos os cards não encontrados na magus são adicionados ao array de erro
                //todos os cards encontrados na magus são adicionados ao array de sucesso
                
                for (let i = 2; i < rows.length; i++) {
                    const row = rows[i];
        
                    let cardNumberElement = row.querySelector('td:nth-child(8) font.card-number-small');
                    let cardNumber = cardNumberElement ? cardNumberElement.innerHTML : null;
                    let code = cardNumber ? cardNumber.replace(/\((.+?)<b>(\S+)<\/b>\)/g, "$1_$2") : null; // Formata cada linha e junta novamente
                    const nomeProdutoLigaElement = row.querySelector('td:nth-child(8) a:last-of-type');
                    const nomeProdutoLiga = nomeProdutoLigaElement ? nomeProdutoLigaElement.textContent : null;
                    const precoLigaElement = row.querySelector('td:nth-child(3) input[type="text"]');
                    let precoLiga = precoLigaElement ? precoLigaElement.value : null;
    
                    if (precoLiga == null) {
                        continue;
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
                        precoLiga = null;
                    }
    
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
                        code += `&idioma=${idiomaLiga}`;
                    }
                    if (qualidadeLiga) {
                        code += `&qualidade=${qualidadeLiga}`;
                    }
                    if (extrasLiga) {
                        code += `&extras=${extrasLiga}`;
                    }
    
                    let skuForUpdate = null;
    
                    // Faz a requisição AJAX
                    let promise = (async () => {
                        try {
                            let response = await fetch(`https://zrx9va6fx7cgfnmi7p33gsog.testsrv.mageuni.cloud/catalog/collection/sellerstock/?sku=${code}&email=${email}&key=${apiKey}`);
                            let data = await response.json();
                
                            const newStock = estoqueLiga;
                            let newPrice = '';
                            if(precoLiga === null) {
                                newPrice = '';
                            }else{
                                newPrice = '&price=' + precoLiga.replace(',','.');
                            }
                
                            let skuForUpdate = data[0] ? data[0].sku : null;
                            if (skuForUpdate === null) {
                                errorArray.push(`${nomeProdutoLiga}`);
                                return;
                            }
                            const stockUrl = `https://zrx9va6fx7cgfnmi7p33gsog.testsrv.mageuni.cloud/catalog/save/sellerproduct/?sku=${skuForUpdate}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
                
                            response = await fetch(stockUrl);
                            data = await response.json();
                
                            successArray.push(`${nomeProdutoLiga}`);
                        } catch (error) {
                            errorArray.push(`${nomeProdutoLiga}`);
                            console.log(error);
                        }
                    })();
                
                    promises.push(promise);
    
                }
                Promise.all(promises)
                    .then(() => {
                        let successHtml = successArray.map(item => `<p>${item}</p>`).join('');
                        let errorHtml = errorArray.map(item => `<p>${item}</p>`).join('');
    
                        Swal.fire({
                            icon: "success",
                            title: "Resultado da atualização",
                            html: `
                                <p><b>Atualizados com sucesso: ${successArray.length}</b></p>
                                ${successHtml}
                                <p><b>Erros: ${errorArray.length}</b></p>
                                ${errorHtml}
                            `,
                            footer: '<a href="#">Precisa de ajuda?</a>'
                        });
                    })
                    .catch((error) => {
                        console.error("Erro durante a operação assíncrona:", error);
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
            fetch(`https://zrx9va6fx7cgfnmi7p33gsog.testsrv.mageuni.cloud/catalog/collection/sellerstock/?sku=${code}&email=${email}&key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    // Manipula os dados recebidos
                    var nomeProduto = data[0].name;
                    var precoProduto = data[0].price;
                    var preco_valor = data[0].price_value;
                    var skuProduto = data[0].sku;
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
    
                                const stockUrl = `
                                https://zrx9va6fx7cgfnmi7p33gsog.testsrv.mageuni.cloud/catalog/save/sellerproduct/?sku=${skuProduto}&email=${email}&key=${apiKey}&stock=${newStock}&price=${newPrice}
                                `;
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

async function modoSincronizar() {
    //ativar Swal com loading
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
    //let promises = [];

    for (let i = 2; i < rows.length; i++) {

        //percorre todas as linhas da tabela e atualiza todos os cards na magus de acordo com o estoque e preço da tabela
        //linhas sem estoque não são atualizadas
        //todos os cards não encontrados na magus são adicionados ao array de erro
        //todos os cards encontrados na magus são adicionados ao array de sucesso
        
        const row = rows[i];

        let cardNumberElement = row.querySelector('td:nth-child(8) font.card-number-small');
        let cardNumber = cardNumberElement ? cardNumberElement.innerHTML : null;
        let code = cardNumber ? cardNumber.replace(/\((.+?)<b>(\S+)<\/b>\)/g, "$1_$2") : null; // Formata cada linha e junta novamente
        const nomeProdutoLigaElement = row.querySelector('td:nth-child(8) a:last-of-type');
        const nomeProdutoLiga = nomeProdutoLigaElement ? nomeProdutoLigaElement.textContent : null;
        const precoLigaElement = row.querySelector('td:nth-child(3) input[type="text"]');
        let precoLiga = precoLigaElement ? precoLigaElement.value : null;

        if (precoLiga == null) {
            continue;
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
            code += `&idioma=${idiomaLiga}`;
        }
        if (qualidadeLiga) {
            code += `&qualidade=${qualidadeLiga}`;
        }
        if (extrasLiga) {
            code += `&extras=${extrasLiga}`;
        }

        let skuForUpdate = null;

        // Faz a requisição AJAX
        
        try {
            let response = await fetch(`https://zrx9va6fx7cgfnmi7p33gsog.testsrv.mageuni.cloud/catalog/collection/sellerstock/?sku=${code}&email=${email}&key=${apiKey}`);
            let data = await response.json();

            const newStock = estoqueLiga;
            let newPrice = '';
            if(precoLiga === null) {
                newPrice = '';
            }else{
                newPrice = '&price=' + precoLiga.replace(',','.');
            }

            let skuForUpdate = data[0] ? data[0].sku : null;
            if (skuForUpdate === null) {
                if (createOptionParam === 'true') {
                    let createUrl = `https://zrx9va6fx7cgfnmi7p33gsog.testsrv.mageuni.cloud/catalog/save/createsellerproduct/?sku=${code}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
                    response = await fetch(createUrl);
                    data = await response.json();
                    successArray.push(`${nomeProdutoLiga}`);
                    continue;
                }else{
                    errorArray.push(`${nomeProdutoLiga}`);
                    continue;
                }
            }

            //verificar se o preco e o estoque estão diferentes
            if (data[0].stock && data[0].stock == newStock) {
                successArray.push(`${nomeProdutoLiga}`);
                console.log('produto ' + nomeProdutoLiga + ' com Estoque igual, não atualizado');
                continue;
            }

            const stockUrl = `https://zrx9va6fx7cgfnmi7p33gsog.testsrv.mageuni.cloud/catalog/save/sellerproduct/?sku=${skuForUpdate}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;

            response = await fetch(stockUrl);
            data = await response.json();

            successArray.push(`${nomeProdutoLiga}`);
        } catch (error) {
            errorArray.push(`${nomeProdutoLiga}`);
            console.log(error);
        }

    }

    let successHtml = successArray.map(item => `<p>${item}</p>`).join('');
    let errorHtml = errorArray.map(item => `<p>${item}</p>`).join('');

    Swal.fire({
        icon: "success",
        title: "Resultado da atualização",
        html: `
            <p><b>Atualizados com sucesso: ${successArray.length}</b></p>
            ${successHtml}
            <p><b>Erros: ${errorArray.length}</b></p>
            ${errorHtml}
        `,
        footer: '<a href="#">Precisa de ajuda?</a>'
    });

    //passar para a próxima página
    let nextPage = document.querySelector('.bg_pagination .page_mais');
    if (nextPage) {
        //aguardar 2 segundos antes de passar para a próxima página
        setTimeout(() => {
            nextPage.click();
        }, 2000);
    }
            
}

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
            let response = await fetch(`https://zrx9va6fx7cgfnmi7p33gsog.testsrv.mageuni.cloud/catalog/collection/sellerstock/?limite=1&email=${email}&key=${apiKey}&card_id=${cardId}&edition_id=${cardEditionId}&idiom=${idiomaLiga}&quality=${qualidadeLiga}&extras=${extrasLiga}`);
            let data = await response.json();
            console.log(data);

            const newStock = estoqueLiga;
            let newPrice = '';
            if(precoLiga === null) {
                newPrice = '';
            }else{
                newPrice = '&price=' + precoLiga.replace(',','.');
            }

            let skuForUpdate = data[0] ? data[0].sku : null;
            let code = data[0] ? data[0].code : null;
            //se não encontrar o card na magus, tentar criar
            if(!code) {
                continue; //o codigo é necessário para a sincronização perfeita
            }
            if (skuForUpdate === null) {
                if (createOptionParam === 'true') {
                    let createUrl = `https://zrx9va6fx7cgfnmi7p33gsog.testsrv.mageuni.cloud/catalog/save/createsellerproduct/?sku=${code}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;
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

            const stockUrl = `https://zrx9va6fx7cgfnmi7p33gsog.testsrv.mageuni.cloud/catalog/save/sellerproduct/?sku=${skuForUpdate}&email=${email}&key=${apiKey}&stock=${newStock}${newPrice}`;

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
    
if (modo === '1' || !modo) {
    modoCadastro();
}

if (modo === '2') {
    modoSincronizar();
}

if (modo === '3') {
    modoFaltantes();
}
