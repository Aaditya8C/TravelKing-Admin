import SignUp from "@/components/LandingPages/SignUp";
import ParentLayout from "@/components/Layouts/ParentLayout";
import { SeaViewImage } from "@/components/constants/imageConstant";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
// import LandingSea from '../public/Assets/Videos/landing.mp4'
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import Register from "@/components/LandingPages/Register";
import * as loginAnimationData from "../public/Assets/Lotties/loginLottie.json";
import * as registerAnimationData from "../public/Assets/Lotties/registrationLottie.json";
import Lottie from "react-lottie";
import * as successfulAnimationData from "../public/Assets/Lotties/successful.json";
import LodgeRegister from "@/components/popups/LodgeRegister";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const options = ["Login", "Register"];
  const [isMember, setIsMember] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [selectedOption, setSelectedOPtion] = useState("Login");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData:
      selectedOption === "Login" ? loginAnimationData : registerAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="h-screen w-screen relative">
      {!isMember ? (
        <div>
          {/* <div
      className="bg-cover bg-center bg-no-repeat h-screen w-screen"
      // style={{ backgroundImage: `url(${SeaViewImage.src})` }}
    > */}
          <video
            src="/Assets/Videos/landingCar.mp4"
            autoPlay
            loop
            muted
            className="absolute inset-0 h-screen"
          />
          {/* <div className="absolute bg-black opacity-30 inset-0" /> */}
          <div className="absolute top-0 right-0 w-full lg:w-1/3  bg-[#fff] z-50 h-full rounded-s-3xl flex flex-col  justify-center items-center">
            <div className="grid gap-2 text-center py-4">
              <p className="via-violet-500 font-bold text-5xl">TravelKing</p>
              <p className="font-semibold text-xl">Welcome to Admin Panel!</p>
              <Lottie options={defaultOptions} width={200} height={200} />
            </div>
            <div className="w-[90%] h-1/2 rounded-xl shadow-lg  flex flex-col bg-gray-200">
              <ul className="flex justify-center items-center w-full bg-gray-50 shrink-0">
                {options.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => setSelectedOPtion(item)}
                      className={classNames(
                        "rounded-t-md w-full py-2  m-1 h-full text-center relative md:cursor-pointer",
                        selectedOption.includes(item) &&
                          "bg-gray-300 font-semibold"
                      )}
                    >
                      {item}
                      {item === selectedOption && (
                        <motion.div
                          className="absolute inset-x-0 bottom-0 h-[2px] bg-violet-600"
                          layoutId="underline"
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full grid place-items-center shrink-0"
                >
                  {selectedOption === "Login" ? (
                    <SignUp
                      setIsMember={setIsMember}
                      setIsSuccessful={setIsSuccessful}
                    />
                  ) : (
                    <Register
                      setIsMember={setIsMember}
                      setIsSuccessful={setIsSuccessful}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        isSuccessful && <LodgeRegister />
      )}
    </div>
  );
}
