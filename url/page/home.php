<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');


$iniData = new iniData();

$data = array(
	'exRule' => $iniData->getExRule(),
	'currentContext' => $iniData->getCurrentSettingRule(),
	'currentIni' =>$iniData->getCurrentIni()
);

//var_dump($data['currentContext']);
$tpl = new Page($data);

$tpl->display('page/home.tpl');


?>