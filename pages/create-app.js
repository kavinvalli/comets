import Router from "next/router";
import { useState } from "react";

export default function CreateApp() {
  const [name, setName] = useState("");
  const [uname, setUName] = useState("");
  const [error, setError] = useState("");

  const onNameChange = (e) => {
    setName(e.target.value);
    setUName(e.target.value.toLowerCase().split(" ").join("-"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apikey = window.localStorage.getItem("apiKEYY");
    try {
      const body = { name, uname, apikey };
      const res = await fetch(`/api/app`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        return setError(error);
      }
      return Router.push("/developer");
    } catch (err) {
      setError(err.toString());
    }
  };

  return (
    <div className="bg-[#eee] min-h-screen w-full flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg flex flex-col w-full max-w-md mx-2"
      >
        <h1 className="text-xl font-semibold">New App</h1>
        <input
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="Name"
          className="border border-[#ddd] py-4 px-2 my-2 rounded"
        />
        <input
          type="text"
          value={uname}
          onChange={setUName}
          placeholder="Unique Id"
          className="border border-[#ddd] py-4 px-2 my-2 rounded"
        />
        <button
          type="submit"
          className="bg-background py-4 my-2 rounded text-white"
        >
          Create
        </button>
      </form>
    </div>
  );
}
