import React from 'react'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Control, Controller } from 'react-hook-form';
import { FormFields } from '../BanContent';

export default function Reason({control}: {control: Control<FormFields>}) {


  return (
    <>
      <Typography pl={2} pt={2}  color="white" component="div" className = 'contentText'>
              Reason: 
      </Typography>
        <Controller
          control = {control}
          name = {'reasonText'}
          render = {({ field: { onChange, value } }) => (
            <Box
              //component="form"
              sx={{
                '& > :not(style)': { ml: 5, width: '100%' },
              }}
              
            >
              <TextField
                id="filled-basic"
                label="Reason"
                
                placeholder = 'Reason is not required'
                onChange={onChange}
                variant="filled"
                multiline rows={2}
                value = {value}
              />
            </Box>
          )}
        />

          
    </>
  )
}

/* import React from 'react'
import BanButtons from './Ban/BanButtons'
import Reason from './Ban/Reason'
import TextFieldComp from './Ban/TextFieldComp';
import FixedLength from './Ban/FixedBanLength';
import CustomDates from './Ban/CustomDates';

export default function BanContent() {

  return (
    <>
      
      <TextFieldComp />

      <Reason />
     
      <FixedLength />

      < BanButtons />

      <CustomDates />

          
    </>
  )
} */
