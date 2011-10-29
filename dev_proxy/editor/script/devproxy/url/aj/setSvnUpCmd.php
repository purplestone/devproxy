<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Trans.php');

$trans = new Trans();

$requery = array(
	'type' => getPost('type'),
	'cmd' => getPost('cmd', ''),
);

if(!$requery['type']) {
	$errorMsg = 'type 参数 不能为空';
}

if(isset($errorMsg)) {
	$trans->response('100001', null, $errorMsg);
	exit;
}


$iniData = new iniData();

$apiMsg = $iniData->setSvnUpCmd($requery['type'], $requery['cmd']);

$trans->response($apiMsg);

?>