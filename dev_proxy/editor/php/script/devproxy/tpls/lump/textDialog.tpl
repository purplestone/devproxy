{% extends file='./dialog.tpl' %}

{% block name='dialogStyle' %}{% /block %}

{% block name="title" %}批量编辑配置{% /block %}

{% block name="inner" %}
<form method="post" action="/aj/batchSetting">
<div class="dialogC">
	<textarea class="cmdInput"></textarea>
</div>
<div class="dialogF">
	<button type="submit">Submit</button>
	<button type="button">Cancel</button>
</div>
</form>
{% /block %}