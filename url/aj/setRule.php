<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Trans.php');


$trans = new Trans();

$requery = array(
	'act' => getPost('act'),
	'id' => getPost('id'),
	'table' => getPost('table'),
	'src' => getPost('src'),
	'target' => getPost('target'),
	'able' => fixBoolean(getPost('able')),
);

if(!$requery['act']) {
	$errorMsg = 'act参数 不能为空';
}

if(isset($errorMsg)) {
	$trans->response('100001', null, $errorMsg);
	exit;
}



///aj/setRule?table=ex&act=edit&id=1&src=xxxxx&target=xxx&able=1
///aj/setRule?table=ex&act=add&src=xxxxx&target=xxx&able=1
///aj/setRule?table=ex&act=del&id=1

$errorMsg = flowByKey('act', $requery['act'], array('add', 'edit', 'del'));

function flow_add() {
	global $trans, $requery;

	$iniData = new iniData();

	$apiMsg = $iniData->addRule($requery['table'], $requery['src'], $requery['target'], $requery['able']);

	if($apiMsg['code'] === '100000') {
		$data = array(
			'src' => $requery['src'],
			'act' => 'add',
			'target' => $requery['target'],
			'able' => $requery['able'],
			'table' => $requery['table']
		);

		$tpl = new Page(array(
			'exRuleRow' => array(
				'id' => $apiMsg['data']['id'],
				'src' => $requery['src'],
				'target' => $requery['target'],
				'able' => $requery['able']
			)	
		));

		$data['html'] = $tpl->fetch('lump/exRuleRow.tpl');

		$apiMsg['data'] = array_merge($apiMsg['data'], $data);
		
	}

	$trans->response($apiMsg);
}

function flow_edit() {
	global $trans, $requery;

	$iniData = new iniData();

	if($requery['src'] === null || $requery['target'] === null) {
		$apiMsg = $iniData->switchRule($requery['table'], $requery['id'], $requery['able']);
	}else{
		$apiMsg = $iniData->setRule($requery['table'], $requery['id'], $requery['src'], $requery['target'], $requery['able']);
		$apiMsg['data'] = array(
			'src' => $requery['src'],
			'act' => 'edit',
			'target' => $requery['target'],
			'able' => $requery['able'],
			'id' => $requery['id'],
		);
	}


	$trans->response($apiMsg);
}

function flow_del() {
	global $trans, $requery;

	$iniData = new iniData();

	$apiMsg = $iniData->delRule($requery['table'], $requery['id']);

	$trans->response($apiMsg);
}

if($errorMsg) {
	$trans->response('100001', null, $errorMsg);
}

?>