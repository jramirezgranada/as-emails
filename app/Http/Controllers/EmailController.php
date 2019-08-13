<?php

namespace App\Http\Controllers;

use App\Factories\EmailFactory;

class EmailController extends Controller
{
    /**
     * Show Email List.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $emails = EmailFactory::index();
        return view('admin.emails.index')->with(compact('emails'));
    }
}
