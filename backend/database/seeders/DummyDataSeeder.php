<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\Business;
use App\Models\Professional;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DummyDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Built-In Users
        $admin = User::firstOrCreate(['email' => 'admin@kasaragodhub.com'], [
            'name' => 'System Admin',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        $businessUser = User::firstOrCreate(['email' => 'owner@business.com'], [
            'name' => 'Business Owner',
            'password' => Hash::make('password'),
            'role' => 'business',
        ]);

        $proUser = User::firstOrCreate(['email' => 'pro@skills.com'], [
            'name' => 'Local Pro',
            'password' => Hash::make('password'),
            'role' => 'pro',
        ]);

        // 2. Map Front-End Categories
        $categories = [
            ['id' => 1, 'name' => 'Real Estate', 'slug' => 'real-estate', 'icon' => 'Home'],
            ['id' => 2, 'name' => 'Tech & IT', 'slug' => 'tech-it', 'icon' => 'Cpu'],
            ['id' => 3, 'name' => 'Education', 'slug' => 'education', 'icon' => 'BookOpen'],
            ['id' => 4, 'name' => 'Healthcare', 'slug' => 'healthcare', 'icon' => 'HeartPulse'],
            ['id' => 5, 'name' => 'Shopping', 'slug' => 'shopping', 'icon' => 'ShoppingBag'],
            ['id' => 6, 'name' => 'Automobile', 'slug' => 'automobile', 'icon' => 'CarFront'],
            ['id' => 7, 'name' => 'Food & Dining', 'slug' => 'food-dining', 'icon' => 'Utensils'],
            ['id' => 8, 'name' => 'Events', 'slug' => 'events', 'icon' => 'CalendarDays'],
            ['id' => 9, 'name' => 'Tourism', 'slug' => 'tourism', 'icon' => 'Palmtree'],
            ['id' => 10, 'name' => 'Construction', 'slug' => 'construction', 'icon' => 'HardHat'],
            ['id' => 11, 'name' => 'Repairs', 'slug' => 'repairs', 'icon' => 'Wrench'],
            ['id' => 12, 'name' => 'Daily Needs', 'slug' => 'daily-needs', 'icon' => 'ShoppingCart'],
            ['id' => 13, 'name' => 'Wedding', 'slug' => 'wedding', 'icon' => 'Heart'],
            ['id' => 14, 'name' => 'Personal Care', 'slug' => 'personal-care', 'icon' => 'Sparkles'],
            ['id' => 15, 'name' => 'Loans', 'slug' => 'loans', 'icon' => 'Banknote'],
            ['id' => 16, 'name' => 'Jobs', 'slug' => 'jobs', 'icon' => 'Briefcase'],
            ['id' => 17, 'name' => 'Travel', 'slug' => 'travel', 'icon' => 'Plane'],
            ['id' => 18, 'name' => 'Insurance', 'slug' => 'insurance', 'icon' => 'ShieldCheck'],
            ['id' => 19, 'name' => 'Books', 'slug' => 'books', 'icon' => 'Library'],
            ['id' => 20, 'name' => 'Sports', 'slug' => 'sports', 'icon' => 'Trophy'],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['id' => $cat['id']], $cat);
        }

        // 3. Map Subset Core Businesses
        $businesses = [
            [
                'id' => 1,
                'user_id' => $businessUser->id,
                'category_id' => 1,
                'name' => 'Kasaragod Heights Developers',
                'slug' => 'kasaragod-heights',
                'description' => 'Premier luxury residential and commercial projects across Kasaragod.',
                'address' => 'Near New Bus Stand, Kasaragod, Kerala',
                'location_city' => 'Kasaragod Town',
                'phone' => '+91 9876543210',
                'whatsapp' => '919876543210',
                'logo_path' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=80&h=80&fit=crop&q=80',
                'status' => 'approved',
                'is_featured' => true,
                'is_verified' => true,
                'price_range' => 4,
                'latitude' => 12.4998,
                'longitude' => 74.9892,
            ],
            [
                'id' => 2,
                'user_id' => $businessUser->id,
                'category_id' => 7,
                'name' => 'Coastal Cafe & Bistro',
                'slug' => 'coastal-cafe',
                'description' => 'Authentic Malabar flavors mixed with modern continental cuisine near Bekal Fort.',
                'address' => 'Bekal Fort Road, Pallikkara, Kasaragod',
                'location_city' => 'Bekal',
                'phone' => '+91 9845012345',
                'logo_path' => 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=80&h=80&fit=crop&q=80',
                'status' => 'approved',
                'is_featured' => true,
                'is_verified' => true,
                'price_range' => 2,
            ],
            [
                'id' => 3,
                'user_id' => $businessUser->id,
                'category_id' => 4,
                'name' => 'Elite Medicare Center',
                'slug' => 'elite-medicare',
                'description' => 'Multi-speciality clinic with advanced diagnostics and compassionate care.',
                'address' => 'MG Road, Kasaragod',
                'location_city' => 'Kasaragod Town',
                'phone' => '+91 4994220000',
                'logo_path' => 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=80&h=80&fit=crop&q=80',
                'status' => 'approved',
                'is_featured' => true,
                'is_verified' => true,
                'price_range' => 3,
            ]
        ];

        foreach ($businesses as $biz) {
            Business::updateOrCreate(['id' => $biz['id']], $biz);
        }

        // 4. Map Subset Core Professionals
        $pros = [
            [
                'id' => 1,
                'user_id' => $proUser->id,
                'name' => 'Ahmed Sahal',
                'slug' => 'ahmed-sahal',
                'profession' => 'Full Stack Developer',
                'category_id' => 2,
                'location_city' => 'Kasaragod Town',
                'bio' => 'Experienced developer specializing in React and Laravel. Helping local businesses go digital.',
                'experience' => '5+ Years',
                'projects_completed' => 42,
                'avatar_path' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
                'is_verified' => true,
                'whatsapp' => '919876543210',
            ],
            [
                'id' => 2,
                'user_id' => $proUser->id,
                'name' => 'Fathima Zahra',
                'slug' => 'fathima-zahra',
                'profession' => 'Creative Designer',
                'category_id' => 8,
                'location_city' => 'Kanhangad',
                'bio' => 'Branding expert and wedding invitation specialist. Making your special moments more beautiful.',
                'experience' => '3 Years',
                'projects_completed' => 120,
                'avatar_path' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
                'is_verified' => true,
            ]
        ];

        foreach ($pros as $pro) {
            Professional::updateOrCreate(['id' => $pro['id']], $pro);
        }
    }
}
