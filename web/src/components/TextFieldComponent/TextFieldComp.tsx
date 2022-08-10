import { Control, Controller} from "react-hook-form";
import React from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useNuiEvent } from "../../hooks/useNuiEvent";
import { fetchNui } from "../../utils/fetchNui";


export interface pTarget {
  name: string;
  id: number;
  steam: string;
  fivem: string;
  discord: string;
  note: string;
}

export interface FormField {
  playerTarget: pTarget;
}

export const defaultTextFieldValue = {
  playerTarget: {
    name: "No Target Selected",
    id: 0,
    steam: "",
    fivem: "",
    discord: "",
    note: ""
  },
}

export default function TextFieldComp({control}: {control: Control<FormField>}) {

    const [playerList, setplayerList] = React.useState<any[]>([])
    const [open, setOpen] = React.useState(false);
    useNuiEvent('playerList', setplayerList)
    const loading = open && playerList.length === 0;
    

    React.useEffect(() => {
      
     
      let active = true;

      if (!loading) {
        return undefined;
      }
    
       (async () => {
        
        if (active) {
          //setplayerList([...playerList]);
          await fetchNui('playerList').then(retData => {
            setplayerList([retData])
            
          }).catch(e => {
            console.log('callback error', e)
          })
        }
      })(); 

      
    
      return () => {
        active = false;
      };
    }, [loading]);



    return ( 
      <>
        <Controller
                control = {control}
                name = {'playerTarget'}
                
                render = {({ field/* : { onChange, value } */ }) => (
                    ////
                    <Autocomplete
                        {...field}
                        id="asynchronous-demo"
                        sx={{ width: '100%', pl:5, pt:1}}
                        open={open}
                        onOpen={() => {
                          setOpen(true);
                        }}
                        onClose={() => {
                          setOpen(false);
                        }}
                        isOptionEqualToValue={(option: any , value: any) => option.steam === value.steam}
                        getOptionLabel={(option: any) => `[${option.id}] ${option.name} ${option.steam}`} 
                        options={playerList}
                        loading={loading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="input target "
                                id='async_textfield'
                                required = {true}
                                variant="outlined"
                                InputProps={{
                                  ...params.InputProps,
                                    endAdornment: (
                                      <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                      </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                        onChange = {(_, data) => {
                            field.onChange(data);
                            //return data;
                        }}
                        //defaultValue = {DefaultValues.playerTarget}
                    />
                    ////
                )}
          />
      </>
        
    );
            
}