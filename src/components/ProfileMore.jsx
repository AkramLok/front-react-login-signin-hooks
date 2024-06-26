import React, { useRef, useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import OwnerService from "../services/owner.service";

const ProfileMore = () => {
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState(null);
  const currentUser = AuthService.getCurrentUser();
  let form = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form_data = new FormData(form.current);
    let payload = {};
    form_data.forEach(function (value, key) {
      payload[key] = value;
    });
    console.log("payload", payload);
  };

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const response = await OwnerService.getOwnerById();
        const ownerFound = response.data;
        setOwner(ownerFound);
        console.log(owner);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching your owner details:", error);
        setLoading(false);
      }
    };
    fetchOwner();
  }, []);

  const location = useLocation();
  const getBreadcrumbs = () => {
    const paths = [
      { name: "Home", url: "/" },
      { name: "Profile", url: "/profile" },
    ];
    const currentPath = location.pathname;
    return paths;
  };

  return (
    <form id="login" onSubmit={handleSubmit}>
      <Breadcrumbs paths={getBreadcrumbs()} />
      {loading ? (
        <div></div>
      ) : (
        <div className="bg-quartenary bg-gray dark:bg-black p-4">
          <div className="container mx-auto dark:bg-gray-800 rounded mb-4">
            <div className="xl:w-full py-5 bg-white dark:bg-gray-800">
              <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center p-3">
                <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">
                  Profile
                </p>
                <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={16}
                    height={16}
                  >
                    <path
                      className="heroicon-ui"
                      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/*<div className="md:flex md:justify-between">
            <div className="container mx-auto px-4 bg-blue">
              <h3 className="text-lg text-gray-800 dark:text-gray-100">
                Profile: {currentUser.username}
              </h3>
                <div className="md:w-1/2">
                  <p className="text-lg text-gray-800 dark:text-gray-100 mt-4 md:mt-0">
                    Token: {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(
                      currentUser.accessToken.length - 20
                    )}
                  </p>
                  <p className="text-lg text-gray-800 dark:text-gray-100">
                    Id: {currentUser.id}
                  </p>
                  <p className="text-lg text-gray-800 dark:text-gray-100">
                    Email: {owner.email}
                  </p>
                </div>
                <div className="md:w-1/2">
                  <p className="text-lg text-gray-800 dark:text-gray-100 mt-4 md:mt-0">
                    Authorities:
                  </p>
                  <ul className="text-lg text-gray-800 dark:text-gray-100">
                    {currentUser.roles &&
                      currentUser.roles.map((role, index) => (
                        <li key={index}>{role}</li>
                      ))}
                  </ul>
                </div>
            </div>
              </div>*/}
            <div className="mx-auto mt-8">
              <div className="w-full mx-auto xl:mx-0">
                <div className="rounded relative mt-8 h-48">
                  <img
                    src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form1.jpg"
                    alt
                    className="w-full h-full object-cover rounded absolute shadow"
                  />
                  <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded" />
                  <div className="flex items-center px-3 py-2 rounded absolute right-0 mr-4 mt-4 cursor-pointer">
                    <p className="text-xs text-gray-100">Change Cover Photo</p>
                    <div className="ml-2 text-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-edit"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1={16} y1={5} x2={19} y2={8} />
                      </svg>
                    </div>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center">
                    <img
                      src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form2.jpg"
                      alt
                      className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0"
                    />
                    <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0" />
                    <div className="cursor-pointer flex flex-col justify-center items-center absolute text-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-edit"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1={16} y1={5} x2={19} y2={8} />
                      </svg>
                      <p className="text-xs text-gray-100">Edit Picture</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
            <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
              <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">
                  Personal Information
                </p>
                <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={16}
                    height={16}
                  >
                    <path
                      className="heroicon-ui"
                      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mx-auto pt-4">
              <div className="container mx-auto">
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label
                    htmlFor="username"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                    placeholder="@example"
                    value={currentUser.username}
                    disabled
                  />
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label
                    htmlFor="FirstName"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    required
                    className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                    placeholder
                    value={owner.name}
                  />
                </div>

                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label
                    htmlFor="Email"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Email
                  </label>
                  <div className="border border-gray-300 shadow-sm rounded flex">
                    <div className="px-4 py-3 dark:text-gray-100 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-mail"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <rect x={3} y={5} width={18} height={14} rx={2} />
                        <polyline points="3 7 12 13 21 7" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="Email"
                      name="email"
                      required
                      className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-gray-400"
                      placeholder="example@gmail.com"
                      value={currentUser.email}
                      disabled
                    />
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <p className="text-xs">Email submission success!</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={16}
                      height={16}
                    >
                      <path
                        className="heroicon-ui"
                        d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0
                              0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                        stroke="currentColor"
                        strokeWidth="0.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto w-full xl:w-full">
            <div className="w-full py-4 sm:px-0 bg-quartenary dark:bg-gray-800 flex justify-end">
              <button className="bg-secondary focus:outline-none dark:bg-gray-700 rounded text-quartenary dark:text-indigo-600 px-6 py-2 text-xs mr-4">
                Cancel
              </button>
              <button
                className="bg-tertiary focus:outline-none rounded text-white px-8 py-2 text-sm"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
export default ProfileMore;
