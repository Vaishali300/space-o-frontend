import { Formik, ErrorMessage, Form, type FormikHelpers } from "formik";
import * as Yup from "yup";
import React from "react";
import type { EventFormData } from "../../types/event.types";
import {
  Button,
  DropzoneComponent,
  Input,
  Label,
  Loader,
} from "../../components";
import { STATUS } from "../../lib/constants";
import { useAppSelector } from "../../store/store";

const AddEvent: React.FC = () => {
  const { eventState } = useAppSelector((state) => state.event);

  const initialValues: EventFormData = {
    name: "",
    description: "",
    images: [],
    startDate: "",
    endDate: "",
    location: "",
    totalGuests: 0,
    category: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    images: Yup.array()
      .of(Yup.mixed())
      .min(1, "At least one image is required"),
    startDate: Yup.string().required("Required"),
    endDate: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    totalGuests: Yup.number().min(1).required("Required"),
    category: Yup.string().required("Required"),
  });

  const handleSubmitRecipe = async (
    values: EventFormData,
    { resetForm }: FormikHelpers<EventFormData>
  ) => {
    console.log("Form submitted:", values);
  };

  return (
    <>
      {eventState === STATUS.PENDING && <Loader />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitRecipe}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          setFieldValue,
          handleChange,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="flex w-full gap-6 mt-10">
              <div className="w-full flex flex-col gap-4">
                {/* Images */}
                <div>
                  <Label>Cover image(s)</Label>
                  <DropzoneComponent
                    setFieldValue={function (field: string, value: any): void {
                      throw new Error("Function not implemented.");
                    }}
                    value={""}
                  />
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="text-red-600 font-medium text-sm mt-1"
                  />
                </div>

                {/* Name */}
                <div className="w-full flex flex-col gap-4">
                  <Label>Name</Label>
                  <Input
                    name="name"
                    onChange={handleChange}
                    handelBlur={handleBlur}
                    value={values.name}
                    error={!!(touched.name && errors.name)}
                    className="block w-full rounded-md bg-white  text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 font-medium text-sm mt-1"
                  />
                </div>

                {/* Description */}
                <div>
                  <Label>Description</Label>
                  <Input
                    name="description"
                    onChange={handleChange}
                    handelBlur={handleBlur}
                    value={values.description}
                    error={!!(touched.description && errors.description)}
                    className="block w-full rounded-md bg-white  text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-600 font-medium text-sm mt-1"
                  />
                </div>

                {/* Location */}
                <div>
                  <Label>Location</Label>
                  <Input
                    name="location"
                    onChange={handleChange}
                    handelBlur={handleBlur}
                    value={values.location}
                    error={!!(touched.location && errors.location)}
                    className="block w-full rounded-md bg-white  text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-600 font-medium text-sm mt-1"
                  />
                </div>

                {/* Category */}
                <div>
                  <Label>Category</Label>
                  <Input
                    name="category"
                    onChange={handleChange}
                    handelBlur={handleBlur}
                    value={values.category}
                    error={!!(touched.category && errors.category)}
                    className="block w-full rounded-md bg-white  text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-600 font-medium text-sm mt-1"
                  />
                </div>
                <div>
                  <Label>Total Guests</Label>
                  <Input
                    type="number"
                    name="totalGuests"
                    onChange={handleChange}
                    handelBlur={handleBlur}
                    value={values.totalGuests}
                    error={!!(touched.totalGuests && errors.totalGuests)}
                    className="block w-full rounded-md bg-white  text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                  />
                  <ErrorMessage
                    name="totalGuests"
                    component="div"
                    className="text-red-600 font-medium text-sm mt-1"
                  />
                </div>
                {/* Start and End Dates */}
                <div className="flex gap-4">
                  <div className="w-full">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      name="startDate"
                      onChange={handleChange}
                      handelBlur={handleBlur}
                      value={values.startDate}
                      error={!!(touched.startDate && errors.startDate)}
                    />
                    <ErrorMessage
                      name="startDate"
                      component="div"
                      className="text-red-600 font-medium text-sm mt-1"
                    />
                  </div>
                  <div className="w-full">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      name="endDate"
                      onChange={handleChange}
                      handelBlur={handleBlur}
                      value={values.endDate}
                      error={!!(touched.endDate && errors.endDate)}
                    />
                    <ErrorMessage
                      name="endDate"
                      component="div"
                      className="text-red-600 font-medium text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Total Guests */}

                {/* Submit Button */}
                <div className="flex justify-center mt-5">
                  <Button
                    variant="primary"
                    type="submit"
                    className="bg-[#8e002e] flex w-40 font-semibold text-base justify-center rounded-md text-white shadow"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddEvent;
