import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useTune } from '../../context/TuneContext';
import './PianoRoll.css';

export default function PianoRoll() {
  const svgRef = useRef(null);
  const { audioData } = useTune();
  const [amplitudeHistory, setAmplitudeHistory] = useState([]);
  
  const maxItems = 50; // Number of data points to show
  const maxValue = 1; // Maximum amplitude value

  // Extract amplitude data from haps
  useEffect(() => {
    if (!audioData.currentHaps || audioData.currentHaps.length === 0) {
      return;
    }

    // Calculate average amplitude from current haps
    let totalGain = 0;
    let count = 0;

    audioData.currentHaps.forEach(hap => {
      // Extract gain value from hap
      const gain = hap.value?.gain || hap.gain || 0.5;
      totalGain += gain;
      count++;
    });

    const avgAmplitude = count > 0 ? totalGain / count : 0;

    // Update amplitude history
    setAmplitudeHistory(prev => {
      const newHistory = [...prev, avgAmplitude];
      // Keep only the last maxItems entries
      if (newHistory.length > maxItems) {
        newHistory.shift();
      }
      return newHistory;
    });

  }, [audioData]);

  // D3 visualization
  useEffect(() => {
    if (!svgRef.current || amplitudeHistory.length === 0) {
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const rect = svgRef.current.getBoundingClientRect();
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    const width = rect.width - margin.left - margin.right;
    const height = rect.height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, amplitudeHistory.length - 1])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([height, 0]);

    // Create chart group
    const chartGroup = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Create gradient
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'waveform-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', yScale(0))
      .attr('x2', 0)
      .attr('y2', yScale(maxValue));

    gradient.selectAll('stop')
      .data([
        { offset: '0%', color: '#00ff00' },
        { offset: '50%', color: '#ffff00' },
        { offset: '100%', color: '#ff0000' }
      ])
      .enter()
      .append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);

    // Create line generator
    const line = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);

    // Draw the line
    chartGroup.append('path')
      .datum(amplitudeHistory)
      .attr('fill', 'none')
      .attr('stroke', 'url(#waveform-gradient)')
      .attr('stroke-width', 3)
      .attr('d', line);

    // Add area under the curve
    const area = d3.area()
      .x((d, i) => xScale(i))
      .y0(height)
      .y1(d => yScale(d))
      .curve(d3.curveMonotoneX);

    chartGroup.append('path')
      .datum(amplitudeHistory)
      .attr('fill', 'url(#waveform-gradient)')
      .attr('opacity', 0.2)
      .attr('d', area);

    // Add axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(5)
      .tickFormat(d => '');

    const yAxis = d3.axisLeft(yScale)
      .ticks(5);

    chartGroup.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .attr('color', '#888');

    chartGroup.append('g')
      .call(yAxis)
      .attr('color', '#888');

    // Add grid lines
    chartGroup.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisLeft(yScale)
        .ticks(5)
        .tickSize(-width)
        .tickFormat('')
      );

  }, [amplitudeHistory]);

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
      
      {/* D3 Waveform Visualization */}
      <div className="waveform-container mb-3" style={{ height: '300px' }}>
        <svg 
          ref={svgRef}
          width="100%" 
          height="100%"
          style={{ background: '#1a1a1a', borderRadius: '8px' }}
        />
      </div>
    </div>
  );
}