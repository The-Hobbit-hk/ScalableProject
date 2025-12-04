'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import ItemForm from '@/components/ItemForm';
import ItemList from '@/components/ItemList';
import { Item } from '@/types';
import { Search } from 'lucide-react';

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [items, setItems] = useState<Item[]>([]);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const fetchItems = async () => {
        try {
            const { data } = await api.get('/items');
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchItems();
        }
    }, [user]);

    const filteredItems = items.filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-blue-500 animate-pulse text-xl font-medium">Loading Dashboard...</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-gray-400">Manage your projects and items efficiently</p>
                </div>

                <div className="relative w-full md:w-auto min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search items..."
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-full pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <ItemForm
                onItemSaved={fetchItems}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
            />

            <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Your Items</h2>
                    <span className="bg-slate-800 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-slate-700">
                        {filteredItems.length} Total
                    </span>
                </div>
                <ItemList
                    items={filteredItems}
                    onEdit={setEditingItem}
                    onDelete={fetchItems}
                />
            </div>
        </div>
    );
}
