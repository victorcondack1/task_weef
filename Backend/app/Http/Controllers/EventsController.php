<?php

namespace App\Http\Controllers;

use App\Models\Organizer;
use Illuminate\Http\Request;
use App\Models\Event;
use Ramsey\Uuid\Uuid;
use GuzzleHttp\Client;

class EventsController extends Controller
{

    public function index()
{
    try {
        $events = Event::with(['organizer' => function ($query) {
            $query->select('id', 'name');
        }])->get();

        return response()->json([
            'eventos' => $events
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'erro' => 'Erro ao buscar eventos'
        ], 500);
    }
}



    public function showEventsByUserId($organizerId)
    {
        try {
            $events = Event::where('organizer_id', $organizerId)->get();

            return response()->json([
                'eventos' => $events
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'erro' => 'Eventos não encontrados para o organizador'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'organizer_id' => 'required|exists:organizers,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
            'event_datetime' => 'required|date',
            'name' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'address' => 'required|string',
            'number' => 'required|string',
            'complement' => 'nullable|string',
            'phone' => 'required|string',
        ]);

        try {
            $event = new Event();
            $event->id = Uuid::uuid4();
            $event->organizer_id = $request->organizer_id;
            $event->event_datetime = $request->event_datetime;
            $event->name = $request->name;
            $event->city = $request->city;
            $event->state = $request->state;
            $event->address = $request->address;
            $event->number = $request->number;
            $event->complement = $request->complement;
            $event->phone = $request->phone;

            if ($request->hasFile('image')) {
                $imageUrl = $this->uploadToImgur($request->file('image'));

                $event->image_url = $imageUrl;
            }

            $event->save();

            return response()->json([
                'mensagem' => 'Evento criado com sucesso',
                'evento' => $event
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'erro' => 'Falha ao criar evento'
            ], 400);
        }
    }




    public function update(Request $request, $id)
    {
        $request->validate([
            'organizer_id' => 'nullable|exists:organizers,id',
            'image_url' => 'nullable|string',
            'event_datetime' => 'nullable|date',
            'name' => 'nullable|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'address' => 'nullable|string',
            'number' => 'nullable|string',
            'complement' => 'nullable|string',
            'phone' => 'nullable|string',
        ]);

        try {
            $event = Event::findOrFail($id);

            if ($request->has('organizer_id')) {
                $event->organizer_id = $request->organizer_id;
            }
            if ($request->has('image_url')) {
                $event->image_url = $request->image_url;
            }
            if ($request->has('event_datetime')) {
                $event->event_datetime = $request->event_datetime;
            }
            if ($request->has('name')) {
                $event->name = $request->name;
            }
            if ($request->has('city')) {
                $event->city = $request->city;
            }
            if ($request->has('state')) {
                $event->state = $request->state;
            }
            if ($request->has('address')) {
                $event->address = $request->address;
            }
            if ($request->has('number')) {
                $event->number = $request->number;
            }
            if ($request->has('complement')) {
                $event->complement = $request->complement;
            }
            if ($request->has('phone')) {
                $event->phone = $request->phone;
            }

            $event->save();

            return response()->json([
                'mensagem' => 'Evento atualizado com sucesso',
                'evento' => $event
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'erro' => 'Falha ao atualizar evento'
            ], 400);
        }
    }

    public function destroy($id)
    {
        try {
            $event = Event::findOrFail($id);
            $event->delete();

            return response()->json([
                'mensagem' => 'Evento deletado com sucesso'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'erro' => 'Falha ao deletar evento'
            ], 400);
        }
    }


    private function uploadToImgur($image)
    {
        $client = new Client();
        $response = $client->request('POST', 'https://api.imgur.com/3/image', [
            'headers' => [
                'Authorization' => 'Client-ID ' . env('IMGUR_CLIENT_ID'),
                'Accept' => 'application/json',
            ],
            'multipart' => [
                [
                    'name' => 'image',
                    'contents' => file_get_contents($image->path()),
                    'filename' => $image->getClientOriginalName(),
                ]
            ]
        ]);

        $body = json_decode($response->getBody()->getContents(), true);
        return $body['data']['link'] ?? null;
    }
}
