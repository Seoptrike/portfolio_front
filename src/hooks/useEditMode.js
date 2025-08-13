import { useContext } from "react";
import { EditModeContext } from "../context/EditModeContext";

export default function useEditMode() {
  return useContext(EditModeContext);
}
