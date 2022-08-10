import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { fetchNui } from '../utils/fetchNui';
import Snackbar from '@mui/material/Snackbar';
//import Alert from '@mui/material/Alert';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function DelPropContent() {

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  
  const handleClick = () => {
    setSuccess(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false)
    setSuccess(false);
  };

  const toggleSelectTool = () => {
    fetchNui('toggleSelectTool').then(retData => {
    console.log(retData)
    }).catch(e => {
      console.log('callback error', e)
    })
  };

  const [value, setValue] = useState('')
  const handleChange = (event: any) => {
    setValue(event.currentTarget.value)
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(value)
    fetchNui('DeleteEntity:client', value).then(retData => {
       if (retData) setSuccess(true)
        else setError(true);
        console.log(retData)
      }).catch(e => {
        console.log('callback error', e)
    })
  };

  return (
    <>
    <Typography pl={2} pt={2} color="white" component="div" className = 'contentText'>
        Type ID of target: 
    </Typography>
    <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100%', ml: 5 },
        }}
        
        autoComplete="off"
        onSubmit={handleSubmit} 
    >
      <TextField id="filled-basic" label="Select prop" variant="filled" required={true} onChange={handleChange} value = {value} type='number' />
    
      <Stack spacing={2}  direction="column" >
          <Button variant="outlined" color="warning" type='submit'>Delete selected prop</Button>
          <Divider />
          <Button variant="outlined" color="info" onClick={toggleSelectTool}>Toggle Select tool</Button>
      </Stack>
      </Box>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '50vh' }}>
          Entity successfully deleted!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '50vh' }}>
          Error! Entity doesn't exist!
        </Alert>
      </Snackbar>
    </>
  )
}
