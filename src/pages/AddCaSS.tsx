import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Checkbox from "../components/form/Checkbox";
import {
  carBrands,
  carModels,
  constructionYears,
  drivingModes,
  fuelTypes,
  mileageIntervals,
  selectPhrases,
} from "../constants/CarConstants";
import CarService from "../services/carService";
import Modal from "../components/Modal";
import ErrorBox, { statusEnum } from "../components/form/ResponseBox";
import { title } from "process";
import { Car } from "../interfaces/CarInterfaces";
import { AddCarSchema } from "../schemas/CarSchema";
import LoaderSpinner from "../components/LoaderSpinner";
import { buttonStyles } from "../utils/style/validationFormStyles";
import ResponseBox from "../components/form/ResponseBox";

export default function AddKarhba() {
  const navigate = useNavigate();
  const targetRefScroll = useRef<HTMLDivElement>(null);
  const [viewModal, setViewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<Car>({
    defaultValues: {
      make: selectPhrases.make,
    },
    resolver: zodResolver(AddCarSchema),
  });

  // const watchedMake = watch("make");
  // const watchedModel = watch("model");

  const onSubmit: SubmitHandler<Car> = async (data) => {
    // setIsLoading(true);
    console.log(errors);
    setShowError(true);
    // await CarService.addCar(data)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setViewModal(true);
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.status == 500) {
    //       targetRefScroll.current.scrollIntoView({ behavior: "smooth" });
    //     }
    //     console.log(err);
    //   });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    // Convert files to base64 strings
    Promise.all(files.map(fileToBase64))
      .then((base64Images) => {
        setValue("imageDataList", base64Images); // Update the 'images' field in the form
      })
      .catch((error) => {
        console.error("Error converting images:", error);
      });
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="">
      {viewModal && (
        <Modal
          textButton="Done"
          title="Car added successfully"
          navigateTo="/dashboard/mylistings"
        >
          <p>dssdssdds</p>
        </Modal>
      )}
      <h2
        ref={targetRefScroll}
        className="px-9 text-balance mb-9 text-3xl font-medium tracking-tight pb-9 sm:text-4xl"
      >
        Let’s Get Your Car Onboard
      </h2>
      <form className="px-9 py-3 bg-slate-50	">
        {errors && showError && (
          <ResponseBox
            title={"error box"}
            buttonContent={null}
            status={statusEnum.Error}
          />
        )}
        {/* {errorDetails.show && (
          <ErrorBox
            status={statusEnum.Error}
            title={errorDetails.errorTitle}
            errorList={errorDetails.errorList}
          />
        )} */}
        <div className="space-y-12 grid grid-cols-6 gap-x-6 gap-y-1">
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                {...register("title", { required: true })}
                id="title"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
            <div></div>
          </div>

          <div className="col-span-3 col-start-1">
            <label
              htmlFor="about"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                {...register("description")}
                id="about"
                name="description"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                defaultValue={""}
              />
            </div>
            <p className="mt-3 text-sm/6 text-gray-600">
              Write a few sentences about your car.
            </p>
          </div>

          {/* make  */}
          <div className="col-start-1">
            {/* <Checkbox
              //   register={register}
            //   setValue={setValue}
            //   name={"make"}
              label={"Make"}
              options={carBrands}
            /> */}
          </div>

          {/* {watchedMake !== "Select a brand" && (
            <div className="col-start-1">
              <Checkbox
                register={register}
                setValue={setValue}
                name={"model"}
                label={"Model"}
                options={carModels[watchedMake] || [{}]}
              />
            </div>
          )}

          {watchedMake !== "Select a brand" &&
            watchedModel !== "Select a model" && (
              <div className="col-start-1">
                <Checkbox
                  register={register}
                  setValue={setValue}
                  name={"constructionYear"}
                  label={"Construction year"}
                  options={constructionYears}
                />
              </div>
            )} */}

          {/* photos */}
          <div className="col-start-1 col-span-3">
            <label
              htmlFor="cover-photo"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Car photos
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  aria-hidden="true"
                  className="mx-auto size-12 text-gray-300"
                />
                <div className="mt-4 flex text-sm/6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs/5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* licence plate */}
          <div className="col-start-1">
            <label
              htmlFor="licencePlate"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Licence plate
            </label>
            <div className="mt-2">
              <input
                {...register("licencePlate", { required: true })}
                id="licencePlate"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
            <div></div>
          </div>

          {/* price */}
          <div className="col-start-1">
            <label
              htmlFor="price"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Price
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">€</span>
              </div>
              <input
                {...register("pricePerDay")}
                id="price"
                name="pricePerDay"
                type="text"
                placeholder="0.00"
                aria-describedby="price-currency"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span id="price-currency" className="text-gray-500 sm:text-sm">
                  EUR
                </span>
              </div>
            </div>
          </div>

          <div className="col-start-1 col-span-2">
            <label
              htmlFor="street-address"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Street address
            </label>
            <div className="mt-2">
              <input
                {...register("streetAddress")}
                id="street-address"
                name="streetAddress"
                type="text"
                autoComplete="address-line1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          {/* City */}
          <div className="col-start-1">
            <label
              htmlFor="city"
              className="block text-sm/6 font-medium text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <input
                {...register("city")}
                id="city"
                name="city"
                type="text"
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="">
            <label
              htmlFor="postal-code"
              className="block text-sm/6 font-medium text-gray-900"
            >
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <input
                {...register("postalCode")}
                id="postal-code"
                name="postalCode"
                type="text"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          // disabled={!isValid || isLoading}
          className={` "flex mt-9 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" ${
            !isValid || isLoading ? buttonStyles.invalid : buttonStyles.valid
          }`}
        >
          {isLoading ? <LoaderSpinner /> : "Sign in"}
        </button>

        {/* <button
          type="button"
          className="mt-9 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button> */}
      </form>
    </div>
  );
}
