<?php


class iniData {

	public $oIni;

	function __construct() {
		global $sIniPath;
		$this->sIniPath = $sIniPath;
		$sIni = file_get_contents($this->sIniPath);
		$this->oIni = json_decode($sIni);
	}

	public function getIniPath() {
		//$this->sIniPath = preg_replace ('/\\\\/e', '\\\\', $this->sIniPath);
		//$this->sIniPath = preg_replace ('/\\\\/e', '\/', $this->sIniPath);
		//var_dump($this->sIniPath);
		return $apiMsg = createApiMsg('100000', $this->sIniPath, 'ok');
	}
	

	public function getCommonFile($type="_") {
		if(!$type) {
			$type = "_";
		}
		return $this->oIni->condition->local->filePath->$type->table;
	}

	public function getAllSetting() {
		$data = array();
		foreach ($this->oIni->condition->local->setting as $type=>$listByType) {
			foreach ($listByType->table as $unit) {
				$data[] = array(
					'id' => $unit[0],
					'src' => $unit[1],
					'target' => $unit[2],
					'context' => 'local',
					'type' => $type,
					'able' => $unit[3],
					'isLocalFile' => $unit[4],
				);
			}
		}
		foreach ($this->oIni->condition->test->setting as $type=>$listByType) {
			foreach ($listByType->table as $unit) {
				$data[] = array(
					'id' => $unit[0],
					'src' => $unit[1],
					'target' => $unit[2],
					'context' => 'test',
					'type' => $type,
					'able' => $unit[3],
					'isLocalFile' => $unit[4],
				);
			}
		}
		return $data;
	}
	
	public function getAllRule($table) {
		switch($table) {
			case 'ex':
				$data = $this->oIni->ex->table;
				break;
			case 'transition_css_url':
				$data = $this->oIni->condition->local->transitionRule->css->urlToLocal->table;
				break;
			case 'transition_css_local':
				$data = $this->oIni->condition->local->transitionRule->css->localToFile->table;
				break;
			case 'transition_js_url':
				$data = $this->oIni->condition->local->transitionRule->js->urlToLocal->table;
				break;
			case 'transition_js_local':
				$data = $this->oIni->condition->local->transitionRule->js->localToFile->table;
				break;
			case 'transition_aj_url':
				$data = $this->oIni->condition->local->transitionRule->aj->urlToLocal->table;
				break;
			case 'transition_aj_local':
				$data = $this->oIni->condition->local->transitionRule->aj->localToFile->table;
				break;
			case 'transition_html_url':
				$data = $this->oIni->condition->local->transitionRule->html->urlToLocal->table;
				break;
			case 'transition_html_local':
				$data = $this->oIni->condition->local->transitionRule->html->localToFile->table;
				break;
			case 'transition_other_url':
				$data = $this->oIni->condition->local->transitionRule->other->urlToLocal->table;
				break;
			case 'transition_other_local':
				$data = $this->oIni->condition->local->transitionRule->other->localToFile->table;
				break;
			default:
				$r = array(
					'code' => '100001',	
					'data' => null,	
					'msg' => '要查询的表'.$table.'不存在'
				);
		}

		if(!isset($r)) {
			$r = array(
				'code' => '100000',	
				'data' => $data,	
				'msg' => ''
			);
		}
		return $r;
	}
	
	public function getRule($table, $id) {
		if(!$id && $id !== '0') {
			$apiMsg = createApiMsg('100001', null, 'id无效');
		}else{
			$list = $this->getAllRule($table);
			if($list['code'] == '100000') {
				$apiMsg = createApiMsg('100001', null, '在'.$table.'中没有查询到id为'.$id.'的条目');
				//$list = $list['data'];
				foreach ($list['data'] as $u) {
					if($u[0] == $id) {
						$apiMsg = createApiMsg('100000', array(
							'src' => $u[1],
							'target' => $u[2],
							'able' => $u[3],
							'isLocalFile' => $u[4],
							'https' => $u[5],
							'host' => $u[6],
							'hostType' => $u[7],
						), '');
						break;
					}
				}
			}
		}
		return $apiMsg;
	}

	public function getSvnUpCmd($type) {
		if($type != 'css' && $type != 'js') {
			$apiMsg = createApiMsg('100001', null, 'type 必须为 css | js');
		}else{
			$data = $this->oIni->condition->local->svn->$type;
			$apiMsg = createApiMsg('100000', $data, 'ok');
		}
		
		return $apiMsg;
	}
	
	public function getExRule() {
		$data = $this->getAllRule('ex');
		$data = $data['data'];
		foreach ($data as &$u) {
			$u = array(
				'id' => $u[0],
				'src' => $u[1],
				'target' => $u[2],
				'able' => $u[3],
				'isLocalFile' => $u[4],
			);
		}
		return $data;
	}


	public function getCurrentSetting() {
		$data = $this->oIni->currentIni;
		foreach ($data as $type=>$unit) {
			if(!$data->$type->able) {
				unset($data->$type);
			}else{
				$data->$type = $data->$type->context;
			}
		}
		return $data;
	}


	public function getCurrentSettingRule() {
		$data = array();
		foreach ($this->oIni->currentIni as $type=>$unit) {
			if($unit->able) {
				$context = $unit->context;
				$settingUnit = $this->oIni->condition->$context->setting->$type->table;
				foreach ($settingUnit as $rule) {
					//array_push($rule, $type, $context);
					$data[] = array(
						'id' => $rule[0],
						'src' => $rule[1],
						'target' => $rule[2],
						'type' => $type,
						'context' => $context,
						'able' => $rule[3],
						'isLocalFile' => $rule[4],
					);
				}
			}
		}
		return $data;
	}

	public function getCurrentIni() {
		$data = $this->oIni->currentIni;
		return $data;
	}
	
	public function switchType($type, $able) {

		if(!isset($apiMsg)) {
			$apiMsg = $this->checkTypeInput($type);
		}

		if(!isset($apiMsg)) {
			$able = $this->fixAble($able);
			$this->oIni->currentIni->$type->able = $able;
			$this->saveIni();
			$apiMsg = createApiMsg('100000', null, 'ok');
		}

		return $apiMsg;

	}

	public function switchExRule($src, $able) {
		$able = $this->fixAble($able);
		$table = $this->oIni->ex->table;
		foreach ($table as $index=>$exRule) {
			if($table[$index][0] == $src) {
				$table[$index][2] = $able;
				break;
			}
		}
		$this->saveIni();
	}

	public function addRule($table, $src, $target, $able, $isLocalFile, $isHttps, $host, $hostType) {
		switch($table) {
			case 'ex':
				$data = $this->oIni->ex;
				break;
			case 'transition_css_url':
				$data = $this->oIni->condition->local->transitionRule->css->urlToLocal;
				break;
			case 'transition_css_local':
				$data = $this->oIni->condition->local->transitionRule->css->localToFile;
				break;
			case 'transition_js_url':
				$data = $this->oIni->condition->local->transitionRule->js->urlToLocal;
				break;
			case 'transition_js_local':
				$data = $this->oIni->condition->local->transitionRule->js->localToFile;
				break;
			case 'transition_aj_url':
				$data = $this->oIni->condition->local->transitionRule->aj->urlToLocal;
				break;
			case 'transition_aj_local':
				$data = $this->oIni->condition->local->transitionRule->aj->localToFile;
				break;
			case 'transition_html_url':
				$data = $this->oIni->condition->local->transitionRule->html->urlToLocal;
				break;
			case 'transition_html_local':
				$data = $this->oIni->condition->local->transitionRule->html->localToFile;
				break;
			case 'transition_other_url':
				$data = $this->oIni->condition->local->transitionRule->other->urlToLocal;
				break;
			case 'transition_other_local':
				$data = $this->oIni->condition->local->transitionRule->other->localToFile;
				break;
			default:
				$apiMsg = createApiMsg('100001', null, '要查询的表'.$table.'不存在');
		}

		if($isLocalFile) {
			$target = preg_replace('/^[\\\\\\\\\\/]*(.+)/', '/$1', $target);
		}
		if(!isset($apiMsg)) {
			$data->counter++;
			$rowData = array($data->counter, $src, $target, !!$able, !!$isLocalFile, !!$isHttps, $host, $hostType);
			$data->table[] = $rowData;

			$apiMsg = createApiMsg('100000', array(
				'id' => $data->counter,
				'target' => $target,
			), 'ok');
			$this->saveIni();
		}

		return $apiMsg;
	}
	

	public function delRule($table, $id) {
		switch($table) {
			case 'ex':
				$data = &$this->oIni->ex->table;
				break;
			case 'transition_css_url':
				$data = &$this->oIni->condition->local->transitionRule->css->urlToLocal->table;
				break;
			case 'transition_css_local':
				$data = &$this->oIni->condition->local->transitionRule->css->localToFile->table;
				break;
			case 'transition_js_url':
				$data = &$this->oIni->condition->local->transitionRule->js->urlToLocal->table;
				break;
			case 'transition_js_local':
				$data = &$this->oIni->condition->local->transitionRule->js->localToFile->table;
				break;
			case 'transition_aj_url':
				$data = &$this->oIni->condition->local->transitionRule->aj->urlToLocal->table;
				break;
			case 'transition_aj_local':
				$data = &$this->oIni->condition->local->transitionRule->aj->localToFile->table;
				break;
			case 'transition_html_url':
				$data = &$this->oIni->condition->local->transitionRule->html->urlToLocal->table;
				break;
			case 'transition_html_local':
				$data = &$this->oIni->condition->local->transitionRule->html->localToFile->table;
				break;
			case 'transition_other_url':
				$data = &$this->oIni->condition->local->transitionRule->other->urlToLocal->table;
				break;
			case 'transition_other_local':
				$data = &$this->oIni->condition->local->transitionRule->other->localToFile->table;
				break;
			default:
				$apiMsg = createApiMsg('100001', null, '要查询的表'.$table.'不存在');
		}

		if(!isset($apiMsg)) {

			$u = &getRowById($data, $id);
			if($u !== null) {
				array_splice($data, array_search($u, $data), 1);
				$apiMsg = createApiMsg('100000', null, 'ok');
				$this->saveIni();
			}else{
				$apiMsg = createApiMsg('100001', null, '在'.$table.'中没有查询到id为'.$id.'的条目');
			}

		}

		return $apiMsg;
	}


	public function setRule($table, $id, $src, $target, $able, $isLocalFile, $isHttps, $host, $hostType) {
		switch($table) {
			case 'ex':
				$data = &$this->oIni->ex->table;
				break;
			case 'transition_css_url':
				$data = &$this->oIni->condition->local->transitionRule->css->urlToLocal->table;
				break;
			case 'transition_css_local':
				$data = &$this->oIni->condition->local->transitionRule->css->localToFile->table;
				break;
			case 'transition_js_url':
				$data = &$this->oIni->condition->local->transitionRule->js->urlToLocal->table;
				break;
			case 'transition_js_local':
				$data = &$this->oIni->condition->local->transitionRule->js->localToFile->table;
				break;
			case 'transition_aj_url':
				$data = &$this->oIni->condition->local->transitionRule->aj->urlToLocal->table;
				break;
			case 'transition_aj_local':
				$data = &$this->oIni->condition->local->transitionRule->aj->localToFile->table;
				break;
			case 'transition_html_url':
				$data = &$this->oIni->condition->local->transitionRule->html->urlToLocal->table;
				break;
			case 'transition_html_local':
				$data = &$this->oIni->condition->local->transitionRule->html->localToFile->table;
				break;
			case 'transition_other_url':
				$data = &$this->oIni->condition->local->transitionRule->other->urlToLocal->table;
				break;
			case 'transition_other_local':
				$data = &$this->oIni->condition->local->transitionRule->other->localToFile->table;
				break;
			default:
				$apiMsg = createApiMsg('100001', null, '要查询的表'.$table.'不存在');
		}

		if($isLocalFile) {
			$target = preg_replace('/^[\\\\\\\\\\/]*(.+)/', '/$1', $target);
		}
		if(!isset($apiMsg)) {
			$u = &getRowById($data, $id);

			if($u !== null) {
				$u[1] = $src;
				$u[2] = $target;
				$u[3] = $able;
				$u[4] = $isLocalFile;
				$u[5] = $isHttps;
				$u[6] = $host;
				$u[7] = $hostType;
				$apiMsg = createApiMsg('100000', array('target' => $target), 'ok');
				$this->saveIni();
			}else{
				$apiMsg = createApiMsg('100001', null, '在'.$table.'中没有查询到id为'.$id.'的条目');
			}
		}

		return $apiMsg;
	}


	public function switchRule($table, $id, $able) {
		switch($table) {
			case 'ex':
				$data = &$this->oIni->ex->table;
				break;
			case 'transition_css_url':
				$data = &$this->oIni->condition->local->transitionRule->css->urlToLocal->table;
				break;
			case 'transition_css_local':
				$data = &$this->oIni->condition->local->transitionRule->css->localToFile->table;
				break;
			case 'transition_js_url':
				$data = &$this->oIni->condition->local->transitionRule->js->urlToLocal->table;
				break;
			case 'transition_js_local':
				$data = &$this->oIni->condition->local->transitionRule->js->localToFile->table;
				break;
			case 'transition_aj_url':
				$data = &$this->oIni->condition->local->transitionRule->aj->urlToLocal->table;
				break;
			case 'transition_aj_local':
				$data = &$this->oIni->condition->local->transitionRule->aj->localToFile->table;
				break;
			case 'transition_html_url':
				$data = &$this->oIni->condition->local->transitionRule->html->urlToLocal->table;
				break;
			case 'transition_html_local':
				$data = &$this->oIni->condition->local->transitionRule->html->localToFile->table;
				break;
			case 'transition_other_url':
				$data = &$this->oIni->condition->local->transitionRule->other->urlToLocal->table;
				break;
			case 'transition_other_local':
				$data = &$this->oIni->condition->local->transitionRule->other->localToFile->table;
				break;
			default:
				$apiMsg = createApiMsg('100001', null, '要查询的表'.$table.'不存在');
		}

		if(!isset($apiMsg)) {
			$u = &getRowById($data, $id);

			if($u !== null) {
				$u[3] = $able;
				$apiMsg = createApiMsg('100000', null, 'ok');
				$this->saveIni();
			}else{
				$apiMsg = createApiMsg('100001', null, '在'.$table.'中没有查询到id为'.$id.'的条目');
			}
		}

		return $apiMsg;
	}


	public function addSettingRule($context, $type, $src, $target, $able, $isLocalFile, $isHttps, $host, $hostType) {
		$apiMsg = null;

		if(!$apiMsg) {
			$apiMsg = $this->checkTypeInput($type);
		}

		if(!$apiMsg) {
			$apiMsg = $this->checkContextInput($context);
		}

		if($isLocalFile) {
			$target = preg_replace('/^[\\\\\\\\\\/]*(.+)/', '/$1', $target);
		}
		if(!$apiMsg) {

			$table = &$this->oIni->condition->$context->setting->$type;

			$table->counter++;
			$table->table[] = array($table->counter, $src, $target, !!$able, !!$isLocalFile, !!$isHttps, $host, $hostType);

			$apiMsg = createApiMsg('100000', array('id' => $table->counter), 'ok');

			$this->saveIni();

		}
		return $apiMsg;
		
	}
	


	public function getSettingRule($context, $type, $id) {

		$apiMsg = null;

		if(!$apiMsg) {
			$apiMsg = $this->checkTypeInput($type);
		}

		if(!$apiMsg) {
			$apiMsg = $this->checkContextInput($context);
		}

		if(!$apiMsg) {
			$table = $this->oIni->condition->$context->setting->$type->table;
			$u = getRowById($table, $id);

			if($u === null) {
				global $debugger;
				if($debugger) {
					try {throw new Exception('iniData_getSettingRule');}catch (Exception $e) {
					   $sErrorMsg = $e->getMessage() . ' ' . $e->getLine();
					}
				}
				$apiMsg = createApiMsg('100001', null, $sErrorMsg.' '.$context.' '.$type.'没有查询到id为'.$id.'的条目');
			}else{
				$apiMsg = createApiMsg('100000', array(
					'src' => $u[1],
					'target' => $u[2],
					'able' => $u[3],
					'isLocalFile' => $u[4],
					'https' => $u[5],
					'host' => $u[6],
					'hostType' => $u[7],
				), 'ok');
			}
		}

		return $apiMsg;
	}


	public function delSettingRule($id, $context, $type) {
		$apiMsg = null;

		if(!$apiMsg) {
			$apiMsg = $this->checkTypeInput($type);
		}

		if(!$apiMsg) {

			$apiMsg = $this->checkContextInput($context);
		}
		if(!$apiMsg) {
			$table = &$this->oIni->condition->$context->setting->$type->table;
			$u = &getRowById($table, $id);
			if($u !== null) {
				array_splice($table, array_search($u, $table), 1);
				$apiMsg = createApiMsg('100000', null, 'ok');
				$this->saveIni();
			}else{
				global $debugger;
				if($debugger) {
					try {throw new Exception('iniData_delSettingRule');}catch (Exception $e) {
					   $sErrorMsg = $e->getMessage() . ' ' . $e->getLine();
					}
				}
				$apiMsg = createApiMsg('100001', null, $sErrorMsg.' '.$context.' '.$type.'没有查询到id为'.$id.'的条目');
			}
		}
		return $apiMsg;
	}
	

	public function setSettingRule($id, $src_context, $src_type, $context, $type, $src, $target, $able, $isLocalFile, $isHttps, $host, $hostType) {
		global $debugger;

		$apiMsg = null;

		if(!$apiMsg) {
			$apiMsg = $this->checkContextInput($src_context, 'src_context');
		}

		if(!$apiMsg) {
			$apiMsg = $this->checkTypeInput($src_type, 'src_type');
		}

		if(!$apiMsg) {
			$apiMsg = $this->checkTypeInput($type);
		}

		if(!$apiMsg) {
			$apiMsg = $this->checkContextInput($context);
		}

		if($isLocalFile) {
			$target = preg_replace('/^[\\\\\\\\\\/]*(.+)/', '/$1', $target);
		}
		if(!$apiMsg) {
			$src_table = &$this->oIni->condition->$src_context->setting->$src_type->table;

			if($src_context === $context && $src_type === $type) {
				$u = &getRowById($src_table, $id);
				if($u !== null) {
					$u['1'] = $src;
					$u['2'] = $target;
					$u['3'] = $able;
					$u['4'] = $isLocalFile;
					$u['5'] = $isHttps;
					$u['6'] = $host;
					$u['7'] = $hostType;
					$this->saveIni();
					$apiMsg = createApiMsg('100000', array(
						'target' => $target,
						'id' => $id,
					), 'ok');
				}else{
					global $debugger;
					if($debugger) {
						try {throw new Exception('iniData_setSettingRule');}catch (Exception $e) {
						   $sErrorMsg = $e->getMessage() . ' ' . $e->getLine();
						}
					}
					$apiMsg = createApiMsg('100001', null, $sErrorMsg.' '.$src_context.' '.$src_type.'没有查询到id为'.$id.'的条目');
				}
			}else{
				$apiMsg = $this->delSettingRule($id, $src_context, $src_type);
				
				if($debugger && $apiMsg['code'] !== '100000') {
					try {throw new Exception('file_iniData'.$apiMsg['msg']);}catch (Exception $e) {
					   $sErrorMsg = $e->getMessage() . ' ' . $e->getLine();
					}
					$apiMsg['msg'] = $sErrorMsg.' '.$apiMsg['msg'];
				}
				if($apiMsg['code'] === '100000') {
					$apiMsg = $this->addSettingRule($context, $type, $src, $target, $able, $isLocalFile);
					
				}
			}
		}

		return $apiMsg;
	}

	
	public function switchSettingRule($id, $context, $type, $able) {
		global $debugger;
		$tabale = &$this->oIni->condition->$context->setting->$type->table;
		$u = &getRowById($tabale, $id);

		if($u !== null) {
			$u[3] = fixBoolean($able);
			$apiMsg = createApiMsg('100000', null, 'ok');
			$this->saveIni();
			//var_dump($this->oIni->condition);
		}else{
			if($debugger) {
				try {throw new Exception('iniData_setSettingRule');}catch (Exception $e) {
				   $sErrorMsg = $e->getMessage() . ' ' . $e->getLine();
				}
			}
			$apiMsg = createApiMsg('100001', null, $sErrorMsg.' '.$src_context.' '.$src_type.'没有查询到id为'.$id.'的条目');
		}
		return $apiMsg;
	}

	public function setContextOfType($type, $context) {

		if(!isset($apiMsg)) {
			$apiMsg = $this->checkTypeInput($type);
		}

		if(!isset($apiMsg)) {
			$apiMsg = $this->checkContextInput($context);
		}

		if(!isset($apiMsg)) {
			$this->oIni->currentIni->$type->context = $context;
			$this->saveIni();
			$apiMsg = createApiMsg('100000', null, 'ok');
		}

		return $apiMsg;

	}

	public function fixLocalFilePath($path) {
		global $sIniPath;
		$path = addPathRootSlashes($path);
		$pathInfo = pathinfo($sIniPath);
		$sTempFilePath = $pathInfo['dirname'] . '/devproxy_temp_file' . $path;
		return $sTempFilePath;
		
	}
	

	public function getLocalFile($path) {
		$sTempFilePath = $this->fixLocalFilePath($path);
		if(file_exists($sTempFilePath)) {
			try{
				$sContentFile = file_get_contents($sTempFilePath);
				$apiMsg = createApiMsg('100000', array(
					'tempFilePath' => $sTempFilePath,
					'path' => $path,
					'text' => $sContentFile,
				), 'ok');
			}catch (Exception $e) {
				$sContentFile = '文件：' . $sTempFilePath . ' 无法读取。';
				$apiMsg = createApiMsg('100003', null, $sContentFile);
			}
		}else{
			$sContentFile = '文件：' . $sTempFilePath . ' 不存在。';
			$apiMsg = createApiMsg('100001', array(
					'tempFilePath' => $sTempFilePath,
			), $sContentFile);
		}
		return $apiMsg;
	}

	public function setLocalFile($path, $text=' ') {
		if(!$text) {
			$text = ' ';
		}
		$sTempFilePath = $this->fixLocalFilePath($path);
		if(file_exists($sTempFilePath)) {
			if(is_writable($sTempFilePath)) {
				$r = file_put_contents($sTempFilePath, $text);
				$apiMsg = createApiMsg('100000', array(
					'text' => $text,
					'path' => $path,
					'act' => 'edit',
				), 'ok');
				
			}else{
				$sContentFile = '文件：' . $sTempFilePath . ' 无法写入。';
				$apiMsg = createApiMsg('100003', null, $sContentFile);
			}
		}else{
			$sContentFile = '文件：' . $sTempFilePath . ' 不存在。';
			$apiMsg = createApiMsg('100001', null, $sContentFile);
		}
		return $apiMsg;
	}
	
	public function addLocalFile($path, $text) {
		$sTempFilePath = $this->fixLocalFilePath($path);
		$oPathInfo = pathinfo($sTempFilePath);
		if(is_writable($sTempFilePath)) {
			file_put_contents($sTempFilePath, '');
			$apiMsg =  $this->setLocalFile($path, $text);
		}else{
			@mkdir($oPathInfo['dirname']);
			@$f = fopen($sTempFilePath, 'w');
			fwrite($f, $text);
			@fclose($f);
			if(is_writable($sTempFilePath)) {
				$apiMsg = createApiMsg('100000', null, $sContentFile);
			}else{
				$sContentFile = '文件：' . $sTempFilePath . ' 无法写入。';
				$apiMsg = createApiMsg('100003', null, $sContentFile);
			}
		}


		return $apiMsg;
	}

	public function setSvnUpCmd($type, $cmd) {
		global $debugger;
		if(!isset($errorMsg)) {
			$apiMsg = $this->checkTypeInput($type);
			if($apiMsg) {
				if($debugger) {
					try {throw new Exception('iniData setSvnUpCmd');}catch (Exception $e) {
					   $sErrorMsg = $e->getMessage() . ' ' . $e->getLine();
					}
				}
				$apiMsg['data'] = $sErrorMsg;
			}
		}

		if(!isset($apiMsg)) {
			$this->oIni->condition->local->svn->$type = $cmd;
			$this->saveIni();
			$apiMsg = createApiMsg('100000', null, 'ok');
		}

		return $apiMsg;
	}
	

	private function checkTypeInput($type, $key='type') {
		if($type=='css' || $type=='js' || $type=='html' || $type=='aj' || $type=='other') {
			return null;
		}else{
			return createApiMsg('100001', null, $key . ' 参数必须为 css | js | html | aj | other');
		}
	}

	private function checkContextInput($context, $key='context') {
		if($context=='test' || $context=='local') {
			return null;
		}else{
			return createApiMsg('100001', null, $key . ' 参数必须为 test | local');
		}
	}

	private function saveIni() {
		global $sIniPath;
		$sIni = json_encode($this->oIni);
		$sIni = file_put_contents($sIniPath, $sIni);
		//exec('python E:\ggg_toy\debug_proxy\dev_proxy.py -j ' . $sIniPath);
	}

	private function fixAble($able) {
		if(strtolower($able) == 'false' || $able == '0' || !$able) {
			$able = false;
		}else{
			$able = true;
		}

		return $able;
	}
	
}


?>