<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogPost;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => 'Top 10 Must-Visit Restaurants in Kasaragod District',
                'slug' => 'top-10-restaurants-kasaragod',
                'excerpt' => 'From authentic Malabar biryani to seafood joints by the Arabian Sea — discover the best places to eat across Kasaragod, Kanhangad, and Bekal.',
                'content' => "Kasaragod district is a hidden culinary paradise of Kerala. The unique blend of Tulu, Kannada, and Malayalam food cultures creates a dining experience unlike anywhere else in India.\n\n## 1. Bekal Fort Restaurant\nPerched overlooking the iconic Bekal Fort, this restaurant serves authentic Kerala thalis with a stunning ocean backdrop. Their fish curry is legendary among locals.\n\n## 2. Hotel Prasanth, Kanhangad\nA decades-old institution known for its fluffy appam and rich chicken stew. Breakfast here is a ritual for many Kanhangad residents.\n\n## 3. Al-Bake Arabian Kitchen, Kasaragod Town\nThe go-to spot for shawarma and Al Faham chicken. Their Malabar biryani on Fridays draws crowds from across the district.\n\n## 4. Chakra Residency, Uppala\nMore than just a hotel — their multi-cuisine restaurant blends North Indian, Kerala, and Chinese dishes with consistent quality.\n\n## 5. Seabreeze, Bekal\nA beachside eatery where the catch of the day is grilled right in front of you. Perfect for a sunset dinner.\n\n## 6. Malabar Spice, Nileshwar\nSpecializing in traditional Mappila cuisine, their pathiri and beef fry combo is a weekend favourite.\n\n## 7. Café Culture, Kanhangad\nThe town's first specialty coffee shop, serving single-origin pour-overs alongside loaded sandwiches and cheesecakes.\n\n## 8. Grand Pavilion, Cheruvathur\nA family restaurant known for generous portions and their signature prawn masala that keeps people coming back.\n\n## 9. Bamboo Grove, Ranipuram Road\nAn eco-restaurant using locally sourced organic ingredients. Their bamboo chicken is a must-try experience.\n\n## 10. Street Food Lane, Kasaragod Town\nNot a single restaurant but an entire stretch near the old bus stand — from banana chips to pazham pori, this is street food heaven.",
                'image' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop',
                'category' => 'Food & Dining',
                'category_icon' => 'Utensils',
                'read_time' => '5 min read',
                'author' => 'Kasaragod Hub Team',
                'is_featured' => true,
                'is_published' => true,
                'published_at' => now()->subDays(4),
            ],
            [
                'title' => 'Kasaragod Real Estate: A Complete Buyer\'s Guide for 2026',
                'slug' => 'real-estate-guide-kasaragod-2026',
                'excerpt' => 'Property prices, best localities, RERA compliance, and investment hotspots — everything you need to know before buying land or a flat in Kasaragod.',
                'content' => "The Kasaragod real estate market is witnessing unprecedented growth in 2026, driven by infrastructure development and increased connectivity.\n\n## Current Market Overview\nProperty prices in Kasaragod town have appreciated by 15-20% over the past two years. Kanhangad and Bekal are emerging as premium residential zones.\n\n## Top Investment Areas\n- **Bekal**: Tourism-driven growth, resort development\n- **Kanhangad South**: IT corridor proposal, educational institutions\n- **Nileshwar**: Affordable plots, agricultural potential\n- **Uppala Junction**: Commercial hub, highway connectivity\n\n## What to Check Before Buying\n1. RERA registration status\n2. Land use classification (residential vs agricultural)\n3. Road access and widening plans\n4. Water and electricity connectivity\n5. Panchayat/Municipality approval\n\n## Price Range Guide\n| Location | Per Cent Rate |\n|----------|---------------|\n| Kasaragod Town | ₹8-15 Lakhs |\n| Kanhangad | ₹6-12 Lakhs |\n| Bekal | ₹10-20 Lakhs |\n| Nileshwar | ₹4-8 Lakhs |\n| Uppala | ₹5-10 Lakhs |",
                'image' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
                'category' => 'Real Estate',
                'category_icon' => 'Building2',
                'read_time' => '7 min read',
                'author' => 'Kasaragod Hub Team',
                'is_featured' => true,
                'is_published' => true,
                'published_at' => now()->subDays(9),
            ],
            [
                'title' => '12 Hidden Gems in Kasaragod That Tourists Don\'t Know About',
                'slug' => 'hidden-gems-kasaragod-tourism',
                'excerpt' => 'Beyond Bekal Fort — discover waterfalls, caves, backwaters, and ancient temples that make Kasaragod a secret paradise.',
                'content' => "While Bekal Fort attracts thousands of tourists every year, Kasaragod district has dozens of unexplored destinations that rival Kerala's most famous spots.\n\n## 1. Ranipuram Hills\nOften called the \"Ooty of Kerala,\" this hill station at 750m altitude offers trekking trails through shola forests with breathtaking views.\n\n## 2. Valiyaparamba Backwaters\nThe longest backwater chain in Kerala, stretching 30km. Far less crowded than Alleppey, with equally stunning houseboat experiences.\n\n## 3. Kottancherry Hills\nA sunrise point that locals swear by. The panoramic view of the Arabian Sea and Western Ghats from here is unforgettable.\n\n## 4. Possadigumpe Viewpoint\nA lesser-known viewpoint near Sullia border offering views of multiple Karnataka and Kerala districts simultaneously.\n\n## 5. Chandragiri Fort\nAn ancient fort on the banks of Chandragiri River, dating back to the 17th century. Far less crowded than Bekal.\n\n## 6. Ananthapura Lake Temple\nThe only lake temple in Kerala, believed to be the original seat of Lord Ananthpadmanabha. A vegetarian crocodile named Babia is said to guard the temple.",
                'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
                'category' => 'Tourism',
                'category_icon' => 'Palmtree',
                'read_time' => '6 min read',
                'author' => 'Kasaragod Hub Team',
                'is_featured' => false,
                'is_published' => true,
                'published_at' => now()->subDays(14),
            ],
            [
                'title' => 'Best Hospitals & Clinics in Kasaragod: A Health Directory',
                'slug' => 'best-hospitals-kasaragod',
                'excerpt' => 'From multi-specialty hospitals to Ayurvedic clinics — a comprehensive guide to healthcare services across the district.',
                'content' => "Access to quality healthcare is critical, and Kasaragod district has seen significant improvements in medical infrastructure over the past decade.\n\n## Top Multi-Specialty Hospitals\n1. **District Hospital, Kasaragod** — Government facility with 400+ beds\n2. **KIMS, Kanhangad** — Private multi-specialty with 24/7 emergency\n3. **Cooperative Hospital, Taliparamba** — Affordable quality care\n\n## Specialist Clinics\n- Dental: Dr. Sujith's Dental Clinic, Kasaragod Town\n- Eye Care: Nethra Eye Hospital, Kanhangad\n- Ortho: Bone & Joint Clinic, Uppala\n\n## Ayurveda & Wellness\nKasaragod is famous for its Ayurvedic traditions. The district has over 50 registered Ayurvedic clinics.",
                'image' => 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop',
                'category' => 'Healthcare',
                'category_icon' => 'Heart',
                'read_time' => '4 min read',
                'author' => 'Kasaragod Hub Team',
                'is_featured' => false,
                'is_published' => true,
                'published_at' => now()->subDays(22),
            ],
            [
                'title' => 'Remote Work & Freelancing in Kasaragod: The Complete Guide',
                'slug' => 'freelancers-guide-kasaragod',
                'excerpt' => 'Co-working spaces, internet connectivity, freelancer meetups, and why Kasaragod is becoming a digital nomad destination.',
                'content' => "With improving internet infrastructure and affordable living costs, Kasaragod is emerging as an unlikely but compelling destination for remote workers.\n\n## Internet Connectivity\nJioFiber and BSNL FTTH are available in most urban areas. Speeds of 100-300 Mbps are common in Kasaragod town and Kanhangad.\n\n## Co-Working Spaces\n1. HubSpace Kasaragod — Air-conditioned, 24/7 access, meeting rooms\n2. The Startup Café, Kanhangad — Affordable daily passes\n\n## Cost of Living\nA comfortable lifestyle in Kasaragod costs roughly ₹15,000-25,000/month including rent, food, and transport — a fraction of Bangalore or Kochi.\n\n## Community\nMonthly freelancer meetups happen at various cafés. The Kasaragod Hub platform connects local professionals.",
                'image' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
                'category' => 'Business',
                'category_icon' => 'Briefcase',
                'read_time' => '5 min read',
                'author' => 'Kasaragod Hub Team',
                'is_featured' => false,
                'is_published' => true,
                'published_at' => now()->subDays(30),
            ],
            [
                'title' => 'Top 15 Schools in Kasaragod District: CBSE, ICSE & State Board',
                'slug' => 'best-schools-kasaragod-2026',
                'excerpt' => 'A parent\'s guide to choosing the right school — fees, facilities, results, and student reviews across all major boards.',
                'content' => "Choosing the right school is one of the most important decisions for families in Kasaragod. Here's our comprehensive review.\n\n## CBSE Schools\n1. Kendriya Vidyalaya, Kasaragod — Central government school with excellent results\n2. Chinmaya Vidyalaya, Kanhangad — Strong extracurricular focus\n3. Amrita Vidyalayam, Kasaragod — Known for discipline and academics\n\n## ICSE Schools\n1. St. Mary's School — One of the oldest English-medium schools\n2. Holy Cross School — Strong arts and sports programs\n\n## State Board (Malayalam Medium)\nNumerous high-performing government schools with excellent pass rates in SSLC and Plus Two examinations.",
                'image' => 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop',
                'category' => 'Education',
                'category_icon' => 'GraduationCap',
                'read_time' => '6 min read',
                'author' => 'Kasaragod Hub Team',
                'is_featured' => false,
                'is_published' => true,
                'published_at' => now()->subDays(35),
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::updateOrCreate(
                ['slug' => $post['slug']],
                $post
            );
        }
    }
}
