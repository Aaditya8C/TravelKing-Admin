import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { postRequest } from "@/config/axiosInterceptor";
import { registerUser } from "@/config/apiRoutes";
import Swal from "sweetalert2";
import PrimaryBtn from "../Button";
import { userState } from "../../store/userState";
import { setCookie } from "cookies-next";

const Register = ({ setIsMember, setIsSuccessful }) => {
  const [showPassword, setShowPassword] = useState(false);
  const setUserDetails = userState((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    if (data) {
      try {
        const response = await postRequest({
          // url: registerUser,
          url: registerUser,
          body: {
            username: data.username,
            email: data.email,
            password: data.password,
          },
        });

        if (response) {
          console.log(response.data);
          setUserDetails({
            user_id: response.data._id,
            username: response.data.username,
            email: response.data.email,
          });
          setIsMember(true);
          setCookie("userToken",response.data.token);
          Swal.fire({
            title: "Registered Successfully",
            icon: "success",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              // setIsSuccessful(true);
              window.location.reload();
            }
          });
        }
      } catch (error) {
        console.warn("Error", error);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <motion.div
      className="w-full grid place-items-center"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "tween" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] lg:w-[60%]">
        <div className="flex flex-col gap-6 py-8">
          {/* <RiveComponent /> */}
          {/* <Rive src='../public/vehicles.riv' className='w-20 h-20'/> */}
          {/* <RiveComponent src='../../public/Assets/Rives/teddyRive.riv' animation='Teddy' className='base-canvas-size'/> */}
          <div>
            <div className=" bg-white relative flex items-center shrink-0">
              <input
                type="text"
                required
                id="username"
                placeholder=" "
                autoComplete="off"
                className="outline-none w-full h-full peer p-4 lg:p-2 rounded-md"
                {...register("username", {
                  required: {
                    value: true,
                    message: "* Please provide your email",
                  },
                })}
              />
              <label
                htmlFor="username"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 left-1"
              >
                Username
              </label>
              <div className="px-4">
                <FaUser />
              </div>
            </div>
            <div>
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className=" bg-white relative flex items-center shrink-0">
              <input
                type="email"
                id="emailName"
                required
                placeholder=" "
                autoComplete="off"
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
            <div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

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
          <div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="grid place-items-center gap-4">
            <PrimaryBtn text="Register" />
          </div>
        </div>
        <ToastContainer />
      </form>
    </motion.div>
  );
};

export default Register;
