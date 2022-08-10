import React from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Control, Controller } from 'react-hook-form';
import { FormFields } from '../BanContent';
import Typography from '@mui/material/Typography';


export default function FixedBanLength({control}: {control: Control<FormFields>}) {

  const [alignment, setAlignment] = React.useState('perm');
  const handleChange = (event: any, newAlignment: any) => {
    setAlignment(newAlignment);
  }; 

  return (
    <>
      <Typography pl={2} pt={2}  color="white" component="div" className = 'contentText'>
        Fixed ban length:
      </Typography>
      <Controller
        control = {control}
        name = {'fixedBanLength'}
        render = {({ field: { onChange, value } }) => (
          <ToggleButtonGroup
            color="primary"
            value={ value }
            exclusive
            sx={{
              pl:"2%"
            }}
            onChange={onChange}
          >
            <ToggleButton value="1day">1 day</ToggleButton>
            <ToggleButton value="3day">3 day</ToggleButton>
            <ToggleButton value="7day">1 week</ToggleButton>
            <ToggleButton value="30day">1 month</ToggleButton>
            <ToggleButton value="perm">permanent</ToggleButton>
          </ToggleButtonGroup>
          
        )}
      />
        
    </>
  )
}
