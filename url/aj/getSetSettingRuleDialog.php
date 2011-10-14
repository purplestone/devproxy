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

///aj/getSetSettingRuleDialog?act=add&src=xxx&target=xxx&able=true&context=test&type=css
///aj/getSetSettingRuleDialog?act=edit&src=xxx&target=xxx&able=true&context=test&type=css&src_context=test&src_type=js&id=1
///aj/getSetSettingRuleDialog?act=del&context=test&type=css&id=1

function requeryHasError() {
	global $requery, $errorMsg;
	
	if($requery['act'] != 'add' && $requery['act'] != 'edit' && $requery['act'] != 'del') {
		return 'act参数 必须为 add | edit | del';
	}

	if(!$requery['context']) {
		return 'table参数 不能为空';
	}

	if(!$requery['context']) {
		return 'context参数 不能为空';
	}

	if(!$requery['type']) {
		return 'type参数 不能为空';
	}

	if($requery['act'] == 'add' && $requery['id'] === null) {
		return 'id参数 不能为空';
	}

	if($requery['act'] == 'edit' && $requery['able'] === null && $requery['context'] === null && $requery['type'] === null && $requery['able'] === null) {
		return 'hasAble参数 不能为空';
	}

	return null;
	
}

$errorMsg = requeryHasError();

if($errorMsg) {
	$trans->response('100001', null, $errorMsg);
	exit;
}



$iniData = new iniData();

$u = $iniData->getSettingRule($context, $type, $id);

if($u['code'] == '100000') {

	$u = $u['data'];
	$data = array(
		'src' => $u[1],
		'target' => $u[2],
		'able' => $u[3],

		'table' => $table,
		'act' => $act,
		'hasAble' => $hasAble,
		'id' => $id
	);

	$tpl = new Page($data);

	//var_dump($data);
	//echo $tpl->fetch('lump/ruleDialog.tpl');
	//exit;


}else{
	$errorMsg = $u['msg'];
}


$tpl = new Page($data);

if($errorMsg) {
	$trans->response('100001', null, $errorMsg);
}else{
	$trans->response('100000', $tpl->fetch('lump/svnEditDialog.tpl'), 'ok');
}

?>