<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RfidController;
use App\Http\Controllers\Api\UserController;


// Route default untuk ngecek API
Route::get('/status', function () {
    return response()->json([
        'message' => 'API ESP32 RFID aktif',
        'status' => 'ok'
    ]);
});

// Route resource untuk RFID Controller
Route::apiResource('rfid', RfidController::class);
