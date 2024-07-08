<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Ramsey\Uuid\Uuid;

class CreateEventsTable extends Migration
{
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Olá Weef, se está aqui, obrigado pelo code review :), estarei utilisando ramsey uuid para criar eventos com id's unicos.
            $table->uuid('organizer_id');
            $table->foreign('organizer_id')->references('id')->on('organizers');
            $table->string('image_url')->nullable();
            $table->dateTime('event_datetime');
            $table->string('name');
            $table->string('city');
            $table->string('state');
            $table->string('address');
            $table->string('number');
            $table->string('complement')->nullable();
            $table->string('phone');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('events');
    }
};
