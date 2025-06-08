export
// Essa função serve para colocar os números em ordem (do menor para o maior)
function oddEvenSort(arr: number[]): number[] {
    let sorted = false; // Começamos dizendo que a lista ainda não está ordenada

    // Vamos repetir o processo até ter certeza de que tudo está na ordem certa
    while (!sorted) {
        sorted = true; // Supondo que esteja tudo certo...

        // Primeiro olhamos os pares de números começando da posição 1 (índice ímpar)
        for (let i = 1; i < arr.length - 1; i += 2) {
            // Se o número atual for maior que o próximo, trocamos eles de lugar
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                sorted = false; // Se fizemos alguma troca, ainda não está tudo certo
            }
        }

        // Agora olhamos os pares começando da posição 0 (índice par)
        for (let i = 0; i < arr.length - 1; i += 2) {
            // De novo, se o número atual for maior que o próximo, trocamos eles
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                sorted = false; // Ainda precisamos verificar mais
            }
        }
    }

    // Quando tudo estiver no lugar certo, devolvemos a lista ordenada
    return arr;
}

// Essa função cria uma lista de números aleatórios
function generateRandomArray(size: number, min: number, max: number): number[] {
    // Cria uma lista com a quantidade de números que quisermos (size)
    // Cada número será escolhido aleatoriamente entre "min" e "max"
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Essa função mede quanto tempo o computador leva para ordenar a lista
function measureOddEvenSort() {
    // Cria uma lista com 1000 números aleatórios entre 1 e 2000
    const randomArray = generateRandomArray(1000, 1, 2000);

    // Marca o tempo que começamos a ordenar
    const startTime = performance.now();

    // Ordena a lista
    oddEvenSort(randomArray);

    // Marca o tempo que terminamos de ordenar
    const endTime = performance.now();

    // Mostra na tela quanto tempo levou
    console.log(`Odd-Even Sort: ${endTime - startTime} ms`);
}

// Aqui é onde tudo começa: chamamos a função para ver quanto tempo leva para ordenar
measureOddEvenSort();
