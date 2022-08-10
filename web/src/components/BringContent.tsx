import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextFieldComp, { FormField } from './TextFieldComponent/TextFieldComp';
import { useForm } from 'react-hook-form';


const DefaultValues = {
  playerTarget: {
    name: "No Target Selected",
    id: 0,
    steam: "",
    fivem: "",
    discord: "",
    note: ""
  },
};

export default function Asynchronous() {
  
  const methods = useForm<FormField>({defaultValues: DefaultValues,})

  return (
    
    <>
      <Typography pl={2} pt={2}  color="white" component="div" className = 'contentText'>
        Type or search ID of target: 
      </Typography>
      <TextFieldComp control = {methods.control} /> 
      <Stack spacing={1} pl={13} direction="row">
        <Button variant="outlined" >Bring target</Button>
      </Stack>
    </>
  );
}

