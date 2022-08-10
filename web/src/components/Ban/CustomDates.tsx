import React from 'react'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Divider from '@mui/material/Divider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Control, Controller } from 'react-hook-form';
import { FormFields } from '../BanContent';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';

export default function CustomDates({control}: {control: Control<FormFields>}) {

   //const [value, setValue] = React.useState(new Date('2022-08-18T21:11:54'));
//
   // const handleChange1 = (event: any, newValue: any) => {
   //  setValue(newValue);
   //};  

 

  const [toggle, setToggle] = React.useState(true)

  const handleToggle = () => {
    setToggle(!toggle)
  };

  return (
    <>
      <Typography pl={2} pt={2} mb={1} color="white" component="div" className = 'contentText'>
                Custom date (optional): 
      </Typography>
      <Controller 
        control = {control}
        name = {'customDate'}
        render = {({ field: { onChange, value } }) => (
          <Box
            sx={{
              '& > :not(style)': { ml: 5, width: '100%', mb: 2 },
            }}
          >
          <LocalizationProvider dateAdapter={AdapterDateFns} >
            <DateTimePicker
                  label="Custom Ban date (optional): "
                  value={ value }
                  disabled={toggle}
                  onChange={ onChange }
                  renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          
          <Divider />
        </Box>
        
        )}
      />

      <Controller 
        control = {control}
        name = {'useCustomDate'}
        render = {({ field: { value } }) => ( 
          <FormControlLabel sx = {{ml: 10, mb: 2}} control={<Switch defaultChecked = {value} onChange = {handleToggle} />} label="use custom date"/>     
        )}
      />

        
      </>
  )
}
