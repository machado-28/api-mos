export default function generateRandomNumber() {
    // Math.random() gera um número aleatório entre 0 (inclusive) e 1 (exclusivo)
    // Multiplicando por 10000 para obter um número entre 0 e 9999
    // Usando Math.floor() para arredondar para baixo e obter um número inteiro
    // Adicionando 1000 para garantir que o número tenha sempre 4 dígitos
    return Math.floor(Math.random() * 9000) + 1000;
}

