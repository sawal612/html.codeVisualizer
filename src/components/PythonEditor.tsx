import { useState, useEffect, useRef } from 'react';
import { Play, Save, FileCode } from 'lucide-react';
import { Algorithm } from '../types';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Register Python language
SyntaxHighlighter.registerLanguage('python', python);

interface PythonEditorProps {
  onExecute: (code: string) => void;
  algorithm: Algorithm;
}

export default function PythonEditor({ onExecute, algorithm }: PythonEditorProps) {
  const [code, setCode] = useState(algorithm.code);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCode(algorithm.code);
  }, [algorithm]);

  const handleExecute = () => {
    onExecute(code);
  };

  const handleSave = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_code.py';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      
      // Set cursor position after the inserted tab
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <FileCode size={20} className="text-blue-400" />
          <h3 className="text-sm font-semibold text-gray-100">Python Editor</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-md text-sm transition-colors"
          >
            <Save size={16} />
            Save
          </button>
          <button
            onClick={handleExecute}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
          >
            <Play size={16} />
            Visualize
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden relative">
        {/* Syntax highlighted background */}
        <div className="absolute inset-0 overflow-auto pointer-events-none">
          <SyntaxHighlighter
            language="python"
            style={atomOneDark}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: 'transparent',
              fontSize: '0.875rem',
              lineHeight: '1.6',
            }}
            codeTagProps={{
              style: {
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              }
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
        
        {/* Editable textarea overlay */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white font-mono text-sm p-4 resize-none focus:outline-none"
          spellCheck={false}
          style={{
            lineHeight: '1.6',
            tabSize: 4,
            caretColor: '#60a5fa',
          }}
        />
      </div>
    </div>
  );
}
