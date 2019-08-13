<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Email;
use Faker\Generator as Faker;

$factory->define(Email::class, function (Faker $faker) {
    return [
        'subject' => $faker->sentence(4),
        'body' => $faker->paragraph(100),
        'is_read' => rand(0, 1)
    ];
});
