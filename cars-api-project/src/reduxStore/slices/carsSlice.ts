import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarModel, CarsState, YEARS_RANGE, YearsRange } from "types/types";

const initialState: CarsState = {
  cars: [],
  originalCars: [], // Stores the original cars list before any filtering/sorting
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    // Save all cars & keep the original array
    setCars: (state, action: PayloadAction<CarModel[]>) => {
      state.cars = action.payload;
      state.originalCars = [...action.payload];
    },

    // Add a new car
    addCar: (state, action: PayloadAction<CarModel>) => {
      state.cars.push(action.payload);
      state.originalCars.push(action.payload);
    },

    // Remove a car by id
    removeCar: (state, action: PayloadAction<string | number>) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
      state.originalCars = state.originalCars.filter(
        (car) => car.id !== action.payload
      );
    },

    // Update an existing car
    updateCar: (state, action: PayloadAction<CarModel>) => {
      const updateList = (list: CarModel[]) => {
        const index = list.findIndex((car) => car.id === action.payload.id);
        if (index !== -1) {
          list[index] = action.payload;
        }
      };
      updateList(state.cars);
      updateList(state.originalCars);
    },

    //Filter cars by year range and/or diesel option 
    filterCars: (
      state,
      action: PayloadAction<{ yearRange?: YearsRange; isDiesel?: boolean | number }>
    ) => {
      const { yearRange, isDiesel } = action.payload;
      let filtered = [...state.originalCars];

      // Filter by year range
      if (yearRange) {
        if (yearRange === YEARS_RANGE.RECENT) {
          filtered = filtered.filter((car) => car.year >= 2020);
        } else if (yearRange === YEARS_RANGE.MID) {
          filtered = filtered.filter(
            (car) => car.year >= 2010 && car.year <= 2019
          );
        } else if (yearRange === YEARS_RANGE.OLD) {
          filtered = filtered.filter((car) => car.year <= 2009);
        }
      }

      // Filter by diesel
      if (isDiesel !== undefined) {
        const dieselBool = Number(isDiesel) === 1 || isDiesel === true;
        filtered = filtered.filter((car) => {
          // Diesel values are stored as 1 -> True and 0 -> False.
          if (typeof car.isDieselCar === "number") {
            return dieselBool ? car.isDieselCar === 1 : car.isDieselCar === 0;
          }
        });
      }
      state.cars = filtered;
    },

    // Sort alphabetically by model
    sortCarsAlphabetically: (state) => {
      state.cars = [...state.cars].sort((a, b) =>
        a.model.localeCompare(b.model, "en", { sensitivity: "base" })
      );
    },

    // Sort by year (newest → oldest)
    sortCarsByYearDesc: (state) => {
      state.cars = [...state.cars].sort((a, b) => b.year - a.year);
    },

    // Sort by year (oldest → newest)
    sortCarsByYearAsc: (state) => {
      state.cars = [...state.cars].sort((a, b) => a.year - b.year);
    },

    // Restore cars to their original state
    resetCars: (state) => {
      state.cars = [...state.originalCars];
    },
  },
});

export const {
  setCars,
  addCar,
  removeCar,
  updateCar,
  filterCars,
  sortCarsAlphabetically,
  sortCarsByYearDesc,
  sortCarsByYearAsc,
  resetCars,
} = carsSlice.actions;

export default carsSlice.reducer;
