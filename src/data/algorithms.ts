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

function generateLinkedListTraversalSteps(list?: any[]) {
  const steps = [];
  let stepId = 0;

  const linkedList = list || [
    { value: 10, next: 1 },
    { value: 20, next: 2 },
    { value: 30, next: 3 },
    { value: 40, next: null },
  ];

  steps.push({
    id: `step-${stepId++}`,
    description: 'Starting at head node',
    data: linkedList,
    currentIndex: 0,
    highlights: [],
  });

  for (let i = 0; i < linkedList.length; i++) {
    steps.push({
      id: `step-${stepId++}`,
      description: `Visiting node with value ${linkedList[i].value}`,
      data: linkedList,
      currentIndex: i,
      highlights: Array.from({ length: i }, (_, j) => j),
    });
  }

  steps.push({
    id: `step-${stepId++}`,
    description: 'Reached end of list',
    data: linkedList,
    highlights: Array.from({ length: linkedList.length }, (_, i) => i),
  });

  return steps;
}

function generateTreeTraversalSteps(tree?: any[]) {
  const steps = [];
  let stepId = 0;

  const binaryTree = tree || [
    { value: 50, left: 1, right: 2 },
    { value: 30, left: 3, right: 4 },
    { value: 70, left: 5, right: 6 },
    { value: 20, left: null, right: null },
    { value: 40, left: null, right: null },
    { value: 60, left: null, right: null },
    { value: 80, left: null, right: null },
  ];

  // Generate in-order traversal sequence
  const inorderTraversal: number[] = [];
  const traverse = (index: number) => {
    if (index >= binaryTree.length || binaryTree[index].left === null && binaryTree[index].right === null && index > 0) return;
    
    const node = binaryTree[index];
    if (node.left !== null) traverse(node.left as number);
    inorderTraversal.push(index);
    if (node.right !== null) traverse(node.right as number);
  };
  traverse(0);

  steps.push({
    id: `step-${stepId++}`,
    description: 'Starting in-order traversal (Left, Root, Right)',
    data: binaryTree,
    highlights: [],
  });

  for (const index of inorderTraversal) {
    steps.push({
      id: `step-${stepId++}`,
      description: `Visiting node with value ${binaryTree[index].value}`,
      data: binaryTree,
      currentIndex: index,
      highlights: inorderTraversal.slice(0, inorderTraversal.indexOf(index)),
    });
  }

  steps.push({
    id: `step-${stepId++}`,
    description: 'In-order traversal complete!',
    data: binaryTree,
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
    code: `# Bubble Sort
arr = [64, 34, 25, 12, 22, 11, 90]

def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

result = bubble_sort(arr)
print(result)`,
    initialData: [64, 34, 25, 12, 22, 11, 90],
    steps: generateBubbleSortSteps([64, 34, 25, 12, 22, 11, 90]),
    visualizerType: 'array',
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching',
    description: 'Efficiently finds target by repeatedly dividing search interval in half',
    code: `# Binary Search
arr = [11, 12, 22, 25, 34, 64, 90]
target = 25

def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

result = binary_search(arr, target)
print(f"Found at index: {result}")`,
    initialData: [11, 12, 22, 25, 34, 64, 90],
    steps: generateBinarySearchSteps([11, 12, 22, 25, 34, 64, 90], 25),
    visualizerType: 'array',
  },
  {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'Searching',
    description: 'Sequentially checks each element until target is found',
    code: `# Linear Search
arr = [64, 34, 25, 12, 22, 11, 90]
target = 22

def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

result = linear_search(arr, target)
print(f"Found at index: {result}")`,
    initialData: [64, 34, 25, 12, 22, 11, 90],
    steps: generateLinearSearchSteps([64, 34, 25, 12, 22, 11, 90], 22),
    visualizerType: 'array',
  },
  {
    id: 'linked-list-traversal',
    name: 'Linked List Traversal',
    category: 'Data Structures',
    description: 'Walk through each node in a linked list from head to tail',
    code: `# Linked List Traversal
# Edit the values array to change the linked list
values = [10, 20, 30, 40]

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

# Create linked list from values array
head = None
if values:
    head = Node(values[0])
    current = head
    for val in values[1:]:
        current.next = Node(val)
        current = current.next

def traverse_list(head):
    current = head
    while current is not None:
        print(current.value)
        current = current.next

traverse_list(head)`,
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
    code: `# Binary Tree In-Order Traversal
# Edit tree_values to change the tree structure
# Format: [root, left_subtree, right_subtree, ...]
tree_values = [50, 30, 70, 20, 40, 60, 80]

class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Create balanced binary tree from array
def create_tree(values, index=0):
    if index >= len(values) or values[index] is None:
        return None
    
    root = TreeNode(values[index])
    root.left = create_tree(values, 2 * index + 1)
    root.right = create_tree(values, 2 * index + 2)
    return root

root = create_tree(tree_values)

def inorder_traversal(root):
    if root is None:
        return
    
    inorder_traversal(root.left)
    print(root.value)
    inorder_traversal(root.right)

inorder_traversal(root)`,
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
