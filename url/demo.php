<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Trans.php');

$trans = new Trans();

$requery = array(
	'act' => getPost('act'),
	'id' => getPost('id'),
);

///aj/getSetSettingRuleDialog?act=add&src=xxx&target=xxx&able=true&context=test&type=css

function requeryHasError() {
	global $requery, $errorMsg;
	
	if(!$requery['act']) {
		return 'act参数 不能为空';
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
		'src' => $u[1]
	);

	$tpl = new Page($data);

	//var_dump($data);
	//echo $tpl->fetch('lump/ruleDialog.tpl');
	//exit;

}else{
	$errorMsg = $u['msg'];
}



if($errorMsg) {
	$trans->response('100001', null, $errorMsg);
}else{
	$trans->response('100000', $tpl->fetch('lump/svnEditDialog.tpl'), 'ok');
}

?>