<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Trans.php');

$trans = new Trans();

$requery = array(
	'path' => getPost('path'),
);

if(!$requery['path']) {
	$errorMsg = 'path 参数 不能为空';
}


if(isset($errorMsg)) {
	$trans->response('100001', null, $errorMsg);
	exit;
}


if(!$requery['path']) {
	$errorMsg = 'path 参数 不能为空';
}


if(isset($errorMsg)) {
	$trans->response('100001', null, $errorMsg);
	exit;
}



$iniData = new iniData();
$apiMsg = $iniData->getLocalFile($requery['path']);

if($apiMsg['code'] == '100000') {
	$data = $apiMsg['data'];
	$data['act'] = 'edit';
	$tpl = new Page($data);
	$apiMsg['data'] = $tpl->fetch('lump/getSetLocalFileDialog.tpl');
}

$trans->response($apiMsg);





?>