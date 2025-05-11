import AppStartUp from '@renderer/containers/AppStartUp';
import { Outlet } from 'react-router';

const AppContainer = () => {
  return (
    <>
      <Outlet />
      <AppStartUp />
    </>
  );
};

export default AppContainer;
