const express = require('express');
const { ActivityLog, User } = require('./models'); // Ajuste o caminho conforme necessário
const Usuarios = require('../models/Usuarios');

const app = express();

// Middleware para registrar atividades
app.use(async (req, res, next) => {
    const userId = req.userId; // Supondo que você já tenha um middleware que define req.userId
    const action = `${req.method} ${req.originalUrl}`;
    const location = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const device = req.headers['user-agent'];

    try {
        // Verificar se o usuário existe
        if (userId) {
            const user = await Usuarios.findByPk(userId);
            if (user) {
                // Criar o registro de atividade
                await ActivityLog.create({
                    user_id: userId,
                    action,
                    location,
                    device,
                    timestamp: new Date()
                });
            }
        }
    } catch (error) {
        console.error('Erro ao registrar atividade:', error.message);
    }

    // Passar para o próximo middleware ou rota
    next();
});

