<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Tampilkan semua data user di halaman Inertia.
     */
    public function index()
    {
        $users = User::all();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    /**
     * Tampilkan detail user.
     */
    public function show($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('Admin/Users/Show', [
            'user' => $user
        ]);
    }
}
