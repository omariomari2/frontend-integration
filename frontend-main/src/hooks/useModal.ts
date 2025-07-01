import { useCallback, useRef, useState } from 'react';
import { ModalRef } from '../components/ui/Modal';

export function useModal(initialVisible = false) {
  const [visible, setVisible] = useState(initialVisible);
  const modalRef = useRef<ModalRef>(null);

  const show = useCallback(() => {
    setVisible(true);
    // Wait for the next tick to ensure the ref is set
    requestAnimationFrame(() => {
      modalRef.current?.open();
    });
  }, []);

  const hide = useCallback(() => {
    modalRef.current?.close();
  }, []);

  const onDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    visible,
    show,
    hide,
    onDismiss,
    modalRef,
  };
}
