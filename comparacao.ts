export
//Teste de comparação dos algoritmos Odd-Even Sort, CycleSort, ShellSort e QuickSort todos com ordem ordenada de dados.

function oddEvenSort(arr: number[]): void {
  let sorted = false;
  const n = arr.length;
  while (!sorted) {
    sorted = true;
    // Odd index pass
    for (let i = 1; i <= n - 2; i += 2) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
      }
    }
    // Even index pass
    for (let i = 0; i <= n - 2; i += 2) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
      }
    }
  }
}

function cycleSort(arr: number[]): void {
  const n = arr.length;
  for (let cycleStart = 0; cycleStart <= n - 2; cycleStart++) {
    let item = arr[cycleStart];
    let pos = cycleStart;
    for (let i = cycleStart + 1; i < n; i++) {
      if (arr[i] < item) {
        pos++;
      }
    }
    if (pos === cycleStart) continue;
    while (item === arr[pos]) pos++;
    if (pos !== cycleStart) {
      [arr[pos], item] = [item, arr[pos]];
    }
    while (pos !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < n; i++) {
        if (arr[i] < item) pos++;
      }
      while (item === arr[pos]) pos++;
      if (item !== arr[pos]) {
        [arr[pos], item] = [item, arr[pos]];
      }
    }
  }
}

function shellSort(arr: number[]): void {
  const n = arr.length;
  let gap = Math.floor(n / 2);
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }
}

function quickSort(arr: number[], left = 0, right = arr.length - 1): void {
  if (left >= right) return;
  
  const pivotIndex = Math.floor((left + right) / 2);
  const pivot = arr[pivotIndex];
  
  let i = left;
  let j = right;
  
  while (i <= j) {
    while (arr[i] < pivot) i++;
    while (arr[j] > pivot) j--;
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  
  if (left < j) quickSort(arr, left, j);
  if (i < right) quickSort(arr, i, right);
}

// Função auxiliar para medir tempo de execução
function measureTime(fn: (arr: number[]) => void, arr: number[]): number {
  const copy = [...arr]; // para não modificar o array original
  const start = performance.now();
  fn(copy);
  const end = performance.now();
  return end - start;
}

// Teste com array já ordenado
const n = 100 ;
const sortedArray = Array.from({ length: n }, (_, i) => i);

// Medir tempos
console.log("Tempo Odd-Even Sort:", measureTime(oddEvenSort, sortedArray), "ms");
console.log("Tempo Cycle Sort:", measureTime(cycleSort, sortedArray), "ms");
console.log("Tempo Shell Sort:", measureTime(shellSort, sortedArray), "ms");
console.log("Tempo Quick Sort:", measureTime(quickSort, sortedArray), "ms");
