import { AnimationStep } from '../types';

interface TreeNode {
  value: number;
  left: number | null;
  right: number | null;
}

interface TreeVisualizerProps {
  step: AnimationStep;
}

export default function TreeVisualizer({ step }: TreeVisualizerProps) {
  const nodes = step.data as TreeNode[];

  const renderNode = (index: number | null, x: number, y: number, offset: number): JSX.Element | null => {
    if (index === null || index >= nodes.length) return null;

    const node = nodes[index];
    const isHighlighted = step.highlights?.includes(index);
    const isCurrent = step.currentIndex === index;

    let bgColor = 'bg-blue-500';
    if (isCurrent) bgColor = 'bg-purple-600';
    else if (isHighlighted) bgColor = 'bg-green-500';

    const leftX = x - offset;
    const leftY = y + 100;
    const rightX = x + offset;
    const rightY = y + 100;

    return (
      <g key={`node-${index}`}>
        {node.left !== null && (
          <line
            x1={x}
            y1={y}
            x2={leftX}
            y2={leftY}
            stroke="#9CA3AF"
            strokeWidth="2"
          />
        )}
        {node.right !== null && (
          <line
            x1={x}
            y1={y}
            x2={rightX}
            y2={rightY}
            stroke="#9CA3AF"
            strokeWidth="2"
          />
        )}

        <circle
          cx={x}
          cy={y}
          r="30"
          className={`${bgColor} transition-all duration-500`}
          fill="currentColor"
        />
        <text
          x={x}
          y={y + 6}
          textAnchor="middle"
          className="text-white font-bold text-lg"
          fill="white"
        >
          {node.value}
        </text>

        {node.left !== null && renderNode(node.left, leftX, leftY, offset / 2)}
        {node.right !== null && renderNode(node.right, rightX, rightY, offset / 2)}
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <svg width="800" height="500" className="mb-8">
        {renderNode(0, 400, 50, 150)}
      </svg>

      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>Visited</span>
        </div>
      </div>
    </div>
  );
}
