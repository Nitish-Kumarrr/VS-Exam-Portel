import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast"; // ✅ import toast

export default function Organisations() {
  const [organisations, setOrganisations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("organisations")) || [];
    setOrganisations(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = organisations.filter((org) => org.id !== id);
    setOrganisations(updated);
    localStorage.setItem("organisations", JSON.stringify(updated));

    // ✅ Replace alert with a clean toast
    toast.error("Organisation deleted!", {
      icon: "❌",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Organisation & Events</h2>
        <Link
          to="/super-admin/add-organisation"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          + Add Organisation
        </Link>
      </div>

      {organisations.length === 0 ? (
        <p className="text-gray-500">No organisations added yet.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border text-center">S.No</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Plan</th>
              <th className="px-4 py-2 border">Start Date</th>
              <th className="px-4 py-2 border">End Date</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {organisations.map((org, index) => (
              <tr key={org.id}>
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{org.name}</td>
                <td className="px-4 py-2 border">{org.email}</td>
                <td className="px-4 py-2 border">{org.plan}</td>
                <td className="px-4 py-2 border">{org.startDate}</td>
                <td className="px-4 py-2 border">{org.endDate}</td>
                <td className="px-4 py-2 border text-center flex gap-2 justify-center">
                  <button
                    className="p-2 text-gray-500 rounded hover:bg-gray-200 transition"
                    onClick={() =>
                      navigate(`/super-admin/add-organisation/${org.id}`)
                    }
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(org.id)}
                    className="p-2 text-gray-500 rounded hover:bg-gray-200 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}