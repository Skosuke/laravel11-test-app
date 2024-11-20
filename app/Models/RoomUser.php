<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RoomUser extends Model
{
    protected $fillable = [
        'room_id',
        'user_id',
    ];

    /**
     * Get the room that the user belongs to.
     */
    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    /**
     * Get the user that belongs to the room.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
