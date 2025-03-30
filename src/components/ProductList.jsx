"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CreateProduct } from "./CreateProduct";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const fetchData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    const data = await response.data;

    setProducts(data);
  };

  const createProduct = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        values
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `https://fakestoreapi.com/products/${id}`
      );
      if (response) {
        await fetchData();
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (id, values) => {
    try {
      const response = await axios.put(
        `https://fakestoreapi.com/products/${id}`,
        values
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setEditProduct(null);
  };

  const handleSearch = async (values) => {
    const filteredProducts = products.filter((product) => {
      return product.title.includes(values);
    });
    setProducts(filteredProducts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex gap-4 justify-between pb-4 px-6 items-center">
        <CreateProduct
          createProduct={createProduct}
          updateProduct={updateProduct}
          editProduct={editProduct}
        />

        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative w-80">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            onChange={(e) => handleSearch(e.target.value)}
            required
          />
          <button
            type="submit"
            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Color
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Delete
              </th>
              <th scope="col" class="px-6 py-3">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr
                key={index}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {prod.title}
                </th>
                <td class="px-6 py-4">{prod.description}</td>
                <td class="px-6 py-4">{prod.price}</td>
                <td class="px-6 py-4">{prod.category}</td>
                <td
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => deleteProduct(prod.id)}
                >
                  Delete
                </td>
                <td
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => setEditProduct(prod)}
                >
                  Edit
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
