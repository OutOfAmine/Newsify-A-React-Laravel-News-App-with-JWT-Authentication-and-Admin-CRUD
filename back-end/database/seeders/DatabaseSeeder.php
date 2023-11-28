<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\News;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    public function run()
    {     
            Category::create(['name' => 'Actualités']);
            Category::create(['name' => 'Divertissement']);
            Category::create(['name' => 'Technologie']);
            Category::create(['name' => 'Santé']);
            
            $actualites = Category::create(['name' => 'Actualités']);
            $divertissement = Category::create(['name' => 'Divertissement']);
            $technologie = Category::create(['name' => 'Technologie']);
            $sante = Category::create(['name' => 'Santé']);
    
            // Subcategories pour Actualités
            $actualites->children()->create(['name' => 'Politique']);
            $actualites->children()->create(['name' => 'Économie']);
            $actualites->children()->create(['name' => 'Sport']);
    
            // Subcategories pour Divertissement
            $divertissement->children()->create(['name' => 'Cinéma']);
            $divertissement->children()->create(['name' => 'Musique']);
            $divertissement->children()->create(['name' => 'Sorties']);
    
            // Subcategories pour Technologie
            $technologie->children()->create(['name' => 'Informatique']);
            $technologie->children()->create(['name' => 'Gadgets']);
    
            // Sub-subcategories pour Informatique
            $informatique = $technologie->children()->where('name', 'Informatique')->first();
            $informatique->children()->create(['name' => 'Ordinateurs de bureau']);
            $informatique->children()->create(['name' => 'PC portable']);
            $informatique->children()->create(['name' => 'Connexion internet']);
    
            // Sub-subcategories our Gadgets
            $gadgets = $technologie->children()->where('name', 'Gadgets')->first();
            $gadgets->children()->create(['name' => 'Smartphones']);
            $gadgets->children()->create(['name' => 'Tablettes']);
            $gadgets->children()->create(['name' => 'Jeux vidéo']);
    
            // Subcategories pour Santé
            $sante->children()->create(['name' => 'Médecine']);
            $sante->children()->create(['name' => 'Bien-être']);        

    }
}