<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $places = [
            'Kasaragod', 'Kanhangad', 'Nileshwar', 'Uppala', 'Kumbla', 'Cheruvathur', 
            'Manjeshwar', 'Thrikkaripur', 'Bekal', 'Kallar', 'Bandadka', 'Badiyadka', 
            'Seethangoli', 'Mulleria', 'Adhur', 'Delampady', 'Perla', 'Enmakaje'
        ];

        foreach ($places as $place) {
            \App\Models\Place::create([
                'name' => $place,
                'slug' => \Illuminate\Support\Str::slug($place)
            ]);
        }
    }
}
