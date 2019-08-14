<?php

namespace App\Http\Controllers;

use App\Factories\EmailFactory;
use App\Http\Requests\CreateEmailRequest;

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

    /**
     *
     * @param CreateEmailRequest $request
     * @return mixed
     */
    public function store(CreateEmailRequest $request)
    {
        return EmailFactory::store($request->all());
    }
}
