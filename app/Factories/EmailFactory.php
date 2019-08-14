<?php


namespace App\Factories;

use App\Email;

class EmailFactory
{
    /**
     * Index method to return paginated data
     * @return mixed
     */
    public static function index()
    {
        return Email::paginate(20);
    }

    /**
     * Store Email in DataBase
     * @param $request
     * @return mixed
     */
    public static function store($request)
    {
        return Email::create($request);
    }
}