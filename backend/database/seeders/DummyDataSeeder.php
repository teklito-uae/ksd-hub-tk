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

        // 2. Map Front-End Categories (Yelp Style Hierarchy — Kasaragod focused)
        $categoriesData = [
            [
                'id' => 1, 'name' => 'Restaurants', 'slug' => 'restaurants', 'icon' => 'UtensilsCrossed',
                'children' => [
                    ['id' => 101, 'name' => 'Kerala Cuisine', 'slug' => 'kerala-cuisine', 'icon' => 'Utensils'],
                    ['id' => 102, 'name' => 'Biryani & Meals', 'slug' => 'biryani-meals', 'icon' => 'ChefHat'],
                    ['id' => 103, 'name' => 'Cafes & Coffee', 'slug' => 'cafes-coffee', 'icon' => 'Coffee'],
                    ['id' => 104, 'name' => 'Bakeries', 'slug' => 'bakeries', 'icon' => 'CakeSlice'],
                    ['id' => 105, 'name' => 'Seafood', 'slug' => 'seafood', 'icon' => 'Fish'],
                    ['id' => 106, 'name' => 'Fast Food', 'slug' => 'fast-food', 'icon' => 'Sandwich'],
                ]
            ],
            [
                'id' => 2, 'name' => 'Home Services', 'slug' => 'home-services', 'icon' => 'Wrench',
                'children' => [
                    ['id' => 201, 'name' => 'Plumbers', 'slug' => 'plumbers', 'icon' => 'Droplet'],
                    ['id' => 202, 'name' => 'Electricians', 'slug' => 'electricians', 'icon' => 'Zap'],
                    ['id' => 203, 'name' => 'Painters', 'slug' => 'painters', 'icon' => 'PaintBucket'],
                    ['id' => 204, 'name' => 'Contractors', 'slug' => 'contractors', 'icon' => 'HardHat'],
                    ['id' => 205, 'name' => 'Pest Control', 'slug' => 'pest-control', 'icon' => 'Bug'],
                    ['id' => 206, 'name' => 'Cleaning', 'slug' => 'cleaning', 'icon' => 'Sparkles'],
                ]
            ],
            [
                'id' => 3, 'name' => 'Auto Services', 'slug' => 'auto-services', 'icon' => 'Car',
                'children' => [
                    ['id' => 301, 'name' => 'Car Repair', 'slug' => 'car-repair', 'icon' => 'Wrench'],
                    ['id' => 302, 'name' => 'Car Wash', 'slug' => 'car-wash', 'icon' => 'Droplets'],
                    ['id' => 303, 'name' => 'Towing', 'slug' => 'towing', 'icon' => 'Truck'],
                    ['id' => 304, 'name' => 'Driving Schools', 'slug' => 'driving-schools', 'icon' => 'RouteOff'],
                    ['id' => 305, 'name' => 'Bike Service', 'slug' => 'bike-service', 'icon' => 'Bike'],
                ]
            ],
            [
                'id' => 4, 'name' => 'Health & Beauty', 'slug' => 'health-beauty', 'icon' => 'HeartPulse',
                'children' => [
                    ['id' => 401, 'name' => 'Salons', 'slug' => 'salons', 'icon' => 'Scissors'],
                    ['id' => 402, 'name' => 'Dentists', 'slug' => 'dentists', 'icon' => 'Smile'],
                    ['id' => 403, 'name' => 'Hospitals', 'slug' => 'hospitals', 'icon' => 'Hospital'],
                    ['id' => 404, 'name' => 'Ayurveda & Spa', 'slug' => 'ayurveda-spa', 'icon' => 'Leaf'],
                    ['id' => 405, 'name' => 'Pharmacies', 'slug' => 'pharmacies', 'icon' => 'Pill'],
                    ['id' => 406, 'name' => 'Eye Care', 'slug' => 'eye-care', 'icon' => 'Eye'],
                ]
            ],
            [
                'id' => 5, 'name' => 'Real Estate', 'slug' => 'real-estate', 'icon' => 'Home',
                'children' => [
                    ['id' => 501, 'name' => 'Apartments', 'slug' => 'apartments', 'icon' => 'Building2'],
                    ['id' => 502, 'name' => 'Plots & Land', 'slug' => 'plots-land', 'icon' => 'Map'],
                    ['id' => 503, 'name' => 'Villas', 'slug' => 'villas', 'icon' => 'Home'],
                    ['id' => 504, 'name' => 'Commercial Space', 'slug' => 'commercial-space', 'icon' => 'Briefcase'],
                    ['id' => 505, 'name' => 'Agents & Brokers', 'slug' => 'agents-brokers', 'icon' => 'UserCheck'],
                ]
            ],
            [
                'id' => 6, 'name' => 'Education', 'slug' => 'education', 'icon' => 'GraduationCap',
                'children' => [
                    ['id' => 601, 'name' => 'Schools', 'slug' => 'schools', 'icon' => 'School'],
                    ['id' => 602, 'name' => 'Colleges', 'slug' => 'colleges', 'icon' => 'Building'],
                    ['id' => 603, 'name' => 'Coaching Centers', 'slug' => 'coaching-centers', 'icon' => 'BookOpen'],
                    ['id' => 604, 'name' => 'Skill Training', 'slug' => 'skill-training', 'icon' => 'Lightbulb'],
                    ['id' => 605, 'name' => 'Tuitions', 'slug' => 'tuitions', 'icon' => 'PenLine'],
                ]
            ],
            [
                'id' => 7, 'name' => 'Tourism', 'slug' => 'tourism', 'icon' => 'Palmtree',
                'children' => [
                    ['id' => 701, 'name' => 'Resorts & Hotels', 'slug' => 'resorts-hotels', 'icon' => 'Hotel'],
                    ['id' => 702, 'name' => 'Tour Operators', 'slug' => 'tour-operators', 'icon' => 'MapPinned'],
                    ['id' => 703, 'name' => 'Houseboats', 'slug' => 'houseboats', 'icon' => 'Sailboat'],
                    ['id' => 704, 'name' => 'Homestays', 'slug' => 'homestays', 'icon' => 'House'],
                ]
            ],
            [
                'id' => 8, 'name' => 'Shopping', 'slug' => 'shopping', 'icon' => 'ShoppingBag',
                'children' => [
                    ['id' => 801, 'name' => 'Supermarkets', 'slug' => 'supermarkets', 'icon' => 'Store'],
                    ['id' => 802, 'name' => 'Textiles & Fashion', 'slug' => 'textiles-fashion', 'icon' => 'Shirt'],
                    ['id' => 803, 'name' => 'Electronics', 'slug' => 'electronics', 'icon' => 'Laptop'],
                    ['id' => 804, 'name' => 'Jewellery', 'slug' => 'jewellery', 'icon' => 'Gem'],
                    ['id' => 805, 'name' => 'Stationery', 'slug' => 'stationery', 'icon' => 'BookMarked'],
                ]
            ],
            [
                'id' => 9, 'name' => 'Construction', 'slug' => 'construction', 'icon' => 'HardHat',
                'children' => [
                    ['id' => 901, 'name' => 'Builders', 'slug' => 'builders', 'icon' => 'Building2'],
                    ['id' => 902, 'name' => 'Interior Design', 'slug' => 'interior-design', 'icon' => 'Sofa'],
                    ['id' => 903, 'name' => 'Architects', 'slug' => 'architects', 'icon' => 'PenRuler'],
                    ['id' => 904, 'name' => 'Hardware Stores', 'slug' => 'hardware-stores', 'icon' => 'Hammer'],
                    ['id' => 905, 'name' => 'Steel & Cement', 'slug' => 'steel-cement', 'icon' => 'Warehouse'],
                ]
            ],
            [
                'id' => 10, 'name' => 'Finance', 'slug' => 'finance', 'icon' => 'Banknote',
                'children' => [
                    ['id' => 1001, 'name' => 'Banks', 'slug' => 'banks', 'icon' => 'Landmark'],
                    ['id' => 1002, 'name' => 'Loans', 'slug' => 'loans', 'icon' => 'HandCoins'],
                    ['id' => 1003, 'name' => 'Insurance', 'slug' => 'insurance', 'icon' => 'ShieldCheck'],
                    ['id' => 1004, 'name' => 'Chit Funds', 'slug' => 'chit-funds', 'icon' => 'PiggyBank'],
                ]
            ],
            [
                'id' => 11, 'name' => 'Events', 'slug' => 'events', 'icon' => 'CalendarDays',
                'children' => [
                    ['id' => 1101, 'name' => 'Wedding Halls', 'slug' => 'wedding-halls', 'icon' => 'Heart'],
                    ['id' => 1102, 'name' => 'Photography', 'slug' => 'photography', 'icon' => 'Camera'],
                    ['id' => 1103, 'name' => 'Catering', 'slug' => 'catering', 'icon' => 'UtensilsCrossed'],
                    ['id' => 1104, 'name' => 'Flower Decoration', 'slug' => 'flower-decoration', 'icon' => 'Flower2'],
                ]
            ],
            [
                'id' => 12, 'name' => 'Tech & IT', 'slug' => 'tech-it', 'icon' => 'Cpu',
                'children' => [
                    ['id' => 1201, 'name' => 'Software Dev', 'slug' => 'software-development', 'icon' => 'Code'],
                    ['id' => 1202, 'name' => 'Web Design', 'slug' => 'web-design', 'icon' => 'Globe'],
                    ['id' => 1203, 'name' => 'Mobile Repair', 'slug' => 'mobile-repair', 'icon' => 'Smartphone'],
                    ['id' => 1204, 'name' => 'CCTV & Security', 'slug' => 'cctv-security', 'icon' => 'ShieldAlert'],
                ]
            ],
        ];

        foreach ($categoriesData as $catData) {
            $children = $catData['children'] ?? [];
            unset($catData['children']);
            $parent = Category::updateOrCreate(['id' => $catData['id']], $catData);

            foreach ($children as $childData) {
                $childData['parent_id'] = $parent->id;
                Category::updateOrCreate(['id' => $childData['id']], $childData);
            }
        }

        // 2.5 Map Places (Cities in Kasaragod)
        $places = [
            'Kasaragod', 'Kanhangad', 'Uppala', 'Cheruvathur', 'Nileshwar', 'Trikaripur',
            'Manjeshwar', 'Badiyadka', 'Kumbla', 'Mulleria', 'Perla', 'Bandadka', 'Odayanchal',
            'Seethangoli', 'Pallikkara', 'Bekal', 'Udma', 'Padne', 'Vellarikundu', 'Panathur'
        ];
        foreach ($places as $place) {
            \App\Models\Place::firstOrCreate([
                'name' => $place,
                'slug' => \Illuminate\Support\Str::slug($place),
                'is_active' => true,
            ]);
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
                'location_city' => 'Kasaragod',
                'phone' => '+91 9876543210',
                'whatsapp' => '919876543210',
                'logo_path' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop&q=80',
                'status' => 'approved',
                'is_featured' => true,
                'is_verified' => true,
                'verification_status' => 'premium',
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
                'logo_path' => 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=200&h=200&fit=crop&q=80',
                'status' => 'approved',
                'is_featured' => true,
                'is_verified' => true,
                'verification_status' => 'verified',
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
                'location_city' => 'Kasaragod',
                'phone' => '+91 4994220000',
                'logo_path' => 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=200&h=200&fit=crop&q=80',
                'status' => 'approved',
                'is_featured' => true,
                'is_verified' => true,
                'verification_status' => 'verified',
                'price_range' => 3,
            ],
            [
                'id' => 4,
                'user_id' => $businessUser->id,
                'category_id' => 8,
                'name' => 'City Center Mall',
                'slug' => 'city-center-mall',
                'description' => 'The ultimate shopping destination in Kasaragod with top brands and entertainment.',
                'address' => 'Bank Road, Kasaragod',
                'location_city' => 'Kasaragod',
                'phone' => '+91 4994231111',
                'logo_path' => 'https://images.unsplash.com/photo-1519567281023-e18e80d463c6?w=200&h=200&fit=crop&q=80',
                'status' => 'approved',
                'is_featured' => true,
                'is_verified' => true,
                'verification_status' => 'premium',
                'price_range' => 3,
            ],
            [
                'id' => 5,
                'user_id' => $businessUser->id,
                'category_id' => 11,
                'name' => 'Grand Aura Convention Centre',
                'slug' => 'grand-aura',
                'description' => 'Spacious and luxurious convention center for weddings and corporate events.',
                'address' => 'Kanhangad South',
                'location_city' => 'Kanhangad',
                'phone' => '+91 8080808080',
                'logo_path' => 'https://images.unsplash.com/photo-1519167758481-83f5affe00f4?w=200&h=200&fit=crop&q=80',
                'status' => 'approved',
                'is_featured' => true,
                'is_verified' => true,
                'verification_status' => 'premium',
                'price_range' => 4,
            ],
            [
                'id' => 6,
                'user_id' => $businessUser->id,
                'category_id' => 3,
                'name' => 'SpeedFix Auto Garage',
                'slug' => 'speedfix-auto',
                'description' => 'Reliable and fast multi-brand car repair and service center.',
                'address' => 'NH 66, Uppala',
                'location_city' => 'Uppala',
                'phone' => '+91 9746000000',
                'logo_path' => 'https://images.unsplash.com/photo-1503328427499-d92d1fa3afce?w=200&h=200&fit=crop&q=80',
                'status' => 'approved',
                'is_featured' => false,
                'is_verified' => true,
                'verification_status' => 'verified',
                'price_range' => 2,
            ],
            [
                'id' => 7,
                'user_id' => $businessUser->id,
                'category_id' => 1,
                'name' => 'Malabar Spices Restaurant',
                'slug' => 'malabar-spices',
                'description' => 'Traditional Malabar Biryani and Kerala seafood delicacies.',
                'address' => 'Cheruvathur Junction',
                'location_city' => 'Cheruvathur',
                'phone' => '+91 9995554444',
                'logo_path' => 'https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=200&h=200&fit=crop&q=80',
                'status' => 'approved',
                'is_featured' => true,
                'is_verified' => true,
                'verification_status' => 'featured',
                'price_range' => 2,
            ],
            [
                'id' => 8,
                'user_id' => $businessUser->id,
                'category_id' => 6,
                'name' => 'Global IT Academy',
                'slug' => 'global-it-academy',
                'description' => 'Leading software training institute offering courses in Web Dev, AI and Data Science.',
                'address' => 'Near Railway Station, Kasaragod',
                'location_city' => 'Kasaragod',
                'phone' => '+91 8887776665',
                'logo_path' => 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=200&h=200&fit=crop&q=80',
                'status' => 'approved',
                'is_featured' => false,
                'is_verified' => true,
                'verification_status' => 'verified',
                'price_range' => 2,
            ],
            [
                'id' => 9,
                'user_id' => $businessUser->id,
                'category_id' => 2,
                'name' => 'Sparkle Clean Services',
                'slug' => 'sparkle-clean',
                'description' => 'Professional home and office cleaning services across the district.',
                'address' => 'Nileshwar, Kasaragod',
                'location_city' => 'Nileshwar',
                'phone' => '+91 9000011111',
                'logo_path' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop&q=80',
                'status' => 'approved',
                'is_featured' => false,
                'is_verified' => false,
                'verification_status' => 'unverified',
                'price_range' => 1,
            ],
            [
                'id' => 10,
                'user_id' => $businessUser->id,
                'category_id' => 7,
                'name' => 'Ranipuram Hill Resort',
                'slug' => 'ranipuram-hill-resort',
                'description' => 'Eco-friendly resort offering a tranquil stay amidst the lush hills of Ranipuram.',
                'address' => 'Ranipuram, Panathady',
                'location_city' => 'Ranipuram',
                'phone' => '+91 9400022222',
                'logo_path' => 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=200&h=200&fit=crop&q=80',
                'status' => 'approved',
                'is_featured' => true,
                'is_verified' => true,
                'verification_status' => 'premium',
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
