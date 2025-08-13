// script.js (Versão Completa e Atualizada com Leque de Experiência do Cliente)

document.addEventListener('DOMContentLoaded', () => {
    const circularMenuContainer = document.querySelector('.circular-menu-container');

    // Caminhos para os arquivos SVG da mandala e dos leques
    // Verifique se estes nomes de arquivo correspondem aos seus arquivos reais no seu projeto
    const mandalaSvgFilePath = 'mandala.html'; 
    const lequeFinanceiroSvgFilePath = 'leque_financeiro.html'; 
    const lequeTecnologiaSvgFilePath = 'leque_tecnologia.html';
    const lequeMktShareSvgFilePath = 'leque_mkt_share.html'; 
    const lequeExperienciaClienteSvgFilePath = 'leque_experiencia_cliente.html'; // NOVO: Caminho para o leque de Experiência do Cliente

    let activeGroup = null; // Armazena o grupo da mandala principal que está ativo
    let currentLequeSvg = null; // Armazena o elemento SVG do leque atualmente exibido
    let mandalaGroups; // Coleção de todos os grupos da mandala principal

    // --- CARREGAMENTO DA MANDALA PRINCIPAL ---
    // Faz a requisição para carregar o arquivo SVG da mandala
    fetch(mandalaSvgFilePath)
        .then(response => {
            // Verifica se a resposta da requisição foi bem-sucedida (status 200 OK)
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status} ao carregar ${mandalaSvgFilePath}`);
            }
            return response.text(); // Converte a resposta para texto
        })
        .then(svgText => {
            // Cria um parser DOM para converter o texto SVG em um documento XML/HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgText, 'image/svg+xml'); 
            const mandalaSvg = doc.documentElement; // Obtém o elemento <svg> raiz do documento

            if (mandalaSvg) {
                // Adiciona o SVG da mandala ao contêiner na página
                circularMenuContainer.appendChild(mandalaSvg);
                
                // Adiciona a classe 'visible' para iniciar a transição de fade-in e habilitar interações
                mandalaSvg.classList.add('visible'); 

                // Seleciona todos os grupos clicáveis da mandala principal
                mandalaGroups = mandalaSvg.querySelectorAll('.mandala-group'); 

                // Adiciona um event listener de clique a cada grupo da mandala
                mandalaGroups.forEach(group => {
                    group.addEventListener('click', (event) => {
                        event.stopPropagation(); // Impede que o clique se propague para elementos pai (ex: document)
                        handleMandalaGroupClick(group); // Chama a função para lidar com o clique no grupo
                    });
                });

            } else {
                console.error('Erro: Nenhuma tag <svg> válida encontrada no arquivo SVG da mandala.');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar ou processar o arquivo SVG da mandala:', error);
            // Exibe uma mensagem de erro na tela se o carregamento falhar
            circularMenuContainer.innerHTML = '<p style="color: red;">Não foi possível carregar o menu. Verifique o console para mais detalhes.</p>';
        });

    // --- FUNÇÃO PARA LIDAR COM O CLIQUE NOS GRUPOS DA MANDALA PRINCIPAL ---
    function handleMandalaGroupClick(clickedGroup) {
        // Verifica se o grupo clicado já está ativo
        const isActive = clickedGroup.classList.contains('active-group');

        // Remove a classe 'active-group' de todos os grupos da mandala
        mandalaGroups.forEach(group => group.classList.remove('active-group'));
        hideLeque(); // Esconde o leque atualmente visível

        // Desativa todos os cards do leque que possam estar ativos (de um leque anterior)
        document.querySelectorAll('.leque-card.active-leque-card').forEach(card => {
            card.classList.remove('active-leque-card');
        });

        // Se o grupo clicado não estava ativo, ele é ativado e seu leque é mostrado
        if (!isActive) { 
            clickedGroup.classList.add('active-group'); // Adiciona a classe 'active-group' ao grupo clicado
            activeGroup = clickedGroup; // Define o grupo clicado como o grupo ativo
            showLeque(clickedGroup); // Mostra o leque correspondente ao grupo clicado
        } else {
            activeGroup = null; // Se estava ativo e foi clicado novamente, desativa e não há grupo ativo
        }

        // Log para depuração
        const arcoClicado = clickedGroup.querySelector('.menu-arco'); 
        if (arcoClicado) {
            console.log(`Grupo principal clicado: ${clickedGroup.id}, Arco: ${arcoClicado.id}`);
        } else {
            console.log(`Grupo principal clicado: ${clickedGroup.id}`);
        }
    }

    // --- FUNÇÕES PARA MOSTRAR/ESCONDER O LEQUE ---
    function showLeque(clickedGroupElement) {
        // Se já existe um leque visível, remove-o
        if (currentLequeSvg) {
            circularMenuContainer.removeChild(currentLequeSvg);
            currentLequeSvg = null;
        }

        let lequeFilePathToLoad = ''; // Variável para armazenar o caminho do leque a ser carregado
        let lequeOffsetX = 0; // Offset X específico para o leque a ser carregado
        let lequeOffsetY = 0; // Offset Y específico para o leque a ser carregado
        let lequeScale = 1;   // Escala específica para o leque a ser carregado

        // Define qual arquivo de leque carregar e seus parâmetros de posicionamento/escala
        if (clickedGroupElement.id === 'grupo-arco-Financeiro') {
            lequeFilePathToLoad = lequeFinanceiroSvgFilePath;
            lequeOffsetX = -32; 
            lequeOffsetY = -37; 
            lequeScale = 0.54; 
        } else if (clickedGroupElement.id === 'grupo-arco-Tecnologia') { 
            lequeFilePathToLoad = lequeTecnologiaSvgFilePath;
            // Estes valores são os que você ajustou anteriormente, ajuste novamente se precisar!
            lequeOffsetX = -143;  
            lequeOffsetY = -107; 
            lequeScale = 0.76;    
        } else if (clickedGroupElement.id === 'grupo-arco-Mkt-Share') { 
            lequeFilePathToLoad = lequeMktShareSvgFilePath;
            // Estes valores precisarão ser ajustados por você!
            lequeOffsetX = -105;  
            lequeOffsetY = -110; 
            lequeScale = 0.73;    
        } else if (clickedGroupElement.id === 'grupo-arco-Experiencia-Cliente') { // Lógica para o leque de Experiência do Cliente
            lequeFilePathToLoad = lequeExperienciaClienteSvgFilePath;
            // ** ATENÇÃO: Estes valores precisarão ser ajustados por você! **
            // O viewBox é similar ao Financeiro, então pode começar com valores próximos
            lequeOffsetX = -106;    // Exemplo inicial, AJUSTE CONFORME NECESSÁRIO
            lequeOffsetY = -133;   // Exemplo inicial, AJUSTE CONFORME NECESSÁRIO
            lequeScale = 0.76;   // Exemplo inicial, AJUSTE CONFORME NECESSÁRIO
        }


        // Se um caminho de leque foi definido, faz a requisição para carregá-lo
        if (lequeFilePathToLoad) {
            fetch(lequeFilePathToLoad)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erro HTTP! Status: ${response.status} ao carregar ${lequeFilePathToLoad}`);
                    }
                    return response.text();
                })
                .then(svgText => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(svgText, 'image/svg+xml');
                    const lequeSvg = doc.documentElement; 

                    if (lequeSvg) {
                        // Calcula a posição do leque com base no arco principal clicado
                        const mainArco = clickedGroupElement.querySelector('.menu-arco');
                        if (mainArco) {
                            const mainArcoRect = mainArco.getBoundingClientRect(); 
                            const containerRect = circularMenuContainer.getBoundingClientRect(); 

                            // Calcula a posição top-left do leque em relação ao topo-esquerdo do circularMenuContainer
                            const targetLequeX = (mainArcoRect.left - containerRect.left) + lequeOffsetX;
                            const targetLequeY = (mainArcoRect.top - containerRect.top) + lequeOffsetY;
                            
                            // Aplica o transform com a translação e escala
                            lequeSvg.style.transform = `translate(${targetLequeX}px, ${targetLequeY}px) scale(${lequeScale})`; 
                            lequeSvg.style.transformOrigin = '0 0'; // Define a origem da transformação
                            lequeSvg.style.zIndex = '10'; // Garante que o leque fique acima da mandala

                            console.log(`Leque Posicionado: X=${targetLequeX}px, Y=${targetLequeY}px, Scale=${lequeScale}`);
                        }

                        // Adiciona o SVG do leque ao contêiner
                        circularMenuContainer.appendChild(lequeSvg);
                        currentLequeSvg = lequeSvg; // Armazena a referência ao leque atual

                        // Pequeno atraso para permitir que o navegador aplique os estilos antes da transição de opacidade
                        setTimeout(() => {
                            lequeSvg.classList.add('visible');
                        }, 50);

                        // Seleciona todos os cards dentro do leque
                        const lequeCards = lequeSvg.querySelectorAll('.leque-card');
                        lequeCards.forEach(card => {
                            // Adiciona um event listener de clique a cada card do leque
                            card.addEventListener('click', (event) => {
                                event.stopPropagation(); // Impede que o clique se propague para elementos pai
                                
                                // Alterna a classe 'active-leque-card' no card clicado
                                card.classList.toggle('active-leque-card');
                                console.log(`Card do leque clicado: ${card.id}. Estado ativo: ${card.classList.contains('active-leque-card')}`);

                                // TODO: Aqui é onde você chamaria a função para mostrar/esconder a tabela de dados
                                // dependendo do estado ativo/inativo do card
                                // Exemplo: handleLequeCardClick(card);
                            });
                        });

                    } else {
                        console.error('Erro: Nenhuma tag <svg> válida encontrada no arquivo SVG do leque.');
                    }
                })
                .catch(error => {
                    console.error(`Erro ao carregar ou processar o arquivo SVG do leque (${lequeFilePathToLoad}):`, error);
                });
        }
    }

    function hideLeque() {
        if (currentLequeSvg) {
            currentLequeSvg.classList.remove('visible'); // Remove a classe 'visible' para iniciar o fade-out
            // Adiciona um event listener para remover o SVG do DOM após a transição de opacidade
            currentLequeSvg.addEventListener('transitionend', function handler(e) {
                // Verifica se a transição que terminou é a de opacidade e se o elemento não está mais visível
                if (e.propertyName === 'opacity' && !currentLequeSvg.classList.contains('visible')) { 
                     circularMenuContainer.removeChild(currentLequeSvg); // Remove o SVG do DOM
                     currentLequeSvg.removeEventListener('transitionend', handler); // Remove o próprio listener para evitar múltiplas chamadas
                     currentLequeSvg = null; // Limpa a referência

                     // Desativar todos os cards do leque atual quando ele for escondido
                     document.querySelectorAll('.leque-card.active-leque-card').forEach(card => {
                         card.classList.remove('active-leque-card');
                     });
                }
            }, { once: true }); // O { once: true } garante que o listener será removido após a primeira execução
        }
    }

    // --- FUNÇÃO PARA LIDAR COM CLIQUES FORA DA MANDALA E DO LEQUE ---
    document.addEventListener('click', (event) => {
        // Verifica se o clique ocorreu dentro do contêiner da mandala
        const isClickInsideMandalaContainer = circularMenuContainer.contains(event.target);
        // Verifica se o clique ocorreu em um card do leque
        const isClickOnLequeCard = event.target.closest('.leque-card');
        // Verifica se o clique ocorreu em um grupo da mandala principal
        const isClickOnMandalaGroup = event.target.closest('.mandala-group');

        // Se o clique não foi dentro do contêiner da mandala, nem em um card do leque, nem em um grupo da mandala
        if (!isClickInsideMandalaContainer && !isClickOnLequeCard && !isClickOnMandalaGroup) {
            // Se houver um grupo principal ativo, desativa-o
            if (activeGroup) {
                activeGroup.classList.remove('active-group');
                activeGroup = null;
            }
            hideLeque(); // Esconde o leque

            // Ao clicar fora de tudo, desativar todos os cards do leque
            document.querySelectorAll('.leque-card.active-leque-card').forEach(card => {
                card.classList.remove('active-leque-card');
            });
        }
    });

});