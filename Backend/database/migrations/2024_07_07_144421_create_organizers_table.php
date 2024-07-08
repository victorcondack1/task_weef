<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Ramsey\Uuid\Uuid;

class CreateOrganizersTable extends Migration
{
    public function up()
    {
        Schema::create('organizers', function (Blueprint $table) {
            $table->uuid('id')->primary(); 
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('organizers');
    }
};
