{% extends file='./base.tpl' %}

{% block name=title %}编辑配置{% /block %}

{% block name=content %}
		<div class="mapNav"><a href="/home">返回首页</a></div>
		<div class="tableStyle" id="pl_editSetting_settingList">
				<div class="tableTilteStyle">环境配置</br>
					<button id="title" type="button" node-type="addRuleDialog">添加配置</button>
					<!-- <button id="title" type="button">查看配置文件路径</button>
					<button id="title" type="button">批量编辑</button> -->
				</div>
				<table cellspacing="0" cellpadding="5" border="1px" node-type="settingRuleList">
					<thead>
						<tr><th>原URL</th><th>转向到</th><th>环境</th><th>类型</th><th></th><th></th></tr>
					</thead>
					<tbody node-type="settingRuleTable">
					 {% foreach from=$listSetting item=settingRow %}
						{% include file='lump/settingRuleRow.tpl' %}
					 {% /foreach %}
					</tbody>
				</table>
		</div>
{% /block %}

{% block name=body_end %}
		<br class="clear" />
{% /block %}

