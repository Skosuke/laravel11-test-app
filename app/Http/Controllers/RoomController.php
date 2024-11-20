<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\TryCatch;

use function PHPSTORM_META\map;

class RoomController extends Controller
{
    /**
     * Fetch all chat rooms
     *
     * @return void
     */
    public function index()
    {
        try {
            // ログイン中のユーザーIDを取得
            $userId = Auth::id(); // Authファサードを使用
            
            $rooms = Room::with('user')->get();
            // dd($rooms);
            return Inertia::render('Rooms/Index', [
                'rooms' => $rooms->isNotEmpty() ? $rooms : [], // 空である場合も配列を渡す
                'currentUserId' => Auth::id(), // ユーザーIDを渡す
                'currentUser' => Auth::user(), // ユーザー情報を渡す
            ]);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * Create a new room
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function create(Request $request)
    {
        try {
            // バリデーション
            $validated = $request->validate([
                'name' => 'required|string|max:255',
            ]);

            // ログイン中のユーザーIDを取得
            $userId = Auth::id(); // Authファサードを使用

            // 新しいルームを作成
            Room::create([
                'name' => $validated['name'],
                'user_id' => $userId, // 現在ログイン中のユーザーIDを設定
            ]);

            // ルーム一覧へリダイレクト
            return redirect()->route('rooms.index')->with('success', 'Room created successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to create room');
        }
    }

    public function destroy($id)
    {
        try {
            // 該当するルームを取得
            $room = Room::findOrFail($id);

            // ログイン中のユーザーIDを取得
            $userId = Auth::id(); // Authファサードを使用

            // 削除権限を確認（ログインユーザーが作成者であることを確認）
            if ($room->user_id !== $userId) {
                return redirect()->route('rooms.index')->with('error', 'You are not authorized to delete this room.');
            }

            // ルームを削除
            $room->delete();

            // ルーム一覧へリダイレクト
            return redirect()->route('rooms.index')->with('success', 'Room created successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to create room');
        }
    }

    /**
     * setting room info
     *
     * @return void
     */
    public function setting()
    {
        try {
            return Inertia::render('Rooms/setting');
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
