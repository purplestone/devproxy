{% extends file='./dialog.tpl' %}

{% block name='dialogStyle' %}{% /block %}

{% block name="title" %}{% if $act == 'add' %}添加{% else %}编辑{% /if %}配置规则{% /block %}

{% block name="inner" %}
<form method="post" action="/aj/editSetting">
<input type="hidden" name="act" value="{% $act %}" />
<div class="dialogC">
	<div class="dialogU">
		<label class="dialogT" for="srcUrl">原URL:</label>
		<span class="dialogB"><textarea id="srcUrl" class="ruleInput"></textarea></span>
	</div>
	<div class="dialogU">
		<label class="dialogT" for="urlTo">转向到:</label>
		<span class="dialogB"><textarea id="urlTo" class="ruleInput"></textarea></span>
	</div>
	<div class="dialogU">
		<label class="dialogT" for="urlTo">环境:</label>
		<span class="dialogB">
			<label for="localInput"><input type="radio" id="localInput" name="context" value="local" /><span>Local</span></label>
			<label for="testInput"><input type="radio" id="testInput" name="context" value="test" /><span>Test</span></label>
		</span>
	</div>
	<div class="dialogU">
		<label class="dialogT" for="urlTo">类型:</label>
		<span class="dialogB">
			<label for="jsTypeInput"><input type="radio" id="jsTypeInput" name="type" value="js" /><span>JS</span></label>
			<label for="cssTypeInput"><input type="radio" id="cssTypeInput" name="type" value="css" /><span>CSS</span></label>
			<label for="htmlTypeInput"><input type="radio" id="htmlTypeInput" name="type" value="html" /><span>HTML</span></label>
			<label for="ajTypeInput"><input type="radio" id="ajTypeInput" name="type" value="aj" /><span>aj</span></label>
			<label for="otherTypeInput"><input type="radio" id="otherTypeInput" name="type" value="other" /><span>other</span></label>
		</span>
	</div>
	<div class="dialogU">
		<span class="dialogT">&nbsp;</span>
		<span class="dialogB"><label for="able"><input type="checkbox" id="able" name="" value="" />启用</label></span>
	</div>
</div>
<div class="dialogF">
	<button type="submit">Submit</button>
	<button type="button">Cancel</button>
</div>
</form>
{% /block %}