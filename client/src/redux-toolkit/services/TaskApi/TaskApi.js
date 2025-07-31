import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TaskApi = createApi({
  reducerPath: "TaskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/task/`,
    // Authorization area
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    // Authorization area  end
    credentials: "include",
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTask: builder.query({
      query: ({page = 1, name, status, user_id}) => `view/${user_id}?page=${page}&name=${name}&status=${status}`,
      providesTags: (results, error) => [
        { type: "Task", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// providesTags using only query builder
      ],
    }),

    getSingleTask: builder.query({
      query: (id) => `single/view/${id}`,
      providesTags: (results, error) => [
        { type: "Task", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// providesTags using only query builder
      ],
    }),

    storeTask: builder.mutation({
      query: (data) => ({
        url: "store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (results, error) => [
        { type: "Task", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// invalidatesTags using only query mutation
      ],
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (results, error) => [
        { type: "Task", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// invalidatesTags using only query mutation
      ],
    }),

    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (results, error) => [
        { type: "Task", results, error, id: "LIST" }, ////// using this line then refresh data when delete, update or type and id both same //// invalidatesTags using only query mutation
      ],
    }),
  }),
});

export const {
  useGetTaskQuery,
  useGetSingleTaskQuery,
  useStoreTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = TaskApi;
