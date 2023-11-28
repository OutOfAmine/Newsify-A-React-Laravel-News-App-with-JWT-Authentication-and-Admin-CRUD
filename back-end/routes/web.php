<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GestionNews;

use Illuminate\Support\Facades\Route;




Route::middleware('auth:sanctum')->group(function () {
    Route::resource('/api/news', GestionNews::class);
    Route::get('api/categories', [GestionNews::class, 'GetCategories']);
    Route::get('categories/{name}', [CategoryController::class, 'getNewsByName']);
    
    //j'utilise resource, c'est l'équivalent de l'utilisation des méthodes GET, POST, PUT, et DELETE, pour l'optimisation du code.
});

Route::post('api/register',[AuthController::class,'register']);
Route::post('api/login',[AuthController::class,'login']);










