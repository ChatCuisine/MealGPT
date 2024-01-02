import React, { createContext, useState, useContext } from "react";

const CarrotContext = createContext();

export const CarrotProvider = ({ children }) => {
  const [carrotCount, setCarrotCount] = useState(8);

  const updateCarrotCount = (newCount) => {
    setCarrotCount(newCount);
  };

  return (
    <CarrotContext.Provider value={{ carrotCount, updateCarrotCount }}>
      {children}
    </CarrotContext.Provider>
  );
};

export const useCarrot = () => {
  return useContext(CarrotContext);
};
