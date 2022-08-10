import React, { useEffect, useState} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import {itemList} from './Data';
import {navButtons} from './Data';
import { getList, filterList } from "./util";
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Filter from './Filter';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import ExpandContent from './ExpandContent'
import { fetchNui } from '../utils/fetchNui';


export var sorted: any;

export default function ListEntries() {
  const theme = createTheme({
    palette: { primary: { main: "#08ff14" } },
        components: {
          MuiListItemButton: {
            styleOverrides: {
              root: {
                backgroundColor: "green",
                "&.Mui-selected": {
                  backgroundColor: "green",
                  "&.Mui-focusVisible": { background: "#08ff14" } 
                }
              }
            }
          }
        }
  });

   const padding = {
    mb: 0.2,
     ml: 0.4,
    mr: 0.4, 
    borderBottom: 1,
    height: 50,
    borderColor: '#607d8b' ,
    borderRadius: '3px',
    bgcolor: '#bdbdbd'
  } 
 
  const label = { inputProps: { 'aria-label': 'Favourites button' } };
  
  const [checked, setChecked] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);


  const handleToggle = (value: number, checkable: boolean, text: string, expandable: boolean ) => () => {
    if (expandable || checkable) {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
    } 
  };

  const handleSelect = (value: number, checkable: boolean, text: string, expandable: boolean ) => () => {
    if (expandable || checkable) {
      const currentIndex = selected.indexOf(value);
      const newSelected = [...selected];
      if (currentIndex === -1) {
        newSelected.push(value);
      } else {
        newSelected.splice(currentIndex, 1);
      }
      setSelected(newSelected);
    } 
    const bool = !selected.includes(value)
    let data =  { text, bool }
    fetchNui('fetch_ui_input', data).then(retData => {
      console.log(retData)
    }).catch(e => {
      console.log('callback error', e)
    }) 
  };

  const [value] = React.useState(0);
  const [filteredList, setFilteredList] = useState<any[]>([]);  /* React.useState(null) */

  const handleToggle1 = (e: string) => {
    let type = e;
    type !== "all"
      ?  setFilteredList(filterList(type)) 
      :  setFilteredList(getList());   
  };


  var [items] = useState(itemList);
 
  useEffect(() => {
    sorted = [...items].sort(  (a, b) => { 
      if (a.text.toLowerCase() < b.text.toLowerCase()){
        return -1;
      }
      else return 1;
    }); 
    
    sorted = sorted.sort( (a: any, b: any) => {return b.favorite - a.favorite});
  }, [items]);
  
  useEffect(() => {
    
    const data = window.localStorage.getItem('checkbox_state');
    if (data !== null && data.length > 2) {
      const parsed = JSON.parse(data)
      setChecked(parsed);
      for (let i = 0; i < parsed.length; i++) {
        //const objIndex = items.findIndex((obj => obj.checkboxId == parsed[i]));
        const objIndex = items.find((obj => obj.checkboxId === parsed[i]));
        if (objIndex != null) {
          items[objIndex.id].favorite = items.length - i
        }
      }; 
      
    }
  }, [items]);

  useEffect(() => {
    window.localStorage.setItem('checkbox_state', JSON.stringify(checked))
  }, [checked]);


  useEffect(() => {
    setFilteredList(getList());
  }, []);


  const expandFunction = (id: number) => {
  if (selected.includes(id)) {
    return <ExpandLess />
  } else {
    return <ExpandMore />
  }}



  return ( 
      <>
      <Box sx={{ width: '100%' }}>
        <BottomNavigation
          showLabels
          value={value}
          sx = { { bgcolor: '#37474f' } }
          onChange={(event, newValue) => {
            handleToggle1(newValue)
          }}   
        >

          {navButtons &&
            navButtons.map( (type, index) => (
            <BottomNavigationAction  key={index} value={type.value} icon={type.icon} label={type.label}/>
          ))};

        </BottomNavigation>
      </Box>
      <Divider />
      <Filter />
      <ThemeProvider theme={theme}>
      <Divider/>
      <List
          sx={ {width: '100%', maxWidth: 460, bgcolor: '#607d8b', maxHeight: '102ch', overflow: 'auto '} } 
          component="nav"
          id = 'list'   
      >
        {filteredList &&
          filteredList.map(({ id, text, checkboxId, checkable, expandable }) => (
            <>
              <ListItemButton className = 'listElement'   sx = {padding}    key = {id} selected={checkable && selected.includes(id)}  onClick={handleSelect(id, checkable, text, expandable)} >
              <ListItemIcon>
                <Checkbox {...label}  icon={<FavoriteBorder />} key ={checkboxId} checkedIcon={<Favorite color='error' />}  onChange={handleToggle(checkboxId, checkable, text, expandable)} checked = {checked.includes(checkboxId)}/>
              </ListItemIcon>
                <ListItemText primary={text} className='option' />
               {expandable && expandFunction(id)}
              </ListItemButton> 
              {expandable  &&
              <Collapse  in={selected.includes(id)} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  '& > :not(style)': { pb: 2, width: '76%' },
                  bgcolor: '#424242',
                  maxWidth: '100%',
                  borderRadius: '6px',
                  mt: '-2px',
                  ml: '2px',
                  mr: '2px'
                }}
              >
                <ExpandContent option = {id} />
              </Box>   
              </Collapse>
              }
            </>
          ))}
      </List>
      </ThemeProvider>


      </>
    
  );
  
  
}




    
    
  