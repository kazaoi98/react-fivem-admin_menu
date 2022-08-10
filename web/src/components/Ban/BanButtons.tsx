import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

export default function BanButtons() {
  return (
    <>
    
    <Stack spacing={2} ml={10} direction="row" divider={<Divider orientation="vertical" flexItem />} justifyContent="center">
   
        <Button variant="outlined" color='error' id='ban_Button' type='submit'>Ban player</Button>
        <Button variant="outlined" color='warning' id='kick_button' type='submit'>Kick player</Button>
        {/* <Button variant="outlined" color='primary' id='unban_button' type='submit'>Unban player</Button> */}
    </Stack>
    </>
  )
}
