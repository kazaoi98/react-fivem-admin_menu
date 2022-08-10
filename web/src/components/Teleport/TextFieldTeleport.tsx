import TextField from '@mui/material/TextField';
import { Controller, Control } from 'react-hook-form';

interface Itp {
  X_coord: number;
  Y_coord: number;
  Z_coord: number;
}

export interface IFormCoords {
  tpCoordinates: Itp,
}

export default function TextFieldTeleport({control}: {control: Control<IFormCoords>}) {
  return (
    <>
      <Controller 
          control = {control}
          name={'tpCoordinates.X_coord'}
          render = {({ field: { onChange, value } }) => (
              <TextField
                  id = 'xyz_teleport'
                  label = 'X'
                  required
                  onChange={onChange}
                  value = {value}
                  type="number"
                  defaultValue='0.0'
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
          )}
      />
      <Controller 
          control = {control}
          name={'tpCoordinates.Y_coord'}
          render = {({ field: { onChange, value } }) => (
              <TextField
                  id = 'xyz_teleport'
                  label = 'Y'
                  required
                  onChange={onChange}
                  value = {value}
                  type="number"
                  defaultValue='0.0'
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
          )}
      />
      <Controller 
          control = {control}
          name={'tpCoordinates.Z_coord'}
          render = {({ field: { onChange, value } }) => (
              <TextField
                  id = 'xyz_teleport'
                  label = 'Z'
                  required
                  onChange={onChange}
                  value = {value}
                  type="number"
                  defaultValue='0.0'
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
          )}
      />
    </>  
  )
}
