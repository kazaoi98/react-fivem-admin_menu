import { Controller, Control } from 'react-hook-form';
import TextField from '@mui/material/TextField';

export interface Ispawn {
    vehicle_spawn: string;
}

export default function SpawnTextField({control}: {control: Control<Ispawn>}) {
  return (
    <Controller 
        control = {control}
        name={'vehicle_spawn'}
        render = {({ field: { onChange, value } }) => (
            <TextField
                id = 'vehicle_spawn_field'
                label = 'Vehicle to spawn:'
                required
                onChange={onChange}
                value = {value}
                type="text"
                defaultValue=''
                InputLabelProps={{
                  shrink: true,
                }}
            />
        )}
    />
  )
}
