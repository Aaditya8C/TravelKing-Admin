import React, { useState } from "react";
import PoupupLayout from "../Layouts/PoupupLayout";
import RegHeader from "./LodgeRegContents/RegHeader";
import BasicReg from "./LodgeRegContents/BasicReg";
import DetailsReg from "./LodgeRegContents/DetailsReg";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const LodgeRegister = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      landmark: "",
      beach: "",
      contact: "",
      isSwimmingPool: "",
      isParkingAvailable: "",
      total_rooms: "",
    },
  });
  return (
    <PoupupLayout>
      <div className="grid gap-4">
        <div className="flex items-center p-3">
          <p className="font-semibold text-xl">
            Quick Registration - Register you Lodge!
          </p>
        </div>

        <RegHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {selectedTab === 0 ? (
          <BasicReg
            setSelectedTab={setSelectedTab}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            control={control}
          />
        ) : (
          <DetailsReg
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            control={control}
            setSelectedTab={setSelectedTab}
          />
        )}
      </div>
    </PoupupLayout>
  );
};

export default LodgeRegister;
