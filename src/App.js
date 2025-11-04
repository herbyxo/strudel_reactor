import './App.css';
import { useState, useRef } from 'react';
import PreprocessorEditor from './components/PreprocessorEditor/PreprocessorEditor';
import StrudelEditor from './components/StrudelEditor/StrudelEditor';
import ControlPanel from './components/ControlPanel/ControlPanel';
import PianoRoll from './components/Visualizer/PianoRoll';
import { stranger_tune} from './tunes';
import { processText } from './utils/preprocessor';
import FileManager from './components/FileManager/FileManager';

export default function App() {
  // State for raw preprocessor text
  const [rawText, setRawText] = useState(stranger_tune);
  
  // State for processed text that goes to Strudel
  const [processedText, setProcessedText] = useState('');
  
  // State for control values
  const [controls, setControls] = useState({
    p1: 'on',  // Bass
    p2: 'on',  // Arp
    p3: 'on',  // Kick
    p4: 'on',  // Shaker
    p5: 'on',  // Hi-Hats
    p6: 'on',  // Rim/Clap
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

  // Handler for loading a saved tune
  const handleLoadTune = (tuneCode) => {
    setRawText(tuneCode);
    process();
  };

  return (
    <div className="bg-dark text-light min-vh-100">

      {/* NavBar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-darker-grey border-bottom border-secondary">
      <div className="container-fluid">
        <span className="navbar-brand">Strudel Reactor</span>
        
        {/* FileManager */}
        <div className="ms-auto">
          <FileManager 
            currentTune={rawText}
            onLoadTune={handleLoadTune}
          />
        </div>
      </div>
    </nav>
  
    {/* Main */}
      <main>
        <div className="container-fluid">
          <div className="row mt-3">

            {/* Preprocessor */}
            <div className="col-md-8 mb-3">
              <div className="card bg-darker-grey shadow-sm h-100">
                <div className="card-header bg-dark-grey text-light">
                  <strong>Preprocessor</strong>
                </div>
                <div className="card-body">
                  <PreprocessorEditor 
                    value={rawText}
                    onChange={handlePreprocessorChange}
                  />
                </div>
              </div>
            </div>
            
            {/* Control Panel */}
            <div className="col-md-4 mb-3">
              <div className="card bg-darker-grey shadow-sm h-100">
                <div className="card-header bg-dark-grey text-light">
                  <strong>Control Panel</strong>
                </div>
                <div className="card-body">
                  <ControlPanel 
                    controls={controls}
                    onControlChange={handleControlChange}
                    onPlay={handlePlay}
                    onStop={handleStop}
                    onProcess={processAndUpdate}
                    onProcessAndPlay={processAndPlay}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            {/* Strudel Editor */}
            <div className="col-md-12 mb-3">
              <div className="card bg-darker-grey shadow-sm">
                <div className="card-header bg-dark-grey text-light">
                  <strong>Strudel Editor</strong>
                </div>
                <div className="card-body">
                  <StrudelEditor 
                    editorRef={editorRef}
                    processedCode={processedText}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <PianoRoll />
      </main>
    </div>
  );
}