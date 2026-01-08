'use client';

import { useState } from 'react';
import { Plus, StickyNote } from 'lucide-react';
import NoteList from '@/components/NoteList';
import NoteForm from '@/components/NoteForm';

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<any>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreate = () => {
    setEditingNote(null);
    setIsFormOpen(true);
  };

  const handleEdit = (note: any) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const handleSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500">
            <StickyNote className="h-8 w-8" />
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              OurNotes
            </h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-blue-500/25 active:scale-95 sm:px-8"
          >
            <Plus className="h-5 w-5" />
            <span className="hidden sm:inline">Add Note</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Our Notes</h2>
        </div>

        <NoteList onEdit={handleEdit} refreshTrigger={refreshTrigger} />
      </main>

     

      {/* Note Form Modal */}
      {isFormOpen && (
        <NoteForm
          initialData={editingNote}
          onClose={() => setIsFormOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
