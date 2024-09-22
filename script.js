// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const orcamentoTextarea = document.querySelector('#orcamento');

    // Adiciona um ouvinte de evento para o envio do formulário
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Captura todos os valores dos campos do formulário
        const detalhes = document.querySelector('#detalhes').value;
        const especificacoes = document.querySelector('#especificacoes').value;
        const maoDeObra = document.querySelector('#maoDeObra').value;
        const materiais = document.querySelector('#materiais').value;
        const transporte = document.querySelector('#transporte').value;
        const energia = document.querySelector('#energia').value;
        const aluguel = document.querySelector('#aluguel').value;
        const impostos = document.querySelector('#impostos').value;
        const prazo = document.querySelector('#prazo').value;
        const pagamento = document.querySelector('#pagamento').value;
        const lucro = document.querySelector('#lucro').value;

        // Cria um resumo do orçamento
        const resumoOrcamento = `
            Detalhes do Serviço ou Produto: ${detalhes}
            Especificações Técnicas: ${especificacoes}
            Mão de Obra: ${maoDeObra}
            Custo de Materiais: R$ ${materiais}
            Transporte: R$ ${transporte}
            Energia: R$ ${energia}
            Aluguel: R$ ${aluguel}
            Impostos e Taxas: R$ ${impostos}
            Prazo de Execução: ${prazo}
            Forma de Pagamento: ${pagamento}
            Margem de Lucro: ${lucro}%
        `;

        try {
            // Envia o resumo do orçamento para o back-end
            const response = await fetch('http://localhost:3000/gerar-orcamento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: resumoOrcamento }),
            });

            const data = await response.json();

            // Exibe o orçamento gerado no textarea
            orcamentoTextarea.value = data.orcamento;
        } catch (error) {
            console.error('Erro ao gerar o orçamento:', error);
            orcamentoTextarea.value = 'Erro ao gerar o orçamento. Tente novamente.';
        }
    });
});
