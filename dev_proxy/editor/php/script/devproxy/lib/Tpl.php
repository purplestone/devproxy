<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/php/libs/Smarty_3_1_0/libs/Smarty.class_.php');


class Tpl extends Smarty {

	public function __construct (){

		parent::__construct();
		$this->__set('compile_dir', $_SERVER['DOCUMENT_ROOT'] . "/php/script/devproxy/tplcompile/");
		$this->__set('cache_dir', $_SERVER['DOCUMENT_ROOT'] . "/php/script/devproxy/tplcache/");
		$this->__set('template_dir', $_SERVER['DOCUMENT_ROOT'] . "/php/script/devproxy/tpls/");

		//$this->debugging = true;
		
		$this->left_delimiter = "{% ";
		$this->right_delimiter = " %}";

	}

}


?>