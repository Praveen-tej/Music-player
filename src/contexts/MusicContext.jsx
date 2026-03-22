import { createContext } from "react";
const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  return <MusicContext.Provider>{children}</MusicContext.Provider>;
}