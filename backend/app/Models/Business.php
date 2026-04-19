<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    protected $fillable = [
        'user_id', 'category_id', 'name', 'slug', 'description', 'tagline',
        'address', 'location_city', 'phone', 'whatsapp', 'email', 'website',
        'logo_path', 'cover_path', 'status', 'is_featured', 'is_verified',
        'verification_status', 'price_range', 'latitude', 'longitude',
        'rating', 'review_count', 'opening_hours', 'tags',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_verified' => 'boolean',
        'tags' => 'array',
        'opening_hours' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(BusinessImage::class);
    }
}
