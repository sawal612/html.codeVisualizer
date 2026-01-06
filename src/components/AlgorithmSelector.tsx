import { Algorithm } from '../types';
import { ChevronDown } from 'lucide-react';

interface AlgorithmSelectorProps {
  algorithms: Algorithm[];
  selectedAlgorithm: Algorithm;
  onSelect: (algorithm: Algorithm) => void;
}

export default function AlgorithmSelector({
  algorithms,
  selectedAlgorithm,
  onSelect,
}: AlgorithmSelectorProps) {
  const categories = Array.from(new Set(algorithms.map((a) => a.category)));

  return (
    <div className="relative">
      <select
        value={selectedAlgorithm.id}
        onChange={(e) => {
          const algo = algorithms.find((a) => a.id === e.target.value);
          if (algo) onSelect(algo);
        }}
        className="appearance-none w-full px-4 py-2 pr-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        {categories.map((category) => (
          <optgroup key={category} label={category}>
            {algorithms
              .filter((a) => a.category === category)
              .map((algo) => (
                <option key={algo.id} value={algo.id}>
                  {algo.name}
                </option>
              ))}
          </optgroup>
        ))}
      </select>
      <ChevronDown
        size={20}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  );
}
