<?php

namespace App\Http\Controllers;

use App\Models\Suggestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function get(Suggestion $suggestion)
    {
        return response()->json($suggestion);
    }

    public function add(Request $request)
    {
        $suggestionData = $request->all();

        $newSuggestion = new Suggestion();

        if ($suggestionData['original_suggestion_id']) {
            $originalSuggestion = Suggestion::where('id', $suggestionData['original_suggestion_id'])->first();

            if ($originalSuggestion) {
                $authorId = $originalSuggestion['user_id'];
                $type = $originalSuggestion['type'];
                $data = $originalSuggestion['data'];
                $newSuggestion->created_at = date('Y-m-d H:i:s');
            }
        } else {
            $authorId = Auth::user()->id;
            $type = $suggestionData['type'];
            $data = json_encode($suggestionData['data']);
        }

        $newSuggestion->resource_id = $suggestionData['resource_id'];
        $newSuggestion->resource = $suggestionData['resource'];
        $newSuggestion->type = $type;
        $newSuggestion->user_id = $authorId;
        $newSuggestion->data = $data;

        try {
            $newSuggestion->save();
        } catch (Exception $e) {
            return response()->json([$e->getMessage()]);
        }

        return response()->json([
            'id' => $newSuggestion->id,
            'created_at' => $newSuggestion->created_at,
        ], 201);
    }

    public function update(Suggestion $suggestion, Request $request)
    {
        if (!$suggestion) {
            return response()->json([
                'error' => "Could not update suggestion - suggesiton not found."
            ], 404);
        }

        $suggestion->has_comments = true;

        try {
            $suggestion->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }

        return response()->json([
            'success' => true,
        ], 200);
    }
}