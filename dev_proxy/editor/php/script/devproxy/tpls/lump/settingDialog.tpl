{% extends file='./dialog.tpl' %}

{% block name='dialogStyle' %}{% /block %}

{% block name="title" %}{% if $act == 'add' %}添加{% else %}编辑{% /if %}配置规则{% /block %}


{% block name="inner" %}
<form method="post" action="/aj/editSetting" node-type="getSettingDialogForm">
<input type="hidden" name="act" value="{% $act %}" />
<input type="hidden" name="src_context" value="{% $src_context %}" />
<input type="hidden" name="src_type" value="{% $src_type %}" />
<input type="hidden" name="id" value="{% $id %}" />
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
		<div class="dialogU">
			<span class="dialogT">&nbsp;</span>
			<span class="dialogB">
				Host:
				<span class=""><input type="text" id="customHost" name="host" node-type="hostValue" value="{% $host %}" /></span>
				<label for="beTargetHost"><input type="radio" id="beTargetHost" name="theHostType" node-type="targetHost" {% if $hostType == 'target' %}checked="checked"{% /if %} value="target" />目标</label>
				<label for="beSrcHost"><input type="radio" id="beSrcHost" name="theHostType" node-type="srcHost" {% if $hostType == 'src' %}checked="checked"{% /if %} value="src" />源</label>
				<label for="beCustomHost"><input type="radio" id="beCustomHost" name="theHostType" node-type="customHost" {% if $hostType == 'custom' %}checked="checked"{% /if %} value="custom" />自定义</label>
			</span>
		</div>
	<div class="dialogU">
		<label class="dialogT" for="urlTo">环境:</label>
		<span class="dialogB">
			<label for="localInput"><input{% if $src_context == 'local' %} checked="checked"{% /if %} type="radio" id="localInput" name="context" value="local" /><span>Local</span></label>
			<label for="testInput"><input{% if $src_context == 'test' %} checked="checked"{% /if %} type="radio" id="testInput" name="context" value="test" /><span>Test</span></label>
		</span>
	</div>
	<div class="dialogU">
		<label class="dialogT" for="urlTo">类型:</label>
		<span class="dialogB">
			<label for="jsTypeInput"><input{% if $src_type == 'js' %} checked="checked"{% /if %} type="radio" id="jsTypeInput" name="type" value="js" /><span>JS</span></label>
			<label for="cssTypeInput"><input{% if $src_type == 'css' %} checked="checked"{% /if %} type="radio" id="cssTypeInput" name="type" value="css" /><span>CSS</span></label>
			<label for="htmlTypeInput"><input{% if $src_type == 'html' %} checked="checked"{% /if %} type="radio" id="htmlTypeInput" name="type" value="html" /><span>HTML</span></label>
			<label for="ajTypeInput"><input{% if $src_type == 'aj' %} checked="checked"{% /if %} type="radio" id="ajTypeInput" name="type" value="aj" /><span>aj</span></label>
			<label for="otherTypeInput"><input{% if $src_type == 'other' %} checked="checked"{% /if %} type="radio" id="otherTypeInput" name="type" value="other" /><span>other</span></label>
		</span>
	</div>
	<div class="dialogU">
		<span class="dialogT">&nbsp;</span>
		<span class="dialogB">
			<label for="able" class="enableRule"><input{% if $able %} checked="checked"{% /if %} type="checkbox" id="able" name="able" value="" />启用</label>
		</span>
	</div>
</div>
<div class="dialogF">
	<button type="submit">Submit</button>
	<button type="button" action-type="closeDialog">Cancel</button>
</div>
</form>
{% /block %}