import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PrimaryBtn from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { userState } from "@/store/userState";
import { lodgeState } from "@/store/lodgeState";
import { SeaViewImage } from "@/components/constants/imageConstant";
import Image from "next/image";
import { postRequest, postRequestForImage } from "@/config/axiosInterceptor";
import { imageUpload } from "@/config/apiRoutes";

const BasicReg = ({
  setSelectedTab,
  control,
  errors,
  handleSubmit,
  register,
}) => {
  const beachOptions = [
    {
      value: "Nagaon Beach",
      label: "Nagaon Beach",
    },
    {
      value: "Revdanda Beach",
      label: "Revdanda Beach",
    },
    {
      value: "Aakshi Beach",
      label: "Aakshi Beach",
    },
    {
      value: "Kashid Beach",
      label: "Kashid Beach",
    },
    {
      value: "Alibag Beach",
      label: "Alibag Beach",
    },
    {
      value: "Kihim Beach",
      label: "Kihim Beach",
    },
  ];

  const userDetails = userState((state) => state.user);
  const setLodgeDetails = lodgeState((state) => state.setLodge);
  const lodgeDetails = lodgeState((state) => state.lodge);
  const [lodgeImage, setLodgeImage] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  console.log(userDetails);


  const onSubmit = async (data) => {
    setSelectedTab(1);
    if (data) {
      setLodgeDetails({
        basicDetails: {
          name: data.name,
          address: data.address,
          landmark: data.landmark,
          beachPlace: data.beach.value,
          contact: data.contact,
          lodge_image: lodgeImage,
        },
      });
    }
  };

  
  

  const onLodgeImageChange = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "o81661w8");

    try {
      const response = await postRequestForImage({
        url: imageUpload,
        body: formData,
      });

      if (response.status) {
        setLodgeImage(response.data.url);
        setIsDisabled(false);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="relative"
    >
      <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-6 py-6">
          <div className="w-full md:w-1/2">
            <div className=" bg-white relative flex items-center shrink-0">
              <input
                type="text"
                required
                id="name"
                placeholder=" "
                className="outline-none w-full h-full peer p-3 lg:p-2 rounded-md"
                autoComplete="off"
                {...register("name", {
                  required: {
                    value: true,
                    message: "* Please provide name of lodge",
                  },
                })}
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 left-1"
              >
                Name
              </label>
            </div>
            <div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className=" bg-white relative flex items-center shrink-0">
              <input
                type="text"
                id="address"
                required
                placeholder=" "
                className="outline-none w-full h-full peer p-3 lg:p-2 rounded-md"
                autoComplete="off"
                {...register("address", {
                  required: {
                    value: true,
                    message: "* Please provide address",
                  },
                  // pattern: {
                  //   value: /\S+@\S+\.\S+/i,
                  //   message: "* Please enter a valid email id",
                  // },
                })}
              />
              <label
                htmlFor="address"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 left-1"
              >
                Address
              </label>
            </div>
            <div>
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 pb-4 md:py-6">
          <div className="w-full md:w-1/2">
            <div className=" bg-white relative flex items-center shrink-0">
              <input
                type="text"
                required
                id="landmark"
                placeholder=" "
                className="outline-none w-full h-full peer p-3 lg:p-2 rounded-md"
                autoComplete="off"
                {...register("landmark", {
                  required: {
                    value: true,
                    message: "* Please enter nearest landmark",
                  },
                })}
              />
              <label
                htmlFor="landmark"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 left-1"
              >
                Nearest Landmark
              </label>
            </div>
            <div>
              {errors.landmark && (
                <p className="text-red-500 text-sm">
                  {errors.landmark.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <Controller
              name="beach"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  className=""
                  {...field}
                  options={beachOptions}
                  placeholder="Nearest Beach"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              )}
            />
            <div>
              {errors.beach && (
                <p className="text-red-500 text-sm">{errors.beach.message}</p>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className=" bg-white relative flex items-center shrink-0">
              <input
                type="tel"
                id="contact"
                maxLength={10}
                required
                placeholder=" "
                className="outline-none w-full h-full peer p-3 lg:p-2 rounded-md"
                autoComplete="off"
                {...register("contact", {
                  required: {
                    value: true,
                    message: "* Please provide contact number",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "* Please enter a valid contact number",
                  },
                })}
              />
              <label
                htmlFor="contact"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 left-1"
              >
                Contact No
              </label>
            </div>
            <div>
              {errors.contact && (
                <p className="text-red-500 text-sm">{errors.contact.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-2 py-4">
          <p className="font-semibold">Upload Documents</p>
          <p className="text-sm text-gray-500">
            The maximum file size is 5MB and supported formats are jpeg and png
          </p>
          <input
            type="file"
            className="hidden"
            id="inputFile"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(event) => onLodgeImageChange(event.target.files)}
          />
          <label
            className="flex gap-4 relative items-center max-h-[80px] bg-violet-100 rounded-lg p-2 md:cursor-pointer border border-dashed border-violet-400"
            htmlFor="inputFile"
          >
            <Image
              alt="certificate"
              src={lodgeImage ? lodgeImage : SeaViewImage}
              width={50}
              height={50}
              className="max-h-[80px]"
            />
            <p className="text-sm">Please upload your photo of your Lodge</p>
          </label>
        </div>

        <div className="absolute inset-x-0 h-[2px] bg-gray-300 w-full"></div>
        <div className="flex justify-end gap-4 pt-6">
          <PrimaryBtn text="Save & Next" isDisabled={isDisabled} />
        </div>
      </form>
    </motion.div>
  );
};

export default BasicReg;
