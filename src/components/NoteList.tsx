'use client';

import { useState, useEffect } from 'react';
import { Pencil, Trash2, Calendar } from 'lucide-react';

interface Note {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

interface NoteListProps {
    onEdit: (note: Note) => void;
    refreshTrigger: number;
}

export default function NoteList({ onEdit, refreshTrigger }: NoteListProps) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchNotes = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/notes');
            const data = await response.json();
            if (data.success) {
                setNotes(data.data);
            } else {
                throw new Error(data.error || 'Failed to fetch notes');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, [refreshTrigger]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this note?')) return;

        try {
            const response = await fetch(`/api/notes/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                setNotes(notes.filter((note) => note._id !== id));
            } else {
                throw new Error(data.error || 'Failed to delete note');
            }
        } catch (err: any) {
            alert(err.message);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-4 text-zinc-500">Loading notes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600 dark:border-red-900/50 dark:bg-red-900/20">
                <p>{error}</p>
                <button
                    onClick={fetchNotes}
                    className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (notes.length === 0) {
        return (
            <div className="rounded-xl border-2 border-dashed border-zinc-200 p-20 text-center dark:border-zinc-800">
                <p className="text-zinc-500">No notes found. Create your first note!</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
                <div
                    key={note._id}
                    className="group relative flex flex-col rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                >
                    <div className="mb-2 flex items-start justify-between">
                        <h3 className="line-clamp-1 font-bold text-zinc-900 dark:text-white">
                            {note.title}
                        </h3>
                        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                            <button
                                onClick={() => onEdit(note)}
                                className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-blue-600 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                title="Edit Note"
                            >
                                <Pencil className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(note._id)}
                                className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                title="Delete Note"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <p className="mb-4 flex-grow line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                        {note.content}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-400 dark:text-zinc-500">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(note.createdAt).toLocaleString()}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
