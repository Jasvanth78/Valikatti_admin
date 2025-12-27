import axios from 'axios';

const API_BASE_URL = 'https://valikatti-backend.onrender.com/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const adminService = {
    getStats: () => api.get('/admin/stats'),
    getUsers: () => api.get('/admin/users'),
    addCalendarDay: (data) => api.post('/admin/calendar', data),
    deleteCalendarDay: (id) => api.delete(`/admin/calendar/${id}`),

    // Content & Features
    getStories: () => api.get('/content/stories'),
    addStory: (data) => api.post('/content/stories', data),
    deleteStory: (id) => api.delete(`/content/stories/${id}`),
    getTips: () => api.get('/content/tips'),
    addTip: (data) => api.post('/content/tips', data),
    deleteTip: (id) => api.delete(`/content/tips/${id}`),
    getFeatures: () => api.get('/content/features'),
    updateFeature: (id, data) => api.put(`/content/features/${id}`, data),
    
    // Festivals
    getFestivals: () => api.get('/admin/festivals'),
    addFestival: (data) => api.post('/admin/festivals', data),
    deleteFestival: (id) => api.delete(`/admin/festivals/${id}`),
    
    // News
    getNews: () => api.get('/news'),
    addNews: (data) => api.post('/news', data),
    deleteNews: (id) => api.delete(`/news/${id}`),
    
    // Calendar routes
    getCalendar: (year, month) => api.get(`/calendar/${year}/${month}`),
};

export default api;
