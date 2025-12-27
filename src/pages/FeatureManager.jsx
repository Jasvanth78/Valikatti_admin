import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';

const FeatureManager = () => {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeatures();
    }, []);

    const fetchFeatures = async () => {
        try {
            const res = await adminService.getFeatures();
            setFeatures(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleFeature = async (id, currentStatus) => {
        try {
            await adminService.updateFeature(id, { isActive: !currentStatus });
            fetchFeatures();
        } catch (err) {
            alert("Error updating feature");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="feature-manager">
            <h1 className="page-title">App Feature Control</h1>
            <div className="card">
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Toggle features on or off. Changes reflect instantly on the mobile app home screen.
                </p>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Feature Label</th>
                                <th>Route</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((f) => (
                                <tr key={f.id}>
                                    <td>{f.label}</td>
                                    <td><code>{f.route}</code></td>
                                    <td>
                                        <span style={{
                                            color: f.isActive ? '#10b981' : '#f43f5e',
                                            fontWeight: '600'
                                        }}>
                                            {f.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => toggleFeature(f.id, f.isActive)}
                                            className="btn-primary"
                                            style={{
                                                padding: '0.5rem 1rem',
                                                fontSize: '0.875rem',
                                                background: f.isActive ? 'linear-gradient(135deg, #f43f5e, #e11d48)' : 'linear-gradient(135deg, #10b981, #059669)',
                                                boxShadow: 'none'
                                            }}
                                        >
                                            {f.isActive ? 'Disable' : 'Enable'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FeatureManager;
