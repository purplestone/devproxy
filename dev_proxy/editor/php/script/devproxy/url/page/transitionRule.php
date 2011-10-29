<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');

$requery = array(
	'type' => getPost('type'),
);

function requeryHasError() {
	global $requery, $errorMsg;
	
	if(!$requery['type']) {
		return 'type参数 不能为空';
	}

	return null;
	
}

$errorMsg = requeryHasError();

if($errorMsg) {
	echo $errorMsg;
	exit;
}

$iniData = new iniData();

$data = $iniData->getTransitionRule($requery['type']);

$tpl = new Page($data);

$tpl->display('page/transitionRule.tpl');


?>