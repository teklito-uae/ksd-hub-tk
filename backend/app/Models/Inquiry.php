<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    protected $fillable = [
        'business_id', 'customer_name', 'customer_phone',
        'project_type', 'budget', 'notes', 'status',
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }
}
