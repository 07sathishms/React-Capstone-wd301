import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginUser } from "../../utils/apiUtils";
import { UserContext } from "../../context/user";

type Inputs = {
  email: string;
  password: string;
};

const SigninForm: React.FC = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      console.log(user);
      navigate("/");
    } catch (error: any) {
      const err = JSON.parse(error.message);
      setError(err.errors[0]);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <span className="text-red-600 dark:text-red-400">{error}</span>}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter the email"
          autoFocus
          {...register("email", { required: true })}
          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none    ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && <span>Email is required</span>}
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter the password"
          {...register("password", { required: true })}
          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none    ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && <span>This field is required</span>}
      </div>
      <p className=" mt-2   ">
      New user? Create your account here.
        <Link to={"/signup"} className="text-red-600">
          Sign Up
        </Link>
      </p>
      <button
        type="submit"
        className="w-full bg-red-700 hover:bg-red-800 
      
        text-white font-semibold py-2 px-4 rounded-md 
        focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Sign In
      </button>
    </form>
  );
};

export default SigninForm;
