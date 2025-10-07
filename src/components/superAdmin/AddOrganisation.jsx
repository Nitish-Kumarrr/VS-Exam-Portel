import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast"; // ✅ import toast

export default function AddOrganisation() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    plan: "",
    startDate: "",
    endDate: "",
  });

  // Load existing org if editing
  useEffect(() => {
    if (id) {
      const organisations = JSON.parse(localStorage.getItem("organisations")) || [];
      const org = organisations.find((o) => o.id === parseInt(id));
      if (org) {
        setFormData(org);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "plan") {
      const today = new Date();
      const startDate = today.toISOString().split("T")[0];

      // set endDate based on plan
      let endDateObj = new Date(today);
      if (value === "Basic") {
        endDateObj.setMonth(endDateObj.getMonth() + 1);
      } else if (value === "Pro") {
        endDateObj.setMonth(endDateObj.getMonth() + 6);
      } else if (value === "Enterprise") {
        endDateObj.setFullYear(endDateObj.getFullYear() + 1);
      }

      const endDate = endDateObj.toISOString().split("T")[0];

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        startDate,
        endDate,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const organisations = JSON.parse(localStorage.getItem("organisations")) || [];

    if (id) {
      // Edit existing org
      const updated = organisations.map((o) =>
        o.id === parseInt(id) ? { ...formData, id: parseInt(id) } : o
      );
      localStorage.setItem("organisations", JSON.stringify(updated));

      // Professional toast notification
      toast.success(" Organisation updated successfully!");
    } else {
      // Add new org
      const newOrg = { ...formData, id: Date.now() };
      organisations.push(newOrg);
      localStorage.setItem("organisations", JSON.stringify(organisations));

      //  Professional toast notification
      toast.success(" Organisation added successfully!");
    }

    navigate("/super-admin-dashboard/organisation");
  };

  return (
    <div className="p-10 max-w-2xl mx-auto mt-4 bg-white rounded-lg shadow-lg min-h-[500px]">
      <h2 className="text-xl font-bold mb-4">
        {id ? "✏️ Edit Organisation" : "+ Add Organisation"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Organisation Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="plan"
          value={formData.plan}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Plan --</option>
          <option value="Basic">Basic (1 Month)</option>
          <option value="Pro">Pro / Premium (6 Months)</option>
          <option value="Enterprise">Enterprise (1 Year)</option>
        </select>

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />

        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {id ? "Update Organisation" : "Save Organisation"}
        </button>
      </form>
    </div>
  );
}