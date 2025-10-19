<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RfidController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();

        return response()->json([
            'message' => 'Daftar semua user RFID',
            'data' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'uid_kartu' => 'required|string|max:255',
        ]);

        $uid = trim($request->uid_kartu);

        // Cek apakah UID sudah ada
        $user = User::where('uid_kartu', $uid)->first();
        if ($user) {
            return response()->json([
                'message' => 'UID sudah terdaftar',
                'data' => $user,
            ], 200);
        }

        // Buat email dari UID
        $sanitized = preg_replace('/[^A-Za-z0-9]/', '', $uid);
        $email = strtolower($sanitized) . '@gmail.com';
        $counter = 1;
        while (User::where('email', $email)->exists()) {
            $email = strtolower($sanitized) . $counter . '@gmail.com';
            $counter++;
        }

        // Hash password pakai UID
        $hashedPassword = Hash::make($uid);

        $newUser = User::create([
            'name' => 'Guest User ' . $sanitized,
            'email' => $email,
            'password' => $hashedPassword,
            'uid_kartu' => $uid,
            'role' => 'user',
        ]);

        return response()->json([
            'message' => 'UID baru berhasil disimpan',
            'data' => $newUser,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($uid)
    {
        $user = User::where('uid_kartu', $uid)->first();

        if (!$user) {
            return response()->json([
                'message' => 'UID tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'message' => 'Data UID ditemukan',
            'data' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $uid)
    {
        $user = User::where('uid_kartu', $uid)->first();

        if (!$user) {
            return response()->json(['message' => 'UID tidak ditemukan'], 404);
        }

        $user->update($request->only(['name', 'role']));

        return response()->json([
            'message' => 'Data user berhasil diperbarui',
            'data' => $user
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($uid)
    {
        $user = User::where('uid_kartu', $uid)->first();

        if (!$user) {
            return response()->json(['message' => 'UID tidak ditemukan'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User berhasil dihapus']);
    }
}
