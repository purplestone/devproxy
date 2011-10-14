<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Trans.php');


$act = getPost('act');
$id = getPost('id');
$table = getPost('table');
$src = getPost('src');
$target = getPost('target');
$able = getPost('able');


$trans = new Trans();

$iniData = new iniData();

///aj/setRule?table=ex&act=edit&id=1&src=xxxxx&target=xxx&able=1
///aj/setRule?table=ex&act=add
///aj/setRule?table=ex&act=del&id=1

if($act == 'add') {
	$r = $iniData->addRule($table, $src, $target, $able);
}elseif($act == 'edit') {
	$r = $iniData->setRule($table, $id, $src, $target, $able);
}elseif($act == 'del') {
	$r = $iniData->delRule($table, $id);
}


if($r['code'] == '100000') {
	$r = null;
}

	//echo '<pre>'.htmlspecialchars($tpl->fetch('lump/ruleDialog.tpl')).'</pre>';

	//$errorMsg = false;

if(isset($r)) {
	$trans->response($r['code'], $r['data'], $r['msg']);
}else{
	$trans->response('100000', array($act, $table, $src, $target, $able, $id), 'ok');
}


?>