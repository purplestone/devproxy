<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');


$iniData = new iniData();

$iniPathApiMsg = $iniData->getIniPath();

$data = array(
	'currentIni' =>$iniData->getCurrentIni(),
	'exRule' => $iniData->getExRule(),
	'currentContext' => $iniData->getCurrentSettingRule(),
	'iniPath' => $iniPathApiMsg['data'],
);


$tpl = new Page($data);

$tpl->display('page/home.tpl');

?>