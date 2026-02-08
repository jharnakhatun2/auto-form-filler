import React, { useEffect, useState } from 'react'

export const Popup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Load saved data
  useEffect(() => {
    chrome.storage.sync.get(["formData"], (res) => {
      if (res.formData) {
        setName(res.formData.name || "");
        setEmail(res.formData.email || "");
        setPhone(res.formData.phone || "");
      }
    });
  }, []);

  const saveData = () => {
    chrome.storage.sync.set({ formData: { name, email, phone } }, () => {
      setMessage("Saved successfully! ✅");

      // Clear message after 1 seconds
      setTimeout(() => setMessage(""), 1000);
    });
  };

  const fillForm = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: "FILL_FORM" });
  };

  const inputStyle = "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg " + "focus:outline-none focus:ring-2 focus:ring-blue-500 " + "focus:border-transparent transition bg-white shadow-sm";

  return (
    <div className="p-5 w-72 bg-gray-100 shadow-lg">
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Auto Form Filler
      </h3>

      {/* Inputs */}
      <div className="space-y-3">
        <input
          className={inputStyle}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={inputStyle}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={inputStyle}
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={saveData}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg 
                 hover:bg-blue-700 active:scale-95 
                 transition font-medium shadow cursor-pointer"
        >
          Save
        </button>

        <button
          onClick={fillForm}
          className="flex-1 bg-green-600 text-white py-2 rounded-lg 
                 hover:bg-green-700 active:scale-95 
                 transition font-medium shadow cursor-pointer"
        >
          Fill Form
        </button>
      </div>
      {message && (
        <p className="text-green-600 text-sm mt-2 text-center">{message}</p>
      )}
    </div>
  )
}
