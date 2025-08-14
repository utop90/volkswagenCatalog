import { Dispatch } from "@reduxjs/toolkit";

export interface CarModel {
  id: string;
  model: string;
  year: number;
  photo: string;
  description: string;
  isDieselCar: boolean;
}
export interface DashboardProps {
  models: CarModel[];
}

export interface apiResponse {
  result: CarModel[];
}
export interface UseCarImageGoogleParams {
  model: string;
}
export interface ImageCardProps {
  loading: boolean;
  imageUrl: string | undefined;
  height: string | number;
  altText: string;
  loadingText?: string;
}

export interface CarImagesState {
  images: {
    [model: string]: string;
  };
}
export interface DashboardControlPanelProps {
  onAddCar: () => void;
}
export interface PaginationButtonProps {
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
  ariaLabel: string;
}
export interface CarModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
}

export interface CarFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (carData: CarModel) => void;
  title?: string;
  description?: string;
  carToEdit?: CarModel;
}

export interface CarsState {
  cars: CarModel[];
  originalCars: CarModel[];
}
export interface CarImageEntry {
  model: string;
  imageUrl: string;
}
export enum YEARS_RANGE {
  RECENT = "recent",
  MID = "mid",
  OLD = "old",
}
export type YearsRange = YEARS_RANGE | undefined;
export enum SORT_OPTIONS {
  NEW = "new",
  MID = "mid",
  OLD = "old",
  AZ = "az",
}
export interface PaginationWithTitleProps {
  page: number;
  totalPages: number;
  handlePrev: () => void;
  handleNext: () => void;
  classes: Record<string, string>;
}

export interface FilterPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  yearRange: YearsRange | undefined;
  setYearRange: (value: YearsRange | undefined) => void;
  isDiesel: boolean;
  setIsDiesel: (value: boolean) => void;
  dispatch: Dispatch;
}

export interface SortPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  dispatch: Dispatch;
}
export interface CarDetailsModalProps {
  open: boolean;
  onClose: () => void;
  model: string;
  year?: number | string;
  description?: string;
  imageUrl: string | undefined;
}
