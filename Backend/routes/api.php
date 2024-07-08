<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\MigrationController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1'
],function ($router){

Route::post('/register', [RegisterController::class, 'register']);

Route::post('/login', [LoginController::class, 'login']);

Route::get('/events', [EventsController::class, 'index']);

Route::get('/migrate', [MigrationController::class, 'migrate']);

Route::middleware('jwt.auth')->group(function () {
    Route::get('/events/organizer/{organizerId}', [EventsController::class, 'showEventsByUserId']);
    Route::post('/events/create', [EventsController::class, 'store']);
    Route::put('/events/{id}', [EventsController::class, 'update']);
    Route::delete('/events/{id}', [EventsController::class, 'destroy']);
});

});
