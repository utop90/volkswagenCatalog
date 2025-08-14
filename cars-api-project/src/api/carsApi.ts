/* types */
import { apiResponse, CarModel } from "types/types";
/* deno */
import process from "process";


const API_URL = process.env.REACT_APP_API_URL as string;

// Retrieve all Volkswagen cars
export async function fetchVolkswagenCars() {
  const res = await fetch(API_URL);
  const data: apiResponse = await res.json();
  return data;
}

// Add a new car to the catalog 
export async function addNewCar(carData: { model: string; year: string | number; description?: string; photo?: string }) {
  const dataToSend = [
    {
      model: carData.model,
      year: carData.year,
      photo: carData.photo || "",
      description: carData.description || "",
    },
  ];

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error saving car:", error);
  }
};

// Edit an existing car
export async function editCar(car: CarModel) {
  try {
    const response = await fetch(`${API_URL}/${car.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating car:", error);
  }
};

// Delete a car by ID
export async function deleteCar(carId: string | number) {
  try {
    const response = await fetch(`${API_URL}/${carId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Error deleting car:", error);
    return false;
  }
};
