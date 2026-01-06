export interface AnimationStep {
  id: string;
  description: string;
  data: any;
  highlights?: number[];
  comparing?: number[];
  sorted?: number[];
  currentIndex?: number;
}

export interface Algorithm {
  id: string;
  name: string;
  category: string;
  description: string;
  code: string;
  initialData: any;
  steps: AnimationStep[];
  visualizerType?: 'array' | 'linkedList' | 'tree';
}

export type DataStructureType = 'array' | 'linkedList' | 'tree' | 'graph' | 'stack' | 'queue';
