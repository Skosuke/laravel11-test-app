<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoomMessageController extends Controller
{
    // Join a chat room
    public function join(Request $request, $roomId)
    {
        $userId = Auth::id();
        $room = Room::findOrFail($roomId);

        $roomUser = RoomUser::firstOrCreate([
            'room_id' => $room->id,
            'user_id' => $userId,
        ]);

        return response()->json($roomUser, 201);
    }

    // Leave a chat room
    public function leave(Request $request, $roomId)
    {
        $userId = Auth::id();
        $roomUser = RoomUser::where('room_id', $roomId)->where('user_id', $userId)->firstOrFail();

        $roomUser->delete();

        return response()->json(['message' => 'Successfully left the room.']);
    }
}
