import { AppDispatch } from "reduxStore/store";
import {
  addCar,
  filterCars,
  removeCar,
  resetCars,
  sortCarsAlphabetically,
  sortCarsByYearAsc,
  sortCarsByYearDesc,
  updateCar,
} from "reduxStore/slices/carsSlice";
import { YearsRange, SORT_OPTIONS, CarModel } from "types/types";
import { addNewCar, editCar } from "api/carsApi";
import { Dispatch } from "@reduxjs/toolkit";

/**
 * Apply year range and/or diesel filter options
 */
export const applyFiltersLogic = (
  dispatch: AppDispatch,
  yearRange: YearsRange,
  isDiesel: boolean
) => {
  dispatch(resetCars());
  dispatch(
    filterCars({
      yearRange,
      isDiesel: isDiesel ? 1 : undefined,
    })
  );
};

/**
 * Sort options by code 
 */
export const applySortLogic = (dispatch: AppDispatch, code: SORT_OPTIONS) => {
  if (code === SORT_OPTIONS.AZ) dispatch(sortCarsAlphabetically());
  else if (code === SORT_OPTIONS.OLD) dispatch(sortCarsByYearAsc());
  else if (code === SORT_OPTIONS.NEW) dispatch(sortCarsByYearDesc());
};


  export function handleEditCar(updatedCar: CarModel, dispatch: Dispatch) {
    editCar(updatedCar);
    dispatch(updateCar(updatedCar));
  }

  export function handleRemoveCar(e: React.MouseEvent, dispatch: Dispatch, id: string) {
    e.stopPropagation();
    dispatch(removeCar(id));
  }

  export function handleEditOpenModal (e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }
  export function handleAddNewCar(data: CarModel, dispatch: Dispatch) {
    addNewCar(data);
    dispatch(addCar(data));
  }



