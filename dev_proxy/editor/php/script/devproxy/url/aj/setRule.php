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
	'befile' => fixBoolean(getPost('befile')),
	'https' => fixBoolean(getPost('behttps')),
	'host' => getPost('host'),
	'hostType' => getPost('theHostType'),
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

	$apiMsg = $iniData->addRule($requery['table'], $requery['src'], $requery['target'], $requery['able'], $requery['befile'], $requery['https'], $requery['host'], $requery['hostType']);

	if($apiMsg['code'] === '100000') {
		$apiMsg['data'] =array_merge( array(
			'src' => $requery['src'],
			'act' => 'add',
			'able' => $requery['able'],
			'isLocalFile' => $requery['befile'],
			'table' => $requery['table'],
			'https' => $requery['https'],
			'host' => $requery['host'],
			'hostType' => $requery['hostType'],
		), $apiMsg['data']);
		if(!isset($apiMsg['data']['target'])) {
			$apiMsg['data']['target'] = $requery['target'];
		}
		$tpl = new Page(array(
			'exRuleRow' => $apiMsg['data']
		));

		$apiMsg['data']['html'] = $tpl->fetch('lump/exRuleRow.tpl');

		
	}

	$trans->response($apiMsg);
}

function flow_edit() {
	global $trans, $requery;

	$iniData = new iniData();

	if($requery['src'] === null || $requery['target'] === null) {
		$apiMsg = $iniData->switchRule($requery['table'], $requery['id'], $requery['able']);
	}else{
		$apiMsg = $iniData->setRule($requery['table'], $requery['id'], $requery['src'], $requery['target'], $requery['able'], $requery['befile'], $requery['https'], $requery['host'], $requery['hostType']);
		$apiMsg['data'] = array_merge($apiMsg['data'], array(
			'src' => $requery['src'],
			'act' => 'edit',
			'able' => $requery['able'],
			'isLocalFile' => $requery['befile'],
			'id' => $requery['id'],
			'https' => $requery['https'],
			'host' => $requery['host'],
			'hostType' => $requery['hostType'],
		));
		if(!isset($apiMsg['data']['target'])) {
			$apiMsg['data']['target'] = $requery['target'];
		}
		if($apiMsg['code'] == 100000) {
			$htmlVar = array(
				'exRuleRow' => $apiMsg['data']
			);
			$tpl = new Page($htmlVar);
			$apiMsg['data']['html'] = $tpl->fetch('lump/exRuleRow.tpl');
			$apiMsg['data']['htmlVar'] = $htmlVar;
		}
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