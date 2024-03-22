import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
const Page1 = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [codelang, setCodelang] = useState("");
  const [stdin, setStdin] = useState("");
  const [sourcecode, setSourcecode] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!username || !codelang || !sourcecode) {
        console.log("Please fill in all required fields");
        return;
      }
      const response = await axios(
        "https://compiler-backend-siij.onrender.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({ username, codelang, stdin, sourcecode }),
        }
      );
      navigate("/page2");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex justify-center bg-green-200 border-2 rounded-md translate-y-20 border-black h-[500px] mx-auto w-[500px]">
      <form action="" className="flex flex-col justify-items">
        <h1 className="text-2xl py-2 font-bold">Submission Form</h1>
        <input
          type="name"
          placeholder="username "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-black rounded-md p-1"
        />

        <select
          name=""
          id=""
          className="border-2 border-black my-2 p-1 rounded-md"
          value={codelang}
          onChange={(e) => setCodelang(e.target.value)}
        >
          <option value="C++">C++</option>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
          <option value="JavaScript">JavaScript</option>
        </select>

        <textarea
          cols="15"
          rows="3"
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
          className="border-2 border-black my-2 p-1 rounded-md"
          placeholder="Enter your input here (stdin)"
        ></textarea>

        <textarea
          className="border-2 border-black mt-2  rounded-md"
          value={sourcecode}
          onChange={(e) => setSourcecode(e.target.value)}
          cols="50"
          rows="8"
          placeholder="Enter your code here(source code)"
        ></textarea>

        <button
          onClick={(e) => handleSubmit(e)}
          className="bg-green-600 rounded-lg my-2 text-white font-bold w-20 h-10"
        >
          {" "}
          Submit
        </button>
      </form>
    </section>
  );
};

export default Page1;
