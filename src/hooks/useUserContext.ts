import { useContext } from "react";
import { UserContext } from "../context";
import { UserContextType } from "../types";

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
