import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextFieldComp, { defaultTextFieldValue, FormField} from './TextFieldComponent/TextFieldComp';
import {SubmitHandler, useForm } from 'react-hook-form';
import Divider from '@mui/material/Divider';

import TextFieldTeleport, { IFormCoords} from './Teleport/TextFieldTeleport';
import { fetchNui } from '../utils/fetchNui';


interface  IForm {
  form: string;
}

interface ITeleportTarget extends IForm, FormField {}

const teleportTargetDefault = {
  playerTarget: {
    name: "No Target Selected",
    id: 0,
    steam: "",
    fivem: "",
    discord: "",
    note: ""
  },
  form: 'teleportToTarget'
}

const teleportCoordsDefaults = {
  tpCoordinates: {
    X_coord: 0,
    Y_coord: 0,
    Z_coord: 0,
  },
} 

export default function Asynchronous() {

  const methods = useForm<ITeleportTarget>({defaultValues: teleportTargetDefault,})
  const methods1 = useForm<IFormCoords>({defaultValues: teleportCoordsDefaults})
  const {control} = useForm<FormField>({defaultValues: defaultTextFieldValue,})

  const onSubmit: SubmitHandler<ITeleportTarget> = (data) => {

    fetchNui('TeleportToTarget', data).then(retData => {
      console.log(retData)
    }).catch(e => {
      console.log('callback error', e)
    }) 
  };

  const onSubmit1: SubmitHandler<IFormCoords> = (data) => {

    fetchNui('TeleportToCoords', data).then(retData => {
      console.log(retData)
    }).catch(e => {
      console.log('callback error', e)
    }) 
  };
  
  const tpToMarker = () => {
    fetchNui('TeleportToMarker').then(retData => {
      console.log(retData)
    }).catch(e => {
      console.log('callback error', e)
    }) 
  };

  return (
    
    <>
      <Typography pl={2} pt={2} color="white" component="div">
        Type or search teleport target: 
      </Typography>
      
      <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
        <TextFieldComp control={control}/>

        <Stack spacing={1} pl={10} pt={2} direction="row">
          <Button variant="contained" type='submit'>Teleport to target</Button>
        </Stack>
      </form>

      <Typography pl={2} color="white" component="div">
        Teleport to x, y, z cooridnates: 
      </Typography>

      <form onSubmit={methods1.handleSubmit(onSubmit1)} className="form">
        <Stack spacing={3} pl={10} direction="column" alignItems="center">
          <TextFieldTeleport control = {methods1.control} />
        </Stack>
        <Stack spacing={2} pl={10} pt = {2} direction="column" divider={<Divider orientation="horizontal" />} justifyContent="center" >
          <Button variant="contained" color='inherit' type = "submit">Teleport to coords</Button>
          <Button variant="contained" color="info" onClick={tpToMarker}>Teleport to marker</Button>
        </Stack>
      </form>
    </>
  );
}

