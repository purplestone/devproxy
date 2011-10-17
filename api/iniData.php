<?php


class iniData {

	public $oIni;

	function __construct() {
		global $sIniPath;
		$sIni = file_get_contents($sIniPath);
		$this->oIni = json_decode($sIni);
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
				array_push($unit, $type, 'local');
				$data[] = $unit;
			}
		}
		foreach ($this->oIni->condition->test->setting as $type=>$listByType) {
			foreach ($listByType->table as $unit) {
				array_push($unit, $type, 'test');
				$data[] = $unit;
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
		return $data;
	}

	public function getCurrentSettingRule() {
		$data = array();
		foreach ($this->oIni->currentIni as $type=>$unit) {
			if($unit->able) {
				$context = $unit->context;
				$settingUnit = $this->oIni->condition->$context->setting->$type->table;
				foreach ($settingUnit as $rule) {
					array_push($rule, $type, $context);
					$data[] = $rule;
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

	public function addRule($table, $src, $target, $able) {
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

		if(!isset($apiMsg)) {
			$data->counter++;
			$data->table[] = array($data->counter, $src, $target, !!$able);

			$apiMsg = createApiMsg('100000', array('id' => $data->counter), 'ok');
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


	public function setRule($table, $id, $src, $target, $able) {
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
				$u[1] = $src;
				$u[2] = $target;
				$u[3] = $able;
				$apiMsg = createApiMsg('100000', null, 'ok');
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


	public function addSettingRule($context, $type, $src, $target, $able) {
		$apiMsg = null;

		if(!$apiMsg) {
			$apiMsg = $this->checkTypeInput($type);
		}

		if(!$apiMsg) {
			$apiMsg = $this->checkContextInput($context);
		}

		if(!$apiMsg) {

			$table = &$this->oIni->condition->$context->setting->$type;

			$table->counter++;
			$table->table[] = array($table->counter, $src, $target, !!$able);

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
				$apiMsg = createApiMsg('100001', null, '没有查询到id为'.$id.'的条目');
			}else{
				$apiMsg = createApiMsg('100000', array(
					'src' => $u[1],
					'target' => $u[2],
					'able' => $u[3],
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
				$apiMsg = createApiMsg('100001', null, '没有查询到id为'.$id.'的条目');
			}
		}
		return $apiMsg;
	}
	

	public function setSettingRule($id, $src_context, $src_type, $context, $type, $src, $target, $able) {

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

		if(!$apiMsg) {
			$src_table = &$this->oIni->condition->$src_context->setting->$src_type->table;

			if($src_context === $context && $src_type === $type) {
				$u = &getRowById($src_table, $id);
				if($u !== null) {
					$u['src'] = $src;
					$u['target'] = $target;
					$apiMsg = createApiMsg('100000', null, 'ok');
				}else{
					$apiMsg = createApiMsg('100001', null, '没有查询到id为'.$id.'的条目');
				}
			}else{
				$apiMsg = $this->delSettingRule($id, $context, $type);
				if(!$apiMsg) {
					$apiMsg = $this->addSettingRule($id, $context, $type, $src, $target, $able);
				}
			}
		}

		return $apiMsg;
	}

	
	public function switchSettingRule($id, $src_context, $src_type, $able) {
		$u = &getRowById($this->oIni->condition->$context->setting->$type->table, $id);

		if($u !== null) {
			$u[3] = $able;
			$apiMsg = createApiMsg('100000', null, 'ok');
			$this->saveIni();
		}else{
			$apiMsg = createApiMsg('100001', null, '在'.$table.'中没有查询到id为'.$id.'的条目');
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