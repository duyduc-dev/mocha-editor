import AppStartUp from '@renderer/containers/AppStartUp';
import ModalRoot from '../ModalRoot';
import Layout from '../Layout';
import Editor from '@renderer/components/features/Editor';
import AppEvent from '../AppEvent';

const AppContainer = () => {
  return (
    <>
      <Layout>
        <Editor />
      </Layout>
      <AppEvent />
      <AppStartUp />
      <ModalRoot />
    </>
  );
};

export default AppContainer;
