import React, { createContext, useState, useContext } from 'react';
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

  return (
    <TuneContext.Provider value={{ 
      rawText, 
      setRawText,
      audioData,
      setAudioData
    }}>
      {children}
    </TuneContext.Provider>
  );
}