import React, {useState} from 'react';
import './App.scss'
import './style.css';
import VertButtons from './VertButtons';
import Divider from '@mui/material/Divider';
import ListEntries from './ListEntries';
import Collapse from '@mui/material/Collapse';


const App: React.FC = () => {

  const [display, setDisplay] = useState(true)
  const [minimise, setMinimise] = useState(true)


  window.addEventListener('message', (event) => {
    
    if (event.data.type === 'ui') {
      if (event.data.status) {
        setDisplay(true);
      } else setDisplay(false);
    } 

  });

  window.addEventListener('message', (event) => {
    
    if (event.data.type === 'minimise') {
      if (event.data.status) {
        setMinimise(true);
      } else setMinimise(false);
    } 

  });

  return (
    <>
    
      <div className="nui-wrapper">
        {display &&
          <>
          <Collapse in={ minimise } timeout="auto"/* unmountOnExit */ >
            <div className = 'wrapper'>
                <div className='menu'>
                  <Divider />     
                  <ListEntries />
                </div>
              <div id='vertMenu'>
                <VertButtons />
              </div>
            </div>
          </Collapse>
          </>
        } 
      </div>
    </>
  );
}

export default App;
