import React, { useEffect, useMemo, useState, useRef } from "react";
import { Routes, Route, Link, NavLink,useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import productPlaceholder from "../../assets/images/placeholder-image.webp";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import RestService from "../../services/rest.service";
import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-300">
        This field is required!
      </div>
    );
  }
};

const Restaurant = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [status, setStatus] = useState("");
  const [phone, setPhone] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangeLocation = (e) => {
    const location = e.target.value;
    setLocation(location);
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeOpeningHours = (e) => {
    const openingHours = e.target.value;
    setOpeningHours(openingHours);
  };

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const onChangeStatus = (e) => {
    const status = e.target.value;
    setStatus(status);
  };

  const handleRestaurant = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      RestService.add(email, location, name, openingHours, phone, status).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };
  return (
    <div class="flex items-center justify-center p-12">
      <div class="mx-auto w-full max-w-[550px]">
      <Form onSubmit={handleRestaurant} ref={form}>
          <div class="mb-5">
            <label
              for="name"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Restaurant/Coffee Shop Name
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div class="mb-5">
            <label
              for="email"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@domain.com"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div class="mb-5">
            <label
              for="location"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Enter your restaurant/coffee shop location"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div class="mb-5">
            <label
              for="opening_hours"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Opening Hours
            </label>
            <input
              type="text"
              name="opening_hours"
              id="opening_hours"
              placeholder="Enter your restaurant/coffee shop opening hours"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div class="mb-5">
            <label
              for="phone"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter your restaurant/coffee shop phone number"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div class="mb-5">
            <label
              for="status"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Status
            </label>
            <input
              type="text"
              name="status"
              id="status"
              placeholder="Enter your Restaurant/Coffee shop status"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div class="mb-5">
            <label for="image" class="mb-3 block text-base font-medium text-[#07074D]">Image</label>
            <input type="file" class="block w-full px-3 py-2 mt-2 text-sm text-[#6B7280] bg-white border border-[#e0e0e0] rounded-md file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full file:bg-gray-800 file:text-gray-200 text-gray-300 placeholder-gray-400/70 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:border-[#6A64F1] focus:shadow-md" />
          </div>

          <div>
            <button
              class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div> 
);
};

export default Restaurant;
