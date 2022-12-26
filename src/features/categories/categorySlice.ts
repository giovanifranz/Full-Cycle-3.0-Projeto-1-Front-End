import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  CategoryParams,
  Result,
  Results,
  Category,
} from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/categories";

function parseQueryParams(params: CategoryParams): string {
  const query = new URLSearchParams();

  if (params.page) {
    query.append("page", params.page.toString());
  }

  if (params.perPage) {
    query.append("per_page", params.perPage.toString());
  }

  if (params.search) {
    query.append("search", params.search);
  }

  if (params.isActive) {
    query.append("is_active", params.isActive.toString());
  }

  return query.toString();
}

function getCategories({ page = 1, perPage = 10, search = "" }) {
  const params = { page, perPage, search, isActive: true };
  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  };
}

function createCategoryMutation(category: Category) {
  return { url: endpointUrl, method: "POST", body: category };
}

function updateCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "PUT",
    body: category,
  };
}

function getCategory({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    getCategory: query<Result, { id: string }>({
      query: getCategory,
      providesTags: ["Categories"],
    }),
    createCategory: mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    updateCategory: mutation<Result, Category>({
      query: updateCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
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

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} = categoriesApiSlice;
