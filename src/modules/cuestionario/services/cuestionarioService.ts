import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export const guardarCuestionario = async (data: any) => {
  return await addDoc(collection(db, "cuestionarios"), data);
};