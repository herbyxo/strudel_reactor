import React, { useState, useRef } from 'react';
import PreprocessorEditor from '../components/PreprocessorEditor/PreprocessorEditor';
import StrudelEditor from '../components/StrudelEditor/StrudelEditor';
import ControlPanel from '../components/ControlPanel/ControlPanel';
import { stranger_tune } from '../tunes';
import { processText } from '../utils/preprocessor';

export default function EditorPage() {
  const [rawText, setRawText] = useState(stranger_tune);
  const [processedText, setProcessedText] = useState('');
  const [controls, setControls] = useState({
    p1: 'on',
    p2: 'on',
    p3: 'on',
    p4: 'on',
    p5: 'on',
  });
  const editorRef = useRef(null);

  const handlePreprocessorChange = (newText) => {
    setRawText(newText);
  };

  const handleControlChange = (controlName, value) => {
    setControls(prev => ({ ...prev, [controlName]: value }));
    
    if (editorRef.current && editorRef.current.repl?.state?.started) {
      processAndUpdate();
    }
  };

  const process = () => {
    const processed = processText(rawText, controls);
    setProcessedText(processed);
    
    if (editorRef.current) {
      editorRef.current.setCode(processed);
    }
  };

  const processAndUpdate = () => {
    process();
  };

  const processAndPlay = () => {
    process();
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.evaluate();
      }
    }, 50);
  };

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
    <div className="bg-dark text-light min-vh-100">
      <main>
        <div className="container-fluid">
          <div className="row pt-3">
            {/* Preprocessor */}
            <div className="col-md-8 mb-3">
              <div className="card bg-darker-grey shadow-sm h-100">
                <div className="card-header bg-dark-grey">
                  <strong className="text-light">Preprocessor</strong>
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
                <div className="card-header bg-dark-grey">
                  <strong className="text-light">Control Panel</strong>
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
                <div className="card-header bg-dark-grey">
                  <strong className="text-light">Strudel Editor</strong>
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
      </main>

      <div style={{ display: 'none' }}>
        <canvas id="roll"></canvas>
      </div>
    </div>
  );
}