<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Trans.php');

$trans = new Trans();


$requery = array(
	'type' => getPost('type')
);


if(!$requery['type']) {
	$errorMsg = 'type参数 不能为空';
}

if(isset($errorMsg)) {
	$trans->response('100001', null, $errorMsg);
	exit;
}

///aj/getSetSvnCmdDialog?type=css

$iniData = new iniData();
$apiMsg = $iniData->getSvnUpCmd($requery['type']);
if($apiMsg['code'] == '100000') {
	$data = array(
		'cmd' => $apiMsg['data'],
		'type' => $requery['type']
	);
	$tpl = new Page($data);
	$trans->response('100000', $tpl->fetch('lump/svnEditDialog.tpl'), 'ok');
}else{
	$trans->response($apiMsg);
}

?>