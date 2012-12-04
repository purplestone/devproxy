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
	'able' => fixBoolean(getPost('able')),
	'befile' => fixBoolean(getPost('befile')),
	'src_context' => getPost('src_context'),
	'context' => getPost('context'),
	'src_type' => getPost('src_type'),
	'type' => getPost('type'),
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


	///aj/setSettingRule?act=add&src=xxx&target=xxx&able=true&context=test&type=css
	///aj/setSettingRule?act=edit&src=xxx&target=xxx&able=true&context=test&type=css&src_context=test&src_type=js&id=1
	///aj/setSettingRule?act=edit&src_context=test&src_type=js&able=true&id=1
	///aj/setSettingRule?act=del&context=test&type=css&id=1


$errorMsg = flowByKey('act', $requery['act'], array('add', 'edit', 'del'));

function flow_add() {
	global $trans, $requery;

	$iniData = new iniData();

	$apiMsg = $iniData->addSettingRule($requery['context'], $requery['type'], $requery['src'], $requery['target'], $requery['able'], $requery['befile'], $requery['https'], $requery['host'], $requery['hostType']);

	if($apiMsg['code'] === '100000') {
		//$data = array(
			//'act' => 'add',
			//'src' => $requery['src'],
			//'target' => $requery['target'],
			//'able' => $requery['able'],
			//'isLocalFile' => $requery['befile'],
			//'context' => $requery['context'],
			//'type' => $requery['type'],
		//);

		$apiMsg['data'] = array_merge($apiMsg['data'], array(
			'act' => 'add',
			'id' => $apiMsg['data']['id'],
			'src' => $requery['src'],
			'able' => $requery['able'],
			'isLocalFile' => $requery['befile'],
			'type' => $requery['type'],
			'context' => $requery['context'],
			'https' => $requery['https'],
			'host' => $requery['host'],
			'hostType' => $requery['hostType'],
		));
		if(!isset($apiMsg['data']['target'])) {
			$apiMsg['data']['target'] = $requery['target'];
		}
		$data = array(
			'settingRow' => $apiMsg['data']
		);
		//var_dump($data);

		$tpl = new Page($data);
		$apiMsg['data']['html'] = $tpl->fetch('lump/settingRuleRow.tpl');
		$apiMsg['data']['htmlVar'] = $data;


	}

	$trans->response($apiMsg);
}

function flow_edit() {
	global $trans, $requery;

	$iniData = new iniData();

	if($requery['context'] === null) {
		$requery['context'] = $requery['src_context'];
	}

	if($requery['type'] === null) {
		$requery['type'] = $requery['src_type'];
	}

	if($requery['src'] === null || $requery['target'] === null) {
		$apiMsg = $iniData->switchSettingRule($requery['id'], $requery['src_context'], $requery['src_type'], $requery['able']);
	}else{
		$apiMsg = $iniData->setSettingRule($requery['id'], $requery['src_context'], $requery['src_type'], $requery['context'], $requery['type'], $requery['src'], $requery['target'], $requery['able'], $requery['befile'], $requery['https'], $requery['host'], $requery['hostType']);
	}

	if(!$apiMsg['data']) {
		$apiMsg['data'] = array('id' => $requery['id']);
	}

	$apiMsg['data'] = array_merge($apiMsg['data'], array(
		'src' => $requery['src'],
		'act' => 'edit',
		'able' => $requery['able'],
		'context' => $requery['context'],
		'type' => $requery['type'],
		'isLocalFile' => $requery['befile'],
		'src_id' => $requery['id'],
		'src_context' => $requery['src_context'],
		'src_type' => $requery['src_type'],
		'currentSetting' => $iniData->getCurrentSetting(),
		'https' => $requery['https'],
		'host' => $requery['host'],
		'hostType' => $requery['hostType'],
	));
	if(!isset($apiMsg['data']['target'])) {
		$apiMsg['data']['target'] = $requery['target'];
	}
	$data = array(
		'settingRow' => $apiMsg['data'],
	);
	//var_dump($data);
	$tpl = new Page($data);
	$apiMsg['data']['html'] = $tpl->fetch('lump/settingRuleRow.tpl');
	$apiMsg['data']['htmlVar'] = $data;
	$trans->response($apiMsg);
}

function flow_del() {
	global $trans, $requery;

	$iniData = new iniData();

	$apiMsg = $iniData->delSettingRule($requery['id'], $requery['context'], $requery['type']);

	$trans->response($apiMsg);
}

if($errorMsg) {
	$trans->response('100001', null, $errorMsg);
}

?>
