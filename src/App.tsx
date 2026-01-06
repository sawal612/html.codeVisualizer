import { useState, useEffect } from 'react';
import { algorithms } from './data/algorithms';
import { Algorithm } from './types';
import ArrayVisualizer from './components/ArrayVisualizer';
import LinkedListVisualizer from './components/LinkedListVisualizer';
import TreeVisualizer from './components/TreeVisualizer';
import AnimationControls from './components/AnimationControls';
import CodePanel from './components/CodePanel';
import AlgorithmSelector from './components/AlgorithmSelector';
import { Sparkles } from 'lucide-react';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(algorithms[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  useEffect(() => {
    let interval: number;

    if (isPlaying && currentStepIndex < selectedAlgorithm.steps.length - 1) {
      interval = window.setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= selectedAlgorithm.steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStepIndex, selectedAlgorithm.steps.length, speed]);

  const handleAlgorithmChange = (algo: Algorithm) => {
    setSelectedAlgorithm(algo);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStepIndex < selectedAlgorithm.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const currentStep = selectedAlgorithm.steps[currentStepIndex];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Code Visualizer</h1>
                <p className="text-sm text-gray-500">Interactive Algorithm & Data Structure Animations</p>
              </div>
            </div>

            <div className="w-80">
              <AlgorithmSelector
                algorithms={algorithms}
                selectedAlgorithm={selectedAlgorithm}
                onSelect={handleAlgorithmChange}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-2/3 flex flex-col">
          <div className="flex-1 bg-white border-r border-gray-200 overflow-auto">
            <div className="h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                {selectedAlgorithm.visualizerType === 'linkedList' ? (
                  <LinkedListVisualizer step={currentStep} />
                ) : selectedAlgorithm.visualizerType === 'tree' ? (
                  <TreeVisualizer step={currentStep} />
                ) : (
                  <ArrayVisualizer step={currentStep} />
                )}
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-t border-blue-200">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">Current Step</h3>
                  <p className="text-lg text-gray-800">{currentStep.description}</p>
                </div>
              </div>
            </div>
          </div>

          <AnimationControls
            isPlaying={isPlaying}
            currentStep={currentStepIndex}
            totalSteps={selectedAlgorithm.steps.length}
            speed={speed}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onStepForward={handleStepForward}
            onStepBackward={handleStepBackward}
            onReset={handleReset}
            onSpeedChange={setSpeed}
          />
        </div>

        <div className="w-1/3">
          <CodePanel algorithm={selectedAlgorithm} />
        </div>
      </div>
    </div>
  );
}

export default App;
