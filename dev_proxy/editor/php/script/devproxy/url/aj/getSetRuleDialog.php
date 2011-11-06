<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Trans.php');

$trans = new Trans();

$requery = array(
	'act' => getPost('act'),
	'id' => getPost('id'),
	'src' => getPost('src'),
	'target' => getPost('target'),
	'table' => getPost('table'),
	'hasAble' => getPost('hasAble', true),
);

if(!$requery['table']) {
	$errorMsg = 'table参数 不能为空';
}

if(isset($errorMsg)) {
	$trans->response('100001', null, $errorMsg);
	exit;
}


///aj/getSetRuleDialog?table=ex&act=edit&id=1
///aj/getSetRuleDialog?table=transition_css_url&act=edit&id=0&hasAble=fasle
///aj/getSetRuleDialog?table=ex&act=add&hasAble=true

$errorMsg = flowByKey('act', $requery['act'], array('add', 'edit'));

if($errorMsg) {
	$trans->response('100001', null, $errorMsg);
}


function flow_add() {
	global $trans, $requery;
	$data = array(
		'act' => 'add',
		'src' => $requery['src'],
		'target' => $requery['target'],
		'table' => $requery['table'],
		'able' => true,
		'hasAble' => true,
		'islocalFile' => false,
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
			'src' => $u['src'],
			'target' => $u['target'],
			'able' => fixBoolean($u['able']),
			'isLocalFile' => fixBoolean($u['isLocalFile']),

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