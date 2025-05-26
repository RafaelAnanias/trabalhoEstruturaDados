export

// COUNTING SORT
function countingSort(arr: number[], max: number): { sortedArray: number[], executionTime: number } {
    const start = performance.now();

    let count = new Array(max + 1).fill(0);
    let output = new Array(arr.length);

    arr.forEach(num => count[num]++);
    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    const end = performance.now();
    return { sortedArray: output, executionTime: end - start };
}

// RADIX SORT
function getMax(arr: number[]): number {
    return Math.max(...arr);
}

function countingSortForRadix(arr: number[], exp: number): number[] {
    let output = new Array(arr.length);
    let count = new Array(10).fill(0);

    for (let num of arr) {
        count[Math.floor(num / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        const index = Math.floor(arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        count[index]--;
    }

    return output;
}

function radixSort(arr: number[]): { sortedArray: number[], executionTime: number } {
    const start = performance.now();

    let max = getMax(arr);
    let exp = 1;

    while (Math.floor(max / exp) > 0) {
        arr = countingSortForRadix(arr, exp);
        exp *= 10;
    }

    const end = performance.now();
    return { sortedArray: arr, executionTime: end - start };
}

// JS SORT
function jsSort(arr: number[]): { sortedArray: number[], executionTime: number } {
    const start = performance.now();
    const sorted = [...arr].sort((a, b) => a - b);
    const end = performance.now();
    return { sortedArray: sorted, executionTime: end - start };
}

// SHELL SORT
function shellSort(arr: number[]): { sortedArray: number[], executionTime: number } {
    const start = performance.now();
    const n = arr.length;
    const array = [...arr];

    let gap = Math.floor(n / 2);
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = array[i];
            let j = i;
            while (j >= gap && array[j - gap] > temp) {
                array[j] = array[j - gap];
                j -= gap;
            }
            array[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }

    const end = performance.now();
    return { sortedArray: array, executionTime: end - start };
}

// GERA ARRAY ALEATÓRIO
function generateRandomArray(size: number, min: number, max: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// ---------- TESTE ----------

const size = 10000;
const min = 1;
const max = 2000;
const arr = generateRandomArray(size, min, max);

// Execução de todos os algoritmos
const countingResult = countingSort([...arr], max);
const radixResult = radixSort([...arr]);
const jsSortResult = jsSort([...arr]);
const shellResult = shellSort([...arr]);

// ---------- RESULTADOS ----------

console.log(`\nTAMANHO DO ARRAY: ${size}`);
console.log(`Counting Sort: ${countingResult.executionTime.toFixed(4)} ms`);
console.log(`Radix Sort: ${radixResult.executionTime.toFixed(4)} ms`);
console.log(`JS Sort (QuickSort): ${jsSortResult.executionTime.toFixed(4)} ms`);
console.log(`Shell Sort: ${shellResult.executionTime.toFixed(4)} ms`);
