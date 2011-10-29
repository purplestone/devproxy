<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/api/iniData.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/php/script/devproxy/lib/Page.php');

$type = $_GET['type'];

$iniData = new iniData();

$data = array('listFile'=>$iniData->getCommonFile($type));

$tpl = new Page($data);

$tpl->display('page/commonFile.tpl');




?>