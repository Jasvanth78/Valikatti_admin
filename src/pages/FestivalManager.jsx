import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import { Plus, Trash2, Calendar } from 'lucide-react';

const FestivalManager = () => {
    const [festivals, setFestivals] = useState([]);
    const [newFestival, setNewFestival] = useState({
        name: '',
        tamilMonth: 'தை',
        date: new Date().toISOString().split('T')[0]
    });
    const [loading, setLoading] = useState(true);

    const tamilMonths = [
        'தை', 'மாசி', 'பங்குனி', 'சித்திரை', 'வைகாசி', 'ஆனி',
        'ஆடி', 'ஆவணி', 'புரட்டாசி', 'ஐப்பசி', 'கார்த்திகை', 'மார்கழி'
    ];

    useEffect(() => {
        fetchFestivals();
    }, []);

    const fetchFestivals = async () => {
        try {
            const res = await adminService.getFestivals();
            setFestivals(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch festivals", err);
            setLoading(false);
        }
    };

    const handleAddFestival = async (e) => {
        e.preventDefault();
        try {
            await adminService.addFestival(newFestival);
            setNewFestival({
                name: '',
                tamilMonth: 'தை',
                date: new Date().toISOString().split('T')[0]
            });
            fetchFestivals();
        } catch (err) {
            console.error("Failed to add festival", err);
        }
    };

    const handleDeleteFestival = async (id) => {
        if (!window.confirm("Are you sure you want to delete this festival?")) return;
        try {
            await adminService.deleteFestival(id);
            fetchFestivals();
        } catch (err) {
            console.error("Failed to delete festival", err);
        }
    };

    return (
        <div className="page-container">
            <h1 className="page-title"><Calendar size={28} /> Festival Manager</h1>

            <div className="admin-grid">
                <div className="card">
                    <h3>Add New Festival</h3>
                    <form onSubmit={handleAddFestival} className="admin-form">
                        <input
                            type="text"
                            placeholder="Festival Name (Tamil)"
                            value={newFestival.name}
                            onChange={(e) => setNewFestival({ ...newFestival, name: e.target.value })}
                            required
                        />
                        <select
                            value={newFestival.tamilMonth}
                            onChange={(e) => setNewFestival({ ...newFestival, tamilMonth: e.target.value })}
                        >
                            {tamilMonths.map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                        <input
                            type="date"
                            value={newFestival.date}
                            onChange={(e) => setNewFestival({ ...newFestival, date: e.target.value })}
                            required
                        />
                        <button type="submit" className="btn-primary">
                            <Plus size={18} /> Add Festival
                        </button>
                    </form>
                </div>

                <div className="card">
                    <h3>Existing Festivals</h3>
                    {loading ? <p>Loading...</p> : (
                        <div className="festival-list">
                            {festivals.map(festival => (
                                <div key={festival.id} className="list-item">
                                    <div>
                                        <strong>{festival.name}</strong>
                                        <p className="subtitle">{festival.tamilMonth} - {new Date(festival.date).toLocaleDateString()}</p>
                                    </div>
                                    <button className="btn-icon delete" onClick={() => handleDeleteFestival(festival.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            {festivals.length === 0 && (
                                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                                    No festivals found
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FestivalManager;
