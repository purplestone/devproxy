<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Trans.php');

$trans = new Trans();

$requery = array(
	'type' => getPost('type'),
	'context' => getPost('context'),
);

if(!$requery['type']) {
	$errorMsg = 'type参数 不能为空';
}

if(!$requery['context']) {
	$errorMsg = 'context参数 不能为空';
}

if(isset($errorMsg)) {
	$trans->response('100001', null, $errorMsg);
	exit;
}

///aj/selContextOfType?type=css&context=test

$iniData = new iniData();

$apiMsg = $iniData->setContextOfType($requery['type'], $requery['context']);

if($apiMsg['code'] == '100000') {
	$trans->response('100000', array(
		'type'=>$requery['type'],
		'context'=>$requery['context']
	), 'ok');
}else{
	$trans->response($apiMsg);
}



?>