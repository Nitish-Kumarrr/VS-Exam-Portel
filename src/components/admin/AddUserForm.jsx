import React, { useState } from 'react'

const categoriesList = [
    { _id: "c1", name: "React", description: "Frontend framework" },
    { _id: "c2", name: "Node.js", description: "Backend runtime" },
    { _id: "c3", name: "MongoDB", description: "Database" },
    { _id: "c4", name: "DevOps", description: "Deployment & tools" },
];
let users = [
    {
        _id: "u1",
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "user",
        category: { _id: "c1", name: "React" },
    },
    {
        _id: "u2",
        name: "Bob Smith",
        email: "bob@example.com",
        role: "user",
        category: { _id: "c2", name: "Node.js" },
    },
];

const AddUserForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        category: "",
    });
    const [categories, setCategories] = useState(categoriesList || []);
    const [loading, setLoading] = useState(false)
    const handleSubmit = () => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password || !formData.category) {
            alert("Please fill all fields");
            return;
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-xl shadow-md max-w-md mx-auto mb-4"
        >
            <h2 className="text-xl font-bold mb-4 text-center">Add New User</h2>

            <label className="block mb-2 text-gray-700">Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mb-3"
            />

            <label className="block mb-2 text-gray-700">Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mb-3"
            />

            <label className="block mb-2 text-gray-700">Password</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mb-3"
            />

            <label className="block mb-2 text-gray-700">Category</label>
            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mb-3"
            >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
                {loading ? "Creating..." : "Add User"}
            </button>
        </form>
    )
}

export default AddUserForm