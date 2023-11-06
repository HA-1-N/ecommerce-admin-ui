import { useAppSelector } from '@/app/hook';
import React from 'react';

const LayoutApp = () => {
  const currentUser = useAppSelector((state) => state?.auth?.currentUser);
  console.log('CurrentUser...', currentUser);

  return (
    <>
      <div>LayoutApp</div>
    </>
  );
};

export default LayoutApp;
