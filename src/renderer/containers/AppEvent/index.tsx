import DoubleShiftEvent from '@renderer/events/DoubleShiftEvent';
import { useAppDispatch } from '@renderer/store/common';
import { showModal } from '@renderer/store/modal/slice';
import { useEffect } from 'react';
import { ModalType } from '../ModalRoot/constants';

const AppEvent = () => {
  const dispatch = useAppDispatch();

  useEffect(handleDoubleShiftEvent, []);
  function handleDoubleShiftEvent() {
    return DoubleShiftEvent.on(() => {
      dispatch(
        showModal({
          type: ModalType.SEARCH_FILE_NODES,
        }),
      );
    });
  }

  return <></>;
};

export default AppEvent;
