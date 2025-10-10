import { Trash2 ,PieChart as PieIcon,} from 'lucide-react';
import React, { useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi';

const StudentsList = ({setDeleteTarget,students,setAnalysis,searchName,searchId,searchTag,currentPage,setCurrentPage}) => {
    
     const studentsPerPage = 9;
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
  return (
    <>
     {/* Students Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.length > 0 ? (
          paginated.map((student) => (
            <div
              key={student.id}
              className="p-5 relative bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="absolute right-[10px] top-[10px]"><HiOutlineDotsVertical /></span>
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
    </>
  )
}

export default StudentsList