import React, {useState, useCallback, useMemo} from 'react';
import styles from './App.module.scss';
import ForceGraph from './ForceGraph';


function App() {
  const nodes = [
    { id: 'A' },
    { id: 'B' },
    { id: 'C' },
    { id: 'D' },
  ];

  const links = [
    { source: 'A', target: 'B' },
    { source: 'B', target: 'C' },
    { source: 'C', target: 'D' },
    { source: 'D', target: 'A' },
  ];

  return(
    <div>
      Hello World
      <ForceGraph nodes={nodes} links={links} />
    </div>
  )
}

export default App;
