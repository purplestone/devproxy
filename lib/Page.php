<?php

require_once('config.php');
require_once('Tpl.php');


class Page extends Tpl{

	private $data;

	function __construct($data) {
		if(!$data) {
			$data = array();
		}
		//$this->display($data, $sTplPath);
		parent::__construct();
		$this->data = $data;
		foreach ($this->data as $key=>$unit) {
			$this->assign($key, $unit);
		}
	}

}

?>