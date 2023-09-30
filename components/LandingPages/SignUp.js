import React, { useState, useEffect } from "react";
import { SeaViewImage } from "../constants/imageConstant";
import { FaEye, FaUser, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "react-lottie";
// import * as animationData from "../../public/Assets/Rives/teddyRive.riv";
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import Rive from "rive-react";
import Register from "./Register";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { postRequest } from "@/config/axiosInterceptor";
import { loginUser } from "@/config/apiRoutes";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import PrimaryBtn from "../Button";
import { loggedInState } from "@/store/loggedInState";

// import teddyAnimation from "../../public/Assets/Rives/teddyRive.riv";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const setIsUserLoggedIn = loggedInState((state) => state.setIsUserLoggedIn);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    if (data) {
      try {
        const response = await postRequest({
          // url: registerUser,
          url: loginUser,
          body: {
            email: data.email,
            password: data.password,
          },
        });

        if (response) {
          Swal.fire({
            title: "Logged in Successfully",
            icon: "success",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              setIsUserLoggedIn(true);
              router.push("/dashboard");
            }
          });
        }
      } catch (error) {
        console.warn("Error", error);
        toast.error(error.response.data.message);
      }
    }
    // console.log(data);
  };

  const { RiveComponent } = useRive({
    src: "/Assets/rives/teddyrive.riv",
    stateMachines: "Login Machine",
    artboard: "Teddy",
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitWidth, // Change to: rive.Fit.Contain, or Cover
      alignment: Alignment.Center,
    }),
  });

  return (
    <motion.div
      className="w-full grid place-items-center"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "tween" }}
    >
      {showRegister ? (
        <Register setShowRegister={setShowRegister} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] lg:w-[60%]">
          <div className="flex flex-col gap-8 py-8">
            <RiveComponent />
            {/* <Rive src='../public/vehicles.riv' className='w-20 h-20'/> */}
            {/* <RiveComponent src='../../public/Assets/Rives/teddyRive.riv' animation='Teddy' className='base-canvas-size'/> */}
            <div>
              <div className=" bg-white relative flex items-center shrink-0">
                <input
                  type="email"
                  id="emailName"
                  autoComplete="off"
                  required
                  placeholder=" "
                  className="outline-none w-full h-full peer p-4 lg:p-2 rounded-md"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "* Please provide your email",
                    },
                    pattern: {
                      value: /\S+@\S+\.\S+/i,
                      message: "* Please enter a valid email id",
                    },
                  })}
                />
                <label
                  htmlFor="emailName"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 left-1"
                >
                  Email
                </label>
                <div className="px-4">
                  <MdOutlineAlternateEmail />
                  {/* <Lottie options={defaultOptions} height={40} width={40} /> */}
                </div>
              </div>
              <div className="pt-2">
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="bg-white relative flex items-center shrink-0">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder=" "
                  required
                  autoComplete="off"
                  className="outline-none w-full h-full peer p-4 lg:p-2 rounded-md"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "* Please provide your password  ",
                    },
                  })}
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 left-1"
                >
                  Password
                </label>
                <div
                  className="px-4 md:cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="pt-2">
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid place-items-center gap-4">
              <PrimaryBtn text="Login" />
              {/* <p>
                Don't have an account?{" "}
                <span
                  className="text-violet-600 font-semibold md:cursor-pointer"
                  onClick={() => setShowRegister(true)}
                >
                  Sign Up
                </span>
              </p> */}
            </div>
          </div>
          <ToastContainer />
        </form>
      )}
    </motion.div>
  );
};

export default SignUp;
