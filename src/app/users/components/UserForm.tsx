'use client';

import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RHFTextField from '@nish1896/rhf-mui-components/mui/textfield';
import RHFSelect from '@nish1896/rhf-mui-components/mui/select';
import { User, Gender } from '@/types';

type UserFormProps = {
  title: string;
  initialData?: User;
  onSubmit: (userInfo: User) => void;
};

export default function UserForm({
  title,
  initialData,
  onSubmit
}: UserFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialData
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant='h4' color='primary'>
            {title}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <RHFTextField
            fieldName="name"
            control={control}
            registerOptions={{
              required: {
                value: true,
                message: 'Please enter user name'
              },
              minLength: {
                value: 2,
                message: 'Min length should be 2'
              }
            }}
            errorMessage={errors?.name?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <RHFTextField
            fieldName="age"
            control={control}
            registerOptions={{
              required: {
                value: true,
                message: 'Please enter age'
              },
              min: {
                value: 18,
                message: 'Minimum age should be 18'
              },
              valueAsNumber: true
            }}
            type="number"
            errorMessage={errors?.age?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <RHFSelect
            fieldName="gender"
            control={control}
            registerOptions={{
              required: {
                value: true,
                message: 'Please select gender'
              }
            }}
            options={Object.values(Gender)}
            errorMessage={errors?.gender?.message}
          />
        </Grid>
        <Grid size={12}>
          <Button type="submit" variant='outlined'>Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
}
