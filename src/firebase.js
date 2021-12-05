import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import config from "./config";

initializeApp(config);
const db = getFirestore();

export const signUpUser = async ({ email, password, firstName, lastName }) => {
  const auth = getAuth();
  const authUser = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(authUser.user, {
    displayName: `${firstName} ${lastName}`,
  });
  const { uid } = authUser.user;
  const userDb = doc(db, "users", uid);
  setDoc(userDb, {
    email,
    firstName,
    lastName,
    uid,
    _createdOn: new Date(),
  });
};
export const loginUser = async ({ email, password }) => {
  console.log({ email, password });
  const auth = getAuth();

  return await signInWithEmailAndPassword(auth, email, password);
};
