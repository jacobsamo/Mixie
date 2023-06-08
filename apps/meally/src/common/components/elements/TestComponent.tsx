'use client';
import React from 'react';
import {useAuth} from 'src/common/hooks/useAuth';

const TestComponent = () => {
  const { open } = useAuth();

  return <button onClick={() => }>Test button</button>;
};

export default TestComponent;
