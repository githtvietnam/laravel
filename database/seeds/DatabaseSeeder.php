<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_catalogue')->insert([
            [
                'created_at' => '2019-08-02 04:40:29',
                'permission' => '',
                'publish' => 1,
                'title' => 'Quản trị viên',
                'updated_at' => '2019-08-02 04:40:29',
                'userid_created' => '2',
                'userid_updated' => '2'
            ],
        ]);


    }
}
