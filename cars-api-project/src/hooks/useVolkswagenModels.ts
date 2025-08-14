/* types */
import { apiResponse, CarModel } from "types/types";
/* react utils */
import { useEffect, useState } from "react";
import { fetchVolkswagenCars } from "api/carsApi";
/* redux */
import { useDispatch, useSelector } from "react-redux";
import { setCars } from "reduxStore/slices/carsSlice";
import { RootState } from "reduxStore/store";

export function useVolkswagenModels() {
  const dispatch = useDispatch();

  const cars = useSelector((state: RootState) => state.cars.cars ?? []);

  const [models, setModels] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we have stored cars in redux, we use them & we do not fetch api.
    if (cars.length > 0) {
      setModels(cars);
      setLoading(false);
      setError(null);
      return;
    }

    async function fetchModels() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchVolkswagenCars();
        if (!response) throw new Error("Request error");
        const data: apiResponse = response;
        dispatch(setCars(data.result));
        setModels(data.result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, [cars, dispatch]);

  return { models: models.length ? models : cars, loading, error };
}
