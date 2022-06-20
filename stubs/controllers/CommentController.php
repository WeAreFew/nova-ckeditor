<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function add(Request $request)
    {
        $commentData = $request->all();

        $newComment = new Comment();
    }

    public function remove(Request $request)
    {

    }

    public function update(Request $request)
    {

    }

    public function getThread()
    {

    }

    public function getComment()
    {
        
    }
}