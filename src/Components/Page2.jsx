import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Page2 = () => {
  const [submissions, setSubmissions] = useState([]);
  const clearOutput = async () => {
    try {
      const response = await axios.delete(
        "https://compiler-backend-siij.onrender.com/submissions"
      );
      console.log(response);
      setSubmissions([]);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return new Date(timestamp).toLocaleString("en-IN", options);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://compiler-backend-siij.onrender.com/page2"
      );
      setSubmissions(
        response.data.submissions.map((submission) => ({
          ...submission,
          output: "", // Initialize output for each submission
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getOutputForSubmission = async (submissionId) => {
    try {
      const submissionIndex = submissions.findIndex(
        (submission) => submission.id === submissionId
      );
      if (submissionIndex === -1) return;

      const { sourcecode, codelang, stdin } = submissions[submissionIndex];
      const response = await axios.post(
        "https://compiler-backend-siij.onrender.com/execute",
        {
          sourcecode,
          codelang,
          stdin,
        }
      );

      const updatedSubmissions = [...submissions];
      updatedSubmissions[submissionIndex].output =
        response.data.error || response.data.output;
      setSubmissions(updatedSubmissions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h2 className="font-bold text-2xl">Submitted Entries</h2>
      <div className="flex gap-x-4 justify-center">
        <button
          onClick={() => clearOutput()}
          className="bg-gray-700 text-white font-bold py-3 my-3 px-4 rounded-md"
        >
          Delete All Submissions
        </button>
        <Link to="/">
          <button className="bg-gray-700 text-white font-bold py-3 my-3 px-4 rounded-md">
            Back
          </button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Code Language</th>
            <th>Input</th>
            <th>Source Code</th>
            <th>Submission Time</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td>{submission.username}</td>
              <td>{submission.codelang}</td>
              <td>{submission.stdin}</td>
              <td>
                <span className="code-preview">
                  {submission.sourcecode.substring(0, 100)}
                </span>
              </td>
              <td>{formatTimestamp(submission.timestamp)}</td>
              <td>
                <button
                  className="bg-gray-700 text-white font-bold py-2 px-4 cursor-pointer rounded-md"
                  onClick={() => getOutputForSubmission(submission.id)}
                  disabled={submission.output !== ""}
                >
                  Execute
                </button>

                {submission.output !== "" && <div>{submission.output}</div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Page2;
