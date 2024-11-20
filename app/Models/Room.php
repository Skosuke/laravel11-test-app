<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\BelongsToRelationship;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Room extends Model
{
    protected $fillable = [
        'name',
        'user_id', // 作成者のIDを許可
    ];

    /**
     * Get the messages for the room.
     */
    public function messages(): HasMany
    {
        return $this->hasMany(RoomMessage::class);
    }

    /**
     * The users that belong to the room.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'room_users');
    }

    /**
     * The users that belong to the room.
     */
    public function user(): BelongsTo
    {
        // 外部キー: user_id, 主キー: id
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
