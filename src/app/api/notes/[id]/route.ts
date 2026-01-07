import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Note from '@/models/Note';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();
        const body = await request.json();
        const note = await Note.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!note) {
            return NextResponse.json({ success: false, message: 'Note not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: note });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();
        const deletedNote = await Note.deleteOne({ _id: id });
        if (!deletedNote.deletedCount) {
            return NextResponse.json({ success: false, message: 'Note not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
