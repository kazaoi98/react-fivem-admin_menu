import BanButtons from './Ban/BanButtons'
import Reason from './Ban/Reason'
import TextFieldComp, { defaultTextFieldValue, FormField, pTarget } from './TextFieldComponent/TextFieldComp';
import FixedLength from './Ban/FixedBanLength';
import CustomDates from './Ban/CustomDates';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { fetchNui } from '../utils/fetchNui';
import Typography from '@mui/material/Typography';


interface Form {
  reasonText: string;
  fixedBanLength: string;
  customDate: string;
  useCustomDate: boolean;
}

export interface FormFields extends Form, FormField {}

export const DefaultValues = {
  defaultTextFieldValue,
  reasonText: '',
  fixedBanLength: 'perm',
  customDate: '2022 12:00 pm',
  useCustomDate: false
};

const onSubmit: SubmitHandler<FormFields> = (data) => {
  console.log(data)
  fetchNui('ban_form_data', data).then(retData => {
    console.log(retData)
  }).catch(e => {
    console.log('callback error', e)
  })
};

export default function BanContent() {
  
  const textFieldMethod = useForm<FormField>({defaultValues: defaultTextFieldValue,})
  const methods = useForm<FormFields>({defaultValues: DefaultValues,})

  return (
    <>
    <form onSubmit={methods.handleSubmit(onSubmit)} className="form">

        <Typography pl={2} pt={2}  color="white" component="div" className = 'contentText'>
            Search for target:  
        </Typography>
        <TextFieldComp control={textFieldMethod.control} /> 

        <Reason control={methods.control} />

        <FixedLength control={methods.control} />

        <CustomDates control={methods.control} />

        < BanButtons />
    </form>
    </>
  )
}

