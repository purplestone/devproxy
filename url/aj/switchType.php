<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Trans.php');

$trans = new Trans();

$requery = array(
	'type' => getPost('type'),
	'able' => getPost('able'),
);

if(!$requery['type']) {
	$errorMsg = 'type 参数 不能为空';
}

if(!$requery['able']) {
	$errorMsg = 'able 参数 不能为空';
}

if(isset($errorMsg)) {
	$trans->response('100001', null, $errorMsg);
	exit;
}

///aj/switchType?type=css&able=true

$iniData = new iniData();

$apiMsg = $iniData->switchType($requery['type'], $requery['able']);

if($apiMsg['code'] == '100000') {
	$trans->response('100000', array('type'=>$requery['type'], 'able'=>$requery['able']), 'ok');
}else{
	$trans->response($apiMsg);
}

?>