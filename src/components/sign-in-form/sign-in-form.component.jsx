import { useState } from "react";
import {
  signInWithGoogle,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase.utils";

import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFeild = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFeild);
  const { email, password } = formFields;

  //console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFeild);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("Invalid email or password");
      } else {
        alert("Error occured");
      }
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
