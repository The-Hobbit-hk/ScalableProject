'use client';

import { Item } from '@/types';
import { Trash2, Edit, Calendar } from 'lucide-react';
import api from '@/lib/api';

interface ItemListProps {
    items: Item[];
    onEdit: (item: Item) => void;
    onDelete: () => void;
}

export default function ItemList({ items, onEdit, onDelete }: ItemListProps) {
    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete(`/items/${id}`);
                onDelete();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
                <div key={item._id} className="glass-card p-6 rounded-xl hover:bg-slate-800/40 transition-all duration-300 group border border-slate-700/50 hover:border-blue-500/30">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {item.title}
                        </h3>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => onEdit(item)}
                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                title="Edit"
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Delete"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>

                    <p className="text-gray-400 mb-6 line-clamp-3 min-h-[4.5rem]">
                        {item.description || "No description provided."}
                    </p>

                    <div className="flex items-center text-xs text-slate-500 pt-4 border-t border-slate-700/50">
                        <Calendar size={14} className="mr-2" />
                        Created {new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                </div>
            ))}

            {items.length === 0 && (
                <div className="col-span-full py-20 text-center glass-card rounded-xl border-dashed border-2 border-slate-700">
                    <div className="text-slate-500 text-lg">No items found</div>
                    <p className="text-slate-600 text-sm mt-2">Create your first item using the form above</p>
                </div>
            )}
        </div>
    );
}
