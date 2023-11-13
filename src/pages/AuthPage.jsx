import { useState } from "react";
import { auth, provider } from "./../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate()
  //* google ile giriş yapma
  const handleGoogle = () => {
    signInWithPopup(auth,provider)
    .then(() => navigate("/feed"))
  };

  //* e-posta ile kayıt olma ve giriş yapma
  const handleSubmit = (e) => {
    e.preventDefault();
    if (signUp) {
      //* yeni hesap oluşturma
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => toast.success("Account created"))
        .catch((err) => toast.error(`Sorry, an error occurred:${err.code}`));
    } else {
      //* varolan hesaba giriş yapma
      signInWithEmailAndPassword(auth, email, password)
        .then(() => toast.success("Account logged in"))
        .catch((err) => {
          toast.error(`Sorry, an error occurred: ${err.code}`);
          //* şifre hatası varsa state'i true'ya çek
          if (err.code === "auth/invalid-login-credentials") {
            setError(true);
          }
        });
    }
  };

  // şifre sıfırlama e-postası
  const resetPassword = () => {
    sendPasswordResetEmail(auth,email)
    .then(() => toast.success('password reset request sent to your email'))
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className=" flex flex-col gap-10 py-16 px-32 rounded-md">
        {/* LOGO */}
        <div className="flex justify-center">
          <img className="h-[60px]" src="x-logo.png" alt="x-logo" />
        </div>

        <h1 className="text-center font-bold text-xl">Log in to Twitter</h1>

        {/* google butom */}
        <button
          onClick={handleGoogle}
          className="flex items-center bg-white text-black gap-3 cursor-pointer hover:bg-gray-300 duration-100 py-2 px-10 rounded-full"
        >
          <img className="h-[30px]" src="google-logo.svg" alt="google-logo" />
          <span className="whitespace-nowrap">Log in with google</span>
        </button>

        {/* giriş formu */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black mt-1 p-2 outline-none rounded"
            type="email"
            placeholder="Enter your email..."
            required
          />

          <label className="mt-3">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="text-black mt-1 p-2 outline-none rounded"
            type="password"
            placeholder="****"
            required
          />
          <button className="bg-white text-black mt-5 rounded-full p-1 font-bold hover:bg-gray-300 duration-100">
            {signUp ? "Sign up" : "Sign in"}
          </button>
          <p className="flex gap-3 mt-4 ">
            <span className="text-gray-400">
              {signUp
                ? "Already have an account"
                : "Dont you have an account ?"}
            </span>
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => setSignUp(!signUp)}
            >
              {signUp ? "Sign in" : "Sign up"}
            </span>
          </p>
        </form>

        {/* şifre hatası varsa sıfırlama butonu koyucaz */}
        {error && (
          <p
            onClick={resetPassword}
            className="text-center text-red-500 cursor-pointer"
          >
            Forgot your password?
          </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
