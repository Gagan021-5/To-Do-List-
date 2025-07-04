import { createContext, useState } from "react";

export const ThemeContext = createContext();


export default function ThemeProvider({ children }) {
    const [isdark, setisdark] = useState(false);
    const toggletheme = () => {
      setisdark((prev) => !prev);
    };
 return  (<ThemeContext.Provider value={{ isdark, toggletheme }}>
    {children}
  </ThemeContext.Provider>);
}
