<?php

$sIniPath = $_SERVER['HTTP_DEVPROXY_INI']; 
if(!$sIniPath) {
	echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />请开启调试代理程序，并开启浏览器代理。';
	exit;
}

$postToGet = true;

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/libs/fun.php');

?>