# 🎨 Code Visualizer

An interactive web application for visualizing algorithms and data structures with step-by-step animations.  Built with React, TypeScript, and Tailwind CSS.

![Code Visualizer](https://bolt.new/static/og_default.png)

## ✨ Features

- 🎬 **Interactive Animations**: Step through algorithm execution with visual feedback
- 📊 **Multiple Data Structures**: Support for arrays, linked lists, and trees
- 🎮 **Playback Controls**: Play, pause, step forward/backward through animations
- ⚡ **Adjustable Speed**: Control animation speed to match your learning pace
- 🐍 **Python Editor**: Write and execute custom Python code to visualize your own algorithms
- 🎯 **Built-in Algorithms**: Pre-loaded with popular algorithms ready to visualize
- 🎨 **Modern UI**: Clean, responsive interface with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sawal612/html.codeVisualizer.git
cd html.codeVisualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the local development URL (typically `http://localhost:5173`)

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 🏗️ Project Structure

```
html.codeVisualizer/
├── src/
│   ├── components/        # React components
│   │   ├── ArrayVisualizer.tsx
│   │   ├── LinkedListVisualizer.tsx
│   │   ├── TreeVisualizer.tsx
│   │   ├── AnimationControls.tsx
│   │   ├── CodePanel.tsx
│   │   ├── AlgorithmSelector.tsx
│   │   └── PythonEditor.tsx
│   ├── data/              # Algorithm data and definitions
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   │   └── pythonParser.ts
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🎯 Features in Detail

### Visualization Types

1. **Array Visualizer**: Visualize operations on arrays (sorting, searching, etc.)
2. **Linked List Visualizer**: Visualize node operations and traversals
3. **Tree Visualizer**: Visualize tree structures and operations

### Animation Controls

- ▶️ **Play**: Auto-advance through steps
- ⏸️ **Pause**: Pause the animation
- ⏮️ **Step Backward**: Go to previous step
- ⏭️ **Step Forward**: Go to next step
- 🔄 **Reset**: Return to initial state
- ⚡ **Speed Control**: Adjust animation speed

### Custom Code Execution

Write your own Python code in the integrated editor and watch it visualize in real-time. The parser will convert your code into animated steps.

## 🔧 Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Syntax Highlighting**: react-syntax-highlighter
- **Icons**: Lucide React
- **Backend**: Supabase (optional integration)

## 📦 Dependencies

### Core Dependencies
- `react` & `react-dom` - UI framework
- `react-syntax-highlighter` - Code syntax highlighting
- `lucide-react` - Icon library
- `@supabase/supabase-js` - Backend integration

### Dev Dependencies
- `vite` - Build tool and dev server
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS
- `eslint` - Code linting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

**sawal612**
- GitHub: [@sawal612](https://github.com/sawal612)

**kingsahil**
- GitHub: [@kingsahil](https://github.com/kingsahil)

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📸 Screenshots

_Add screenshots of your application here to showcase the features_

## 🔮 Future Enhancements

- [ ] Add more algorithm visualizations
- [ ] Support for graph data structures
- [ ] Code export functionality
- [ ] Share visualizations via URL
- [ ] Dark mode support
- [ ] Mobile-responsive improvements

---

⭐ Star this repository if you find it helpful!