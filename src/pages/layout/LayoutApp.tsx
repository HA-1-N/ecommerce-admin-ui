import { useAppSelector } from '@/app/hook';
import React, { useEffect } from 'react';

const LayoutApp = () => {
  const currentUser = useAppSelector((state) => state?.auth?.currentUser);

  return (
    <>
      <div>LayoutApp</div>
    </>
  );
};

export default LayoutApp;
