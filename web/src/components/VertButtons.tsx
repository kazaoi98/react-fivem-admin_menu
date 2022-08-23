import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { red } from '@mui/material/colors';
import { fetchNui } from '../utils/fetchNui';


export default function IconButtons() {

  const handleExit = () => {
    fetchNui('menu_exit').then(retData => {
      console.log(retData)
    }).catch(e => {
      console.log('callback error', e)
    })
  };  

  return (
    
    <Stack direction="column" spacing={1} justifyContent="space-between" alignItems="flex-end" >
      
      <IconButton aria-label="exit" onClick={ () => {handleExit()} } >
        <CloseRoundedIcon sx={{ color: red[500] }}/>
      </IconButton>

      <IconButton aria-label="settings" sx = {{bgcolor: 'DimGray' }} disabled={true}>
        <SettingsIcon  />
      </IconButton>
    </Stack>
    
    
  );
}
