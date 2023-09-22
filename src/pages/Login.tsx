import React, { useState } from "react";
import InputField from "../components/Form/InputField";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { auth } from "../config/firebase-config";
import {
  IUserSignInData,
  useGoogleSignupMutation,
} from "../store/API/userAuthAPI";
// import { Auth, AuthProvider } from "firebase/auth";
import {
  useEmailLoginMutation,
  useFacebookSignupMutation,
} from "../store/API/userAuthAPI";
import googleIcon from "../assets/google.svg";
import facebookIcon from "../assets/facebook.svg";
import AuthButtons from "../components/Buttons/AuthButtons";

const Login = () => {
  const [emailLogin] = useEmailLoginMutation();
  const [googleSignup] = useGoogleSignupMutation();
  const [facebookSignup] = useFacebookSignupMutation();

  // const x: AuthProvider = auth;
  // console.log("auth", x);
  // const dispatch = useDispatch();
  const initialState: IUserSignInData = {
    email: "",
    password: "",
  };

  // const navigate = useNavigate();
  const [data, setData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await toast
      .promise(emailLogin(data).unwrap(), {
        pending: "Logging in...",
        success: "Successfully Logged in!",
        error: "Could not login!",
      })
      .then((res) => console.log(res))
      .catch((err) => toast.error(err));
  };

  const GoogleAuth = async () => {
    await toast
      .promise(googleSignup(null).unwrap(), {
        pending: "Logging in...",
        success: "Successfully Logged in!",
        error: "Could not login!",
      })
      .then((res) => console.log(res))
      .then(() => {
        // navigate("/login");
        // toast.info("Please login to continue");
      })
      .catch((err) => toast.error(err));
  };

  const FacebookAuth = async () => {
    await toast
      .promise(facebookSignup(null).unwrap(), {
        pending: "Logging in...",
        success: "Successfully Logged in!",
        error: "Could not login!",
      })
      .then((res) => console.log(res))
      .then(() => {
        // navigate("/login");
        // toast.info("Please login to continue");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login to account
            </h1>
            <div className="flex justify-between gap-3">
              <AuthButtons
                icon={googleIcon}
                text="Login with google"
                onClick={GoogleAuth}
              />
              <AuthButtons
                icon={facebookIcon}
                text="Login with Facebook"
                onClick={FacebookAuth}
              />
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <InputField
                label="Enter Your Email"
                onChange={handleChange}
                name="email"
                placeholder="youremail@gmail.com"
                required
                type="email"
                value={data.email}
              />
              <InputField
                label="Your Password"
                name="password"
                onChange={handleChange}
                placeholder="********"
                required
                type="password"
                value={data.password}
              />
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
