import React from "react";
import * as animationData from "../public/Assets/Lotties/access_denied.json";
import Lottie from "react-lottie";

const ErrorPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="absolute inset-0 grid place-items-center place-content-center">
      <Lottie options={defaultOptions} width={400} height={400} />
      <p className="text-red-600 font-semibold text-4xl">Access denied, please login!!</p>
    </div>
  );
};

export default ErrorPage;
