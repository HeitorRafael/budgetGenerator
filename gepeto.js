// Gepeto.js (back-end)
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const cors = require('cors'); // Para habilitar requisições de outros domínios

// Configurar o app Express
const app = express();
app.use(express.json());
app.use(cors()); // Permitir requisições do front-end

// Configuração da API da OpenAI
const configuration = new Configuration({
    apiKey: process.env.GPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Rota para gerar orçamento
app.post('/gerar-orcamento', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await openai.createCompletion({
            model: "gpt-3.5-turbo",
            prompt: prompt,
            max_tokens: 500,
            temperature: 0.5,
        });

        const orcamento = response.data.choices[0].text.trim();
        res.json({ orcamento });
    } catch (error) {
        console.error("Erro ao gerar orçamento:", error);
        res.status(500).json({ error: "Erro ao gerar o orçamento. Tente novamente." });
    }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


