'use client';
import React, { useEffect, useState } from 'react';
import {useAuth} from './useAuth';

const AuthDialogProvider = () => {
  const { open } = useAuth();

  return (
    <>
      <div>
        <h1>Test component</h1>
        <p>State: {open}</p>
      </div>
    </>
  );
};

export default AuthDialogProvider;
