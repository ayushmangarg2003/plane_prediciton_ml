import React, { useState } from "react";

const FlightAnalyzer = () => {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("Male");
  const [flightDate, setFlightDate] = useState("");
  const [airlineCode, setAirlineCode] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [depTime, setDepTime] = useState("");
  const [arrTime, setArrTime] = useState("");
  const [distance, setDistance] = useState("");
  const [delay, setDelay] = useState(null);

  const analyzeFlight = () => {
    let prediction = "On Time";
    if (parseInt(depTime) > parseInt(arrTime)) {
      prediction = "Delayed";
    }
    setDelay(prediction);
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Flight Delay Analyzer</h1>
      <div className="flex flex-col space-y-3">
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="border p-2 rounded ml-2"
          />
        </label>
        <label>
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border p-2 rounded ml-2"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Flight Date:
          <input
            type="date"
            value={flightDate}
            onChange={(e) => setFlightDate(e.target.value)}
            className="border p-2 rounded ml-2"
          />
        </label>
        <label>
          Airline Code:
          <input
            type="text"
            value={airlineCode}
            onChange={(e) => setAirlineCode(e.target.value)}
            className="border p-2 rounded ml-2"
          />
        </label>
        <label>
          Flight Number:
          <input
            type="text"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            className="border p-2 rounded ml-2"
          />
        </label>
        <label>
          Origin Airport:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="border p-2 rounded ml-2"
          />
        </label>
        <label>
          Destination Airport:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border p-2 rounded ml-2"
          />
        </label>
        <label>
          Departure Time (hhmm):
          <input
            type="text"
            value={depTime}
            onChange={(e) => setDepTime(e.target.value)}
            className="border p-2 rounded ml-2"
          />
        </label>
        <label>
          Arrival Time (hhmm):
          <input
            type="text"
            value={arrTime}
            onChange={(e) => setArrTime(e.target.value)}
            className="border p-2 rounded ml-2"
          />
        </label>
        <label>
          Distance (miles):
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="border p-2 rounded ml-2"
          />
        </label>
        <button
          onClick={analyzeFlight}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Analyze Flight
        </button>
      </div>
      {delay && (
        <div className="mt-5 p-4 bg-white shadow rounded text-center">
          <h2 className="text-xl font-semibold">Prediction: {delay}</h2>
        </div>
      )}
    </div>
  );
};

export default FlightAnalyzer;