import React, { useEffect, useState } from 'react';
import { adminService } from '../services/api';
import { Users, Calendar, BookOpen, Lightbulb, PartyPopper, Newspaper } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCalendarEntries: 0,
        totalStories: 0,
        totalTips: 0,
        totalFestivals: 0,
        totalNews: 0
    });

    useEffect(() => {
        Promise.all([
            adminService.getStats(),
            adminService.getFestivals(),
            adminService.getNews()
        ]).then(([statsRes, festivalsRes, newsRes]) => {
            setStats({
                ...statsRes.data,
                totalFestivals: festivalsRes.data.length,
                totalNews: newsRes.data.length
            });
        }).catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Dashboard</h1>
            <div className="stat-grid">
                <div className="stat-card">
                    <Users size={32} color="#6366f1" style={{ marginBottom: '1rem' }} />
                    <div className="value">{stats.totalUsers}</div>
                    <div style={{ color: 'var(--text-muted)' }}>Total Users</div>
                </div>
                <div className="stat-card">
                    <Calendar size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
                    <div className="value">{stats.totalCalendarEntries}</div>
                    <div style={{ color: 'var(--text-muted)' }}>Calendar Entries</div>
                </div>
                <div className="stat-card">
                    <PartyPopper size={32} color="#8b5cf6" style={{ marginBottom: '1rem' }} />
                    <div className="value">{stats.totalFestivals}</div>
                    <div style={{ color: 'var(--text-muted)' }}>Festivals</div>
                </div>
                <div className="stat-card">
                    <BookOpen size={32} color="#f59e0b" style={{ marginBottom: '1rem' }} />
                    <div className="value">{stats.totalStories}</div>
                    <div style={{ color: 'var(--text-muted)' }}>Spiritual Stories</div>
                </div>
                <div className="stat-card">
                    <Lightbulb size={32} color="#ec4899" style={{ marginBottom: '1rem' }} />
                    <div className="value">{stats.totalTips}</div>
                    <div style={{ color: 'var(--text-muted)' }}>Astrology Tips</div>
                </div>
                <div className="stat-card">
                    <Newspaper size={32} color="#06b6d4" style={{ marginBottom: '1rem' }} />
                    <div className="value">{stats.totalNews}</div>
                    <div style={{ color: 'var(--text-muted)' }}>News Articles</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
