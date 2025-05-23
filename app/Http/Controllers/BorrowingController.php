<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Borrowing;

class BorrowingController extends Controller
{

    public function index()
    {
        $borrowings = Borrowing::with(['book.category'])->latest()->get();

        return inertia('pinjaman', compact('borrowings'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
        ]);

        Borrowing::create([
            'user_id' => Auth::id(),
            'book_id' => $request->book_id,
            'borrow_date' => now(),
            'return_date' => now()->addMonth(),
            'status' => 'Borrows',
        ]);

        return redirect()->route('borrow.index');
    }

    // CRUD ===================================================================================
    public function crud_index()
    {
        $borrowings = Borrowing::with(['book.category', 'user'])->get();

        return inertia('admin/peminjaman/crud_peminjaman', compact('borrowings'));
    }

    public function librarian_index()
    {
        $borrowings = Borrowing::with(['book.category', 'user'])->get();

        return inertia('librarian/work', compact('borrowings'));
    }

    public function crud_remove($id)
    {
        $borrowing = Borrowing::findOrFail($id);
        $borrowing->delete();

        return redirect()->back();
    }
    // CRUD ===================================================================================
}
