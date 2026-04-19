<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Performance indexes migration.
 *
 * Targets the most common query patterns observed in the API:
 *  - businesses.status          (every listing query filters approved)
 *  - businesses.category_id     (category-filtered directory views)
 *  - businesses.location_city   (location-filtered searches)
 *  - businesses.is_featured     (featured sort applied on every default listing)
 *  - businesses.slug            (unique — already exists via unique constraint, skip)
 *  - categories.parent_id       (children eager-load query)
 *  - categories.slug            (slug lookup before category filter)
 *  - places.is_active           (places dropdown query)
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('businesses', function (Blueprint $table) {
            // Composite covering index for the most common directory query:
            // WHERE status = 'approved' ORDER BY is_featured DESC, name ASC
            if (!$this->indexExists('businesses', 'businesses_status_featured_name_idx')) {
                $table->index(['status', 'is_featured', 'name'], 'businesses_status_featured_name_idx');
            }
            // For category-filtered queries
            if (!$this->indexExists('businesses', 'businesses_category_status_idx')) {
                $table->index(['category_id', 'status'], 'businesses_category_status_idx');
            }
            // For location-filtered queries
            if (!$this->indexExists('businesses', 'businesses_location_status_idx')) {
                $table->index(['location_city', 'status'], 'businesses_location_status_idx');
            }
        });

        Schema::table('categories', function (Blueprint $table) {
            // Children eager-load: WHERE parent_id = ?
            if (!$this->indexExists('categories', 'categories_parent_id_idx')) {
                $table->index(['parent_id'], 'categories_parent_id_idx');
            }
            // Slug lookup used in BusinessController category_slug filter
            if (!$this->indexExists('categories', 'categories_slug_idx')) {
                $table->index(['slug'], 'categories_slug_idx');
            }
        });

        Schema::table('places', function (Blueprint $table) {
            if (!$this->indexExists('places', 'places_is_active_name_idx')) {
                $table->index(['is_active', 'name'], 'places_is_active_name_idx');
            }
        });
    }

    public function down(): void
    {
        Schema::table('businesses', function (Blueprint $table) {
            $table->dropIndexIfExists('businesses_status_featured_name_idx');
            $table->dropIndexIfExists('businesses_category_status_idx');
            $table->dropIndexIfExists('businesses_location_status_idx');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropIndexIfExists('categories_parent_id_idx');
            $table->dropIndexIfExists('categories_slug_idx');
        });

        Schema::table('places', function (Blueprint $table) {
            $table->dropIndexIfExists('places_is_active_name_idx');
        });
    }

    /** Check if an index already exists — compatible with Laravel 11 (no Doctrine). */
    private function indexExists(string $table, string $index): bool
    {
        $indexes = collect(Schema::getIndexes($table))->pluck('name')->all();
        return in_array($index, $indexes, true);
    }
};
