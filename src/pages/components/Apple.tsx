import { useRootStore } from '@/stores';
import React from 'react';

const Apple = () => {
  const { countStore } = useRootStore();

  return <div>Apple count:{countStore?.count}</div>;
};

export default Apple;
