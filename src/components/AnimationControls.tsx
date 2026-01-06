import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface AnimationControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function AnimationControls({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  onSpeedChange,
}: AnimationControlsProps) {
  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Reset"
            >
              <RotateCcw size={20} />
            </button>

            <button
              onClick={onStepBackward}
              disabled={currentStep === 0}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Previous Step"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={isPlaying ? onPause : onPlay}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button
              onClick={onStepForward}
              disabled={currentStep === totalSteps - 1}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Next Step"
            >
              <SkipForward size={20} />
            </button>
          </div>

          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 whitespace-nowrap">
                Step {currentStep + 1} / {totalSteps}
              </span>
              <input
                type="range"
                min="0"
                max={totalSteps - 1}
                value={currentStep}
                onChange={(e) => {
                  const step = parseInt(e.target.value);
                  if (step > currentStep) {
                    for (let i = currentStep; i < step; i++) {
                      onStepForward();
                    }
                  } else {
                    for (let i = currentStep; i > step; i--) {
                      onStepBackward();
                    }
                  }
                }}
                className="flex-1"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Speed:</span>
            <select
              value={speed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={2000}>0.5x</option>
              <option value={1000}>1x</option>
              <option value={500}>2x</option>
              <option value={250}>4x</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
