// Função que implementa o algoritmo Cycle Sort
function cycleSort(arr: number[]): number[] {
    // Itera do início até o penúltimo elemento
    for (let start = 0; start < arr.length - 1; start++) {
        let item = arr[start]; // Item atual que queremos colocar na posição correta
        let pos = start;       // Posição correta do item

        // Conta quantos elementos são menores que o item atual
        for (let i = start + 1; i < arr.length; i++) {
            if (arr[i] < item) {
                pos++;
            }
        }

        // Se o item já estiver na posição correta, pula para o próximo
        if (pos === start) continue;

        // Pula valores duplicados
        while (item === arr[pos]) {
            pos++;
        }

        // Troca o item com o valor que está na sua posição correta
        [arr[pos], item] = [item, arr[pos]];

        // Continua movendo o item até que ele volte à sua posição original
        while (pos !== start) {
            pos = start;

            // Acha a nova posição correta para o item
            for (let i = start + 1; i < arr.length; i++) {
                if (arr[i] < item) {
                    pos++;
                }
            }

            // Pula valores duplicados novamente
            while (item === arr[pos]) {
                pos++;
            }

            // Troca novamente
            [arr[pos], item] = [item, arr[pos]];
        }
    }

    // Retorna o array ordenado
    return arr;
}

// Gera um array aleatório com tamanho, mínimo e máximo definidos
function generateRandomArray(size: number, min: number, max: number): number[] {
    return Array.from({ length: size }, () =>
        Math.floor(Math.random() * (max - min + 1)) + min
    );
}

// Mede o tempo que o Cycle Sort leva para ordenar um array
function measureCycleSort() {
    const randomArray = generateRandomArray(1000, 1, 2000); // Cria um array aleatório
    const startTime = performance.now(); // Marca o tempo inicial
    cycleSort(randomArray);              // Executa o algoritmo de ordenação
    const endTime = performance.now();   // Marca o tempo final
    console.log(`Cycle Sort: ${endTime - startTime} ms`); // Exibe o tempo gasto
}

// Chama a função de medição
measureCycleSort();
