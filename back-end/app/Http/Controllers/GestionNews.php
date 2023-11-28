<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use Carbon\Carbon;
use Illuminate\Http\Request;


class GestionNews extends Controller
{

    public function index()
    {
        $currentDate = Carbon::now(); // Get the current date and time
        $allNews = News::with('categorie')->select('id', 'title', 'content', 'category', 'date_debut', 'date_expiration')->where('date_expiration', '>', $currentDate)->orderBy('date_expiration','desc')->get();
        return $allNews;
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'category' => 'required',
            'date_debut' => 'required',
            'date_expiration' => 'required'
        ]);
        News::create(
            $request->post()
        );
        return response()->json([
            'message' => 'The new Added successfully'
        ]);
    }


    public function show($new)
    {
        $new_to_show = News::find($new);
        return response()->json([
            'new' => $new_to_show
        ]);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'category' => 'required',
            'date_debut' => 'required',
            'date_expiration' => 'required'
        ]);
        $new = News::find($id);

        if ($new) {
            $new->title = $request->input('title');
            $new->content = $request->input('content');
            $new->category = $request->input('category');
            $new->date_debut = $request->input('date_debut');
            $new->date_expiration = $request->input('date_expiration');

            if ($new->save()) {
                return response()->json([
                    'message' => 'The news was updated successfully'
                ]);
            } else {
                return response()->json([
                    'message' => 'Failed to update the news'
                ], 500);
            }
        } else {
            return response()->json([
                'message' => 'News not found'
            ], 404);
        }
    }


    public function GetCategories()
    {
        $categories = Category::with('children')->whereNull('parent_id')->get();
        return $categories;
        
    }

    public function destroy($id)
    {
        $new_to_delete = News::find($id);
        $new_to_delete->delete();
        return response()->json([
            'message' => 'The new Deleted successfully'
        ]);
    }
}
