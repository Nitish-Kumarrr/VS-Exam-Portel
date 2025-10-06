import { useState, useEffect } from "react";
import { PlusCircle, Trash2, Pencil, X, Share2 } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function AdminExams() {
  const [exams, setExams] = useState([]);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest"); // newest / oldest / scheduled / active / expired
  const [showModal, setShowModal] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [showQuestionsFull, setShowQuestionsFull] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareExam, setShareExam] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 2;

  const [examForm, setExamForm] = useState({
    title: "",
    subject: "",
    duration: "",
    questions: [],
    examStart: "",
    examEnd: "",
  });

  // Load exams
  useEffect(() => {
    const storedExams = JSON.parse(localStorage.getItem("exams")) || [];
    const parsedExams = storedExams.map((e) => ({
      ...e,
      createdAt: new Date(e.createdAt),
      examStart: e.examStart ? new Date(e.examStart) : null,
      examEnd: e.examEnd ? new Date(e.examEnd) : null,
    }));
    setExams(parsedExams);
  }, []);

  const saveExams = (newExams) => {
    localStorage.setItem("exams", JSON.stringify(newExams));
    setExams(newExams);
  };

  const getExamStatus = (exam) => {
    const now = new Date();
    if (!exam.examStart || !exam.examEnd) return "No Dates";
    const start = new Date(exam.examStart);
    const end = new Date(exam.examEnd);
    if (now < start) return "Scheduled";
    if (now >= start && now <= end) return "Active";
    return "Expired";
  };

  const handleSaveExam = () => {
    if (!examForm.title || !examForm.subject || !examForm.duration || !examForm.examStart || !examForm.examEnd) {
      toast.error("Please fill all required fields");
      return;
    }

    let updatedExams;
    if (editingExam) {
      updatedExams = exams.map((e) =>
        e.id === editingExam.id
          ? {
              ...examForm,
              id: editingExam.id,
              createdAt: e.createdAt,
              examStart: new Date(examForm.examStart),
              examEnd: new Date(examForm.examEnd),
            }
          : e
      );
      toast.success("Exam updated successfully");
    } else {
      const newExam = {
        ...examForm,
        id: Date.now(),
        createdAt: new Date(),
        examStart: new Date(examForm.examStart),
        examEnd: new Date(examForm.examEnd),
      };
      updatedExams = [...exams, newExam];
      toast.success("Exam created successfully");
    }

    saveExams(updatedExams);
    setShowModal(false);
    setEditingExam(null);
    setShowQuestionsFull(false);
    setCurrentPage(1);
    setExamForm({
      title: "",
      subject: "",
      duration: "",
      questions: [],
      examStart: "",
      examEnd: "",
    });
  };

  const handleEdit = (exam) => {
    setExamForm({
      title: exam.title,
      subject: exam.subject,
      duration: exam.duration,
      questions: exam.questions,
      examStart: exam.examStart ? exam.examStart.toISOString().slice(0, 16) : "",
      examEnd: exam.examEnd ? exam.examEnd.toISOString().slice(0, 16) : "",
    });
    setEditingExam(exam);
    setShowModal(true);
    setShowQuestionsFull(false);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this exam?")) {
      const updatedExams = exams.filter((e) => e.id !== id);
      saveExams(updatedExams);
      toast.success("Exam deleted");
    }
  };

  const handleDuplicate = (exam) => {
    const newExam = { ...exam, id: Date.now(), createdAt: new Date() };
    saveExams([...exams, newExam]);
    toast.success("Exam duplicated");
  };

  const handleShare = (exam) => {
    setShareExam(exam);
    setShowShareModal(true);
  };

  const getShareLink = (exam) => `${window.location.origin}/exam/${exam.id}`;
  const copyLink = () => {
    navigator.clipboard.writeText(getShareLink(shareExam));
    toast.success("Link copied to clipboard");
  };

  // Question logic
  const addQuestion = () => {
    setExamForm({
      ...examForm,
      questions: [...examForm.questions, { text: "", options: ["", ""], correct: 0 }],
    });
  };
  const removeQuestion = (index) => {
    if (confirm("Delete this question?")) {
      const questions = [...examForm.questions];
      questions.splice(index, 1);
      setExamForm({ ...examForm, questions });
    }
  };
  const addOption = (qIndex) => {
    const questions = [...examForm.questions];
    questions[qIndex].options.push("");
    setExamForm({ ...examForm, questions });
  };
  const removeOption = (qIndex, oIndex) => {
    const questions = [...examForm.questions];
    if (questions[qIndex].options.length <= 2) return;
    questions[qIndex].options.splice(oIndex, 1);
    if (questions[qIndex].correct === oIndex) questions[qIndex].correct = 0;
    setExamForm({ ...examForm, questions });
  };
  const updateQuestionText = (qIndex, value) => {
    const questions = [...examForm.questions];
    questions[qIndex].text = value;
    setExamForm({ ...examForm, questions });
  };
  const updateOptionText = (qIndex, oIndex, value) => {
    const questions = [...examForm.questions];
    questions[qIndex].options[oIndex] = value;
    setExamForm({ ...examForm, questions });
  };
  const markCorrect = (qIndex, oIndex) => {
    const questions = [...examForm.questions];
    questions[qIndex].correct = oIndex;
    setExamForm({ ...examForm, questions });
  };

  // Filtering & Sorting
  const filteredExams = exams
    .filter((e) => {
      const matchesSearch =
        e.title.toLowerCase().includes(filter.toLowerCase()) ||
        e.subject.toLowerCase().includes(filter.toLowerCase());
      const status = getExamStatus(e);
      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
          ? status === "Active"
          : statusFilter === "scheduled"
          ? status === "Scheduled"
          : statusFilter === "expired"
          ? status === "Expired"
          : true;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOption === "newest") return b.createdAt - a.createdAt;
      if (sortOption === "oldest") return a.createdAt - b.createdAt;
      return 0;
    });

  return (
    <div className="p-6">
      <Toaster />

  {/* Welcome Header */}
  <div className="mb-6 text-center">
    <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent 
                   bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                   animate-bounce">
      Welcome Admin!!
    </h1>
    <p className="mt-2 text-lg md:text-xl font-semibold text-gray-700 
                  animate-fade-in">
      Build exams that challenge, engage, and motivate.
    </p>
  </div>


 {/* Search, Filter, Sort, Create */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
  <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent 
                 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                 animate-pulse">
    Manage Exams
  </h2>
  <div className="flex gap-2 flex-wrap">
    <input
      type="text"
      placeholder="Search by name or subject"
      className="border p-2 rounded"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
    <select
      className="border p-2 rounded"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="all">All Status</option>
      <option value="scheduled">Scheduled</option>
      <option value="active">Active</option>
      <option value="expired">Expired</option>
    </select>
    <select
      className="border p-2 rounded"
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="newest">Created: Newest</option>
      <option value="oldest">Created: Oldest</option>
    </select>
    <button
      onClick={() => setShowModal(true)}
      className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      <PlusCircle className="mr-2" /> Create Exam
    </button>
  </div>
</div>


      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExams.map((exam) => (
          <div key={exam.id} className="border p-4 rounded shadow hover:shadow-lg transition relative">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">{exam.title}</h3>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  getExamStatus(exam) === "Active"
                    ? "bg-green-100 text-green-700"
                    : getExamStatus(exam) === "Scheduled"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {getExamStatus(exam)}
              </span>
            </div>
            <p className="text-gray-600 mb-1">Subject: {exam.subject}</p>
            <p className="text-gray-600 mb-1">Duration: {exam.duration}</p>
            <p className="text-gray-500 text-sm mb-1">
              Start: {exam.examStart ? new Date(exam.examStart).toLocaleString() : "Not set"}
            </p>
            <p className="text-gray-500 text-sm mb-2">
              Expiry: {exam.examEnd ? new Date(exam.examEnd).toLocaleString() : "Not set"}
            </p>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => handleEdit(exam)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                <Pencil /> Edit
              </button>
              <button onClick={() => handleDelete(exam.id)} className="text-red-600 hover:text-red-800 flex items-center gap-1">
                <Trash2 /> Delete
              </button>
              <button onClick={() => handleDuplicate(exam)} className="text-gray-600 hover:text-gray-800 flex items-center gap-1">
                Duplicate
              </button>
              <button onClick={() => handleShare(exam)} className="text-purple-600 hover:text-purple-800 flex items-center gap-1">
                <Share2 /> Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Share Modal */}
      {showShareModal && shareExam && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-20 z-50 overflow-auto">
          <div className="bg-white p-6 rounded w-full max-w-md relative">
            <X className="absolute top-4 right-4 cursor-pointer" onClick={() => setShowShareModal(false)} />
            <h3 className="text-xl font-bold mb-4">Share Exam: {shareExam.title}</h3>
            <input
              type="text"
              readOnly
              className="border p-2 rounded w-full mb-4"
              value={getShareLink(shareExam)}
            />
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={copyLink}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Copy Link
              </button>
              <button
                onClick={() => {
                  window.location.href = `mailto:?subject=${encodeURIComponent(
                    "Check out this exam"
                  )}&body=${encodeURIComponent(getShareLink(shareExam))}`;
                }}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Email
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(getShareLink(shareExam))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Exam Details & Question Editor */}
      {showModal && !showQuestionsFull && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-10 z-50 overflow-auto">
          <div className="bg-white p-6 rounded w-full max-w-4xl relative">
            <X className="absolute top-4 right-4 cursor-pointer" onClick={() => setShowModal(false)} />
            <h3 className="text-xl font-bold mb-4">{editingExam ? "Edit Exam" : "Create Exam"}</h3>
            <input
              type="text"
              placeholder="Exam Title"
              className="border p-2 rounded w-full mb-2"
              value={examForm.title}
              onChange={(e) => setExamForm({ ...examForm, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Subject"
              className="border p-2 rounded w-full mb-2"
              value={examForm.subject}
              onChange={(e) => setExamForm({ ...examForm, subject: e.target.value })}
            />
            <input
              type="text"
              placeholder="Exam Duration (e.g., 30 min)"
              className="border p-2 rounded w-full mb-2"
              value={examForm.duration}
              onChange={(e) => setExamForm({ ...examForm, duration: e.target.value })}
            />
            <label className="block mb-1 font-semibold">Exam Start</label>
            <input
              type="datetime-local"
              className="border p-2 rounded w-full mb-2"
              value={examForm.examStart}
              onChange={(e) => setExamForm({ ...examForm, examStart: e.target.value })}
            />
            <label className="block mb-1 font-semibold">Exam Expiry</label>
            <input
              type="datetime-local"
              className="border p-2 rounded w-full mb-4"
              value={examForm.examEnd}
              onChange={(e) => setExamForm({ ...examForm, examEnd: e.target.value })}
            />
            <button
              onClick={() => setShowQuestionsFull(true)}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2"
            >
              <PlusCircle className="mr-2" /> Add Questions
            </button>
            <button
              onClick={handleSaveExam}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editingExam ? "Update Exam" : "Create Exam"}
            </button>
          </div>
        </div>
      )}

      {/* Full-screen Question Editor */}
      {showQuestionsFull && (
        <div className="fixed inset-0 bg-white z-50 overflow-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Edit Questions</h2>
            <X className="cursor-pointer" onClick={() => setShowQuestionsFull(false)} />
          </div>

          {examForm.questions.map((q, qIndex) => (
            <div key={qIndex} className="border p-4 rounded mb-4">
              <input
                type="text"
                placeholder={`Question ${qIndex + 1}`}
                className="border p-2 rounded w-full mb-2"
                value={q.text}
                onChange={(e) => updateQuestionText(qIndex, e.target.value)}
              />
              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    className="border p-2 rounded w-full"
                    value={opt}
                    onChange={(e) => updateOptionText(qIndex, oIndex, e.target.value)}
                  />
                  <button onClick={() => removeOption(qIndex, oIndex)} className="text-red-600">X</button>
                  <button
                    onClick={() => markCorrect(qIndex, oIndex)}
                    className={`px-2 rounded ${q.correct === oIndex ? "bg-green-500 text-white" : "bg-gray-200"}`}
                  >
                    Correct
                  </button>
                </div>
              ))}
              <button onClick={() => addOption(qIndex)} className="bg-blue-600 text-white px-4 py-2 rounded">Add Option</button>
              <button onClick={() => removeQuestion(qIndex)} className="bg-red-600 text-white px-4 py-2 rounded ml-2">Delete Question</button>
            </div>
          ))}

          <button onClick={addQuestion} className="bg-green-600 text-white px-4 py-2 rounded">Add Question</button>
          <div className="mt-4">
            <button onClick={() => setShowQuestionsFull(false)} className="bg-gray-600 text-white px-4 py-2 rounded">Done</button>
          </div>
        </div>
      )}
    </div>
  );
}
