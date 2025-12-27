import React, { useState, useEffect } from "react";
import { adminService } from "../services/api";
import { Trash2, Plus, Newspaper } from "lucide-react";

const NewsManager = () => {
    const [newsList, setNewsList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        imageUrl: "",
        category: "General",
        source: "",
        date: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const res = await adminService.getNews();
            setNewsList(res.data);
        } catch (err) {
            console.error("Error fetching news:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this news?")) return;
        try {
            await adminService.deleteNews(id);
            setNewsList(newsList.filter((item) => item.id !== id));
        } catch (err) {
            console.error("Error deleting news:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await adminService.addNews(formData);
            setNewsList([res.data, ...newsList]);
            setShowModal(false);
            setFormData({
                title: "",
                content: "",
                imageUrl: "",
                category: "General",
                source: "",
                date: new Date().toISOString().split("T")[0],
            });
        } catch (err) {
            console.error("Error adding news:", err);
        }
    };

    return (
        <div className="page-container">
            <h1 className="page-title">
                <Newspaper size={28} /> Spiritual News Manager
            </h1>

            <button
                onClick={() => setShowModal(true)}
                className="btn-primary"
                style={{ marginBottom: "2rem" }}
            >
                <Plus size={18} /> Add News
            </button>

            <div className="admin-grid">
                {newsList.map((news) => (
                    <div key={news.id} className="card">
                        {news.imageUrl && (
                            <img
                                src={news.imageUrl}
                                alt={news.title}
                                style={{
                                    width: "100%",
                                    height: "150px",
                                    objectFit: "cover",
                                    borderRadius: "8px 8px 0 0",
                                    marginBottom: "1rem",
                                }}
                            />
                        )}
                        <div style={{ padding: "1rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                <span className="badge">{news.category}</span>
                                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                                    {new Date(news.date).toLocaleDateString()}
                                </span>
                            </div>
                            <h3>{news.title}</h3>
                            <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
                                {news.content.substring(0, 100)}...
                            </p>
                            <button
                                onClick={() => handleDelete(news.id)}
                                className="btn-icon delete"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                {newsList.length === 0 && (
                    <div className="card" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem" }}>
                        <Newspaper size={48} style={{ opacity: 0.3, marginBottom: "1rem" }} />
                        <p style={{ color: "var(--text-muted)" }}>No news items found. Add one to get started.</p>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Add Spiritual News</h2>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <input
                                type="text"
                                placeholder="Title"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option>General</option>
                                    <option>Temple Event</option>
                                    <option>Festival</option>
                                    <option>Announcement</option>
                                </select>
                            </div>

                            <textarea
                                placeholder="Content"
                                required
                                rows="4"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            ></textarea>

                            <input
                                type="text"
                                placeholder="Image URL (Optional)"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            />

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        background: "transparent",
                                        border: "1px solid var(--border)",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    Publish News
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsManager;
