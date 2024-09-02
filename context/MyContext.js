import { createContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [profilename, setProfilename] = useState("null");

  return (
    <MyContext.Provider value={{ profilename, setProfilename }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;