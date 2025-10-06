import { useState, useEffect } from "react";
import {
  RefreshCw,
  Download,
  Trash2,
  Search,
  PieChart as PieIcon,
  X,
  AlertTriangle,
} from "lucide-react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast, Toaster } from "react-hot-toast";

export default function Students() {
  const originalData = [
    { id: "1001", name: "Aditya Mehra", tags: ["ASE"], correct: 15, wrong: 5, total: 20 },
    { id: "1002", name: "Neha Sharma", tags: ["Java Developer"], correct: 18, wrong: 2, total: 20 },
    { id: "1003", name: "Rohan Gupta", tags: ["ASE"], correct: 10, wrong: 10, total: 20 },
    { id: "1004", name: "Simran Kaur", tags: ["Java Developer"], correct: 12, wrong: 8, total: 20 },
    { id: "1005", name: "Arjun Patel", tags: ["ASE"], correct: 17, wrong: 3, total: 20 },
    { id: "1006", name: "Priya Nair", tags: ["Full Stack"], correct: 14, wrong: 6, total: 20 },
    { id: "1007", name: "Karan Verma", tags: ["ASE"], correct: 19, wrong: 1, total: 20 },
    { id: "1008", name: "Ishita Roy", tags: ["Java Developer"], correct: 16, wrong: 4, total: 20 },
    { id: "1009", name: "Rahul Khanna", tags: ["Full Stack"], correct: 11, wrong: 9, total: 20 },
    { id: "1010", name: "Meera Iyer", tags: ["ASE"], correct: 13, wrong: 7, total: 20 },
    { id: "1011", name: "Sahil Bhatia", tags: ["Java Developer"], correct: 20, wrong: 0, total: 20 },
    { id: "1012", name: "Ananya Das", tags: ["Full Stack"], correct: 9, wrong: 11, total: 20 },
    { id: "1013", name: "Vikram Reddy", tags: ["ASE"], correct: 18, wrong: 2, total: 20 },
    { id: "1014", name: "Tanya Kapoor", tags: ["Java Developer"], correct: 14, wrong: 6, total: 20 },
    { id: "1015", name: "Devansh Malhotra", tags: ["Full Stack"], correct: 15, wrong: 5, total: 20 },
    { id: "1016", name: "Sneha Kulkarni", tags: ["ASE"], correct: 12, wrong: 8, total: 20 },
    { id: "1017", name: "Harsh Singh", tags: ["Java Developer"], correct: 17, wrong: 3, total: 20 },
    { id: "1018", name: "Ritika Jain", tags: ["Full Stack"], correct: 10, wrong: 10, total: 20 },
    { id: "1019", name: "Mohit Chawla", tags: ["ASE"], correct: 16, wrong: 4, total: 20 },
    { id: "1020", name: "Aditi Joshi", tags: ["Java Developer"], correct: 11, wrong: 9, total: 20 },
  ];

  const [students, setStudents] = useState(originalData);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [analysis, setAnalysis] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const studentsPerPage = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchName, searchId, searchTag]);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchName.toLowerCase()) &&
      s.id.toLowerCase().includes(searchId.toLowerCase()) &&
      s.tags.some((tag) => tag.toLowerCase().includes(searchTag.toLowerCase()))
  );

  const totalPages = Math.ceil(filtered.length / studentsPerPage) || 1;
  const startIndex = (currentPage - 1) * studentsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + studentsPerPage);

  const confirmDelete = (id) => setDeleteTarget(id);

  const handleDelete = () => {
    setStudents((prev) => prev.filter((s) => s.id !== deleteTarget));
    if (analysis?.id === deleteTarget) setAnalysis(null);
    toast.success("Student deleted successfully!");
    setDeleteTarget(null);
  };

  const handleReload = () => {
    setStudents(originalData);
    setSearchName("");
    setSearchId("");
    setSearchTag("");
    setCurrentPage(1);
    toast.success("Data reloaded!");
  };

  const handleDownload = () => {
    const csvContent = [
      ["Name", "ID", "Tags", "Correct", "Wrong", "Unattempted", "Score"],
      ...filtered.map((s) => [
        s.name,
        s.id,
        s.tags.join(", "),
        s.correct,
        s.wrong,
        s.total - (s.correct + s.wrong),
        s.correct, // Score secured
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();

    toast.success("CSV downloaded!");
  };

  const COLORS = ["#4ade80", "#f87171", "#60a5fa"];

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 via-white to-purple-100 min-h-screen">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-violet-700 to-pink-600 drop-shadow-lg">
          Student Directory
        </h2>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={handleReload}
            className="flex items-center gap-2 px-5 py-2 bg-white/30 backdrop-blur-md border border-gray-200 text-indigo-700 font-medium rounded-xl shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <RefreshCw size={16} /> Reload
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <Download size={16} /> Download CSV
          </button>
        </div>
      </div>

      {/* Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search Name..."
            className="w-full pl-10 pr-3 py-2 bg-white/70 border rounded-xl shadow focus:ring-2 focus:ring-indigo-400"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search ID..."
            className="w-full pl-10 pr-3 py-2 bg-white/70 border rounded-xl shadow focus:ring-2 focus:ring-indigo-400"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search Tags..."
            className="w-full pl-10 pr-3 py-2 bg-white/70 border rounded-xl shadow focus:ring-2 focus:ring-indigo-400"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
          />
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.length > 0 ? (
          paginated.map((student) => (
            <div
              key={student.id}
              className="p-5 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg shadow">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                  <p className="text-sm text-gray-500">ID: {student.id}</p>
                </div>
              </div>
              <div className="mb-4">
                {student.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="inline-block px-3 py-1 mr-2 text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => confirmDelete(student.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  <Trash2 size={14} /> Delete
                </button>
                <button
                  onClick={() => setAnalysis(student)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  <PieIcon size={14} /> View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 italic">No students found</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-10">
        <span className="text-sm text-gray-600">
          Page <b>{currentPage}</b> of <b>{totalPages}</b>
        </span>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 rounded-full bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                currentPage === idx + 1
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md scale-105"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 rounded-full bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] md:w-[400px] relative text-center">
            <AlertTriangle className="text-red-500 w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Confirm Deletion</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this student? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg shadow-md hover:scale-105 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Analysis */}
      {analysis && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] md:w-[600px] relative">
            <button
              onClick={() => setAnalysis(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Performance Analysis - {analysis.name}
            </h3>
            <div className="h-72">
              <ResponsiveContainer>
                <RePieChart>
                  <Pie
                    data={[
                      { name: "Correct", value: analysis.correct },
                      { name: "Wrong", value: analysis.wrong },
                      {
                        name: "Unattempted",
                        value: analysis.total - (analysis.correct + analysis.wrong),
                      },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {[analysis.correct, analysis.wrong, analysis.total - (analysis.correct + analysis.wrong)].map(
                      (_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      )
                    )}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
