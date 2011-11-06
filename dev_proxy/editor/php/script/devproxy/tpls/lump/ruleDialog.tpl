{% extends file='./dialog.tpl' %}

{% block name='dialogStyle' %}{% /block %}

{% block name="title" %}{% if $act == 'add' %}添加{% else %}编辑{% /if %}规则{% /block %}

{% block name="inner" %}
<form method="post" action="/aj/setRule"  node-type="setRuleDialogForm">
	<input type="hidden" name="act" value="{% $act %}" />
	<input type="hidden" name="table" value="{% $table %}" />
 {% if $id !== null %}
	<input type="hidden" name="id" value="{% $id %}" />
 {% /if %}
	<div class="dialogC">
		<div class="dialogU">
			<label class="dialogT" for="srcUrl">原URL:</label>
			<span class="dialogB"><textarea id="srcUrl" name="src" class="ruleInput">{% $src %}</textarea></span>
		</div>
		<div class="dialogU">
			<label class="dialogT" for="urlTo">转向到:</label>
			<span class="dialogB">
				<label for="befile" class="isLocalFile"><input type="checkbox" id="befile" name="befile"{% if $isLocalFile %}checked="checked"{% else %}{% /if %} value="true" />转向的是本地路径</label><br />
				<textarea id="urlTo" name="target" class="ruleInput">{% $target %}</textarea>
			</span>
		</div>
	 {% if $hasAble %}
		<div class="dialogU">
			<span class="dialogT">&nbsp;</span>
			<span class="dialogB enableRule">
				<label for="able" class="enableRule"><input type="checkbox" id="able" name="able"{% if $able %}checked="checked"{% else %}{% /if %} value="true" />启用</label>
			</span>
		</div>
	 {% /if %}
	</div>
	<div class="dialogF">
		<button type="submit" action-type="submitRule">Submit</button>
		<button type="button" action-type="closeDialog">Cancel</button>
	</div>
</form>
{% /block %}