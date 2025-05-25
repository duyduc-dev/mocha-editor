import AppStartUp from '@renderer/containers/AppStartUp';
import { Outlet } from 'react-router';
import ModalRoot from '../ModalRoot';
import Layout from '../Layout';
import Editor from '@renderer/components/features/Editor';
import { useEffect } from 'react';
import DoubleShiftEvent from '@renderer/events/DoubleShiftEvent';
import { useAppDispatch } from '@renderer/store/common';
import { showModal } from '@renderer/store/modal/slice';
import { ModalType } from '@renderer/containers/ModalRoot/constants';

const AppContainer = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return DoubleShiftEvent.on(() => {
      dispatch(
        showModal({
          type: ModalType.SEARCH_FILE_NODES,
        }),
      );
    });
  }, []);

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
