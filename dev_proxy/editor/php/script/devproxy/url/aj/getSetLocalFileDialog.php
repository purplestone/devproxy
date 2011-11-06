<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Trans.php');

$trans = new Trans();

$requery = array(
	'path' => getPost('path'),
	'text' => getPost('text', ''),
	'act' => getPost('act', 'edit'),
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




$errorMsg = flowByKey('act', $requery['act'], array('add', 'edit'));

function flow_add() {
	global $trans, $requery;
	$iniData = new iniData();
	$data = array(
		'act' => 'add',
		'path' => $requery['path'],
		'text' => $requery['text'],
		'tempFilePath' => $iniData->fixLocalFilePath($requery['path']),
	);
	$tpl = new Page($data);
	$trans->response(createApiMsg('100000', $tpl->fetch('lump/getSetLocalFileDialog.tpl'), 'ok'));
}


function flow_edit() {
	global $trans, $requery;
	$iniData = new iniData();
	$apiMsg = $iniData->getLocalFile($requery['path']);

	$apiMsg['data']['act'] = 'edit';

	if($apiMsg['code'] == '100000') {
		$data = $apiMsg['data'];
		$data['act'] = 'edit';
		$tpl = new Page($data);
		$apiMsg['data'] = $tpl->fetch('lump/getSetLocalFileDialog.tpl');
	}

	$trans->response($apiMsg);



}


if($errorMsg) {
	$trans->response('100001', null, $errorMsg);
}




?>