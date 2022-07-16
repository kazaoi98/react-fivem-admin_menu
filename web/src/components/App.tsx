import React, {useState} from 'react';
import './App.scss'
import {debugData} from "../utils/debugData";
import {fetchNui} from "../utils/fetchNui";
import {useNuiEvent} from "../hooks/useNuiEvent";

// This will set the NUI to visible if we are
// developing in browser
debugData([ { action: 'setVisible', data: true } ])

const App: React.FC = () => {
  
  const [visible, setVisible] = useState(false)
  useNuiEvent<boolean>('setVisible', setVisible)
 
  return (
    <div className="nui-wrapper">
      
    </div>
  );
}

export default App;
