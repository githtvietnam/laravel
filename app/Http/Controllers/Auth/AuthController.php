<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\MessageBag;
use App\User;


class AuthController extends Controller{

    public function login(){
        $user = Auth::user();
        if(Auth::check()){
            return redirect('admin');
        }
        return view('user.auth.login');
    }
    public function doLogin(LoginRequest $request){
        $email = $request->input('email');
        $password = $request->input('password');
        if (Auth::attempt(['email' => $email,'password' => $password])) {
            return redirect('admin');
        }else{
            $errors = new MessageBag(['errorlogin' => 'Email hoặc mật khẩu không đúng']);
			return redirect()->back()->withInput()->withErrors($errors);
        }
        return back();
    }
    public function logout(){
        Auth::logout();
        return redirect('login');
    }

}
