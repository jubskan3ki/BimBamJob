import React, { useState } from 'react';
import './App.css';
import { Mower, Lawn, Position, Direction } from './models';

function App() {
  const [results, setResults] = useState<Position[]>([]);

  const processFile = async (file: File) => {
    const content = await file.text();
    const lines = content.split('\n').map(line => line.trim());
  
    console.log('Lines:', lines);
  
    const lawnSize = lines[0].split('').map(Number);
    console.log('Lawn size:', lawnSize);
    const lawn = new Lawn(lawnSize[0], lawnSize[1]);
    const results: Position[] = [];
  
    for (let i = 1; i < lines.length; i += 2) {
      console.log('Processing lines', i, 'and', i+1);
      const positionData = lines[i];
  
      const x = parseInt(positionData[0]); 
      const y = parseInt(positionData[1]); 
      const direction = positionData[3] as Direction; 
  
      const position: Position = { x, y, direction };
      console.log('Position:', position);
      const mower = new Mower(position);
      const instructions = lines[i + 1];
      console.log('Instructions:', instructions);
  
      for (const instruction of instructions) {
        mower.move(instruction, lawn);
      }
  
      console.log('Final position:', mower.position);
      results.push(mower.position);
    }
  
    console.log('All results:', results);
    setResults(results);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    void processFile(file);
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} />
      {results.map((position, index) => (
        <div key={index}>
          <p>For the mower {index + 1}, final position is [{position.x}, {position.y}] and orientation is {position.direction}</p>
        </div>
      ))}
    </div>
  );
}

export default App;