import { AnimationStep } from '../types';

interface ArrayVisualizerProps {
  step: AnimationStep;
}

export default function ArrayVisualizer({ step }: ArrayVisualizerProps) {
  const data = step.data as number[];
  const maxValue = Math.max(...data);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="flex items-end gap-2 mb-8">
        {data.map((value, index) => {
          const isHighlighted = step.highlights?.includes(index);
          const isComparing = step.comparing?.includes(index);
          const isSorted = step.sorted?.includes(index);
          const isCurrent = step.currentIndex === index;

          let bgColor = 'bg-blue-500';
          if (isSorted) bgColor = 'bg-green-500';
          else if (isCurrent) bgColor = 'bg-purple-600';
          else if (isComparing) bgColor = 'bg-yellow-500';
          else if (isHighlighted) bgColor = 'bg-orange-500';

          const height = (value / maxValue) * 300;

          return (
            <div
              key={index}
              className="flex flex-col items-center gap-2 transition-all duration-500 ease-in-out"
            >
              <div
                className={`${bgColor} rounded-t-lg transition-all duration-500 ease-in-out flex items-end justify-center text-white font-bold text-sm px-4 min-w-[60px]`}
                style={{ height: `${height}px` }}
              >
                <span className="mb-2">{value}</span>
              </div>
              <span className="text-sm font-mono text-gray-600">[{index}]</span>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Default</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span>Swapped</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-600 rounded"></div>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Sorted</span>
        </div>
      </div>
    </div>
  );
}
