import { Algorithm } from '../types';

function generateBubbleSortSteps(arr: number[]) {
  const steps = [];
  const data = [...arr];
  let stepId = 0;

  steps.push({
    id: `step-${stepId++}`,
    description: 'Initial array',
    data: [...data],
    highlights: [],
  });

  for (let i = 0; i < data.length - 1; i++) {
    for (let j = 0; j < data.length - i - 1; j++) {
      steps.push({
        id: `step-${stepId++}`,
        description: `Comparing ${data[j]} and ${data[j + 1]}`,
        data: [...data],
        comparing: [j, j + 1],
        sorted: Array.from({ length: i }, (_, k) => data.length - 1 - k),
      });

      if (data[j] > data[j + 1]) {
        [data[j], data[j + 1]] = [data[j + 1], data[j]];
        steps.push({
          id: `step-${stepId++}`,
          description: `Swapped ${data[j + 1]} and ${data[j]}`,
          data: [...data],
          highlights: [j, j + 1],
          sorted: Array.from({ length: i }, (_, k) => data.length - 1 - k),
        });
      }
    }
  }

  steps.push({
    id: `step-${stepId++}`,
    description: 'Array sorted!',
    data: [...data],
    sorted: Array.from({ length: data.length }, (_, i) => i),
  });

  return steps;
}

function generateBinarySearchSteps(arr: number[], target: number) {
  const steps = [];
  let left = 0;
  let right = arr.length - 1;
  let stepId = 0;

  steps.push({
    id: `step-${stepId++}`,
    description: `Searching for ${target} in sorted array`,
    data: [...arr],
    highlights: [],
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      id: `step-${stepId++}`,
      description: `Checking middle element at index ${mid}: ${arr[mid]}`,
      data: [...arr],
      currentIndex: mid,
      highlights: [mid],
    });

    if (arr[mid] === target) {
      steps.push({
        id: `step-${stepId++}`,
        description: `Found ${target} at index ${mid}!`,
        data: [...arr],
        highlights: [mid],
      });
      return steps;
    }

    if (arr[mid] < target) {
      steps.push({
        id: `step-${stepId++}`,
        description: `${arr[mid]} < ${target}, search right half`,
        data: [...arr],
        highlights: Array.from({ length: right - mid }, (_, i) => mid + 1 + i),
      });
      left = mid + 1;
    } else {
      steps.push({
        id: `step-${stepId++}`,
        description: `${arr[mid]} > ${target}, search left half`,
        data: [...arr],
        highlights: Array.from({ length: mid - left }, (_, i) => left + i),
      });
      right = mid - 1;
    }
  }

  steps.push({
    id: `step-${stepId++}`,
    description: `${target} not found in array`,
    data: [...arr],
    highlights: [],
  });

  return steps;
}

function generateLinearSearchSteps(arr: number[], target: number) {
  const steps = [];
  let stepId = 0;

  steps.push({
    id: `step-${stepId++}`,
    description: `Searching for ${target}`,
    data: [...arr],
    highlights: [],
  });

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      id: `step-${stepId++}`,
      description: `Checking index ${i}: ${arr[i]}`,
      data: [...arr],
      currentIndex: i,
      highlights: [i],
    });

    if (arr[i] === target) {
      steps.push({
        id: `step-${stepId++}`,
        description: `Found ${target} at index ${i}!`,
        data: [...arr],
        highlights: [i],
      });
      return steps;
    }
  }

  steps.push({
    id: `step-${stepId++}`,
    description: `${target} not found`,
    data: [...arr],
    highlights: [],
  });

  return steps;
}

function generateLinkedListTraversalSteps() {
  const steps = [];
  let stepId = 0;

  const list = [
    { value: 10, next: 1 },
    { value: 20, next: 2 },
    { value: 30, next: 3 },
    { value: 40, next: null },
  ];

  steps.push({
    id: `step-${stepId++}`,
    description: 'Starting at head node',
    data: list,
    currentIndex: 0,
    highlights: [],
  });

  for (let i = 0; i < list.length; i++) {
    steps.push({
      id: `step-${stepId++}`,
      description: `Visiting node with value ${list[i].value}`,
      data: list,
      currentIndex: i,
      highlights: Array.from({ length: i }, (_, j) => j),
    });
  }

  steps.push({
    id: `step-${stepId++}`,
    description: 'Reached end of list',
    data: list,
    highlights: Array.from({ length: list.length }, (_, i) => i),
  });

  return steps;
}

function generateTreeTraversalSteps() {
  const steps = [];
  let stepId = 0;

  const tree = [
    { value: 50, left: 1, right: 2 },
    { value: 30, left: 3, right: 4 },
    { value: 70, left: 5, right: 6 },
    { value: 20, left: null, right: null },
    { value: 40, left: null, right: null },
    { value: 60, left: null, right: null },
    { value: 80, left: null, right: null },
  ];

  const inorderTraversal = [3, 1, 4, 0, 5, 2, 6];

  steps.push({
    id: `step-${stepId++}`,
    description: 'Starting in-order traversal (Left, Root, Right)',
    data: tree,
    highlights: [],
  });

  for (const index of inorderTraversal) {
    steps.push({
      id: `step-${stepId++}`,
      description: `Visiting node with value ${tree[index].value}`,
      data: tree,
      currentIndex: index,
      highlights: inorderTraversal.slice(0, inorderTraversal.indexOf(index)),
    });
  }

  steps.push({
    id: `step-${stepId++}`,
    description: 'In-order traversal complete!',
    data: tree,
    highlights: inorderTraversal,
  });

  return steps;
}

export const algorithms: Algorithm[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    description: 'Repeatedly swaps adjacent elements if they are in wrong order',
    code: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    initialData: [64, 34, 25, 12, 22, 11, 90],
    steps: generateBubbleSortSteps([64, 34, 25, 12, 22, 11, 90]),
    visualizerType: 'array',
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching',
    description: 'Efficiently finds target by repeatedly dividing search interval in half',
    code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}`,
    initialData: [11, 12, 22, 25, 34, 64, 90],
    steps: generateBinarySearchSteps([11, 12, 22, 25, 34, 64, 90], 25),
    visualizerType: 'array',
  },
  {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'Searching',
    description: 'Sequentially checks each element until target is found',
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    initialData: [64, 34, 25, 12, 22, 11, 90],
    steps: generateLinearSearchSteps([64, 34, 25, 12, 22, 11, 90], 22),
    visualizerType: 'array',
  },
  {
    id: 'linked-list-traversal',
    name: 'Linked List Traversal',
    category: 'Data Structures',
    description: 'Walk through each node in a linked list from head to tail',
    code: `function traverseLinkedList(head) {
  let current = head;

  while (current !== null) {
    console.log(current.value);
    current = current.next;
  }
}`,
    initialData: [
      { value: 10, next: 1 },
      { value: 20, next: 2 },
      { value: 30, next: 3 },
      { value: 40, next: null },
    ],
    steps: generateLinkedListTraversalSteps(),
    visualizerType: 'linkedList',
  },
  {
    id: 'tree-traversal',
    name: 'Binary Tree In-Order Traversal',
    category: 'Data Structures',
    description: 'Visit nodes in Left-Root-Right order',
    code: `function inorderTraversal(root) {
  if (root === null) return;

  inorderTraversal(root.left);
  console.log(root.value);
  inorderTraversal(root.right);
}`,
    initialData: [
      { value: 50, left: 1, right: 2 },
      { value: 30, left: 3, right: 4 },
      { value: 70, left: 5, right: 6 },
      { value: 20, left: null, right: null },
      { value: 40, left: null, right: null },
      { value: 60, left: null, right: null },
      { value: 80, left: null, right: null },
    ],
    steps: generateTreeTraversalSteps(),
    visualizerType: 'tree',
  },
];
