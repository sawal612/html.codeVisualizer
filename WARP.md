# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
Interactive algorithm and data structure visualizer built with React + TypeScript + Vite. Users can edit Python code in a built-in editor and see step-by-step visualizations of sorting algorithms, search algorithms, linked lists, and binary trees.

## Development Commands

### Build and Run
- `npm run dev` - Start Vite dev server (default port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Code Quality
- `npm run lint` - Run ESLint on all files
- `npm run typecheck` - Run TypeScript type checking without emitting files

### Installation
- `npm install` - Install dependencies (required after clone)

## Architecture

### Core Flow
1. **App.tsx** - Main orchestrator managing algorithm state, animation playback, and step navigation
2. **PythonEditor** - Code editor with syntax highlighting where users modify algorithm code
3. **pythonParser.ts** - Parses user's Python code, extracts data arrays/values, detects algorithm type, and generates animation steps
4. **algorithms.ts** - Defines default algorithms and their step generation functions
5. **Visualizers** - Render current animation step based on data structure type

### Data Flow
User edits Python code → `parsePythonCode()` extracts arrays/values → Detects algorithm type (bubble sort, binary search, etc.) → Generates `AnimationStep[]` → App controls playback → Appropriate visualizer renders current step

### Key Type Definitions (types/index.ts)
- **AnimationStep** - Single frame of visualization containing data, description, and optional highlights/comparisons
- **Algorithm** - Complete algorithm definition with code, initial data, all steps, and visualizer type
- **visualizerType** - Determines which component renders: 'array', 'linkedList', or 'tree'

### Python Parser Behavior
The parser (`pythonParser.ts`) uses regex to:
- Extract `arr = [...]` for array-based algorithms
- Extract `values = [...]` for linked lists
- Extract `tree_values = [...]` for trees
- Extract `target = N` for search algorithms
- Detect algorithm type by checking for function names and patterns in code

When adding new algorithms, ensure the parser can detect relevant patterns and variables.

### Component Structure
- **src/components/** - All React components (visualizers, controls, editor, selector)
- **ArrayVisualizer** - Renders bars with colors indicating state (comparing, swapped, sorted, current)
- **LinkedListVisualizer** - Shows nodes with arrows
- **TreeVisualizer** - Displays binary tree structure
- **AnimationControls** - Play/pause, step forward/backward, speed control, progress bar
- **PythonEditor** - Textarea overlay on syntax-highlighted background for seamless editing

### Styling
- TailwindCSS for all styling (no CSS modules)
- Color scheme: blue (default), yellow (comparing), orange (swapped/highlighted), purple (current), green (sorted)
- Responsive layout: 2/3 visualizer + controls, 1/3 editor

## Special Considerations

### Adding New Algorithms
1. Create step generation function in `algorithms.ts` or `pythonParser.ts`
2. Add detection logic in `parsePythonCode()` if users should be able to modify it
3. Add to `algorithms` array export with proper `visualizerType`
4. Ensure AnimationStep objects include appropriate highlights/comparisons for visual feedback

### Python Code Parsing Limitations
- Parser uses pattern matching, not true Python AST parsing
- Only supports specific algorithm patterns (bubble sort, binary/linear search, list/tree traversal)
- Users must follow expected variable naming conventions (`arr`, `values`, `tree_values`, `target`)

### Animation Step Requirements
Each step must have: `id` (unique), `description` (user-facing text), `data` (current state), and optional `highlights`, `comparing`, `sorted`, `currentIndex` arrays to control visualization colors

### Vite Configuration
- `lucide-react` excluded from optimization (`optimizeDeps.exclude`) to avoid dependency issues
- Standard React plugin setup
