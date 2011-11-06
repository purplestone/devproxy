<?php

/*
	global $debugger;
	if($debugger) {
		try {throw new Exception('test file_xxx');}catch (Exception $e) {
		   $sErrorMsg = $e->getMessage() . ' ' . $e->getLine();
		}
	}
*/


function getPost($key, $default=null) {
	global $postToGet;
	if($postToGet) {
		if(isset($_REQUEST[$key])) {
			return $_REQUEST[$key];
		}elseif(isset($default)){
			return $default;
		}
	}else{
		if(isset($_POST[$key])) {
			return $_POST[$key];
		}elseif(isset($default)){
			return $default;
		}
	}
	return null;
}

function &getRowById(&$arr, $id, $position=0) {
	global $o;
	foreach ($arr as &$u) {
		if($u[$position] == $id) {
			return $u;
		}
	}
	return null;
}


function flowByKey($key, $value, $flowList) {
	if($value && in_array($value, $flowList)) {
		$fun = 'flow_'.$value;
		$fun();
		$r = null;
	}else{
		$r = $key . ' 参数 必须为 ' . join(' | ', $flowList);
	}
	return $r;
}


function createApiMsg($code, $data, $msg) {
	$aj = array(
		'code' => $code,	
		'data' => $data,	
		'msg' => $msg
	);
	return $aj;
}


function eachValue(&$v, $fun=null) {
	foreach ($v as $key => &$u) {
		if(is_array($u) || is_object($u)) {
			eachValue($u, $fun);
		}else{
			if($fun) {
				$u = $fun($u);
			}
		}
	}
	//var_dump($v);
	return $v;
}

function fixBoolean($b) {
	if(strtolower($b) == 'false' || $b == '0' || !$b) {
		$b = false;
	}else{
		$b = true;
	}

	return $b;
}

function delPathFirstSlashes($path) {
	return preg_replace('/[\\\\\\/]*(.+)/', '$1', $path);
}

function addPathRootSlashes($path) {
	return preg_replace('/[\\\\\\/]*(.+)/', '/$1', $path);
}


?>