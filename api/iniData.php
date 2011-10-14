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
		if(!$id) {
			$apiMsg = createApiMsg('100001', null, 'id无效');
		}else{
			$list = $this->getAllRule($table);
			if($list['code'] == '100000') {
				$apiMsg = createApiMsg('100001', null, '在'.$table.'中没有查询到id为'.$id.'的条目');
				//$list = $list['data'];
				foreach ($list['data'] as $u) {
					if($u[0] == $id) {
						$apiMsg = createApiMsg('100000', $u, '');
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
			$apiMsg = createApiMsg('100001', $data, 'ok');
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
		if(!$this->checkTypeInput($type)) {
			return 'type输入错误';
		}
		$able = $this->fixAble($able);
		$this->oIni->currentIni->$type->able = $able;
		$this->saveIni();
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
				$r = array(
					'code' => '100001',	
					'data' => null,	
					'msg' => '要查询的表'.$table.'不存在'
				);
		}
		if(!isset($r)) {

			$data->counter++;
			$data->table[] = array($data->counter, $src, $target, !!$able);

			$r = array(
				'code' => '100000',	
				'data' => null,	
				'msg' => 'ok'
			);
			//var_dump($data);
			$this->saveIni();

		}
		return $r;
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
				$r = array(
					'code' => '100001',	
					'data' => null,	
					'msg' => '要查询的表'.$table.'不存在'
				);
		}

		if(!isset($r)) {
			foreach ($data as $key=>$u) {
				if($u[0] == $id) {
					//var_dump($data->$key);
					unset($data->$key);

					$r = array(
						'code' => '100000',
						'data' => null,	
						'msg' => 'ok'
					);
					$this->saveIni();

					break;
				}
			}

		}

		if(!isset($r)) {
			$r = array(
				'code' => '100001',	
				'data' => null,	
				'msg' => '在'.$table.'中没有查询到id为'.$id.'的条目'
			);
		}

		return $r;
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
				$r = array(
					'code' => '100001',	
					'data' => null,	
					'msg' => '要查询的表'.$table.'不存在'
				);
		}
var_dump($table);
		if(!isset($r)) {
			foreach ($data as $key=>$u) {
				if($u[0] == $id) {
					$t = &$data->$key;
					$t[1] = $src;
					$t[2] = $target;
					$t[3] = $able;

					$r = array(
						'code' => '100000',	
						'data' => null,	
						'msg' => 'ok'
					);
					$this->saveIni();

					break;
				}
			}

		}

		if(!isset($r)) {
			$r = array(
				'code' => '100001',	
				'data' => null,	
				'msg' => '在'.$table.'中没有查询到id为'.$id.'的条目'
			);
		}

		return $r;
	}

	public function getSettingRule($context, $type, $id) {
		$table = $this->oIni->condition->$context->setting->$type->table;
		return getRowById($table, $id);
	}


	public function switchSettingRule($context, $type, $src, $able) {
		$table = $this->oIni->condition->$context->setting->$type->table;
		foreach ($table as $index=>$rule) {
			if($table[$index][0] == $src) {
				$table[$index][2] = $able;
				break;
			}
		}
		$this->saveIni();
	}

	public function setContextOfType($type, $context) {
		if(!$this->checkTypeInput($type)) {
			return 'type输入错误';
		}
		if(!$this->checkContextInput($context)) {
			return 'context输入错误';
		}
		$data = $this->oIni->currentIni->$type->context = $context;
		$this->saveIni();
	}

	public function setSvnUpCmd($type, $cmd) {
		if(!$this->checkTypeInput($type)) {
			return 'type输入错误';
		}
		
		$this->oIni->condition->local->svn->$type = $cmd;
		$this->saveIni();
	}
	

	private function checkTypeInput($type) {
		if($type=='css' || $type=='js' || $type=='html' || $type=='aj' || $type=='other') {
			return true;
		}else{
			return false;
		}
	}

	private function checkContextInput($context) {
		if($context=='test' || $context=='local') {
			return true;
		}else{
			return false;
		}
	}

	private function saveIni() {
		global $sIniPath;
		$sIni = json_encode($this->oIni);
		$sIni = file_put_contents($sIniPath, $sIni);
	}

	private function fixAble($able) {
		if(strtolower($able) == 'false' || $able == '0') {
			$able = false;
		}
		if($able) {
			$able = true;
		}else{
			$able = false;
		}
		return $able;
	}
	
}


?>