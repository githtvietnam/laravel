
<!DOCTYPE html>
<html>

<head>
	<base href="{{ url('/') }}">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>HT Laravel CMS | Version 1.0</title>

	<link href="{{ asset('backend/css/bootstrap.min.css') }}" rel="stylesheet">
	<link href="{{ asset('backend/font-awesome/css/font-awesome.css') }}" rel="stylesheet">
	<link href="{{ asset('backend/css/plugins/toastr/toastr.min.css') }}" rel="stylesheet">
	<link href="{{ asset('backend/css/animate.css') }}" rel="stylesheet">
	<link href="{{ asset('backend/css/style.css') }}" rel="stylesheet">
	<link href="{{ asset('backend/css/customize.css') }}" rel="stylesheet">
	<script src="{{ asset('plugin/jquery-3.3.1.min.js') }}"></script>
</head>

<body class="gray-bg">

    <div class="loginColumns animated fadeInDown">
        <div class="row">

            <div class="col-md-6 company-infomation">
                <h2 class="font-bold">HT LARAVEL CMS SYSTEM V.1.0</h2>
                <p>
                    +5,000 doanh nghiệp và chủ shop đã chọn để bán hàng từ Online đến Offline.
                </p>
                <p>
                    Sản phẩm của HT Việt Nam luôn có tốc độ xử lý rất nhanh(~2 giây) giúp đem lại trải nghiệm tốt cho người dùng.
                </p>
                <p>
                   Với công nghệ mới, khách hàng sẽ luôn được sử dụng sản phẩm tốt nhất với mức giá ưu đãi nhất.
                </p>
                <p>
                   Website được xây dựng đơn giản rõ ràng, tinh tế, cùng chế độ bảo hành bảo trì thường xuyên..
                </p>
            </div>
            <div class="col-md-6">
                <div class="ibox-content">
					@if($errors->any())
					<div class="alert alert-danger">
						@foreach ($errors->all() as $key => $val)
							{{ $val .'/' }}
						@endforeach
					</div>
					@endif
                    <form class="m-t" role="form" method="post" action="{{ route('doLogin') }}">
						@csrf
                        <div class="form-group">
                            <input type="text" class="form-control" value="" name="email" placeholder="Nhập vào email của bạn" >
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" name="password" placeholder="Mật khẩu" >
                        </div>
                        <button type="submit" name="login" value="create" class="btn btn-primary block full-width m-b">Đăng nhập</button>

                        <a href="">
                            <small>Quên mật khẩu?</small>
                        </a>
                    </form>
                    <p class="m-t">
                        <small>Hệ thống quản trị nội dung HT VIỆT NAM 2019 Version 1.0+</small>
                    </p>
                </div>
            </div>
        </div>
        <hr/>
        <div class="row">
            <div class="col-md-6">
                Copyright HT VIỆT NAM Company
            </div>
            <div class="col-md-6 text-right">
               <small>© 2019-2020 </small>
            </div>
        </div>
    </div>
		<script src="{{ asset('template/backend/js/plugins/toastr/toastr.min.js') }}"></script>
</body>

</html>
