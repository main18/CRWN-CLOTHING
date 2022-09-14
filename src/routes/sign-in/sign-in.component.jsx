import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
  createUserDocumentFromAuth,
  signinWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const Signin = () => {
  const logGoogleUser = async () => {
    const { user } = await signinWithGooglePopup();
    console.log(user);
    const userRefDoc = await createUserDocumentFromAuth(user);
    console.log(userRefDoc);
  };

  return (
    <>
      <h1>Signin page</h1>
      <button onClick={logGoogleUser}>Signin with Google</button>
      <SignUpForm />
    </>
  );
};

export default Signin;
