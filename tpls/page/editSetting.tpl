{% extends file='./base.tpl' %}

{% block name=title %}编辑配置{% /block %}

{% block name=content %}
		<div class="mapNav"><a href="/home">返回首页</a></div>
		<div class="tableStyle" id="pl_transitionRule_ruleList">
				<div class="tableTilteStyle">环境配置</br>
					<button id="title" type="button">查看配置文件路径</button>
					<button id="title" type="button">批量编辑</button>
					<button id="title" type="button">添加配置</button>
				</div>
				<table cellspacing="0" cellpadding="5" border="1px">
					<thead>
						<tr><th>原URL</th><th>转向到</th><th>环境</th><th>类型</th><th></th><th></th></tr>
					</thead>
					 {% foreach from=$listSetting item=settingRow %}
						<tr info="id={% $settingRow[0] %}">
							<td>{% $settingRow[1] %}</td>
							<td>{% $settingRow[2] %}</td>
							<td>{% $settingRow[5] %}</td>
							<td>{% $settingRow[4] %}</td>
							<td>
								<a href="#">del</a>
								<a href="#">to rule</a>
								<a href="#">edit</a>
							</td>
							<td><input type="checkbox" id="" name="" value="{% $settingRow[3] %}"{% if $settingRow[3] %} checked="checked"{% /if %} /></td>
						</tr>
					 {% /foreach %}
				</table>
		</div>
{% /block %}

{% block name=body_end %}
		<br class="clear" />
{% /block %}

