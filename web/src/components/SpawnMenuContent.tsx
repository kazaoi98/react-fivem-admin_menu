import React from 'react';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchNui } from '../utils/fetchNui';
import SpawnTextField, { Ispawn } from './SpawnMenu/SpawnTextField';
import Stack from '@mui/material/Stack';
import { useNuiEvent } from '../hooks/useNuiEvent';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

const SpawnMenuDefaults = {
    vehicle_spawn: '',
} 

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SpawnMenuContent() {

    const [alert, setAlert] = React.useState(false);
    
    useNuiEvent<string>('vehSpawnAlert', (data) => {
      setAlert(true)
    })
    //useNuiEvent('playerList', setAlert)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setAlert(false);
    };


    const onSubmit: SubmitHandler<Ispawn> = (data) => {
      fetchNui('spawn_vehicle', data).then(retData => {
        console.log(retData)
      }).catch(e => {
        console.log('callback error', e)
      })  
    };
    
    const onClick = () => {
      const data = 'get_into_vehicle'
      fetchNui('get_into_vehicle', data).then(retData => {
        console.log(retData)
      }).catch(e => {
        console.log('callback error', e)
      })  
    };
    
    const methods = useForm<Ispawn>({defaultValues: SpawnMenuDefaults})
  return (
    <>  
        <Typography pl={2} pt={2}  color="white" component="div" className = 'contentText'>
              Vehicle to spawn: 
        </Typography>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
        <Stack spacing={2} pl={10} direction="column" alignItems="center" divider={<Divider orientation="horizontal" flexItem />}>
            < SpawnTextField control = {methods.control} />
            <Button variant="outlined" color='primary' id='spawn_vehicle' type='submit'>Spawn vehicle</Button>
            <Button variant="outlined" color='info' id='get_into_vehicle' type='button' onClick={onClick}>Get into vehicle</Button>
        </Stack>
        </form>
        <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '50vh' }}>
            Couldn't find last vehicle!
          </Alert>
        </Snackbar>

    </>
  )
}

