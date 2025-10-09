import { X } from 'lucide-react';
import React from 'react'
import { toast, Toaster } from "react-hot-toast";
const ShareExam = ({ setShowShareModal, shareExam }) => {
    const getShareLink = (exam) => `${window.location.origin}/exam/${exam.id}`;
    const copyLink = () => {
        navigator.clipboard.writeText(getShareLink(shareExam));
        toast.success("Link copied to clipboard");
    };
    return (
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
    )
}

export default ShareExam