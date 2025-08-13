import { createContext } from "react";

export const EditModeContext = createContext({
  editMode: false,
  setEditMode: () => {},
});