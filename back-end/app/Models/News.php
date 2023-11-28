<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;
    protected $fillable=['title','category','content','date_debut','date_expiration'];
    public $timestamps = false;
    public function categorie(){
        return $this->belongsTo(Category::class,'category');
    }
}
