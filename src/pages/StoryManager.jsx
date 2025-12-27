import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import { BookOpen, Plus, Trash2 } from 'lucide-react';

const StoryManager = () => {
    const [stories, setStories] = useState([]);
    const [newStory, setNewStory] = useState({ title: '', content: '', category: 'General' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            const res = await adminService.getStories();
            setStories(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch stories", err);
        }
    };

    const handleAddStory = async (e) => {
        e.preventDefault();
        try {
            await adminService.addStory(newStory);
            setNewStory({ title: '', content: '', category: 'General' });
            fetchStories();
        } catch (err) {
            console.error("Failed to add story", err);
        }
    };

    const handleDeleteStory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this story?")) return;
        try {
            await adminService.deleteStory(id);
            fetchStories();
        } catch (err) {
            console.error("Failed to delete story", err);
        }
    };

    return (
        <div className="page-container">
            <h1 className="page-title"><BookOpen size={28} /> Spiritual Story Manager</h1>

            <div className="admin-grid">
                <div className="card">
                    <h3>Add New Story</h3>
                    <form onSubmit={handleAddStory} className="admin-form">
                        <input
                            type="text"
                            placeholder="Story Title"
                            value={newStory.title}
                            onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                            required
                        />
                        <select
                            value={newStory.category}
                            onChange={(e) => setNewStory({ ...newStory, category: e.target.value })}
                        >
                            <option value="General">General</option>
                            <option value="God Stories">God Stories</option>
                            <option value="Philosophy">Philosophy</option>
                            <option value="Morals">Morals</option>
                        </select>
                        <textarea
                            placeholder="Story Content"
                            value={newStory.content}
                            onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
                            required
                        />
                        <button type="submit" className="btn-primary"><Plus size={18} /> Add Story</button>
                    </form>
                </div>

                <div className="card">
                    <h3>Existing Stories</h3>
                    {loading ? <p>Loading...</p> : (
                        <div className="story-list">
                            {stories.map(story => (
                                <div key={story.id} className="list-item">
                                    <div>
                                        <strong>{story.title}</strong>
                                        <p className="subtitle">{story.category}</p>
                                    </div>
                                    <button className="btn-icon delete" onClick={() => handleDeleteStory(story.id)}><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoryManager;
