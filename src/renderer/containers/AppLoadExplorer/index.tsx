import { useEffect } from 'react';
import { useAppDispatch } from '@renderer/store/common';
import { fetchExplorerSystem } from '@renderer/store/explorer/thunk';

const AppLoadExplorer = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      fetchExplorerSystem('/Users/ducdang/workspace/electron/mocha-editor'),
    );
  }, []);

  return <></>;
};

export default AppLoadExplorer;
