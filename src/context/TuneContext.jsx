import React, { createContext, useState, useContext } from 'react';
import { stranger_tune } from '../tunes';

const TuneContext = createContext();

export function useTune() {
  return useContext(TuneContext);
}

export function TuneProvider({ children }) {
  const [rawText, setRawText] = useState(stranger_tune);

  return (
    <TuneContext.Provider value={{ rawText, setRawText }}>
      {children}
    </TuneContext.Provider>
  );
}