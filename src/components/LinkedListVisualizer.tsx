import { AnimationStep } from '../types';
import { ArrowRight } from 'lucide-react';

interface LinkedListNode {
  value: number;
  next: number | null;
}

interface LinkedListVisualizerProps {
  step: AnimationStep;
}

export default function LinkedListVisualizer({ step }: LinkedListVisualizerProps) {
  const nodes = step.data as LinkedListNode[];

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="flex items-center gap-4 mb-8">
        {nodes.map((node, index) => {
          const isHighlighted = step.highlights?.includes(index);
          const isCurrent = step.currentIndex === index;

          let bgColor = 'bg-blue-500';
          if (isCurrent) bgColor = 'bg-purple-600';
          else if (isHighlighted) bgColor = 'bg-orange-500';

          return (
            <div key={index} className="flex items-center gap-4">
              <div
                className={`${bgColor} text-white p-6 rounded-lg transition-all duration-500 ease-in-out min-w-[100px] flex flex-col items-center shadow-lg`}
              >
                <div className="text-2xl font-bold mb-2">{node.value}</div>
                <div className="text-xs opacity-75">Index: {index}</div>
                {node.next !== null && (
                  <div className="text-xs mt-1">→ {node.next}</div>
                )}
              </div>

              {node.next !== null && (
                <ArrowRight size={32} className="text-gray-400" />
              )}

              {node.next === null && index < nodes.length - 1 && (
                <div className="text-gray-300">✗</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-600 rounded"></div>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span>Highlighted</span>
        </div>
      </div>
    </div>
  );
}
