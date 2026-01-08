import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;

  return (
    <AppContext.Provider value={ currency }>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
