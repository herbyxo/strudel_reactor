# Strudel Reactor

A React-based preprocessor and control interface for the Strudel.cc live coding music platform.

## Author
Will - INFT 2064 Web Technology

## Project Overview
Strudel Reactor provides an enhanced UI for controlling live-coded music in Strudel. The application features a preprocessor that transforms tagged text into Strudel code, allowing real-time control over instruments, tempo, effects, and volume through an intuitive interface.

## Features

### Controls Overview
The application includes the following controls organised in an accordion-style control panel:

#### **Playback Controls**
- **Play Button**: Processes the preprocessor code and starts audio playback
- **Stop Button**: Stops playback and resets audio state

#### **Tempo Control**
- **BPM Input**: Numeric input field (range: 60-200 BPM)
- Allows precise tempo control with validation
- Default: 140 BPM
- Tooltip: "Hold arrows to quickly change tempo"

#### **Effects & Volume Controls**
- **Volume Slider**: Range slider (0-100%, step: 5%)
  - Controls master volume for most instruments (exceptions: Arpeggio, Bassline)
  - Tooltip: "Volume control - exceptions: Arpeggio, Bassline"
  - Labels: Silent → Normal → Loud
  
- **Reverb Slider**: Range slider (0-100%, step: 5%)
  - Adds room reverb effect for spatial depth
  - Tooltip: "Room reverb effect - adds space and depth to the sound"
  - Labels: Dry → Wet

#### **Instrument Controls**
Five instrument channels with ON/HUSH radio buttons:

1. **Bass Line** (p1)
   - Deep bass synthesizer
   - Radio options: ON / HUSH
   
2. **Arpeggio** (p2)
   - Arpeggiated synth pattern
   - Radio options: ON / HUSH
   
3. **Kick Drum** (p3)
   - Kick drum rhythm pattern
   - Radio options: ON / HUSH
   
4. **Shaker** (p4)
   - Shaker percussion texture
   - Radio options: ON / HUSH
   
5. **Hi-Hats (Fast)** (p5)
   - Fast hi-hat rhythm
   - Radio options: ON / HUSH

### File Management
- **Save Current Tune**: Save your current preprocessor code with a custom name to localStorage
- **Load Saved Tunes**: Dropdown menu showing all saved tunes with load/delete options
- **Load Default Tune**: Restore the default "Stranger Things" inspired tune

### Visualiser
- **Piano Roll Visualisation**: D3.js-powered frequency spectrum analyser
  - EQ-style visualisation with 32 frequency bands
  - Colour-coded frequency ranges (Bass → Treble)
  - Real-time waveform overlay
  - Active note counter
  - Playback status indicator

### Navigation
- **Editor Page**: Main workspace with preprocessor, control panel, and Strudel editor
- **Visualiser Page**: Full-screen audio visualisation

## How It Works

### Preprocessor System
The preprocessor transforms tagged text into valid Strudel code:

1. **Instrument Tags**: `<p1_Radio>`, `<p2_Radio>`, `<p3_Radio>`, `<p4_Radio>`, `<p5_Radio>`
   - When instrument is ON: Tag is removed (empty string)
   - When instrument is HUSH: Tag is replaced with `_` and adds `// MUTED: [Instrument Name]` comment

2. **Tempo Tag**: `<tempo>`
   - Replaced with the current BPM value (60-200)

3. **Volume Processing**:
   - Automatically adjusts all `gain()` and `postgain()` values based on volume slider
   - Formula: `newGain = originalGain * (volume / 100)`

4. **Reverb Processing**:
   - Adjusts all `room()` effect values based on reverb slider
   - Formula: `newRoom = originalRoom * (reverb / 50)`

### React Architecture
The application follows React best practices with:
- **Context API**: `TuneContext` manages global state (audio data, playback status, editor reference)
- **Component Hierarchy**: Modular components with single responsibilities
- **Controlled Components**: All form inputs use controlled component pattern
- **Unidirectional Data Flow**: Props down, callbacks up
- **Custom Hooks**: `useTune()` hook for accessing context

### Component Structure
```
App
├── Layout (Navigation & File Management)
├── EditorPage
│   ├── PreprocessorEditor
│   ├── ControlPanel
│   │   ├── TransportControls
│   │   ├── TempoControl
│   │   ├── EffectsControl
│   │   └── InstrumentControls
│   └── StrudelEditor
└── VisualiserPage
    └── PianoRoll (D3.js visualisation)
```

## Usage Guidelines

### Getting Started
1. The application loads with a default tune (Stranger Things inspired bassline)
2. Edit the preprocessor code in the left panel or load a saved tune
3. Adjust controls in the control panel (right side)
4. Click "Play" to start playback - changes to controls will update in real-time
5. Click "Stop" to halt playback
6. Navigate to "Visualiser" to see the frequency spectrum

### Real-Time Updates
- All control changes (tempo, volume, reverb, instrument muting) automatically reprocess the code
- When playing, changes are applied immediately without needing to restart
- The preprocessor output is visible in the Strudel Editor panel

### Saving & Loading
1. Make changes to your tune
2. Enter a name in the "Enter tune name..." input field
3. Click "Save Current Tune" or press Enter
4. Access saved tunes via the "Saved Tunes" dropdown
5. Delete unwanted tunes using the × button

### Visualiser
- The visualiser shows a real-time frequency spectrum with 32 bands
- Colour gradient represents frequency ranges (purple for bass, red for treble)
- Active notes counter shows how many sounds are currently playing
- Waveform overlay shows the overall audio envelope

## Technical Features

### Bootstrap Components Used
1. **Accordion**: Collapsible control sections (Playback, Tempo, Effects, Instruments)
2. **Range Sliders**: Volume and Reverb controls
3. **Radio Buttons**: Instrument ON/HUSH toggles
4. **Tooltips**: Helpful hints on controls (initialized via Bootstrap JS)
5. **Buttons**: Transport controls, save/load functions
6. **Cards**: Content containers with headers
7. **Navigation Bar**: Top navigation with active state indication
8. **Dropdown Menu**: Saved tunes management
9. **Form Controls**: Text inputs and number inputs
10. **Badges**: Status indicators in visualizer

### JSON Handling
The application implements comprehensive JSON handling for state persistence:

- **localStorage Integration**: Saved tunes are stored as JSON in browser localStorage
- **Data Structure**: Each saved tune includes name, code, and timestamp
- **Serialization**: `JSON.stringify()` for saving, `JSON.parse()` for loading
- **State Management**: Current tune state can be serialized to JSON for export/import

### D3.js Visualisation
The Piano Roll visualiser features:

- **Dynamic Bar Chart**: 32 frequency bands updated in real-time
- **Colour Gradient Scale**: Frequency-based colour mapping
- **Axes**: Labelled X-axis (frequency ranges) and Y-axis (amplitude percentage)
- **Waveform Line**: Smooth curve overlay using `d3.curveCatmullRom`
- **SVG Filters**: Glow effect on bars for enhanced visual appeal
- **Grid Lines**: Semi-transparent background grid for easier reading
- **Responsive Scaling**: Adapts to container size using `d3.scaleBand()` and `d3.scaleLinear()`
- **Real-time Updates**: React useEffect hooks trigger D3 re-renders on audio data changes

## Song Attribution

The default tune included in this application is inspired by the Stranger Things theme and uses the following Strudel pattern:
- Bass line pattern with note sequence
- Arpeggiated synth pattern
- Drum kit percussion (kick, shaker, hi-hats)
- Effects: reverb, gain adjustments

This is an original arrangement created for this project, not copied from the Strudel bakery.

## Demonstration Video

**Video Link**: ---

The demonstration video includes:
- Full walkthrough of all features
- Real-time control manipulation during playback
- Demonstration of save/load functionality
- Visualiser showcase
- All controls used to audibly affect the music

## AI Usage Declaration

### AI Tools Used
No AI code generation tools were used in the original development of this project. All code was written manually with reference to:
- Official React documentation
- Bootstrap 5 documentation
- Strudel.cc documentation and examples
- D3.js documentation
- MDN Web Docs for JavaScript

### Documentation Assistance
AI tools were used only for:
- Guidance through the project (step-by-step plan)
- Proofreading documentation text
- Editing README file
- Debugging
- Working out how to create a desired feature

## Known Issues & Quirks

### Quirks
- Arpeggio and Bassline instruments bypass the master volume control in the original Strudel code structure
- Changes to controls while playing will cause a brief audio interruption as the code re-evaluates
- Very rapid tempo changes while playing may cause timing instability

### Browser Compatibility
- Tested on Chrome/Edge (Chromium-based browsers)
- Web Audio API required (modern browser needed)
- localStorage required for save/load functionality

### Performance Notes
- The visualiser uses requestAnimationFrame for smooth updates
- Audio data is limited to 100 values to prevent memory issues
- Frequency data includes smoothing for visual consistency

## Installation & Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Open browser to `http://localhost:3000`

## Dependencies

Key packages used:
- React 18.x
- React Router DOM (navigation)
- Bootstrap 5.3.x
- D3.js 7.x
- @strudel/codemirror
- @strudel/core, @strudel/webaudio, @strudel/soundfonts
- Various other Strudel packages for audio synthesis

## Project Structure

```
src/
├── components/
│   ├── ControlPanel/
│   │   ├── ControlPanel.jsx
│   │   ├── TransportControls.jsx
│   │   ├── TempoControl.jsx
│   │   ├── EffectsControl.jsx
│   │   └── InstrumentControls.jsx
│   ├── FileManager/
│   │   └── FileManager.jsx
│   ├── Layout/
│   │   └── Layout.jsx
│   ├── PreprocessorEditor/
│   │   └── PreprocessorEditor.jsx
│   ├── StrudelEditor/
│   │   └── StrudelEditor.jsx
│   └── Visualiser/
│       └── PianoRoll.jsx
├── context/
│   └── TuneContext.jsx
├── pages/
│   ├── EditorPage.jsx
│   └── VisualiserPage.jsx
├── utils/
│   └── preprocessor.js
├── tunes.js
└── App.js
```

## Bonus Features

### Additional Enhancements
- Dark theme UI throughout the entire application
- Consistent Bootstrap styling with custom colour scheme
- Real-time preprocessing with immediate audio feedback
- Dual-page navigation (Editor/Visualiser) with shared state
- Comment annotations for muted instruments
- localStorage persistence for user preferences
- Responsive layout that works on different screen sizes

## Future Improvements

Potential enhancements for future versions:
- Export preprocessed code to file
- Import tunes from external files
- Additional effect controls (delay, distortion, filters)
- MIDI keyboard support
- Recording/export functionality
- More visualisation options
- Preset management system
- Collaborative editing features

## Course Information

**Course**: INFT 2064 Web Technology  
**Assignment**: React Assignment SP5 - 2025  
**Institution**: University of South Australia  

## License

This project is for educational purposes as part of university coursework.
