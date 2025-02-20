import { createContext, useState, useContext } from 'react';

const ZimanContext = createContext();

export const ZimanProvider = ({ children }) => {
  const [ziman, setZiman] = useState('ku');
  
  const guhertinZiman = () => {
    const nZiman = ziman === 'ku' ? 'en' : 'ku';
    setZiman(nZiman);
    document.documentElement.dir = nZiman === 'ku' ? 'rtl' : 'ltr';
  };

  return (
    <ZimanContext.Provider value={{ ziman, guhertinZiman }}>
      {children}
    </ZimanContext.Provider>
  );
};

export const bikaranînaZiman = () => useContext(ZimanContext); 