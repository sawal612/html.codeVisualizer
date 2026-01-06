import { Algorithm, AnimationStep } from '../types';

interface PythonExecutionTrace {
  line: number;
  variables: Record<string, any>;
  operation: string;
}

export function parsePythonCode(code: string, currentAlgorithm?: Algorithm): Algorithm {
  const lines = code.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
  const steps: AnimationStep[] = [];
  
  // Check for data structure types first (more specific)
  const isLinkedList = code.includes('class Node') && code.includes('self.next');
  const isTree = code.includes('TreeNode') || (code.includes('self.left') && code.includes('self.right'));
  
  // Then check for algorithms
  const isBubbleSort = code.includes('bubble_sort') && code.includes('arr[j]') && code.includes('arr[j+1]');
  const isQuickSort = code.includes('quick_sort') || code.includes('partition');
  const isBinarySearch = code.includes('binary_search') && !isTree;
  const isLinearSearch = code.includes('linear_search') && !isLinkedList;

  // Extract array from code
  const arrayMatch = code.match(/arr\s*=\s*\[([^\]]+)\]/);
  let initialArray: number[] = [64, 34, 25, 12, 22, 11, 90];
  
  if (arrayMatch) {
    initialArray = arrayMatch[1].split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    console.log('Extracted array:', initialArray);
  } else {
    console.log('No array found in code, using default');
  }

  // Extract values array for linked list
  const valuesMatch = code.match(/values\s*=\s*\[([^\]]+)\]/);
  let linkedListValues: number[] = [10, 20, 30, 40];
  
  if (valuesMatch) {
    linkedListValues = valuesMatch[1].split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
  }

  // Extract tree_values array for tree
  const treeValuesMatch = code.match(/tree_values\s*=\s*\[([^\]]+)\]/);
  let treeValues: number[] = [50, 30, 70, 20, 40, 60, 80];
  
  if (treeValuesMatch) {
    treeValues = treeValuesMatch[1].split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
  }

  // Extract target from code (for search algorithms)
  const targetMatch = code.match(/target\s*=\s*(\d+)/);
  const target = targetMatch ? parseInt(targetMatch[1]) : 25;

  // Preserve original algorithm info if available
  const baseAlgorithm = currentAlgorithm || {
    id: 'custom-code',
    name: 'Custom Python Code',
    category: 'Custom Python Code',
    description: 'Visualizing your Python code',
    visualizerType: 'array' as const,
  };

  // Handle linked list
  if (isLinkedList && currentAlgorithm) {
    const listData = linkedListValues.map((value, index) => ({
      value,
      next: index < linkedListValues.length - 1 ? index + 1 : null,
    }));
    
    return {
      ...baseAlgorithm,
      code: code,
      initialData: listData,
      steps: generateLinkedListTraversalSteps(listData),
      visualizerType: 'linkedList',
    };
  }

  // Handle tree
  if (isTree && currentAlgorithm) {
    const treeData = generateTreeFromArray(treeValues);
    
    return {
      ...baseAlgorithm,
      code: code,
      initialData: treeData,
      steps: generateTreeTraversalSteps(treeData),
      visualizerType: 'tree',
    };
  }

  if (isBubbleSort) {
    const sortSteps = generateBubbleSortSteps(initialArray);
    return {
      ...baseAlgorithm,
      code: code,
      initialData: initialArray,
      steps: sortSteps,
      visualizerType: 'array',
    };
  } else if (isBinarySearch) {
    const sortedArray = [...initialArray].sort((a, b) => a - b);
    const searchSteps = generateBinarySearchSteps(sortedArray, target);
    return {
      ...baseAlgorithm,
      code: code,
      initialData: sortedArray,
      steps: searchSteps,
      visualizerType: 'array',
    };
  } else if (isLinearSearch) {
    const searchSteps = generateLinearSearchSteps(initialArray, target);
    return {
      ...baseAlgorithm,
      code: code,
      initialData: initialArray,
      steps: searchSteps,
      visualizerType: 'array',
    };
  } else {
    // For non-array algorithms or when array not found, return current algorithm
    if (currentAlgorithm && (!arrayMatch || currentAlgorithm.visualizerType !== 'array')) {
      return currentAlgorithm;
    }
    
    // Generic array visualization
    return {
      ...baseAlgorithm,
      code: code,
      initialData: initialArray,
      steps: generateGenericSteps(initialArray, code),
      visualizerType: 'array',
    };
  }
}

function generateBubbleSortSteps(arr: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const data = [...arr];
  let stepId = 0;

  steps.push({
    id: `step-${stepId++}`,
    description: 'Initial array from your code',
    data: [...data],
    highlights: [],
  });

  for (let i = 0; i < data.length - 1; i++) {
    for (let j = 0; j < data.length - i - 1; j++) {
      steps.push({
        id: `step-${stepId++}`,
        description: `Comparing arr[${j}]=${data[j]} and arr[${j + 1}]=${data[j + 1]}`,
        data: [...data],
        comparing: [j, j + 1],
        sorted: Array.from({ length: i }, (_, k) => data.length - 1 - k),
      });

      if (data[j] > data[j + 1]) {
        [data[j], data[j + 1]] = [data[j + 1], data[j]];
        steps.push({
          id: `step-${stepId++}`,
          description: `Swapped: arr[${j}]=${data[j]}, arr[${j + 1}]=${data[j + 1]}`,
          data: [...data],
          highlights: [j, j + 1],
          sorted: Array.from({ length: i }, (_, k) => data.length - 1 - k),
        });
      }
    }
  }

  steps.push({
    id: `step-${stepId++}`,
    description: 'Array sorted! Your code completed successfully.',
    data: [...data],
    sorted: Array.from({ length: data.length }, (_, i) => i),
  });

  return steps;
}

function generateBinarySearchSteps(arr: number[], target: number): AnimationStep[] {
  const steps: AnimationStep[] = [];
  let left = 0;
  let right = arr.length - 1;
  let stepId = 0;

  steps.push({
    id: `step-${stepId++}`,
    description: `Searching for ${target} in sorted array`,
    data: arr,
    highlights: [],
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      id: `step-${stepId++}`,
      description: `Checking middle element: arr[${mid}] = ${arr[mid]}`,
      data: arr,
      highlights: [mid],
      comparing: [left, right],
    });

    if (arr[mid] === target) {
      steps.push({
        id: `step-${stepId++}`,
        description: `Found ${target} at index ${mid}!`,
        data: arr,
        highlights: [mid],
        sorted: [mid],
      });
      break;
    } else if (arr[mid] < target) {
      left = mid + 1;
      steps.push({
        id: `step-${stepId++}`,
        description: `${arr[mid]} < ${target}, searching right half`,
        data: arr,
        comparing: [mid + 1, right],
      });
    } else {
      right = mid - 1;
      steps.push({
        id: `step-${stepId++}`,
        description: `${arr[mid]} > ${target}, searching left half`,
        data: arr,
        comparing: [left, mid - 1],
      });
    }
  }

  if (left > right) {
    steps.push({
      id: `step-${stepId++}`,
      description: `${target} not found in array`,
      data: arr,
      highlights: [],
    });
  }

  return steps;
}

function generateLinearSearchSteps(arr: number[], target: number): AnimationStep[] {
  const steps: AnimationStep[] = [];
  let stepId = 0;

  steps.push({
    id: `step-${stepId++}`,
    description: `Searching for ${target}`,
    data: arr,
    highlights: [],
  });

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      id: `step-${stepId++}`,
      description: `Checking arr[${i}] = ${arr[i]}`,
      data: arr,
      highlights: [i],
    });

    if (arr[i] === target) {
      steps.push({
        id: `step-${stepId++}`,
        description: `Found ${target} at index ${i}!`,
        data: arr,
        highlights: [i],
        sorted: [i],
      });
      break;
    }
  }

  if (!steps.some(s => s.description.includes('Found'))) {
    steps.push({
      id: `step-${stepId++}`,
      description: `${target} not found in array`,
      data: arr,
      highlights: [],
    });
  }

  return steps;
}

function generateGenericSteps(arr: number[], code: string): AnimationStep[] {
  const steps: AnimationStep[] = [];
  
  steps.push({
    id: 'step-0',
    description: 'Initial state of your array',
    data: arr,
    highlights: [],
  });

  // Simulate some basic steps based on code patterns
  const hasLoops = code.includes('for') || code.includes('while');
  
  if (hasLoops) {
    arr.forEach((_, index) => {
      steps.push({
        id: `step-${index + 1}`,
        description: `Processing element at index ${index}`,
        data: arr,
        highlights: [index],
      });
    });
  }

  steps.push({
    id: `step-final`,
    description: 'Code execution completed',
    data: arr,
    sorted: Array.from({ length: arr.length }, (_, i) => i),
  });

  return steps;
}
function generateTreeFromArray(values: number[]): any[] {
  if (!values || values.length === 0) return [];
  
  const tree: any[] = [];
  
  for (let i = 0; i < values.length; i++) {
    const leftIndex = 2 * i + 1;
    const rightIndex = 2 * i + 2;
    
    tree.push({
      value: values[i],
      left: leftIndex < values.length ? leftIndex : null,
      right: rightIndex < values.length ? rightIndex : null,
    });
  }
  
  return tree;
}

function generateLinkedListTraversalSteps(list: any[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  let stepId = 0;

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

function generateTreeTraversalSteps(tree: any[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  let stepId = 0;

  // Generate in-order traversal sequence
  const inorderTraversal: number[] = [];
  const traverse = (index: number) => {
    if (index >= tree.length) return;
    
    const node = tree[index];
    if (node.left !== null) traverse(node.left as number);
    inorderTraversal.push(index);
    if (node.right !== null) traverse(node.right as number);
  };
  traverse(0);

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