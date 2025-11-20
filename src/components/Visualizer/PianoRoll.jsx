import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useTune } from '../../context/TuneContext';
import './PianoRoll.css';

export default function PianoRoll() {
  const svgRef = useRef(null);
  const { audioData } = useTune();
  const [frequencyData, setFrequencyData] = useState([]);
  
  const numBands = 32; // Number of frequency bands (like an EQ)
  const maxValue = 1; // Maximum amplitude value

  // Extract frequency data from haps
  useEffect(() => {
    if (!audioData.currentHaps || audioData.currentHaps.length === 0) {
      // Decay the frequency data when no audio is playing
      setFrequencyData(prev => prev.map(val => val * 0.9));
      return;
    }

    // Create frequency bands based on note pitches and gains
    const newFrequencyData = new Array(numBands).fill(0);
    
    audioData.currentHaps.forEach(hap => {
      // Extract note and gain information
      const note = hap.value?.note || hap.note;
      const gain = hap.value?.gain || hap.gain || 0.5;
      const velocity = hap.value?.velocity || 0.8;
      
      // Map note to frequency band (0-31)
      // Notes typically range from MIDI 0-127, map to our bands
      let bandIndex = 0;
      if (note) {
        // Convert note name to approximate frequency band
        const noteMap = {
          'c': 0, 'd': 4, 'e': 8, 'f': 10, 'g': 14, 'a': 18, 'b': 22
        };
        const noteLetter = note.toString().toLowerCase().charAt(0);
        const octave = parseInt(note.toString().match(/\d+/)?.[0] || '4');
        
        bandIndex = (noteMap[noteLetter] || 0) + (octave * 3);
        bandIndex = Math.min(Math.max(bandIndex, 0), numBands - 1);
      } else {
        // If no note info, distribute randomly for visual effect
        bandIndex = Math.floor(Math.random() * numBands);
      }
      
      // Add energy to this frequency band and nearby bands (for smoothing)
      const energy = gain * velocity;
      newFrequencyData[bandIndex] = Math.min(newFrequencyData[bandIndex] + energy, 1);
      
      // Add energy to adjacent bands (bleed effect)
      if (bandIndex > 0) {
        newFrequencyData[bandIndex - 1] = Math.min(newFrequencyData[bandIndex - 1] + energy * 0.5, 1);
      }
      if (bandIndex < numBands - 1) {
        newFrequencyData[bandIndex + 1] = Math.min(newFrequencyData[bandIndex + 1] + energy * 0.5, 1);
      }
    });

    // Smooth transition with previous data
    setFrequencyData(prev => {
      if (prev.length === 0) return newFrequencyData;
      return newFrequencyData.map((val, i) => {
        const prevVal = prev[i] || 0;
        return prevVal * 0.7 + val * 0.3; // Smooth interpolation
      });
    });

  }, [audioData]);

  // D3 visualization - EQ style
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const rect = svgRef.current.getBoundingClientRect();
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = rect.width - margin.left - margin.right;
    const height = rect.height - margin.top - margin.bottom;

    // Create chart group
    const chartGroup = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Create scales
    const xScale = d3.scaleBand()
      .domain(d3.range(numBands))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([height, 0]);

    // Create color scale (frequency-based colors)
    const colorScale = d3.scaleLinear()
      .domain([0, numBands / 4, numBands / 2, 3 * numBands / 4, numBands])
      .range(['#8b00ff', '#0000ff', '#00ff00', '#ffff00', '#ff0000']);

    // Draw frequency bars
    const bars = chartGroup.selectAll('.freq-bar')
      .data(frequencyData.length > 0 ? frequencyData : new Array(numBands).fill(0))
      .enter()
      .append('rect')
      .attr('class', 'freq-bar')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d))
      .attr('fill', (d, i) => colorScale(i))
      .attr('opacity', 0.8);

    // Add glow effect to bars
    bars.attr('filter', 'url(#glow)');

    // Create glow filter
    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'glow');
    
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur');
    
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Draw waveform overlay
    if (frequencyData.length > 0) {
      const line = d3.line()
        .x((d, i) => xScale(i) + xScale.bandwidth() / 2)
        .y(d => yScale(d))
        .curve(d3.curveCatmullRom);

      chartGroup.append('path')
        .datum(frequencyData)
        .attr('fill', 'none')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2)
        .attr('opacity', 0.8)
        .attr('d', line);
    }

    // Add axes
    const xAxis = d3.axisBottom(xScale)
      .tickValues([0, numBands / 4, numBands / 2, 3 * numBands / 4, numBands - 1])
      .tickFormat((d) => {
        const labels = ['Bass', 'Low-Mid', 'Mid', 'High-Mid', 'Treble'];
        const index = [0, numBands / 4, numBands / 2, 3 * numBands / 4, numBands - 1].indexOf(d);
        return labels[index] || '';
      });

    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
      .tickFormat(d => `${Math.round(d * 100)}%`);

    chartGroup.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .attr('color', '#888')
      .selectAll('text')
      .attr('fill', '#fff');

    chartGroup.append('g')
      .call(yAxis)
      .attr('color', '#888')
      .selectAll('text')
      .attr('fill', '#fff');

    // Add grid lines
    chartGroup.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisLeft(yScale)
        .ticks(5)
        .tickSize(-width)
        .tickFormat('')
      );

    // Add center line
    chartGroup.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', height / 2)
      .attr('y2', height / 2)
      .attr('stroke', '#444')
      .attr('stroke-dasharray', '5,5')
      .attr('opacity', 0.5);

  }, [frequencyData]);

  return (
    <div className="piano-roll-container">
      <div className="visualizer-info mb-3">
        <span className={`badge ${audioData.isPlaying ? 'bg-success' : 'bg-secondary'} me-2`}>
          {audioData.isPlaying ? 'Playing' : 'Stopped'}
        </span>
        <span className="text-light">
          Active Notes: {audioData.currentHaps?.length || 0}
        </span>
      </div>
      
      {/* D3 EQ Visualization */}
      <div className="eq-container mb-3" style={{ height: '400px' }}>
        <svg 
          ref={svgRef}
          width="100%" 
          height="100%"
          style={{ background: '#0a0a0a', borderRadius: '8px' }}
        />
      </div>
    </div>
  );
}