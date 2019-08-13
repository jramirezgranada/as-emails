<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::firstOrCreate(
            ['email' => 'admin@as.com'],
            [
                'password' => bcrypt('admin'),
                'name' => 'AS Admin'
            ]
        );
    }
}
