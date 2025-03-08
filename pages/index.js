import React, { useState } from "react";
import { Plane, Clock } from "lucide-react";

const FlightAnalyzer = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "25",
    gender: "Male",
    flightDate: "",
    airlineCode: "",
    flightNumber: "",
    origin: "",
    destination: "",
    depTime: "",
    arrTime: "",
    distance: "",
  });
  const [showPrediction, setShowPrediction] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleAnalyze = () => {
    setLoading(true);
    
    // Simulating analysis process
    setTimeout(() => {
      // Using the same logic as in original code
      let result = "User will Buy the ticket";
      if (parseInt(formData.depTime) > parseInt(formData.arrTime)) {
        result = "User will not Buy the ticket";
      }
      
      setPrediction(result);
      setShowPrediction(true);
      setLoading(false);
    }, 1000);
  };

  // Field definitions for each step
  const personalInfoFields = [
    {
      name: "age",
      label: "Age",
      type: "number",
      icon: <span className="text-gray-500">👤</span>
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      icon: <span className="text-gray-500">👥</span>,
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" }
      ]
    }
  ];

  const flightInfoFields = [
    {
      name: "flightDate",
      label: "Flight Date",
      type: "date",
      icon: <span className="text-gray-500">📅</span>
    },
    {
      name: "airlineCode",
      label: "Airline Code",
      type: "text",
      icon: <span className="text-gray-500">🏢</span>
    },
    {
      name: "flightNumber",
      label: "Flight Number",
      type: "text",
      icon: <span className="text-gray-500">✈️</span>
    },
  ];

  const routeFields = [
    {
      name: "origin",
      label: "Origin Airport",
      type: "text",
      icon: <span className="text-gray-500">🛫</span>
    },
    {
      name: "destination",
      label: "Destination Airport",
      type: "text",
      icon: <span className="text-gray-500">🛬</span>
    }
  ];

  const scheduleFields = [
    {
      name: "depTime",
      label: "Departure Time (hhmm)",
      type: "text",
      placeholder: "e.g. 1430 for 2:30 PM",
      icon: <span className="text-gray-500">🕒</span>
    },
    {
      name: "arrTime",
      label: "Arrival Time (hhmm)",
      type: "text",
      placeholder: "e.g. 1630 for 4:30 PM",
      icon: <span className="text-gray-500">🕔</span>
    },
    {
      name: "distance",
      label: "Distance (miles)",
      type: "number",
      icon: <span className="text-gray-500">📏</span>
    }
  ];

  // Function to render fields
  const renderFields = (fields) => {
    return fields.map((field) => (
      <div key={field.name} className="mb-4">
        <label className="block text-sm font-bold text-black mb-1">
          {field.label}
        </label>
        <div className="relative">
          {field.icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {field.icon}
            </div>
          )}
          
          {field.type === "select" ? (
            <select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className={`w-full border border-gray-400 text-black ${
                field.icon ? "pl-10" : "pl-3"
              } py-2 bg-white border`}
              style={{ borderRadius: 0, height: "42px" }}
            >
              <option value="">Select...</option>
              {field.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder || field.label}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className={`w-full border border-gray-400 text-black ${
                field.icon ? "pl-10" : "pl-3"
              } py-2 bg-white border`}
              style={{ borderRadius: 0, height: "42px" }}
            />
          )}
        </div>
      </div>
    ));
  };

  // Render content based on current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4 text-black border-b-2 border-gray-200 pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderFields(personalInfoFields)}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-[#dd0000] text-white font-medium hover:bg-black transition-colors"
                style={{ borderRadius: 0 }}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4 text-black border-b-2 border-gray-200 pb-2">Flight Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderFields(flightInfoFields)}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-600 text-white font-medium hover:bg-black transition-colors"
                style={{ borderRadius: 0 }}
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-[#dd0000] text-white font-medium hover:bg-black transition-colors"
                style={{ borderRadius: 0 }}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4 text-black border-b-2 border-gray-200 pb-2">Route Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderFields(routeFields)}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-600 text-white font-medium hover:bg-black transition-colors"
                style={{ borderRadius: 0 }}
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-[#dd0000] text-white font-medium hover:bg-black transition-colors"
                style={{ borderRadius: 0 }}
              >
                Next
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4 text-black border-b-2 border-gray-200 pb-2">Schedule Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderFields(scheduleFields)}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-600 text-white font-medium hover:bg-black transition-colors"
                style={{ borderRadius: 0 }}
              >
                Previous
              </button>
              <button
                onClick={handleAnalyze}
                className={`px-6 py-2 text-white font-medium ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#dd0000] hover:bg-black"
                } transition-colors`}
                style={{ borderRadius: 0 }}
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Analyze Purchase"}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="w-full max-w-4xl bg-white p-8 shadow-lg">
        <div className="flex items-center mb-8">
          <div className="mr-4">
            <div className="w-16 h-16 flex items-center justify-center bg-[#dd0000] rounded-full">
              <Plane size={32} color="white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">Flight Purchase Predictor</h1>
            <p className="text-gray-600 mt-1">Predict and analyze flight purchase decisions</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div
                key={stepNumber}
                className="flex-1 text-center relative"
              >
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                    stepNumber < step
                      ? "bg-[#dd0000] text-white"
                      : stepNumber === step
                      ? "bg-[#dd0000] text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {stepNumber}
                </div>
                <div className="text-xs mt-1 text-black font-medium">
                  {stepNumber === 1
                    ? "Personal Info"
                    : stepNumber === 2
                    ? "Flight Info"
                    : stepNumber === 3
                    ? "Route Info"
                    : "Schedule Info"}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`absolute top-4 left-1/2 right-0 h-0.5 ${
                      stepNumber < step ? "bg-[#dd0000]" : "bg-gray-300"
                    }`}
                    style={{ width: "calc(100% - 1rem)" }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">{renderStepContent()}</div>
      </div>

      {/* Prediction Modal with Blur Overlay */}
      {showPrediction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-8 relative max-w-md w-full shadow-lg">
            <button
              onClick={() => setShowPrediction(false)}
              className="absolute top-4 right-4 text-black hover:text-[#dd0000] bg-white w-8 h-8 flex items-center justify-center"
              style={{ borderRadius: 0 }}
            >
              ✕
            </button>

            <div className="flex items-center mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-[#dd0000] rounded-full mr-4">
                <Clock size={24} color="white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">Purchase Prediction</h2>
                <p className="text-gray-600 mt-1">Based on flight data analysis</p>
              </div>
            </div>

            <div className="text-center p-6 rounded-full bg-[#dd0000] mb-6">
              <div className="text-5xl font-bold mb-1 text-white">
                {prediction.includes("not") ? "NO" : "YES"}
              </div>
              <div className="text-sm text-white">
                {prediction}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4 text-black border-b border-gray-200 pb-2">Analysis Factors</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-black">Flight Time Consistency</span>
                    <span className="text-sm font-medium text-black">
                      {prediction.includes("not") ? "Issue detected" : "Looks good"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-5">
                    <div
                      className="h-5 bg-[#dd0000]"
                      style={{ width: prediction.includes("not") ? "30%" : "90%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setShowPrediction(false)}
                className="px-8 py-3 bg-[#dd0000] text-white font-medium hover:bg-black transition-colors"
                style={{ borderRadius: 0 }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightAnalyzer;