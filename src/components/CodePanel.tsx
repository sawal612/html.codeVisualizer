import { Algorithm } from '../types';
import { Code2 } from 'lucide-react';

interface CodePanelProps {
  algorithm: Algorithm;
}

export default function CodePanel({ algorithm }: CodePanelProps) {
  return (
    <div className="h-full bg-gray-900 text-gray-100 p-6 overflow-auto">
      <div className="flex items-center gap-2 mb-4">
        <Code2 size={20} className="text-blue-400" />
        <h3 className="text-lg font-semibold">{algorithm.name}</h3>
      </div>

      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-blue-900 text-blue-200 text-xs rounded-full mb-2">
          {algorithm.category}
        </span>
        <p className="text-sm text-gray-400">{algorithm.description}</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <pre className="text-sm font-mono overflow-x-auto">
          <code>{algorithm.code}</code>
        </pre>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-2 text-gray-400">Complexity</h4>
        <div className="space-y-1 text-sm">
          {algorithm.category === 'Sorting' && algorithm.id === 'bubble-sort' && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-400">Time (Average):</span>
                <span className="font-mono text-orange-400">O(n²)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Space:</span>
                <span className="font-mono text-green-400">O(1)</span>
              </div>
            </>
          )}
          {algorithm.id === 'binary-search' && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-400">Time:</span>
                <span className="font-mono text-green-400">O(log n)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Space:</span>
                <span className="font-mono text-green-400">O(1)</span>
              </div>
            </>
          )}
          {algorithm.id === 'linear-search' && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-400">Time:</span>
                <span className="font-mono text-orange-400">O(n)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Space:</span>
                <span className="font-mono text-green-400">O(1)</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
