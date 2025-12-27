import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import { Lightbulb, Plus, Trash2 } from 'lucide-react';

const TipManager = () => {
    const [tips, setTips] = useState([]);
    const [newTip, setNewTip] = useState({ title: '', content: '', type: 'vastu' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTips();
    }, []);

    const fetchTips = async () => {
        try {
            const res = await adminService.getTips();
            setTips(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch tips", err);
        }
    };

    const handleAddTip = async (e) => {
        e.preventDefault();
        try {
            await adminService.addTip(newTip);
            setNewTip({ title: '', content: '', type: 'vastu' });
            fetchTips();
        } catch (err) {
            console.error("Failed to add tip", err);
        }
    };

    const handleDeleteTip = async (id) => {
        if (!window.confirm("Are you sure you want to delete this tip?")) return;
        try {
            await adminService.deleteTip(id);
            fetchTips();
        } catch (err) {
            console.error("Failed to delete tip", err);
        }
    };

    return (
        <div className="page-container">
            <h1 className="page-title"><Lightbulb size={28} /> Astrology & Vastu Tips</h1>

            <div className="admin-grid">
                <div className="card">
                    <h3>Add New Tip</h3>
                    <form onSubmit={handleAddTip} className="admin-form">
                        <input
                            type="text"
                            placeholder="Tip Title"
                            value={newTip.title}
                            onChange={(e) => setNewTip({ ...newTip, title: e.target.value })}
                            required
                        />
                        <select
                            value={newTip.type}
                            onChange={(e) => setNewTip({ ...newTip, type: e.target.value })}
                        >
                            <option value="vastu">Vastu Tip</option>
                            <option value="astrology">Astrology Tip</option>
                            <option value="general">General Spiritual Tip</option>
                        </select>
                        <textarea
                            placeholder="Tip Content"
                            value={newTip.content}
                            onChange={(e) => setNewTip({ ...newTip, content: e.target.value })}
                            required
                        />
                        <button type="submit" className="btn-primary"><Plus size={18} /> Add Tip</button>
                    </form>
                </div>

                <div className="card">
                    <h3>Existing Tips</h3>
                    {loading ? <p>Loading...</p> : (
                        <div className="tip-list">
                            {tips.map(tip => (
                                <div key={tip.id} className="list-item">
                                    <div>
                                        <strong>{tip.title}</strong>
                                        <p className="subtitle">{tip.type.toUpperCase()}</p>
                                    </div>
                                    <button className="btn-icon delete" onClick={() => handleDeleteTip(tip.id)}><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TipManager;
