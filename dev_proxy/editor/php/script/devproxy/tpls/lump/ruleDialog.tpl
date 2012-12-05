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
			<span class="dialogB"><textarea id="srcUrl" node-type="srcUrl" name="src" class="ruleInput">{% $src %}</textarea></span>
		</div>
		<div class="dialogU">
			<label class="dialogT" for="urlTo">转向到:</label>
			<span class="dialogB">
				<label for="befile" class="isLocalFile"><input type="checkbox" id="befile" name="befile"{% if $isLocalFile %}checked="checked"{% else %}{% /if %} value="true" />转向的是本地路径</label>
				<label for="behttps" class="isHttps"><input type="checkbox" id="behttps" name="behttps"{% if $https %}checked="checked"{% else %}{% /if %} value="true" />https</label>
				<br />
				<textarea id="urlTo" name="target" class="ruleInput" node-type="urlTo">{% $target %}</textarea>
			</span>
		</div>
		<div class=""></div>
		<div class="dialogU">
			<span class="dialogT">&nbsp;</span>
			<span class="dialogB">
				Host:
				<span class=""><input type="text" id="customHost" name="host" node-type="hostValue" value="{% $host %}" /></span>
				<label for="beTargetHost"><input type="radio" id="beTargetHost" name="theHostType" node-type="targetHost" {% if $hostType == 'target' %}checked="checked"{% /if %} value="target" />目标</label>
				<label for="beSrcHost"><input type="radio" id="beSrcHost" name="theHostType" node-type="srcHost" {% if $hostType == 'src' %}checked="checked"{% /if %} value="src" />源</label>
				<label for="beCustomHost"><input type="radio" id="beCustomHost" name="theHostType" node-type="customHost" {% if $hostType == 'custom' %}checked="checked"{% /if %} value="custom" />自定义</label>
		 {% if $hasAble %}
				<label for="able" class="enableRule"><input type="checkbox" id="able" name="able"{% if $able %}checked="checked"{% else %}{% /if %} value="true" />启用</label>
		 {% /if %}
			</span>
		</div>
	</div>
	<div class="dialogF">
		<button type="submit" action-type="submitRule">Submit</button>
		<button type="button" action-type="closeDialog">Cancel</button>
	</div>
</form>
{% /block %}