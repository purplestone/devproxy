{% extends file='./dialog.tpl' %}

{% block name='dialogStyle' %}{% /block %}

{% block name="title" %}编辑配置文件路径{% /block %}

{% block name="inner" %}
<form method="post" action="/aj/editSettingPath">
<div class="dialogC">
	<label class="dialogT" for="iniPath">Path:</label>
	<textarea id="iniPath" class="ruleInput"></textarea>
</div>
<div class="dialogF">
	<button type="submit">Submit</button>
	<button type="button">Cancel</button>
</div>
</form>
{% /block %}