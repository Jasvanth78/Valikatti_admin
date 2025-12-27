import React, { useEffect, useState } from 'react';
import { adminService } from '../services/api';
import { UserCircle, Mail, Calendar, Star } from 'lucide-react';

const UserProfile = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        adminService.getUsers()
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="page-container">
            <h1 className="page-title"><UserCircle size={28} /> User Profiles</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
                <div className="card" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                    <h3>Users List</h3>
                    <div style={{ marginTop: '1rem' }}>
                        {users.map(user => (
                            <div
                                key={user.id}
                                onClick={() => setSelectedUser(user)}
                                style={{
                                    padding: '1rem',
                                    marginBottom: '0.5rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    backgroundColor: selectedUser?.id === user.id ? '#f0f0f0' : 'transparent',
                                    border: selectedUser?.id === user.id ? '2px solid #6366f1' : '1px solid #e0e0e0',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{user.name}</div>
                                <div style={{ fontSize: '0.875rem', color: '#666' }}>{user.rasi}</div>
                            </div>
                        ))}
                        {users.length === 0 && (
                            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                                No users found
                            </p>
                        )}
                    </div>
                </div>

                <div className="card">
                    {selectedUser ? (
                        <div>
                            <div style={{ 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                padding: '2rem',
                                borderRadius: '12px',
                                marginBottom: '2rem',
                                color: 'white'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        background: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2rem',
                                        fontWeight: 'bold',
                                        color: '#667eea'
                                    }}>
                                        {selectedUser.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h2 style={{ margin: 0, fontSize: '2rem' }}>{selectedUser.name}</h2>
                                        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
                                            User ID: {selectedUser.id}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                                <div style={{ 
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid #e0e0e0',
                                    background: '#fafafa'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <Star size={20} color="#f59e0b" />
                                        <span style={{ fontWeight: 'bold', color: '#666' }}>Rasi</span>
                                    </div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                                        {selectedUser.rasi}
                                    </div>
                                </div>

                                <div style={{ 
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid #e0e0e0',
                                    background: '#fafafa'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <Mail size={20} color="#6366f1" />
                                        <span style={{ fontWeight: 'bold', color: '#666' }}>Email</span>
                                    </div>
                                    <div style={{ fontSize: '1rem', color: '#333', wordBreak: 'break-all' }}>
                                        {selectedUser.email || 'Not provided'}
                                    </div>
                                </div>

                                <div style={{ 
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid #e0e0e0',
                                    background: '#fafafa'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <Calendar size={20} color="#10b981" />
                                        <span style={{ fontWeight: 'bold', color: '#666' }}>Joined</span>
                                    </div>
                                    <div style={{ fontSize: '1rem', color: '#333' }}>
                                        {new Date(selectedUser.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>

                                <div style={{ 
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid #e0e0e0',
                                    background: '#fafafa'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <UserCircle size={20} color="#ec4899" />
                                        <span style={{ fontWeight: 'bold', color: '#666' }}>Status</span>
                                    </div>
                                    <div style={{ 
                                        fontSize: '1rem',
                                        color: '#10b981',
                                        fontWeight: 'bold'
                                    }}>
                                        Active
                                    </div>
                                </div>
                            </div>

                            <div style={{ 
                                marginTop: '2rem',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                border: '1px solid #e0e0e0',
                                background: '#fafafa'
                            }}>
                                <h3 style={{ marginTop: 0 }}>Activity Summary</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6366f1' }}>0</div>
                                        <div style={{ fontSize: '0.875rem', color: '#666' }}>Horoscope Checks</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>0</div>
                                        <div style={{ fontSize: '0.875rem', color: '#666' }}>AI Chats</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>0</div>
                                        <div style={{ fontSize: '0.875rem', color: '#666' }}>Calendar Views</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ 
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            color: 'var(--text-muted)'
                        }}>
                            <UserCircle size={64} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                            <p style={{ fontSize: '1.125rem' }}>Select a user to view their profile</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
