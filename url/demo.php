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
	$errorMsg = 'act参数 不能为空';
}

if(isset($errorMsg)) {
	$trans->response('100001', null, $errorMsg);
	exit;
}


///aj/getSetRuleDialog?table=ex&act=edit&id=1

$errorMsg = flowByKey('act', $requery['act'], array('add', 'edit'));


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
	$u = $iniData->getRule($requery['table'], $requery['id']);

	if($u['code'] == '100000') {

		$u = $u['data'];
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
		$trans->response($u);
	}

}









?>