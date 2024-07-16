module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: 'current'
            }
        }]
    ],
    env: {
        production: {
            presets: [
                ['@babel/preset-env', {
                    targets: {
                        node: '10' // ou a versão desejada do Node.js para produção
                    }
                }]
            ]
        }
    }
};
