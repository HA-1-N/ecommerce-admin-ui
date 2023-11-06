import React, { useEffect } from 'react';
import './App.css';
import AppRouter from '@/routes/AppRouter';
import { useAppSelector } from './app/hook';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

function App() {
  const [api, contextHolder] = notification.useNotification();

  const notificationMsg = useAppSelector((state) => state.app.notification);

  useEffect(() => {
    if (notificationMsg) {
      const { type, message, description } = notificationMsg;
      api[type as NotificationType]({
        message,
        description,
      });
    }
  }, [notificationMsg]);

  return (
    <>
      {contextHolder}
      <div className="App">
        <AppRouter />
      </div>
    </>
  );
}

export default App;
