export const stranger_tune = `
// Instrument 1: drums
$: sound("bd sd bd sd")
  .gain(<VOLUME>)
  <REVERB>

// Instrument 2: hihat
$: sound("hh*8")
  .gain(<VOLUME>)

// Instrument 3: bass
$: sound("sawtooth c2 e2 g2")
  .gain(<VOLUME>)

// Instrument 4: melody
$: sound("piano c4 e4 g4 c5")
  .gain(<VOLUME>)
`;

// List of instruments (must match comment names in tune)
export const instruments = [
  { id: 'drums', name: 'Drums (bd/sd)', pattern: 'bd sd bd sd' },
  { id: 'hihat', name: 'Hi-Hat', pattern: 'hh*8' },
  { id: 'bass', name: 'Bass Line', pattern: 'sawtooth c2 e2 g2' },
  { id: 'melody', name: 'Piano Melody', pattern: 'piano c4 e4 g4 c5' }
];