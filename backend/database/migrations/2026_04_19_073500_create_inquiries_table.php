<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('inquiries')) return;
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('professional_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('customer_name', 100);
            $table->string('customer_phone', 20);
            $table->string('project_type')->nullable();
            $table->string('budget')->nullable();
            $table->text('notes')->nullable();
            $table->enum('status', ['new', 'contacted', 'closed'])->default('new');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
