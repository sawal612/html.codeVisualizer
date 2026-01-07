import { Algorithm, AnimationStep } from '../types';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function analyzeCodeWithGemini(
  code: string,
  apiKey: string
): Promise<Algorithm> {
  if (!apiKey) {
    throw new Error('Gemini API key is required. Please enter your API key.');
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

    return response.ok || response.status === 400; // 400 means key exists but input is invalid
  } catch (error) {
    return false;
  }
}
