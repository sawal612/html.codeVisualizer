import { Algorithm, AnimationStep } from '../types';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';

export async function analyzeCodeWithGemini(
  code: string
): Promise<Algorithm> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return simulateGeminiAnalysis(code);
  }

  const prompt = `Analyze this Python code and provide a step-by-step execution trace that can be used to visualize the algorithm:

\`\`\`python
${code}
\`\`\`

Please respond in the following JSON format:
{
  "algorithmName": "Name of the algorithm",
  "algorithmType": "array" | "linkedList" | "tree" | "generic",
  "description": "Brief description of what the algorithm does",
  "initialData": [extracted initial values as array],
  "steps": [
    {
      "stepNumber": 1,
      "description": "What happens in this step",
      "highlights": [indices or values being highlighted],
      "operation": "What operation is being performed"
    }
  ],
  "explanation": "Overall explanation of the algorithm's behavior"
}

Extract actual values from the code (arrays, lists, etc). Generate realistic execution steps based on the algorithm logic. Focus on the most important operations that should be visualized.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Gemini API Error: ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();

    // Extract text from the response
    const responseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!responseText) {
      throw new Error('No response from Gemini API');
    }

    // Parse the JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse Gemini response as JSON');
    }

    const analysisResult = JSON.parse(jsonMatch[0]);

    // Convert Gemini analysis to Animation steps
    const steps = convertGeminiAnalysisToSteps(analysisResult);

    // Create the algorithm object
    const algorithm: Algorithm = {
      id: 'gemini-analysis',
      name: analysisResult.algorithmName || 'Custom Algorithm',
      category: 'AI-Analyzed Code',
      description:
        analysisResult.description || 'Algorithm analyzed by Gemini AI',
      code: code,
      initialData: analysisResult.initialData || [],
      steps: steps,
      visualizerType: (analysisResult.algorithmType as any) || 'array',
    };

    return algorithm;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to analyze code with Gemini API');
  }
}

function convertGeminiAnalysisToSteps(
  analysis: any
): AnimationStep[] {
  const steps: AnimationStep[] = [];

  // Add initial state
  steps.push({
    id: 'step-0',
    description: 'Initial state of the algorithm',
    data: analysis.initialData || [],
    highlights: [],
  });

  // Convert Gemini steps to AnimationSteps
  if (Array.isArray(analysis.steps)) {
    analysis.steps.forEach((step: any, index: number) => {
      steps.push({
        id: `step-${index + 1}`,
        description:
          step.description ||
          `Step ${index + 1}: ${step.operation || 'Operation'}`,
        data: step.data || analysis.initialData || [],
        highlights: step.highlights || [],
        comparing: step.comparing || [],
      });
    });
  }

  // Add final state
  steps.push({
    id: `step-final`,
    description:
      analysis.explanation ||
      'Algorithm completed successfully. Analysis provided by Gemini AI.',
    data: analysis.finalData || analysis.initialData || [],
    highlights: [],
  });

  return steps;
}

function simulateGeminiAnalysis(code: string): Promise<Algorithm> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const arrayMatch = code.match(/arr\s*=\s*\[([^\]]+)\]/);
      const targetMatch = code.match(/target\s*=\s*(\d+)/);
      const valuesMatch = code.match(/values\s*=\s*\[([^\]]+)\]/);
      const treeValuesMatch = code.match(/tree_values\s*=\s*\[([^\]]+)\]/);

      let algorithmName = 'Custom Algorithm';
      let algorithmType: 'array' | 'linkedList' | 'tree' | 'generic' = 'array';
      let initialData: any = [64, 34, 25, 12, 22, 11, 90];
      let steps: AnimationStep[] = [];

      const isBubbleSort = code.includes('bubble_sort');
      const isBinarySearch = code.includes('binary_search');
      const isLinearSearch = code.includes('linear_search');
      const isLinkedList = code.includes('class Node') && code.includes('self.next');
      const isTree = code.includes('TreeNode') || (code.includes('self.left') && code.includes('self.right'));

      if (arrayMatch) {
        initialData = arrayMatch[1].split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
      }

      if (isLinkedList) {
        algorithmName = 'Linked List Traversal';
        algorithmType = 'linkedList';

        if (valuesMatch) {
          const linkedListValues = valuesMatch[1].split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
          initialData = linkedListValues.map((value, index) => ({
            value,
            next: index < linkedListValues.length - 1 ? index + 1 : null,
          }));
        }

        steps = [
          {
            id: 'step-0',
            description: 'Starting at head node',
            data: initialData,
            currentIndex: 0,
            highlights: [],
          },
        ];

        initialData.forEach((node: any, i: number) => {
          steps.push({
            id: `step-${i + 1}`,
            description: `Visiting node with value ${node.value}`,
            data: initialData,
            currentIndex: i,
            highlights: Array.from({ length: i }, (_, j) => j),
          });
        });

        steps.push({
          id: 'step-final',
          description: 'Reached end of list',
          data: initialData,
          highlights: Array.from({ length: initialData.length }, (_, i) => i),
        });
      } else if (isTree) {
        algorithmName = 'Binary Tree Traversal';
        algorithmType = 'tree';

        if (treeValuesMatch) {
          const treeValues = treeValuesMatch[1].split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
          initialData = treeValues.map((value, i) => ({
            value,
            left: 2 * i + 1 < treeValues.length ? 2 * i + 1 : null,
            right: 2 * i + 2 < treeValues.length ? 2 * i + 2 : null,
          }));
        }

        const inorderTraversal: number[] = [];
        const traverse = (index: number) => {
          if (index >= initialData.length) return;
          const node = initialData[index];
          if (node.left !== null) traverse(node.left);
          inorderTraversal.push(index);
          if (node.right !== null) traverse(node.right);
        };
        traverse(0);

        steps = [
          {
            id: 'step-0',
            description: 'Starting in-order traversal (Left, Root, Right)',
            data: initialData,
            highlights: [],
          },
        ];

        inorderTraversal.forEach((index, i) => {
          steps.push({
            id: `step-${i + 1}`,
            description: `Visiting node with value ${initialData[index].value}`,
            data: initialData,
            currentIndex: index,
            highlights: inorderTraversal.slice(0, i),
          });
        });

        steps.push({
          id: 'step-final',
          description: 'In-order traversal complete',
          data: initialData,
          highlights: inorderTraversal,
        });
      } else if (isBubbleSort) {
        algorithmName = 'Bubble Sort';
        const sortData = [...initialData];

        steps = [
          {
            id: 'step-0',
            description: 'Initial array',
            data: [...sortData],
            highlights: [],
          },
        ];

        for (let i = 0; i < sortData.length - 1; i++) {
          for (let j = 0; j < sortData.length - i - 1; j++) {
            steps.push({
              id: `step-${steps.length}`,
              description: `Comparing ${sortData[j]} and ${sortData[j + 1]}`,
              data: [...sortData],
              comparing: [j, j + 1],
              sorted: Array.from({ length: i }, (_, k) => sortData.length - 1 - k),
            });

            if (sortData[j] > sortData[j + 1]) {
              [sortData[j], sortData[j + 1]] = [sortData[j + 1], sortData[j]];
              steps.push({
                id: `step-${steps.length}`,
                description: `Swapped ${sortData[j + 1]} and ${sortData[j]}`,
                data: [...sortData],
                highlights: [j, j + 1],
                sorted: Array.from({ length: i }, (_, k) => sortData.length - 1 - k),
              });
            }
          }
        }

        steps.push({
          id: 'step-final',
          description: 'Array sorted',
          data: sortData,
          sorted: Array.from({ length: sortData.length }, (_, i) => i),
        });
      } else if (isBinarySearch) {
        algorithmName = 'Binary Search';
        const target = targetMatch ? parseInt(targetMatch[1]) : initialData[Math.floor(initialData.length / 2)];
        const sortedData = [...initialData].sort((a, b) => a - b);

        steps = [
          {
            id: 'step-0',
            description: `Searching for ${target} in sorted array`,
            data: sortedData,
            highlights: [],
          },
        ];

        let left = 0;
        let right = sortedData.length - 1;
        let found = false;

        while (left <= right) {
          const mid = Math.floor((left + right) / 2);

          steps.push({
            id: `step-${steps.length}`,
            description: `Checking middle element: ${sortedData[mid]}`,
            data: sortedData,
            currentIndex: mid,
            highlights: [mid],
          });

          if (sortedData[mid] === target) {
            steps.push({
              id: `step-${steps.length}`,
              description: `Found ${target} at index ${mid}`,
              data: sortedData,
              highlights: [mid],
              sorted: [mid],
            });
            found = true;
            break;
          } else if (sortedData[mid] < target) {
            left = mid + 1;
            steps.push({
              id: `step-${steps.length}`,
              description: `${sortedData[mid]} < ${target}, searching right half`,
              data: sortedData,
              comparing: [mid + 1, right],
            });
          } else {
            right = mid - 1;
            steps.push({
              id: `step-${steps.length}`,
              description: `${sortedData[mid]} > ${target}, searching left half`,
              data: sortedData,
              comparing: [left, mid - 1],
            });
          }
        }

        if (!found) {
          steps.push({
            id: 'step-final',
            description: `${target} not found in array`,
            data: sortedData,
            highlights: [],
          });
        }
      } else if (isLinearSearch) {
        algorithmName = 'Linear Search';
        const target = targetMatch ? parseInt(targetMatch[1]) : initialData[Math.floor(initialData.length / 2)];

        steps = [
          {
            id: 'step-0',
            description: `Searching for ${target}`,
            data: initialData,
            highlights: [],
          },
        ];

        let found = false;
        for (let i = 0; i < initialData.length; i++) {
          steps.push({
            id: `step-${steps.length}`,
            description: `Checking index ${i}: ${initialData[i]}`,
            data: initialData,
            currentIndex: i,
            highlights: [i],
          });

          if (initialData[i] === target) {
            steps.push({
              id: `step-${steps.length}`,
              description: `Found ${target} at index ${i}`,
              data: initialData,
              highlights: [i],
              sorted: [i],
            });
            found = true;
            break;
          }
        }

        if (!found) {
          steps.push({
            id: 'step-final',
            description: `${target} not found`,
            data: initialData,
            highlights: [],
          });
        }
      } else {
        steps = [
          {
            id: 'step-0',
            description: 'Initial state',
            data: initialData,
            highlights: [],
          },
          {
            id: 'step-final',
            description: 'Code execution simulated',
            data: initialData,
            highlights: [],
          },
        ];
      }

      const algorithm: Algorithm = {
        id: 'gemini-simulated',
        name: algorithmName,
        category: 'AI-Analyzed Code',
        description: `Simulated analysis of ${algorithmName}`,
        code,
        initialData,
        steps,
        visualizerType: algorithmType,
      };

      resolve(algorithm);
    }, 500);
  });
}

export async function validateGeminiApiKey(apiKey: string): Promise<boolean> {
  if (!apiKey) {
    return false;
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: 'Test' }],
          },
        ],
      }),
    });

    return response.ok || response.status === 400;
  } catch (error) {
    return false;
  }
}
