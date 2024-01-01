import { ReactNode, createContext, useContext, useState } from "react";
import Rest from "../components/Rest";

type Props = {
  children: ReactNode;
};

type AppContextType = {
  show: () => void;
  hide: () => void;
  setRest: (rest: number) => void
};

const defaultState: AppContextType = {
  show: () => {},
  hide: () => {},
  setRest: (rest: number) => {}
};
const RestContext = createContext(defaultState);
const RestProvider = ({ children }: Props) => {
  const [isShow, setIsShow] = useState(false);
  const [restTime, setRest] = useState(0);
  
  const handleShow = () => {
    setIsShow(true);
  };
  const handleHide = () => {
    setIsShow(false);
  };

  const handleRest = (rest: number) =>{
    setRest(rest);
  }

  const values = {
    show: handleShow,
    hide: handleHide,
    setRest: handleRest,
  };

  return (
    <RestContext.Provider value={values}>
      {children}
      {isShow && <Rest timeRest={restTime}/>}
    </RestContext.Provider>
  );
};

export { RestContext, RestProvider };
export const useRest = () => useContext(RestContext);
