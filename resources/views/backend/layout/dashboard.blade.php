<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<base href="">
    <title>HT CMS | Dashboard Laravel Version</title>
    <link href="backend/css/bootstrap.min.css" rel="stylesheet">
    <link href="backend/font-awesome/css/font-awesome.css" rel="stylesheet">
    <!-- Toastr style -->
    <link href="backend/css/plugins/toastr/toastr.min.css" rel="stylesheet">
    <!-- Gritter -->
    <link href="backend/js/plugins/gritter/jquery.gritter.css" rel="stylesheet">
    <link href="backend/css/animate.css" rel="stylesheet">
	<link href="backend/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
	<link href="backend/css/plugins/iCheck/custom.css" rel="stylesheet">
	<link href="backend/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
	<link href="plugin/jquery-ui.css" rel="stylesheet">

	<link rel="stylesheet" type="text/css" href="plugin/blueimp/css/blueimp-gallery.min.css">
	<link rel="stylesheet" type="text/css" href="plugin/clockpicker/dist/bootstrap-clockpicker.min.css">
    <link href="backend/css/plugins/colorpicker/bootstrap-colorpicker.min.css" rel="stylesheet">
	<link href="plugin/select2/dist/css/select2.min.css" rel="stylesheet" />

    <link href="plugin/rating/SimpleStarRating.css" rel="stylesheet">
    <link href="backend/css/animate.css" rel="stylesheet">
    <link href="backend/css/style.css" rel="stylesheet">
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link href="backend/css/customize.css" rel="stylesheet">



	<script src="plugin/jquery-3.3.1.min.js"></script>
	<script src="plugin/jquery.timeago.js"></script>
	<script src="plugin/ckeditor/ckeditor.js" charset="utf-8"></script>
</head>

<body>
    <div id="wrapper">
        <!-- LOAD SIDEBAR -->
        @include('backend.common.sidebar', ['some' => 'data'])
        <!-- -->
        <!-- LOAD MAIN BODY -->
        @yield('content')
        <!-- ./ -->


    </div>

     <!-- GENERAL SCRIPT -->
	<script src="backend/js/plugins/iCheck/icheck.min.js"></script>

	<script src="plugin/rating/SimpleStarRating.js"></script>
    <script src="backend/js/bootstrap.min.js"></script>
    <script src="backend/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="backend/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
	<script src="backend/js/plugins/nestable/jquery.nestable.js"></script>
    <script src="backend/js/inspinia.js"></script>
    <script src="backend/js/plugins/pace/pace.min.js"></script>
	<script src="backend/js/plugins/toastr/toastr.min.js"></script>
	<script src="backend/js/plugins/sweetalert/sweetalert.min.js"></script>
	<script src="backend/js/plugins/tinycon/tinycon.min.js"></script>
	<script src="plugin/select2/dist/js/select2.min.js"></script>
	<script src="backend/js/plugins/datapicker/bootstrap-datepicker.js"></script>


	<script src="backend/library/editor.js"></script>
	<script src="plugin/jquery-ui.js"></script>
	<script type="text/javascript" src="plugin/clockpicker/dist/bootstrap-clockpicker.min.js"></script>
	<script src="backend/js/plugins/colorpicker/bootstrap-colorpicker.min.js"></script>
	<script src="backend/js/plugins/clockpicker/clockpicker.js"></script>


	 <!-- jquery UI -->
    <script src="backend/js/plugins/jquery-ui/jquery-ui.min.js"></script>
    <script src="backend/js/plugins/touchpunch/jquery.ui.touch-punch.min.js"></script>


    <script src="backend/js/plugins/flot/jquery.flot.js"></script>
    <script src="backend/js/plugins/flot/jquery.flot.tooltip.min.js"></script>
    <script src="backend/js/plugins/flot/jquery.flot.spline.js"></script>
    <script src="backend/js/plugins/flot/jquery.flot.resize.js"></script>
    <script src="backend/js/plugins/flot/jquery.flot.pie.js"></script>
    <script src="backend/js/plugins/peity/jquery.peity.min.js"></script>
    <script src="backend/js/demo/peity-demo.js"></script>
    <script src="backend/js/plugins/gritter/jquery.gritter.min.js"></script>
    <script src="backend/js/plugins/sparkline/jquery.sparkline.min.js"></script>
    <script src="backend/js/plugins/chartJs/Chart.min.js"></script>
    <script src="backend/js/plugins/flot/jquery.flot.js"></script>
    <script src="backend/js/plugins/flot/jquery.flot.tooltip.min.js"></script>
    <script src="backend/js/plugins/flot/jquery.flot.spline.js"></script>
    <script src="backend/js/plugins/flot/jquery.flot.resize.js"></script>
    <script src="backend/js/plugins/flot/jquery.flot.pie.js"></script>
    <script src="backend/js/plugins/flot/jquery.flot.symbol.js"></script>
    <script src="backend/js/plugins/flot/jquery.flot.time.js"></script>
    <script src="backend/js/plugins/easypiechart/jquery.easypiechart.js"></script>
	<script type="text/javascript" src="plugin/blueimp/jquery.blueimp-gallery.min.js"></script>
	<script src="backend/library/function.js"></script>
</body>
</html>
