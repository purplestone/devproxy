{% extends file='./dialog.tpl' %}

{% block name='dialogStyle' %}{% /block %}

{% block name="title" %}添加常用文件{% /block %}

{% block name="inner" %}
<form method="post" action="/aj/addCommonFile">
<div class="dialogC">
	<label class="dialogT" for="iniPath">Url:</label>
	<textarea id="iniPath" class="ruleInput"></textarea>
</div>
<div class="dialogF">
	<button type="submit">Submit</button>
	<button type="button">Cancel</button>
</div>
</form>
{% /block %}