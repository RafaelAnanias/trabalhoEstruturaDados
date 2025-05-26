// Retorna o maior valor do array 
function getMax(arr: number[]): number {
    return Math.max(...arr);
}

// Função de ordenação Counting Sort adaptada para ser usada no Radix Sort 
function countingSortForRadix(arr: number[], exp: number): number[] {
    let output: number[] = new Array(arr.length); // Array de saída 
    let count: number[] = new Array(10).fill(0);

    // Conta as ocorrências de cada dígito no lugar 'exp' 
    for (let num of arr) {
        count[Math.floor(num / exp) % 10]++;
    }

    // Acumula as contagens 
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Constrói o array de saída de trás para frente para manter a estabilidade 
    for (let i = arr.length - 1; i >= 0; i--) {
        const index = Math.floor(arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        count[index]--;
    }

    return output;
}

// Função principal do Radix Sort 
function radixSort(arr: number[]): number[] {
    let max = getMax(arr); // Encontra o maior número para saber o número de dígitos 
    let exp = 1;
    while (Math.floor(max / exp) > 0) {
        arr = countingSortForRadix(arr, exp);
        exp *= 10;
    }
    return arr;
}

// Função que gera um vetor aleatório de tamanho `size` com valores entre `min` e `max` 
function generateRandomArray(size: number, min: number, max: number): number[] {
    return Array.from({ length: size }, () =>
        Math.floor(Math.random() * (max - min + 1)) + min
    );
}

// Gera um array de 1000 números aleatórios entre 1 e 2000 
let arr = generateRandomArray(1000, 1, 2000);

// Mede o tempo de execução do Radix Sort 
let startTime = performance.now();
let sortedArr = radixSort(arr);
let endTime = performance.now();

// Exibe o tempo de execução e o vetor ordenado 
console.log(`Tempo de execução: ${(endTime - startTime).toFixed(4)} ms`);
console.log("Array ordenado:", sortedArr);
