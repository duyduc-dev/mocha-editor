import AppStartUp from '@renderer/containers/AppStartUp';
import { Outlet } from 'react-router';
import ModalRoot from '../ModalRoot';

const AppContainer = () => {
  return (
    <>
      <Outlet />
      <AppStartUp />
      <ModalRoot />
    </>
  );
};

export default AppContainer;
