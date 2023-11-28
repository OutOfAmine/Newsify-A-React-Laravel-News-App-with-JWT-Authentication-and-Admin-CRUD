<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\News;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run()
    {
        $categories = Category::all(); // Get all categories

        // Create 100 news records
        for ($i = 0; $i < 100; $i++) {
            // Select a random category from the list of categories
            $category = $categories->random();

            // Create a news record
            News::create([
                'title' => 'Random News Title #' . ($i + 1),
                'content' => 'Random News Content #' . ($i + 1),
                'category' => $category->id,
                'date_debut' => Carbon::now(),
                'date_expiration' => Carbon::now()->addWeek(),
            ]);
        }
    }
}
