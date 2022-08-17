import { createSlice } from "@reduxjs/toolkit";

interface Category {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  description: null | string;
}

const category: Category = {
  id: "",
  name: "",
  is_active: false,
  created_at: "",
  updated_at: "",
  deleted_at: null,
  description: null,
};

export const initialState = [category];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    createCategory: (state, action) => {},
    updateCategory: (state, action) => {},
    deleteCategory: (state, action) => {},
  },
});

export default categoriesSlice.reducer;
