<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class Event extends Model
{
    public $incrementing = false; // Olá Weef, se está aqui, obrigado pelo code review :), aqui estou desabilitando o auto increment da tabela.
    protected $keyType = 'string';

    protected $fillable = [
        'id', // Olá Weef, se está aqui, obrigado pelo code review :), aqui estou permitindo o uso de UUID'S.
        'organizer_id',
        'image_url',
        'event_datetime',
        'name',
        'city',
        'state',
        'address',
        'number',
        'complement',
        'phone',
    ];

    protected static function boot()
    {
        parent::boot();

        // Olá Weef, se está aqui, obrigado pelo code review :), aqui estou gerando os UUID's.
        static::creating(function ($event) {
            $event->id = Uuid::uuid4()->toString();
        });
    }

    public function organizer()
    {
        return $this->belongsTo(Organizer::class, 'organizer_id');
    }
}
