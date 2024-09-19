import React, { useState, useEffect } from "react";
import { instance as axios } from "../../config/instance";
const TodoApp = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({ title: "", description: "" });
    const [errors, setErrors] = useState({ title: "", description: "" });
    const [todos, setTodos] = useState([]);
  
    useEffect(() => {
      refreshTodos();
    }, []);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setForm({ title: "", description: "" });
      setErrors({});
    };
  
    const submitForm = async (e) => {
      e.preventDefault();
      if (form.title === "") {
        setErrors((prev) => ({ ...prev, title: "Title is required" }));
        return;
      }
      if (form.description === "") {
        setErrors((prev) => ({
          ...prev,
          description: "Description is required",
        }));
        return;
      }
      try {
        const {data} = await axios.post("/todos", form);
        
        refreshTodos();
        closeModal();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };
  
    const refreshTodos = async () => {
      try {
        const { data } = await axios.get("/todos");
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
  
    const doneStatus = async (id) => {
      try {
        await axios.patch(`/todos/done/${id}`);
        refreshTodos();
      } catch (error) {
        console.error("Error updating status to done:", error);
      }
    };
  
    const updateStatus = async (id) => {
      try {
        await axios.patch(`/todos/${id}`);
        refreshTodos();
      } catch (error) {
        console.error("Error updating status to processing:", error);
      }
    };

  return (
    <div>
      {/* Button to trigger the modal */}
      <button
        onClick={openModal}
        className="w-32 lg:w-48 h-16 bg-gradient-to-r from-[#1f1f21] via-[#1f1f21] to-[#1f1f21] shadow-raised text-white rounded-xl mt-8 font-medium text-lg hover:opacity-70 transition"
      >
        Add Todo
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div className="relative bg-[#1a1a1c] p-6 rounded-lg shadow-lg w-full max-w-md mx-4 md:max-w-3xl md:mx-0 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
            <button
              className="absolute top-4 right-4 text-gray-100 hover:text-gray-400"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-xl font-semibold mb-4 text-white">Add Todo</h2>
            <form onSubmit={submitForm}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-1 block w-full border border-gray-600 rounded-md shadow-inner bg-[#1a1a1c] text-white"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows="4"
                  className="mt-1 block w-full border border-gray-600 rounded-md shadow-inner bg-[#1a1a1c] text-white"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
              >
                Add Todo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Todos List */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Todos List</h1>
        {todos.length === 0 && (
          <p className="text-center text-gray-400">
            Please Add Todos for Today
          </p>
        )}

        {/* Card Layout for Mobile */}
        {todos.length > 0 && (
          <div className="block lg:hidden">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-[#1a1a1c] text-white p-4 rounded-lg shadow-lg border border-gray-700 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">{todo.title}</h2>
                  <span className="text-sm">{todo.status}</span>
                </div>
                <p className="text-gray-400 mb-2">{todo.description}</p>
                <div>
                  {todo.status === "pending" && (
                    <button
                      onClick={() => updateStatus(todo.id)}
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                    >
                      Processing
                    </button>
                  )}
                  {todo.status === "process" && (
                    <button
                      onClick={() => doneStatus(todo.id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                    >
                      Done
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table Layout for Desktop */}
        {todos.length > 0 && (
          <table className="min-w-full bg-[#1a1a1c] text-white rounded-lg shadow-lg hidden lg:table">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id} className="border-b border-gray-700">
                  <td className="py-2 px-4">{todo.id}</td>
                  <td className="py-2 px-4">{todo.title}</td>
                  <td className="py-2 px-4">{todo.description}</td>
                  <td className="py-2 px-4">{todo.status}</td>
                  <td className="py-2 px-4">
                    {todo.status === "pending" && (
                      <button
                        onClick={() => updateStatus(todo.id)}
                        className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                      >
                        Processing
                      </button>
                    )}
                    {todo.status === "process" && (
                      <button
                        onClick={() => doneStatus(todo.id)}
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                      >
                        Done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
