// client/src/lib/api.js (or wherever)
import axios from 'axios';

const host = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const base = host.replace(/\/+$/, '') + '/api'; // ensures exactly one /api at end

const api = axios.create({
    baseURL: base,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
