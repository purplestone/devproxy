{% extends file='./base.tpl' %}

<!-- {% block name=title %}home{% /block %} -->

{% block name=content %}
		<div id="home">
			<div id="pl_home_contextSelect" class="tableStyle">
				<div class="tableTilteStyle">环境选择<a href="editSetting.html" class="link">修改环境配置</a></div>
				
				<table cellspacing="0" cellpadding="5">
					<thead>
						<tr>
							<th>&nbsp;</td>
							<th>File</td>
							<th>SVN</td>
							<th>Local</td>
							<th>Test</td>
							<th>&nbsp;</td>
						</tr>
					</thead>
					 {% foreach from=$currentIni key=type item=currentIniRow %}
						<tr>
							<td>{% $type %}</td>
							<td>
								<a action-type="transitionRuleBtn" href="/transitionRule?type={% $type %}">rule</a>&nbsp;
								<a action-type="commonFileBtn" href="/commonFile?type={% $type %}">view</a>
							</td>
							 {% if $type=='css' || $type=="js" %}
							<td>
								<a href="#" action-data="type={% $type %}" action-type="setSvnBtn">set</a>&nbsp;
								<a href="#" action-data="type={% $type %}" action-type="svnUpBtn">update</a>
							</td>
							 {% else %}
								<td>-</td>
							 {% /if %}
							<td><input type="radio" action-type="contextSelBtn" name="{% $type %}_context" value="context=local&type={% $type %}"{% if $currentIniRow->context == 'local' %} checked="checked"{% /if %} /></td>
							<td><input type="radio" action-type="contextSelBtn" name="{% $type %}_context" value="context=test&type={% $type %}"{% if $currentIniRow->context == 'test' %} checked="checked"{% /if %} /></td>
							<td><input type="checkbox" action-type="switchTypeBtn" name="" value="type={% $type %}"{% if $currentIniRow->able %} checked="checked"{% /if %} /></td>
						</tr>
					 {% /foreach %}
				</table>
			</div>
			<br class="clear" />
			<div id="pl_home_exRule" class="tableStyle">
				<div class="tableTilteStyle">特殊规则
					<button class="link" type="button" action-type="addExRuleBtn" action-data="table=ex&act=add">添加规则</button>
				</div>
				<table cellspacing="0" cellpadding="5" >
				 {% foreach from=$exRule item=exRuleRow %}
					<tr  node-type="row_{% $exRuleRow[0] %}">
						<td node-type="srcReg">{% $exRuleRow[1] %}</td>
						<td node-type="targetReg">{% $exRuleRow[2] %}</td>
						<td>
							<a href="#" action-type="delExRuleBtn" action-data="table=ex&act=del&id={% $exRuleRow[0] %}">del</a>&nbsp;
							<a href="#" action-type="editExRuleBtn" action-data="hasAble=true&table=ex&act=edit&id={% $exRuleRow[0] %}">edit</a>&nbsp;
							<a href="#">file</a>
						</td>
						<td><input type="checkbox" node-type="ableStatus" value="table=ex&id={% $exRuleRow[0] %}"{% if $exRuleRow[3] %} checked="checked"{% /if %} /></td>
					</tr>
				 {% /foreach %}
				</table>
			</div>
			<br class="clear" />
			<div id="pl_home_currentContext" class="tableStyle">
					<div class="tableTilteStyle"> 当前环境</br>
					</div>
					<table cellspacing="0" cellpadding="5" >
					 {% foreach from=$currentContext item=currentContextRow %}
						<tr>
							<td>{% $currentContextRow[1] %}</td>
							<td>{% $currentContextRow[2] %}</td>
							<td>{% $currentContextRow[5] %}</td>
							<td>{% $currentContextRow[4] %}</td>
							<td><a href="#">to rule</a> <a href="#">edit</a></td>
							<td><input type="checkbox" id="" name="" value="{% $currentContextRow[4] %}"{% if $currentContextRow[4] %} checked="checked"{% /if %} /></td>
						</tr>
					 {% /foreach %}
					</table>
			</div>
		</div>
{% /block %}

{% block name=body_end %}
		<br class="clear" />
{% /block %}

