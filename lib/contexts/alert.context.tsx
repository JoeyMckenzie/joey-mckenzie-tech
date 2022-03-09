import { createContext, FC, useContext, useEffect, useState } from 'react';
import { ContextDispatch } from '../types/shared.types';

interface AlertContextState {
  openModal: boolean;
  openNotification: boolean;
  setOpenModal: ContextDispatch<boolean>;
  setOpenNotification: ContextDispatch<boolean>;
}

export const AlertContext = createContext<AlertContextState>({
  openModal: false,
  openNotification: false,
  setOpenModal: () => {},
  setOpenNotification: () => {},
});

const TIMEOUT = 5000;

const AlertContextProvider: FC = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    if (openModal) {
      setOpenNotification(false);
      setTimeout(() => setOpenModal(false), TIMEOUT);
    }
  }, [openModal, setOpenModal, setOpenNotification]);

  useEffect(() => {
    if (openNotification) {
      setOpenModal(false);
      setTimeout(() => setOpenNotification(false), TIMEOUT);
    }
  }, [openNotification, setOpenNotification, setOpenModal]);

  return (
    <AlertContext.Provider
      value={{
        openModal,
        openNotification,
        setOpenModal,
        setOpenNotification,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export function useAlertContext() {
  return useContext(AlertContext);
}

export default AlertContextProvider;
