{% extends file='./base.tpl' %}

{% block name=title %}home {% /block %}

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
				<table cellspacing="0" cellpadding="5" ><tbody node-type="exRuleTable">
				 {% foreach from=$exRule item=exRuleRow %}
					{% include file='lump/exRuleRow.tpl' %}
				 {% /foreach %}
				</tbody></table>
			</div>
			<br class="clear" />
			<div id="pl_home_currentContext" class="tableStyle">
					<div class="tableTilteStyle"> 当前环境</br>
					</div>
					<table cellspacing="0" cellpadding="5" ><tbody node-type="settingRuleTable">
					 {% foreach from=$currentContext item=currentContextRow %}
						<tr node-type="row_{% $currentContextRow[5] %}_{% $currentContextRow[4] %}_{% $currentContextRow[0] %}">
							<td node-type="srcReg">{% $currentContextRow[1] %}</td>
							<td node-type="targetReg">{% $currentContextRow[2] %}</td>
							<td node-type="context">{% $currentContextRow[5] %}</td>
							<td node-type="type">{% $currentContextRow[4] %}</td>
							<td><a href="#">to rule</a> <a href="#" action-type="delSettingRuleBtn" action-data="src_context={% $currentContextRow[5] %}&src_type={% $currentContextRow[4] %}&act=edit&id={% $currentContextRow[0] %}">edit</a></td>
							<td><input type="checkbox" name="" value="src_context={% $currentContextRow[5] %}&src_type={% $currentContextRow[4] %}&act=edit&id={% $currentContextRow[0] %}"{% if $currentContextRow[3] %} checked="checked"{% /if %} /></td>
						</tr>
					 {% /foreach %}
					</tbody></table>
			</div>
		</div>
{% /block %}

{% block name=body_end %}
		<br class="clear" />
{% /block %}

