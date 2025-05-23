import AppStartUp from '@renderer/containers/AppStartUp';
import { Outlet } from 'react-router';
import ModalRoot from '../ModalRoot';
import Layout from '../Layout';
import Editor from '@renderer/components/features/Editor';

const AppContainer = () => {
  return (
    <>
      <Layout>
        <Editor />
      </Layout>
      <AppStartUp />
      <ModalRoot />
    </>
  );
};

export default AppContainer;
