import React, { useState } from "react";

function Automation() {
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const runScript = (scriptName) => {
    setLogs([]);
    setIsRunning(true);

    const eventSource = new EventSource(
      `http://localhost:8080/api/stream-script?scriptName=${scriptName}`
    );

    eventSource.onopen = () => {
      console.log("SSE connection opened.");
    };

    eventSource.onmessage = (event) => {
      setLogs((prevLogs) => [...prevLogs, event.data]);
    };

    eventSource.addEventListener("end", () => {
      setLogs((prevLogs) => [...prevLogs, "Script execution completed."]);
      eventSource.close();
      setIsRunning(false);
    });

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      setLogs((prevLogs) => [...prevLogs, "An error occurred while streaming."]);
      eventSource.close();
      setIsRunning(false);
    };
  };

  return (
    <div className="bg-gray-100 flex flex-col h-[calc(100vh-4em)] items-center p-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Automation</h1>
      <div className="flex space-x-4 mt-6">
        <button
          className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
          disabled={isRunning}
          onClick={() => runScript("script1")}
        >
          Run Script 1
        </button>
        <button
          className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
          disabled={isRunning}
          onClick={() => runScript("script2")}
        >
          Run Script 2
        </button>
        <button
          className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
          disabled={isRunning}
          onClick={() => runScript("script3")}
        >
          Run Script 3
        </button>
      </div>
      <div className="mt-6 w-full max-w-2xl">
        <h2 className="text-lg font-semibold">Logs:</h2>
        <div
          style={{
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "5px",
            height: "300px",
            overflowY: "auto",
          }}
        >
          {logs.map((log, index) => (
            <pre key={index}>{log}</pre>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Automation;
