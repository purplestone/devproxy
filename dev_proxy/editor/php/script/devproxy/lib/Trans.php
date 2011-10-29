<?php

require_once('config.php');

class Trans {
	function response($code, $data='', $msg='') {
		header('content-type: application/json');
		if(is_string($code)) {
			if(!$data) {
				$data = null;
			}
			if(!$msg) {
				$msg = null;
			}
			$json = array(
				'code' => $code,
				'data' => $data,
				'msg' => $msg
			);
		}else{
			$json = $code;
		}
		echo json_encode($json);
	}

	
}

?>