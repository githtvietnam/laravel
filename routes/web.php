<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/* DASHBOARD LOGIN */
Route::get('login', 'Auth\AuthController@login')->name('login');
Route::post('login', 'Auth\AuthController@doLogin')->name('doLogin');

Route::get('logout', 'Auth\AuthController@logout')->name('do_logout');

Route::get('admin', 'Dashboard\DashboardController@index')->name('dasboard')->middleware('auth');
/* ------------- */

/* MODULE ROUTES USER */
Route::get('user', 'Backend\UserController@index')->name('user.view');
Route::get('user/create', 'Backend\UserController@create')->name('user.create');
Route::post('user', 'Backend\UserController@store')->name('user.store');
Route::get('user/{user}', 'Backend\UserController@show')->name('user.show');
Route::get('user/{user}/edit', 'Backend\UserController@edit')->name('user.edit');
Route::put('user/{user}', 'Backend\UserController@update')->name('user.update');
Route::delete('user/{user}', 'Backend\UserController@destroy')->name('user.destroy');
