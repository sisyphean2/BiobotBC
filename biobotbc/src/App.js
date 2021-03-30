import React from 'react';
import './App.css';
import { CovidGraph } from './features/graphs/CovidGraph';
import { SubsetPicker } from './features/graphs/SubsetPicker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SubsetPicker />
        <CovidGraph />
      </header>
    </div>
  );
}

export default App;
