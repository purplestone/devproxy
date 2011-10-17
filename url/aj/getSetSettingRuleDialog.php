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
	'able' => getPost('able'),
	'src_context' => getPost('src_context'),
	'context' => getPost('context'),
	'src_type' => getPost('src_type'),
	'type' => getPost('type')
);


if(!$requery['act']) {
	$errorMsg = 'act 参数 不能为空';
}

if(isset($errorMsg)) {
	$trans->response('100001', null, $errorMsg);
	exit;
}

///aj/getSetSettingRuleDialog?act=add
///aj/getSetSettingRuleDialog?act=edit&src_context=test&src_type=js&id=1

$errorMsg = flowByKey('act', $requery['act'], array('add', 'edit'));

function flow_add() {
	global $trans, $requery;
	$data = array(
		'act' => 'add',
		'src_context' => $requery['src_context'],
		'src_type' => $requery['src_type'],
	);
	$tpl = new Page($data);echo $tpl->fetch('lump/settingDialog.tpl');
	$trans->response('100000', $tpl->fetch('lump/settingDialog.tpl'), 'ok');
}

function flow_edit() {
	global $trans, $requery;

	$iniData = new iniData();
	$apiMsg = $iniData->getSettingRule($requery['src_context'], $requery['src_type'], $requery['id']);

	if($apiMsg['code'] == '100000') {

		$u = $apiMsg['data'];
		$data = array(
			'src' => $u['src'],
			'target' => $u['target'],
			'src_context' => $requery['src_context'],
			'src_type' => $requery['src_type'],
			'able' => $u['able'],
			'act' => $requery['act'],
			'id' => $requery['id']
		);

		$tpl = new Page($data);echo $tpl->fetch('lump/settingDialog.tpl');
		$trans->response('100000', $tpl->fetch('lump/settingDialog.tpl'), 'ok');

	}else{
		$trans->response($apiMsg);
	}

}

if($errorMsg) {
	$trans->response('100001', null, $errorMsg);
}

?>