{% extends file='./base.tpl' %}

{% block name=content %}
	{% include file='lump/svnEditDialog.tpl' %}


	{% include file='lump/settingDialog.tpl' %}


	{% include file='lump/ruleDialog.tpl' %}


	{% include file='lump/commonFileDialog.tpl' %}


	{% include file='lump/textDialog.tpl' %}


	{% include file='lump/iniPathDialog.tpl' %}
{% /block %}
