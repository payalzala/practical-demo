"use client";

import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";

export const CreateProduct = ({
  createProduct,
  updateProduct,
  editProduct,
}) => {
  const formik = useFormik({
    initialValues: {
      title: "string",
      price: 0.1,
      description: "string",
      category: "string",
      image: "http://example.com",
    },
    onSubmit: async (values) => {
      try {
        if (editProduct) {
          await updateProduct(editProduct.id, values);
        } else {
          await createProduct(values);
        }
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (editProduct) {
      formik.setValues(editProduct);
    }
  }, [editProduct]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex gap-4 items-end pb-4 px-6">
        <div>
          <label
            htmlFor="title"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            title
          </label>
          <input
            name="title"
            type="text"
            id="title"
            class="bg-gray-50 border text-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            class="bg-gray-50 border text-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            class="bg-gray-50 border text-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            class="bg-gray-50 border text-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            required
          />
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Default
        </button>
      </div>
    </form>
  );
};
