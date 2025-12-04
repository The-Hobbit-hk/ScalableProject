'use client';

import { useForm } from 'react-hook-form';
import api from '@/lib/api';
import { Item } from '@/types';
import { useEffect } from 'react';

interface ItemFormProps {
    onItemSaved: () => void;
    editingItem: Item | null;
    setEditingItem: (item: Item | null) => void;
}

export default function ItemForm({ onItemSaved, editingItem, setEditingItem }: ItemFormProps) {
    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        if (editingItem) {
            setValue('title', editingItem.title);
            setValue('description', editingItem.description);
        } else {
            reset();
        }
    }, [editingItem, setValue, reset]);

    const onSubmit = async (data: any) => {
        try {
            if (editingItem) {
                await api.put(`/items/${editingItem._id}`, data);
            } else {
                await api.post('/items', data);
            }
            onItemSaved();
            reset();
            setEditingItem(null);
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-xl font-bold mb-6 text-white border-b border-slate-700 pb-2">
                {editingItem ? 'Edit Item' : 'Add New Item'}
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <input
                        {...register('title', { required: true })}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g., Project Alpha"
                    />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <input
                        {...register('description')}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Brief details..."
                    />
                </div>
            </div>

            <div className="flex gap-3 mt-6 justify-end">
                {editingItem && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingItem(null);
                            reset();
                        }}
                        className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                >
                    {editingItem ? 'Update Item' : 'Create Item'}
                </button>
            </div>
        </form>
    );
}
