import './App.css';
import { useState, useRef } from 'react';
import PreprocessorEditor from './components/PreprocessorEditor/PreprocessorEditor';
import StrudelEditor from './components/StrudelEditor/StrudelEditor';
import TransportControls from './components/ControlPanel/TransportControls';
import InstrumentControls from './components/ControlPanel/InstrumentControls';
import PianoRoll from './components/Visualizer/PianoRoll';
import { stranger_tune } from './tunes';
import { processText } from './utils/preprocessor';

export default function App() {
  // State for raw preprocessor text
  const [rawText, setRawText] = useState(stranger_tune);
  
  // State for processed text that goes to Strudel
  const [processedText, setProcessedText] = useState('');
  
  // State for control values
  const [controls, setControls] = useState({
    p1: 'on',
  });
  
  // Ref to hold the Strudel editor instance
  const editorRef = useRef(null);

  // Handler for when preprocessor text changes
  const handlePreprocessorChange = (newText) => {
    setRawText(newText);
  };

  // Handler for when any control changes
  const handleControlChange = (controlName, value) => {
    setControls(prev => ({
      ...prev,
      [controlName]: value
    }));
    
    // Auto-process and play if editor is running
    if (editorRef.current && editorRef.current.repl?.state?.started) {
      processAndUpdate();
    }
  };

  // Process the text with current control values
  const process = () => {
    const processed = processText(rawText, controls);
    setProcessedText(processed);
    
    // Update the Strudel editor with processed code
    if (editorRef.current) {
      editorRef.current.setCode(processed);
    }
  };

  // Process and update without playing
  const processAndUpdate = () => {
    process();
  };

  // Process and play
  const processAndPlay = () => {
    process();
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.evaluate();
      }
    }, 50);
  };

  // Transport controls
  const handlePlay = () => {
    if (editorRef.current) {
      editorRef.current.evaluate();
    }
  };

  const handleStop = () => {
    if (editorRef.current) {
      editorRef.current.stop();
    }
  };

  return (
    <div>
      <h2>Strudel Reactor</h2>
      <main>
        <div className="container-fluid">
          <div className="row">
            {/* Preprocessor Editor - Top Left */}
            <div className="col-md-8">
              <PreprocessorEditor 
                value={rawText}
                onChange={handlePreprocessorChange}
              />
            </div>
            
            {/* Controls - Top Right */}
            <div className="col-md-4" style={{ padding: '1rem' }}>
              <h5>Controls</h5>
              <TransportControls 
                onPlay={handlePlay}
                onStop={handleStop}
                onProcess={processAndUpdate}
                onProcessAndPlay={processAndPlay}
              />
              <hr />
              <InstrumentControls
                controls={controls}
                onControlChange={handleControlChange}
              />
            </div>
          </div>
          
          <div className="row">
            {/* Strudel Editor - Bottom Left */}
            <div className="col-md-8">
              <StrudelEditor 
                editorRef={editorRef}
                processedCode={processedText}
              />
            </div>
            
            {/* Additional space - Bottom Right */}
            <div className="col-md-4">
              <div style={{ padding: '1rem' }}>
                <p className="text-muted">Additional controls will appear here</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Piano Roll Visualizer */}
        <PianoRoll />
      </main>
    </div>
  );
}