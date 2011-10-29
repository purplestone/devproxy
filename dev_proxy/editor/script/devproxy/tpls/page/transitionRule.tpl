{% extends file='./base.tpl' %}

{% block name=title %}{% $type %} URL 转换规则{% /block %}

{% block name=content %}
		<div class="mapNav"><a href="/home">返回首页</a></div>
		<div class="tableStyle" id="pl_transitionRule_ruleList">
			<div class="tableTilteStyle">{% $type %} URL 转换规则</div>
			<div class="tableTilte2Style">URL to Locat rule
				<button id="title" type="button">添加rule</button>
			</div>
			<table cellspacing="0" cellpadding="5" border="1px">
			 {% foreach from=$urlToLocal item=urlToLocalRow %}
				<tr info="id={% $urlToLocalRow[0] %}">
					<td>{% $urlToLocalRow[1] %}</td>
					<td>{% $urlToLocalRow[2] %}</td>
					<td>
						<a href="#">del</a>
						<a href="#">edit</a>
					</td>
				</tr>
			 {% /foreach %}
			</table>
			<div class="tableTilte2Style">Local to Locat rule
				<button id="title" type="button">添加rule</button>
			</div>
			<table cellspacing="0" cellpadding="5" border="1px">
			 {% foreach from=$localToFile item=localToFileRow %}
				<tr info="id={% $localToFileRow[0] %}">
					<td>{% $localToFileRow[1] %}</td>
					<td>{% $localToFileRow[2] %}</td>
					<td>
						<a href="#">del</a>
						<a href="#">edit</a>
					</td>
				</tr>
			 {% /foreach %}
			</table>
		</div>
{% /block %}

{% block name=body_end %}
		<br class="clear" />
{% /block %}

