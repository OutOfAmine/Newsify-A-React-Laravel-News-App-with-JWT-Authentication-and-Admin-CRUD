<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getNewsByName($name)
    {
        $category = Category::where('name', $name)->first();

        if ($category) {
            $news = $this->getNewsFromCategory($category);

            return response()->json(['category' => $category, 'news' => $news]);
        }

        return response()->json(['message' => 'Category not found sorry'], 404);
    }

    private function getNewsFromCategory($category)
    {
        $news = $category->getNews()->where('date_expiration', '>', now())->get();

        $subcategories = $category->getDescendants();
        foreach ($subcategories as $subcategory) {
            $news = $news->merge($subcategory->getNews()->where('date_expiration', '>', now())->get());
        } 
        // dd($subcategories);
        return $news;
    }
}
