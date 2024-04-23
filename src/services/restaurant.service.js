import axios from "axios";

const API_URL = "http://localhost:3000/api/restaurants/";

const addRestaurant = (
  email,
  location,
  name,
  openingHours,
  phone,
  status,
  ownerId
) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  console.log(token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.post(
    API_URL + "create",
    {
      email,
      location,
      name,
      openingHours,
      phone,
      status,
      ownerId,
    },
    config
  );
};

const RestService = {
  addRestaurant,
  //getAllRestaurants,
};

export default RestService;