import React, { createContext, useState, useContext, useRef } from 'react';
import { stranger_tune } from '../tunes';

const TuneContext = createContext();

export function useTune() {
  return useContext(TuneContext);
}

export function TuneProvider({ children }) {
  const [rawText, setRawText] = useState(stranger_tune);
  
  // Audio visualization data
  const [audioData, setAudioData] = useState({
    currentHaps: [],
    currentTime: 0,
    isPlaying: false
  });

  // Add isPlaying state to context
  const [isPlaying, setIsPlaying] = useState(false);

  // Store editor ref in context so it persists across navigation
  const editorRef = useRef(null);

  return (
    <TuneContext.Provider value={{ 
      rawText, 
      setRawText,
      audioData,
      setAudioData,
      isPlaying,
      setIsPlaying,
      editorRef
    }}>
      {children}
    </TuneContext.Provider>
  );
}