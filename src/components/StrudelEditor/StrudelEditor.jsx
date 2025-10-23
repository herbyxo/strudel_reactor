import React, { useEffect } from 'react';
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import './StrudelEditor.css';

export default function StrudelEditor({ editorRef, processedCode }) {
  useEffect(() => {
   
    if (editorRef.current) return;

    const canvas = document.getElementById('roll');
    if (!canvas) return;

    canvas.width = canvas.width * 2;
    canvas.height = canvas.height * 2;
    const drawContext = canvas.getContext('2d');
    const drawTime = [-2, 2];

    
    editorRef.current = new StrudelMirror({
      defaultOutput: webaudioOutput,
      getTime: () => getAudioContext().currentTime,
      transpiler,
      root: document.getElementById('strudel-editor-root'),
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

    // Cleanup on unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.stop();
      }
    };
  }, [editorRef]);

  // Update editor code when processedCode changes
  useEffect(() => {
    if (editorRef.current && processedCode) {
      editorRef.current.setCode(processedCode);
    }
  }, [processedCode, editorRef]);

  return (
    <div className="strudel-editor">
      <label className="form-label">Processed Strudel Code:</label>
      <div id="strudel-editor-root" />
      <div id="output" />
    </div>
  );
}