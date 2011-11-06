<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Trans.php');

$trans = new Trans();

$requery = array(
	'path' => getPost('path'),
	'text' => getPost('text'),
	'act' => getPost('act'),
);

if(!$requery['act']) {
	$errorMsg = 'act 参数 不能为空';
}

if(!$requery['path']) {
	$errorMsg = 'path 参数 不能为空';
}


if(isset($errorMsg)) {
	$trans->response('100001', null, $errorMsg);
	exit;
}



///aj/setLocalFileContent?act=add&path=/test.txt&text=xxxxxxxxxxxxxx
///aj/setLocalFileContent?act=edit&path=/test.txt&text=xxxxxxxxxxxxxx

$errorMsg = flowByKey('act', $requery['act'], array('add', 'edit'));

function flow_add() {
	global $trans, $requery;
	$iniData = new iniData();
	$apiMsg = $iniData->addLocalFile($requery['path'], $requery['text']);
	$trans->response($apiMsg);
}


function flow_edit() {
	global $trans, $requery;
	$iniData = new iniData();
	$apiMsg = $iniData->setLocalFile($requery['path'], $requery['text']);
	$trans->response($apiMsg);
}


if($errorMsg) {
	$trans->response('100001', null, $errorMsg);
}






?>