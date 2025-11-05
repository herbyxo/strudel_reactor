import React, { useState, useRef, useEffect } from 'react';
import PreprocessorEditor from '../components/PreprocessorEditor/PreprocessorEditor';
import StrudelEditor from '../components/StrudelEditor/StrudelEditor';
import ControlPanel from '../components/ControlPanel/ControlPanel';
import { useTune } from '../context/TuneContext';
import { processText } from '../utils/preprocessor';

export default function EditorPage() {
  const { rawText, setRawText } = useTune();
  const [processedText, setProcessedText] = useState('');
  const [controls, setControls] = useState({
    p1: 'on',
    p2: 'on',
    p3: 'on',
    p4: 'on',
    p5: 'on',
  });
  const editorRef = useRef(null);

  // Process the initial tune when component mounts
  useEffect(() => {
    console.log('EditorPage mounted, processing initial tune...');
    const processed = processText(rawText, controls);
    setProcessedText(processed);
  }, []); // Run only once on mount

  const handlePreprocessorChange = (newText) => {
    setRawText(newText);
  };

  const handleControlChange = (controlName, value) => {
    console.log(`Control changed: ${controlName} = ${value}`);
    setControls(prev => ({ ...prev, [controlName]: value }));
    
    // If music is playing, reprocess and update
    if (editorRef.current && editorRef.current.repl?.state?.started) {
      processAndUpdate();
    }
  };

  const process = () => {
    console.log('Processing text...');
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
    console.log('Process and Play clicked');
    process();
    setTimeout(() => {
      if (editorRef.current) {
        console.log('Evaluating...');
        editorRef.current.evaluate();
      } else {
        console.error('Editor ref is null!');
      }
    }, 50);
  };

  const handlePlay = () => {
    console.log('Play clicked');
    if (editorRef.current) {
      editorRef.current.evaluate();
    } else {
      console.error('Editor ref is null!');
    }
  };

  const handleStop = () => {
    console.log('Stop clicked');
    if (editorRef.current) {
      editorRef.current.stop();
    } else {
      console.error('Editor ref is null!');
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
    </div>
  );
}