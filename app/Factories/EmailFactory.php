<?php


namespace App\Factories;

use App\Email;

class EmailFactory
{
    public static function index()
    {
        return Email::paginate(20);
    }
}