<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Business;
use App\Models\Category;
use App\Models\User;
use App\Models\Professional;
use App\Models\Place;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class KasaragodRealDataSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create('en_IN');

        // Ensure we have an admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@kasaragodhub.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        $places = [
            'Kasaragod Town', 'Kanhangad', 'Nileshwar', 'Cheruvathur', 'Uppala', 
            'Manjeshwar', 'Kumbla', 'Badiyadka', 'Trikaripur', 'Udma'
        ];

        foreach ($places as $place) {
            Place::firstOrCreate(['name' => $place], ['slug' => Str::slug($place), 'is_active' => true]);
        }

        // Get/Create main categories
        $restaurantsCat = Category::firstOrCreate(['slug' => 'restaurants'], ['name' => 'Restaurants', 'icon' => 'Utensils']);
        $healthCat = Category::firstOrCreate(['slug' => 'health-beauty'], ['name' => 'Health & Beauty', 'icon' => 'HeartPulse']);
        $autoCat = Category::firstOrCreate(['slug' => 'auto-services'], ['name' => 'Auto Services', 'icon' => 'Car']);
        $homeCat = Category::firstOrCreate(['slug' => 'home-services'], ['name' => 'Home Services', 'icon' => 'Home']);
        $realEstateCat = Category::firstOrCreate(['slug' => 'real-estate'], ['name' => 'Real Estate', 'icon' => 'Building']);

        // REAL-LIKE RESTAURANTS IN KASARAGOD
        $restaurants = [
            ['name' => 'Viceroy Restaurant', 'address' => 'City Tower Hotel, MG Road, Kasaragod', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Vasanth Vihar', 'address' => 'Near Old Press Club, MG Road, Kasaragod', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Royal Dine', 'address' => 'Main Junction, Kasaragod', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Gastrobio Shalimar', 'address' => 'KPR Rao Road, Kasaragod', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1574936145840-28808d77a0b6?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Canara Cream Parlour', 'address' => 'MG Road, Near Fort Road, Kasaragod', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Century Vegetarian', 'address' => 'New Bus Stand, Kasaragod', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Oryx Village', 'address' => 'Kanhangad By-pass, Kanhangad', 'city' => 'Kanhangad', 'logo' => 'https://images.unsplash.com/photo-1414235077428-338988a2e8c0?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Salkara Restaurant', 'address' => 'Railway Station Road, Kasaragod', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1428515613728-6b4607e44363?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'MRA Bakery & Restaurant', 'address' => 'MG Road, Kasaragod', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Bekal Food Court', 'address' => 'Near Bekal Fort, Udma', 'city' => 'Udma', 'logo' => 'https://images.unsplash.com/photo-1563514905183-b090a9ba8a65?auto=format&fit=crop&w=200&h=200&q=80'],
        ];

        $hospitals = [
            ['name' => 'Aster MIMS Kasaragod', 'address' => 'Chala, Kasaragod', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Carewell Hospital', 'address' => 'Kanhangad', 'city' => 'Kanhangad', 'logo' => 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Wintouch Hospital', 'address' => 'MG Road, Kasaragod', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Aramana Hospital', 'address' => 'Nileshwar', 'city' => 'Nileshwar', 'logo' => 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Janardan Hospital', 'address' => 'Kasaragod Town', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'KIMS Sunrise Hospital', 'address' => 'Cheruvathur', 'city' => 'Cheruvathur', 'logo' => 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Chaithra Medical Centre', 'address' => 'Badiyadka', 'city' => 'Badiyadka', 'logo' => 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'K A H M Hospital', 'address' => 'Cheruvathur', 'city' => 'Cheruvathur', 'logo' => 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'First Neuro Hospital', 'address' => 'Kasaragod Town', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Thresiammas Eye Hospital', 'address' => 'Kanhangad', 'city' => 'Kanhangad', 'logo' => 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=200&h=200&q=80'],
        ];

        $autos = [
            ['name' => 'Popular Hyundai', 'address' => 'NH 66, Vidya Nagar, Kasaragod', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Indus Motors Maruti', 'address' => 'Kanhangad South', 'city' => 'Kanhangad', 'logo' => 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'KVR Tata Motors', 'address' => 'Cheruvathur', 'city' => 'Cheruvathur', 'logo' => 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'EVM Honda', 'address' => 'Kasaragod Town', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Vision Toyota', 'address' => 'Vidya Nagar, Kasaragod', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Marina Motors', 'address' => 'Uppala', 'city' => 'Uppala', 'logo' => 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'AutoCare Garage', 'address' => 'Nileshwar', 'city' => 'Nileshwar', 'logo' => 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'SpeedFix Two Wheelers', 'address' => 'Kumbla', 'city' => 'Kumbla', 'logo' => 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Michelin Tyres Center', 'address' => 'MG Road, Kasaragod', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Kasaragod Car Spa', 'address' => 'Vidya Nagar', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=200&h=200&q=80'],
        ];

        $homes = [
            ['name' => 'Malabar Plumbers', 'address' => 'Kasaragod Town', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Kanhangad Electricians', 'address' => 'Kanhangad', 'city' => 'Kanhangad', 'logo' => 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Bright Cleaning Services', 'address' => 'Nileshwar', 'city' => 'Nileshwar', 'logo' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'SafeHome Pest Control', 'address' => 'Cheruvathur', 'city' => 'Cheruvathur', 'logo' => 'https://images.unsplash.com/photo-1587582345426-bf07f534e050?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'CoolAir AC Service', 'address' => 'Uppala', 'city' => 'Uppala', 'logo' => 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Kerala Carpenters', 'address' => 'Kumbla', 'city' => 'Kumbla', 'logo' => 'https://images.unsplash.com/photo-1505015920881-0f83c2f7c95e?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'ProPaint Kasaragod', 'address' => 'Badiyadka', 'city' => 'Badiyadka', 'logo' => 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'QuickFix Appliances', 'address' => 'Trikaripur', 'city' => 'Trikaripur', 'logo' => 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'SecureTech CCTV', 'address' => 'Kasaragod Town', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'GreenGarden Landscaping', 'address' => 'Udma', 'city' => 'Udma', 'logo' => 'https://images.unsplash.com/photo-1558904541-efa843a96f0f?auto=format&fit=crop&w=200&h=200&q=80'],
        ];

        $reals = [
            ['name' => 'Bekal Properties', 'address' => 'Udma', 'city' => 'Udma', 'logo' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Kasaragod Real Estate', 'address' => 'MG Road, Kasaragod', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Malabar Builders', 'address' => 'Kanhangad', 'city' => 'Kanhangad', 'logo' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Nileshwar Homes', 'address' => 'Nileshwar', 'city' => 'Nileshwar', 'logo' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Uppala Land Developers', 'address' => 'Uppala', 'city' => 'Uppala', 'logo' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'City View Apartments', 'address' => 'Vidya Nagar, Kasaragod', 'city' => 'Kasaragod Town', 'logo' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Green Valley Plots', 'address' => 'Badiyadka', 'city' => 'Badiyadka', 'logo' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Cheruvathur Realtors', 'address' => 'Cheruvathur', 'city' => 'Cheruvathur', 'logo' => 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Kumbla Housing Board', 'address' => 'Kumbla', 'city' => 'Kumbla', 'logo' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&h=200&q=80'],
            ['name' => 'Trikaripur Estates', 'address' => 'Trikaripur', 'city' => 'Trikaripur', 'logo' => 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=200&h=200&q=80'],
        ];

        $categoriesData = [
            $restaurantsCat->id => $restaurants,
            $healthCat->id => $hospitals,
            $autoCat->id => $autos,
            $homeCat->id => $homes,
            $realEstateCat->id => $reals,
        ];

        foreach ($categoriesData as $catId => $businesses) {
            foreach ($businesses as $b) {
                // Ensure unique slug
                $slug = Str::slug($b['name']) . '-' . rand(1000, 9999);
                Business::create([
                    'user_id' => $admin->id,
                    'category_id' => $catId,
                    'name' => $b['name'],
                    'slug' => $slug,
                    'description' => 'A top-rated service in Kasaragod district.',
                    'address' => $b['address'],
                    'location_city' => $b['city'],
                    'phone' => '+91 9' . rand(100000000, 999999999),
                    'whatsapp' => '+91 9' . rand(100000000, 999999999),
                    'email' => str_replace(' ', '', strtolower($b['name'])) . '@example.com',
                    'logo_path' => $b['logo'],
                    'status' => 'approved',
                    'is_featured' => rand(0, 100) > 70, // 30% chance
                    'is_verified' => true,
                    'verification_status' => 'verified',
                    'price_range' => rand(1, 4),
                    'latitude' => 12.5102 + (rand(-100, 100) / 10000),
                    'longitude' => 74.9852 + (rand(-100, 100) / 10000),
                ]);
            }
        }

        // PROFESSIONALS
        $professions = ['Electrician', 'Plumber', 'Interior Designer', 'Lawyer', 'Chartered Accountant', 'Architect', 'Event Planner', 'Photographer', 'Fitness Trainer', 'Yoga Instructor'];
        $names = ['Rahul Nambiar', 'Anoop Krishnan', 'Fathima KS', 'Mohammed Safwan', 'Sreejith P', 'Divya Suresh', 'Abdul Rahman', 'Karthik Menon', 'Akhil Raj', 'Sneha PV'];
        $avatars = [
            'https://randomuser.me/api/portraits/men/32.jpg',
            'https://randomuser.me/api/portraits/men/45.jpg',
            'https://randomuser.me/api/portraits/women/44.jpg',
            'https://randomuser.me/api/portraits/men/22.jpg',
            'https://randomuser.me/api/portraits/men/65.jpg',
            'https://randomuser.me/api/portraits/women/68.jpg',
            'https://randomuser.me/api/portraits/men/85.jpg',
            'https://randomuser.me/api/portraits/men/15.jpg',
            'https://randomuser.me/api/portraits/men/11.jpg',
            'https://randomuser.me/api/portraits/women/24.jpg'
        ];

        for ($i = 0; $i < 10; $i++) {
            $slug = Str::slug($names[$i]) . '-' . rand(1000, 9999);
            Professional::create([
                'user_id' => $admin->id,
                'category_id' => rand(1, 5), // Random category for now
                'name' => $names[$i],
                'slug' => $slug,
                'profession' => $professions[$i],
                'location_city' => $places[array_rand($places)],
                'bio' => 'Experienced professional in ' . $professions[$i] . ' with a proven track record in Kasaragod district.',
                'experience' => rand(2, 15) . '+ years',
                'projects_completed' => rand(10, 500),
                'avatar_path' => $avatars[$i],
                'is_verified' => true,
                'whatsapp' => '+91 9' . rand(100000000, 999999999),
            ]);
        }

    }
}
