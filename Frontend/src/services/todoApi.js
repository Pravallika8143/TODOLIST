import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4700/todos", 
  }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/",
    }),

    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/",
        method: "POST",
        body: todo,
      }),
    }),

    updateTodo: builder.mutation({
        query: ({ id, ...rest }) => ({
          url: `/${id}`,
          method: "PUT",
          body: rest,   
        }),
      }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;