<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Trans.php');

$type = $_REQUEST['type'];
$able = $_REQUEST['able'];
//$type = $_POST['type'];
//$context = $_POST['context'];

$trans = new Trans();

$iniData = new iniData();

$errorMsg = $iniData->switchType($type, $able);

if($errorMsg) {
	$trans->response('100001', null, $errorMsg);
}else{
	$trans->response('100000', array('type'=>$type, 'able'=>$able), 'ok');
}

?>