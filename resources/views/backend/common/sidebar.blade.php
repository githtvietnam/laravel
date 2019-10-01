<nav class="navbar-default navbar-static-side" role="navigation">
	<div class="sidebar-collapse">
		<ul class="nav metismenu" id="side-menu">
			<li class="nav-header">
				<div class="dropdown profile-element"> <span>
					<img alt="image" class="img-circle" style="height:50px;" src="" />
				</span>
				@php $user = Auth::user(); @endphp
				<a data-toggle="dropdown" class="dropdown-toggle" href="#">
					<span class="clear"> <span class="block m-t-xs"> <strong class="font-bold" style="color:#fff;font-weight:500;">{{ $user->fullname }}</strong>
					</span> <span class="text-muted text-xs block">Quản trị viên<b style="color:#8095a8;" class="caret"></b></span> </span> </a>
					<ul class="dropdown-menu animated fadeInRight m-t-xs">
						<li><a href="">Hồ sõ cá nhân</a></li>
						<li class="divider"></li>
						<li><a href="{{ route('do_logout') }}">Ðăng xuất</a></li>
					</ul>
				</div>
				<div class="logo-element">
					HT+
				</div>
			</li>
			<li class="landing_link">
				<a target="_blank" href=""><i class="fa fa-star"></i> <span class="nav-label">Dashboard</span> <span class="label label-warning pull-right">NEW</span></a>
			</li>

			<li class="{{ request()->is('user/*') ? 'active' : '' }}">
				<a href="#"><i class="fa fa-users"></i> <span class="nav-label">Thành viên</span><span class="fa arrow"></span></a>
				<ul class="nav nav-second-level collapse">
					<li><a href="">Nhóm thành viên</a></li>
					<li><a href="">Thành viên</a></li>
				</ul>
			</li>
			<li class="landing_link">
					<a target="_blank" href=""><i class="fa fa-star"></i> <span class="nav-label">Xem Website</span> <span class="label label-warning pull-right">NEW</span></a>
				</li>
			</div>
		</nav>
