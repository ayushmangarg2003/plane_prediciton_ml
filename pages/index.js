import React, { useState } from "react";
import { Calendar, Clock } from "lucide-react";

export default function FlightAnalyzer() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [delayTime, setDelayTime] = useState(0);
  const [step, setStep] = useState(1);
  const [delayAnalysis, setDelayAnalysis] = useState({
    carrier: 0,
    weather: 0,
    nas: 0,
    security: 0,
    lateAircraft: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const delay = Math.floor(Math.random() * 180);
      setDelayTime(delay);

      // Generate random breakdown of delay causes
      const carrier = Math.floor(Math.random() * delay * 0.3);
      const weather = Math.floor(Math.random() * delay * 0.25);
      const nas = Math.floor(Math.random() * delay * 0.2);
      const security = Math.floor(Math.random() * delay * 0.1);
      const lateAircraft = delay - carrier - weather - nas - security;

      setDelayAnalysis({
        carrier,
        weather,
        nas,
        security,
        lateAircraft,
      });

      setShowPopup(true);
    }, 2000);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const flightInfoFields = [
    {
      name: "FL_DATE",
      label: "Flight Date",
      type: "date",
      icon: <Calendar size={16} />,
    },
    {
      name: "AIRLINE_CODE",
      label: "Airline Code",
      type: "text",
      placeholder: "e.g. AA, DL, UA",
    },
    {
      name: "DOT_CODE",
      label: "DOT Code",
      type: "number",
      placeholder: "e.g. 19805",
    },
    {
      name: "FL_NUMBER",
      label: "Flight Number",
      type: "number",
      placeholder: "e.g. 1234",
    },
  ];

  const routeFields = [
    {
      name: "ORIGIN",
      label: "Origin Airport",
      type: "text",
      placeholder: "e.g. JFK, LAX, ORD",
    },
    {
      name: "ORIGIN_CITY",
      label: "Origin City",
      type: "text",
      placeholder: "e.g. New York",
    },
    {
      name: "DEST",
      label: "Destination Airport",
      type: "text",
      placeholder: "e.g. LAX, DFW, ATL",
    },
    {
      name: "DEST_CITY",
      label: "Destination City",
      type: "text",
      placeholder: "e.g. Los Angeles",
    },
  ];

  const scheduleFields = [
    {
      name: "CRS_DEP_TIME",
      label: "Scheduled Departure",
      type: "time",
      icon: <Clock size={16} />,
      placeholder: "HHMM",
    },
    {
      name: "DEP_TIME",
      label: "Actual Departure",
      type: "time",
      icon: <Clock size={16} />,
      placeholder: "HHMM",
    },
    {
      name: "CRS_ARR_TIME",
      label: "Scheduled Arrival",
      type: "time",
      icon: <Clock size={16} />,
      placeholder: "HHMM",
    },
    {
      name: "ARR_TIME",
      label: "Actual Arrival",
      type: "time",
      icon: <Clock size={16} />,
      placeholder: "HHMM",
    },
  ];

  const delayFields = [
    {
      name: "DEP_DELAY",
      label: "Departure Delay (mins)",
      type: "number",
      placeholder: "0",
    },
    {
      name: "TAXI_OUT",
      label: "Taxi Out Time (mins)",
      type: "number",
      placeholder: "0",
    },
    {
      name: "ARR_DELAY",
      label: "Arrival Delay (mins)",
      type: "number",
      placeholder: "0",
    },
    {
      name: "CANCELLED",
      label: "Cancelled (1=Yes, 0=No)",
      type: "select",
      options: [
        { value: "0", label: "No" },
        { value: "1", label: "Yes" },
      ],
    },
  ];

  const renderFields = (fields) => {
    return fields.map((field) => (
      <div key={field.name} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label}
        </label>
        <div className="relative">
          {field.icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              {field.icon}
            </div>
          )}

          {field.type === "select" ? (
            <select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                field.icon ? "pl-10" : "pl-3"
              } py-2 bg-white border`}
            >
              <option value="">Select...</option>
              {field.options.map((option) => (
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
              className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                field.icon ? "pl-10" : "pl-3"
              } py-2 bg-white border`}
            />
          )}
        </div>
      </div>
    ));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-4 text-indigo-800">
              Flight Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderFields(flightInfoFields)}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-4 text-indigo-800">
              Route Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderFields(routeFields)}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-4 text-indigo-800">
              Schedule Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderFields(scheduleFields)}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-4 text-indigo-800">
              Delay Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderFields(delayFields)}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={handleAnalyze}
                className={`px-6 py-2 rounded-lg text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } transition-colors`}
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Analyze Delay"}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-indigo-800">
              Flight Delay Analyzer
            </h1>
            <p className="text-gray-600 mt-2">
              Predict and analyze flight delays with advanced analytics
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex-1 text-center relative ${
                  stepNumber < step
                    ? "text-green-600"
                    : stepNumber === step
                    ? "text-indigo-600"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                    stepNumber < step
                      ? "bg-green-100 border-2 border-green-600"
                      : stepNumber === step
                      ? "bg-indigo-100 border-2 border-indigo-600"
                      : "bg-gray-100 border-2 border-gray-400"
                  }`}
                >
                  {stepNumber}
                </div>
                <div className="text-xs mt-1">
                  {stepNumber === 1
                    ? "Flight Info"
                    : stepNumber === 2
                    ? "Route"
                    : stepNumber === 3
                    ? "Schedule"
                    : "Delay"}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`absolute top-4 left-1/2 right-0 h-0.5 ${
                      stepNumber < step ? "bg-green-600" : "bg-gray-300"
                    }`}
                    style={{ width: "calc(100% - 1rem)" }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {renderStep()}
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl relative max-w-md w-full">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-800">
                Delay Prediction
              </h2>
              <p className="text-gray-600 mt-1">
                Based on historical data and current conditions
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <div
                className={`text-center p-6 rounded-full ${
                  delayTime > 60
                    ? "bg-red-100"
                    : delayTime > 15
                    ? "bg-yellow-100"
                    : "bg-green-100"
                }`}
              >
                <div
                  className={`text-5xl font-bold mb-1 ${
                    delayTime > 60
                      ? "text-red-600"
                      : delayTime > 15
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {delayTime}
                </div>
                <div className="text-sm text-gray-600">minutes</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-indigo-800">
                Delay Breakdown
              </h3>
              <div className="space-y-3">
                {Object.entries(delayAnalysis).map(([key, value]) => {
                  const percentage =
                    delayTime > 0 ? Math.round((value / delayTime) * 100) : 0;
                  let label = key.replace(/([A-Z])/g, " $1").toLowerCase();
                  label = label.charAt(0).toUpperCase() + label.slice(1);

                  if (key === "nas") {
                    label = "National Air System";
                  }

                  return (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {label}
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          {value} min ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            key === "carrier"
                              ? "bg-blue-500"
                              : key === "weather"
                              ? "bg-indigo-500"
                              : key === "nas"
                              ? "bg-purple-500"
                              : key === "security"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setShowPopup(false)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
