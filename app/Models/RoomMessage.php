<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoomMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'user_id',
        'message',
    ];

    /**
     * Get the room that the message belongs to.
     */
    public function room(): BelongsToMany
    {
        return $this->belongsTo(Room::class);
    }

    /**
     * Get the user that sent the message.
     */
    public function user(): BelongsToMany
    {
        return $this->belongsTo(User::class);
    }
}
