import style from "./index.module.scss";
import {auth, provider} from "../../database/firebase";
import { useEffect, useState } from "react";

function Login() {
  const [user, setUser] = useState();
  const [errorMsg, setErrorMsg] = useState(null);

  //on component mount, look for current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });
    return unsubscribe;
  }, [])

  const signIn = async () => {
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      setErrorMsg("Error detected. Please try logging in/out again")
    }
  }

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch(error) {
      setErrorMsg("Error detected. Please try logging in/out again")
    }
  }

  return (
    <div className={style.loginButton}>
      {errorMsg}
      <button onClick={signIn}>Sign In</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default Login;
