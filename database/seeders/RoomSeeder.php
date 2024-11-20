<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('rooms')->insert([
            ['name' => 'General Chat Room', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Sports Discussion Room', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Technology Room', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Music Room', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
