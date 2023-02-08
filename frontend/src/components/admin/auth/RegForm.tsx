import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegistrationSchema } from "@/common/validations/Registration";
import logo from "@/assets/img/logo.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { registerUser } from "@/store/reducers/authSlice";
import { useRouter } from "next/router";
import { UserRegisterForm } from "@/common/models/IUser";

const RegForm = () => {
  // React Hook Form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserRegisterForm>({
    resolver: yupResolver(RegistrationSchema),
  });

  // Get State from authSlice //
  const { registerStatus, registerError, token } = useSelector(
    (state: RootState) => state.auth
  );

  // Verify if User already Exist in Local Storage and Redirect to Dashboard //

  let router = useRouter();
  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token, router]);

  // submit form to server via authSlice"
  const dispatch = useDispatch()<any>;
  const onSubmit = (data: UserRegisterForm) => {
    dispatch(registerUser(data));
  };

  return (
    <form onClick={handleSubmit(onSubmit)}>
      <div className="h-screen flex flex-col items-center pt-10 font-Poppins text-xs bg-navbackground capitalize">
        <div className="relative w-44 mb-6">
          <Image src={logo} alt="logo" />
        </div>
        <div className="p-8 rounded-lg border border-lightBlack">
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="">
              Username
            </label>
            <input
              type="text"
              id="name"
              className=" outline-none w-72 border rounded-lg px-2 py-2 mt-2 border-lightBlack"
              {...register("name")}
            />
            {errors.name && (
              <div className="text-red-500 text-left mt-3">
                {errors.name.message}
              </div>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="loginemail" className="">
              username or Email Address
            </label>
            <input
              type="email"
              id="loginemail"
              className=" outline-none w-72 border rounded-lg px-2 py-2 mt-2 border-lightBlack"
              {...register("email")}
            />
            {errors.email && (
              <div className="text-red-500 text-left mt-3">
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
              <div className="text-red-500 text-left mt-3">
                {errors.password.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="mt-6 border px-6 py-2 text-sm bg-accentColor uppercase text-primary">
            Sign Up
          </button>
          {/*display registration error */}
          {registerStatus === "rejected" ? (
            <div className=" text-error my-2 text-center">
              <p>{registerError}</p>
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default RegForm;
