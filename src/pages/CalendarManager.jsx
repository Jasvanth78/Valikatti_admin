import React, { useEffect, useState } from 'react';
import { adminService } from '../services/api';
import { Trash2, Plus } from 'lucide-react';

const CalendarManager = () => {
    const [calendar, setCalendar] = useState([]);
    const [newEntry, setNewEntry] = useState({ date: '', dayType: 'அமாவாசை' });

    const fetchCalendar = () => {
        const today = new Date();
        adminService.getCalendar(today.getFullYear(), today.getMonth() + 1)
            .then(res => setCalendar(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchCalendar();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await adminService.addCalendarDay(newEntry);
            setNewEntry({ date: '', dayType: 'அமாவாசை' });
            fetchCalendar();
        } catch (err) {
            alert("Failed to add entry: " + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            try {
                await adminService.deleteCalendarDay(id);
                fetchCalendar();
            } catch (err) {
                alert("Failed to delete entry: " + err.message);
            }
        }
    };

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Calendar Management</h1>

            <div className="card">
                <h3>Add New Special Day</h3>
                <form onSubmit={handleAdd} style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Date</label>
                        <input
                            type="date"
                            required
                            value={newEntry.date}
                            onChange={e => setNewEntry({ ...newEntry, date: e.target.value })}
                        />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Type</label>
                        <select
                            value={newEntry.dayType}
                            onChange={e => setNewEntry({ ...newEntry, dayType: e.target.value })}
                        >
                            <option value="அமாவாசை">அமாவாசை (Amavasai)</option>
                            <option value="பௌர்ணமி">பௌர்ணமி (Pournami)</option>
                            <option value="Festival">முக்கிய திருவிழா (Festival)</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ height: '45px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Plus size={18} /> Add
                    </button>
                </form>
            </div>

            <div className="card">
                <h3>Special Days (Current Month)</h3>
                <div className="table-container" style={{ marginTop: '1rem' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calendar.map(day => (
                                <tr key={day.id}>
                                    <td>{new Date(day.date).toLocaleDateString()}</td>
                                    <td>{day.dayType}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(day.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {calendar.length === 0 && (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No special days found for this month.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CalendarManager;
