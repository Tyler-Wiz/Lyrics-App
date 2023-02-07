import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validations/Login";
import { LoginUser } from "@/libs/IUser";
import Image from "next/image";
import logo from "@/assets/img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/reducers/authSlice";
import { useRouter } from "next/router";
import { RootState } from "@/store/store";

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginUser>({
    resolver: yupResolver(loginSchema),
  });

  const { loginStatus, loginError, token } = useSelector(
    (state: RootState) => state.auth
  );

  let router = useRouter();
  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token, router]);

  const dispatch = useDispatch()<any>;
  const onSubmit = (data: LoginUser) => {
    dispatch(loginUser(data));
  };

  return (
    <form onClick={handleSubmit(onSubmit)}>
      <div className="h-screen flex flex-col items-center pt-10 font-Poppins text-xs bg-navbackground capitalize">
        <div className="relative w-44 mb-6">
          <Image src={logo} alt="logo" />
        </div>
        <div className="p-8 rounded-lg border border-lightBlack">
          <div className="flex flex-col mb-4">
            <label htmlFor="loginemail">username or Email Address</label>
            <input
              type="email"
              id="loginemail"
              className=" outline-none w-72 border rounded-lg px-2 py-2 mt-2 border-lightBlack"
              {...register("email")}
            />
            {errors.email && (
              <div className=" text-error text-left mt-3">
                {errors.email.message}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="loginpassword">password</label>
            <input
              type="password"
              id="loginpassword"
              className="outline-none w-72 border rounded-lg px-2 py-2 mt-3"
              autoFocus
              {...register("password")}></input>
            {errors.password && (
              <div className="text-error text-left mt-3 text-xs">
                {errors.password.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="mt-10 border px-6 py-2 text-sm bg-accentColor uppercase text-primary">
            Login
          </button>
          {loginStatus === "rejected" ? (
            <div className=" text-error">
              <p>{loginError}</p>
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
