import React, { useEffect, useRef } from 'react';
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import './StrudelEditor.css';

export default function StrudelEditor({ editorRef, processedCode }) {
  const canvasRef = useRef(null);
  const editorRootRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Only initialize once, and only if not already initialized
    if (isInitialized.current || editorRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const editorRoot = editorRootRef.current;
    
    if (!canvas || !editorRoot) {
      console.log('Canvas or editor root not ready');
      return;
    }

    console.log('Initializing Strudel editor...');

    // Setup canvas
    canvas.width = canvas.width * 2;
    canvas.height = canvas.height * 2;
    const drawContext = canvas.getContext('2d');
    const drawTime = [-2, 2];

    // Create the Strudel editor
    editorRef.current = new StrudelMirror({
      defaultOutput: webaudioOutput,
      getTime: () => getAudioContext().currentTime,
      transpiler,
      root: editorRoot,
      drawTime,
      onDraw: (haps, time) => 
        drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
      prebake: async () => {
        initAudioOnFirstClick();
        const loadModules = evalScope(
          import('@strudel/core'),
          import('@strudel/draw'),
          import('@strudel/mini'),
          import('@strudel/tonal'),
          import('@strudel/webaudio'),
        );
        await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
      },
    });

    isInitialized.current = true;
    console.log('Strudel editor initialized successfully');

  }, []); // Empty dependency array - only run once on mount

  // Update editor code when processedCode changes
  useEffect(() => {
    if (editorRef.current && processedCode) {
      console.log('Updating editor code...');
      editorRef.current.setCode(processedCode);
    }
  }, [processedCode, editorRef]);

  return (
    <div className="strudel-editor">
      <label className="form-label">Processed Strudel Code:</label>
      <div ref={editorRootRef} id="strudel-editor-root" />
      <div id="output" />
      {/* Hidden canvas for piano roll - UNIQUE ID */}
      <canvas 
        ref={canvasRef}
        id="editor-canvas"
        style={{ display: 'none' }}
        width="800"
        height="400"
      />
    </div>
  );
}