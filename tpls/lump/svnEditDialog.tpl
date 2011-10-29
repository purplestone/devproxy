{% extends file='./dialog.tpl' %}

{% block name='dialogStyle' %}{% /block %}

{% block name="title" %}SVN UP  命令{% /block %}

{% block name="inner" %}
<form method="post" action="/aj/setSvnUpCmd" node-type="svnUpCmdForm">
<div class="dialogC">
	<label class="dialogT" for="svnUpCmdInput">CMD:</label>
	<span class="dialogB"><input type="hidden" name="type" value="{% $type %}" /><textarea id="svnUpCmdInput" class="cmdInput" name="cmd">{% $cmd %}</textarea></span>
</div>
<div class="dialogF">
	<button type="submit" action-type="submitSvnUpCmd">Submit</button>
	<button type="button" action-type="closeDialog">Cancel</button>
</div>
</form>
{% /block %}