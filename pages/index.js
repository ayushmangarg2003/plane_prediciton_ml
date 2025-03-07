import { useState } from "react";

export default function FlightAnalyzer() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [delayTime, setDelayTime] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDelayTime(Math.floor(Math.random() * 180)); // Random delay time (0-180 min)
      setShowPopup(true);
    }, 5000);
  };

  const inputFields = [
    { name: "FL_DATE", label: "Flight Date", type: "date" },
    { name: "AIRLINE_CODE", label: "Airline Code", type: "text" },
    { name: "DOT_CODE", label: "DOT Code", type: "number" },
    { name: "FL_NUMBER", label: "Flight Number", type: "number" },
    { name: "ORIGIN", label: "Origin Airport", type: "text" },
    { name: "ORIGIN_CITY", label: "Origin City", type: "text" },
    { name: "DEST", label: "Destination Airport", type: "text" },
    { name: "DEST_CITY", label: "Destination City", type: "text" },
    { name: "CRS_DEP_TIME", label: "Scheduled Departure Time", type: "number" },
    { name: "DEP_TIME", label: "Actual Departure Time", type: "number" },
    { name: "DEP_DELAY", label: "Departure Delay (mins)", type: "number" },
    { name: "TAXI_OUT", label: "Taxi Out Time (mins)", type: "number" },
    { name: "CRS_ARR_TIME", label: "Scheduled Arrival Time", type: "number" },
    { name: "ARR_TIME", label: "Actual Arrival Time", type: "number" },
    { name: "ARR_DELAY", label: "Arrival Delay (mins)", type: "number" },
    { name: "CANCELLED", label: "Cancelled (1=Yes, 0=No)", type: "number" }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-6">Flight Delay Analyzer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {inputFields.map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.label}
            value={formData[field.name] || ""}
            onChange={handleChange}
            className="p-2 border rounded-lg w-full shadow-sm"
          />
        ))}
      </div>
      <button
        onClick={handleAnalyze}
        className={`mt-6 px-6 py-2 rounded-lg text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <p className="text-lg font-semibold">Flight will get delayed by {delayTime} minutes.</p>
          </div>
        </div>
      )}
    </div>
  );
}
