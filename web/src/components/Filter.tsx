import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


var sFilter = () =>  {

  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput') as HTMLInputElement | null;
  filter = input!.value.toUpperCase();
  ul = document.getElementById("list");
  li = ul!.getElementsByClassName('listElement') as HTMLCollectionOf<HTMLElement>;

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByClassName("option")[0] as HTMLElement | null;
    txtValue = a!.textContent || a!.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}



export default function BasicTextFields() {
  
    
    return (
      <>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '96%' },
            bgcolor: '#607d8b',
            maxWidth: '100%',

          }}
          noValidate
          autoComplete="on"
        >
          
          <TextField id="myInput" label="Filter menu options" variant="filled" color="error" onChange={sFilter} sx = {{ width: '100ch'}}/>
          
        </Box>
        
        
        
   
      </>
    );
  }