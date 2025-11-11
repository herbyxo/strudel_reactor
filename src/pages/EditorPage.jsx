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
  const [tempo, setTempo] = useState(140);
  const [volume, setVolume] = useState(80);
  const [reverb, setReverb] = useState(40);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const editorRef = useRef(null);

  // Single useEffect that watches all dependencies and reprocesses when any change
  useEffect(() => {
    console.log('Settings changed - reprocessing with tempo:', tempo, 'volume:', volume);
    const processed = processText(rawText, controls, tempo, volume, reverb);
    setProcessedText(processed);
    
    if (editorRef.current) {
      editorRef.current.setCode(processed);
      
      // If we're in playing state, evaluate the new code
      if (isPlaying) {
        console.log('Playing state active - evaluating with new settings...');
        editorRef.current.evaluate();
      }
    }
  }, [rawText, controls, tempo, volume, reverb, isPlaying]);

  const handlePreprocessorChange = (newText) => {
    setRawText(newText);
  };

  const handleControlChange = (controlName, value) => {
    console.log(`Control changed: ${controlName} = ${value}`);
    setControls(prev => ({ ...prev, [controlName]: value }));
  };

  const handlePlay = () => {
    console.log('Play clicked');
    setIsPlaying(true);
  };

  const handleStop = () => {
    console.log('Stop clicked');
    setIsPlaying(false);
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
                    tempo={tempo}
                    onTempoChange={setTempo}
                    volume={volume}
                    onVolumeChange={setVolume}
                    reverb={reverb}
                    onReverbChange={setReverb}
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