{% extends file='./base.tpl' %}

{% block name=title %}常用文件{% /block %}

{% block name=content %}
		<div class="mapNav"><a href="/home">返回首页</a></div>
		<div id="pl_commonFile_fileList" class="tableStyle">
				<div class="tableTilteStyle">常用文件</br>
					<button id="title" type="button">刷新</button>
					<button id="title" type="button">添加常用文件</button>
				</div>
				<table cellspacing="0" cellpadding="5" border="1px">
					<thead>
						<tr><th>URL</th><th>Local</th><th>File</th><th></th></tr>
					</thead>
					 {% foreach from=$listFile item=cssRow %}
						<tr info="id={% $cssRow[0] %}">
							<td>{% $cssRow[1] %}</td>
							<td>{% $cssRow[2] %}</td>
							<td>{% $cssRow[3] %}</td>
							<td>
								<span><a href="#">del</a></span>
								<span><a href="#">to rule</a></span>
							</td>
						</tr>
					 {% /foreach %}
				</table>
		</div>
{% /block %}

{% block name=body_end %}
		<br class="clear" />
{% /block %}

