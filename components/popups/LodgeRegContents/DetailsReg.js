import React, { useEffect } from "react";
import { motion } from "framer-motion";
import PrimaryBtn from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { lodgeState } from "@/store/lodgeState";
import { postRequest } from "@/config/axiosInterceptor";
import { registerLodge } from "@/config/apiRoutes";
import { ToastContainer, toast } from "react-toastify";
import { userState } from "@/store/userState";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const DetailsReg = ({control,errors,handleSubmit,register,setSelectedTab}) => {
  const roomNos = [
    {
      label: "1",
      value: 1,
    },
    {
      label: "2",
      value: 2,
    },
    {
      label: "3",
      value: 3,
    },
    {
      label: "4",
      value: 4,
    },
    {
      label: "5",
      value: 5,
    },
    {
      label: "6",
      value: 6,
    },
    {
      label: "7",
      value: 7,
    },
    {
      label: "8",
      value: 8,
    },
    {
      label: "9",
      value: 9,
    },
    {
      label: "10",
      value: 10,
    },
  ];
  const parkingOptions = [
    {
      label: "Yes",
      value: true,
    },
    {
      label: "No",
      value: false,
    },
  ];

  const setLodgeDetails = lodgeState((state) => state.setLodge);
  const lodgeDetails = lodgeState((state) => state.lodge);
  const userDetails = userState((state) => state.user);
  const router = useRouter();

  const onSubmit = async (data) => {
    if (data) {
      setLodgeDetails({
        basicDetails: lodgeDetails.basicDetails,
        facilityDetails: {
          total_rooms: data.rooms.value,
          isParkingAvailable: data.parking.value,
          isSwimmingPool: data.swimmingPool.value,
        },
      });
      try {
        const response = await postRequest({
          url: registerLodge,
          body: {
            owner_id: userDetails.user_id,
            name: lodgeDetails.basicDetails.name,
            address: lodgeDetails.basicDetails.address,
            landmark: lodgeDetails.basicDetails.landmark,
            beachPlace: lodgeDetails.basicDetails.beachPlace,
            contact: lodgeDetails.basicDetails.contact,
            lodge_image:lodgeDetails.basicDetails.lodge_image,
            total_rooms: data.rooms.value,
            isParkingAvailable: data.parking.value,
            isSwimmingPool: data.swimmingPool.value,
          },
        });

        if(response){
          Swal.fire({
            title: "Your Lodge Registered Successfully",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push('/dashboard');
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
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="relative"
    >
      <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-6 py-6">
          <div className="w-full md:w-1/2">
            <label className="pl-1 text-gray-500 pb-1">No of Rooms</label>
            <Controller
              name="rooms"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  options={roomNos}
                  {...field}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              )}
            />
            <div>
              {errors.total_rooms && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <label className="pl-1 text-gray-500 pb-1">
              Is Parking Available
            </label>
            <Controller
              name="parking"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  options={parkingOptions}
                  {...field}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              )}
            />
            <div>
              {errors.isParkingAvailable && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-6 pb-6">
          <div className="w-full">
            <label className="pl-1 text-gray-500 pb-1">
              Is Swimming Pool Available?
            </label>
            <Controller
              name="swimmingPool"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  options={parkingOptions}
                  {...field}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              )}
            />
            <div>
              {errors.isSwimmingPool && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 h-[2px] bg-gray-300 w-full"></div>
        <div className="flex justify-end gap-4 pt-6">
          <PrimaryBtn text="Back" invert clickEvent={() => setSelectedTab(0)} />
          <PrimaryBtn text="Save" />
        </div>
        <ToastContainer/>
      </form>
    </motion.div>
  );
};

export default DetailsReg;
