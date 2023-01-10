'use client';
import { TextField } from '@mui/material';
import React from 'react';



const RecipeCreationForm = () => {
  return (
    <>
      <h1>Recipe Creation Form</h1>
      <TextField type={'text'} id="standard-basic" label="Recipe Name" variant="standard" fullWidth />
      <TextField type={'number'} id="standard-basic" label="Prep Time" variant="standard" fullWidth />
      <TextField type={'number'} id="standard-basic" label="Cook Time" variant="standard" fullWidth />
      <TextField type={'number'} id="standard-basic" label="Serves" variant="standard" fullWidth />
      <TextField type={'image'} id="standard-basic" label="Image" variant="standard" fullWidth />
      <TextField type={'text'} id="standard-basic" label="Recipe Description" variant="standard" fullWidth />

    </>
  );
};

export default RecipeCreationForm;
