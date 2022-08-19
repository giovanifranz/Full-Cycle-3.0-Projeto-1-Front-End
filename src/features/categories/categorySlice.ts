import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Result, Results } from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

export interface Category {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  description: null | string;
}

const endpointUrl = "/categories";

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  };
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, void>({
      query: () => endpointUrl,
      providesTags: ["categories"],
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["categories"],
    }),
  }),
});

const category: Category = {
  id: "123",
  name: "teste_1",
  is_active: false,
  created_at: "2017-09-08T15:25:53Z",
  updated_at: "2017-09-08T15:25:53Z",
  deleted_at: "2017-09-08T15:25:53Z",
  description: "teste",
};

export const initialState = [category];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    createCategory: (state, action) => {
      state.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state[index] = action.payload;
    },
    deleteCategory: (state, action) => {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state.splice(index, 1);
    },
  },
});

export const selectCategories = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((category) => category.id === id);

  return (
    category || {
      id: "",
      name: "",
      is_active: false,
      created_at: "",
      updated_at: "",
      deleted_at: null,
      description: "",
    }
  );
};

export default categoriesSlice.reducer;

export const { createCategory, updateCategory, deleteCategory } =
  categoriesSlice.actions;

export const { useGetCategoriesQuery, useDeleteCategoryMutation } =
  categoriesApiSlice;
