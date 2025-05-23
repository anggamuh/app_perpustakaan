<?php

namespace App\Models;
use App\Models\Book;
use App\Models\Category;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book_category extends Model
{
    use HasFactory;

    protected $fillable = [
        'books_id',
        'categories_id'
    ];
    
    public function books()
    {
        return $this->hasMany(Book::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }
}
