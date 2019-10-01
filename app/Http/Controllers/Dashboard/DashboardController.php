<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\MessageBag;
use App\User;

class DashboardController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
        dd(Auth::check());


    }
    public function index(){
        return view('backend.home.index');
    }
}
