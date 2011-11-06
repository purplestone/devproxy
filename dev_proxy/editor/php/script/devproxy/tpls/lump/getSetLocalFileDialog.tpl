{% extends file='./dialog.tpl' %}

{% block name='dialogStyle' %}{% /block %}

{% block name="title" %}{% if $act == 'edit' %}编辑{% else %}创建{% /if %}本地文件{% /block %}

{% block name="inner" %}
<form method="post" action="/aj/setLocalFileContent" node-type="setLocalFileForm" target="_blank">
	<input type="hidden" name="act" value="{% $act %}" />
	<input type="hidden" name="path" value="{% $path %}" />
	<div class="dialogC">
		<label class="1dialogT" for="localFileContent">文件: {% $tempFilePath %}</label><br />
		<span class="1dialogB"><textarea id="localFileContent" class="cmdInput" name="text">{% $text %}</textarea></span>
	</div>
	<div class="dialogF">
		<button type="submit">Submit</button>
		<button type="button" action-type="closeDialog">Cancel</button>
	</div>
</form>
{% /block %}