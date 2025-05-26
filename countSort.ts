// Função countingSort que recebe um array de números e o valor máximo esperado no array. 
// Retorna um objeto com o array ordenado e o tempo de execução. 
function countingSort(arr: number[], max: number): { sortedArray: number[], executionTime: 
number } { 
// Inicia a contagem de tempo de execução 
const start = performance.now(); 
// Cria um array de contagem (count) com tamanho max + 1 e inicializa todos os valores com 0 
let count = new Array(max + 1).fill(0); 
// Cria o array de saída (output) com o mesmo tamanho do array de entrada 
let output = new Array(arr.length);
// Conta a frequência de cada número presente no array original 
arr.forEach(num => count[num]++); 
// Acumula os valores no array de contagem, para que cada posição represente 
// a posição final de cada elemento no array ordenado 
for (let i = 1; i <= max; i++) { 
count[i] += count[i - 1]; 
} 
// Constrói o array de saída (ordenado) percorrendo o array original 
// do início ao fim (mantendo estabilidade) 
arr.forEach(num => { 
output[count[num] - 1] = num; // Posiciona o número na posição correta 
count[num]--;                 
// Decrementa o contador da posição 
}); 
// Finaliza a contagem de tempo de execução 
const end = performance.now(); 
// Retorna o array ordenado e o tempo de execução em milissegundos 
return { sortedArray: output, executionTime: end - start }; 
} 
// Gera um array de 1000 números aleatórios entre 1 e 2000 
const randomNumbers = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 2000) + 1); 
// Chama o algoritmo countingSort com o vetor gerado e o valor máximo 2000 
const result = countingSort(randomNumbers, 2000); 
// Exibe no console o array ordenado 
console.log("Sorted Array:", result.sortedArray); 
// Exibe o tempo de execução do algoritmo com 4 casas decimais 
console.log(`Tempo de execução da função countingSort: ${result.executionTime.toFixed(4)} ms`);