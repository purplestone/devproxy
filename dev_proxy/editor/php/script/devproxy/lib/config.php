<?php

$sIniPath = $_SERVER['HTTP_DEVPROXY_INI']; 
if(!$sIniPath) {
	$msg = '请开启调试代理程序，并开启浏览器代理。';
	if($_REQUEST['_t'] === '0') {
		echo '{"code":"100001","data":null,"msg":"' . $msg . '"}';
	}else{
		echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' . $msg;
	}

	exit;
}

$postToGet = true;
$debugger = true;

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/libs/fun.php');

?>