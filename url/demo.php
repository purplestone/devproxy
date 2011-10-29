<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Trans.php');

$trans = new Trans();

$requery = array(
	'act' => getPost('act'),
	'hasAble' => getPost('hasAble', true),
);

if(!$requery['act']) {
	$errorMsg = 'act 参数 不能为空';
}

if(isset($errorMsg)) {
	$trans->response('100001', null, $errorMsg);
	exit;
}


///aj/getSetRuleDialog?table=ex&act=edit&id=1

$errorMsg = flowByKey('act', $requery['act'], array('add', 'edit'));

if($errorMsg) {
	$trans->response('100001', null, $errorMsg);
}

function flow_add() {
	global $trans, $requery;
	$data = array(
		'act' => 'add',
		'table' => $requery['table'],
		'able' => true,
		'hasAble' => true,
	);
	$tpl = new Page($data);
	$trans->response('100000', $tpl->fetch('lump/ruleDialog.tpl'), 'ok');
}

function flow_edit() {
	global $trans, $requery;

	$iniData = new iniData();
	$apiMsg = $iniData->getRule($requery['table'], $requery['id']);

	if($apiMsg['code'] == '100000') {

		$u = $$apiMsg['data'];
		$data = array(
			'src' => $u[1],
			'target' => $u[2],
			'able' => $u[3],

			'table' => $requery['table'],
			'act' => $requery['act'],
			'hasAble' => $requery['hasAble'],
			'id' => $requery['id']
		);

		$tpl = new Page($data);
		$trans->response('100000', $tpl->fetch('lump/ruleDialog.tpl'), 'ok');

	}else{
		$trans->response($apiMsg);
	}

}



if($apiMsg['code'] == '100000') {
	$trans->response('100000', array('type'=>$type, 'able'=>$able), 'ok');
}else{
	$trans->response($u);
}


$apiMsg = createApiMsg('100000', null, 'ok');




?>