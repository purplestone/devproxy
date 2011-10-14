<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" {% block name=html_info %}{% /block %}>
<head {% block name=profile %}{% /block %}>
{% block name=encode %}
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Language" content="zh-cn" />
{% /block  %}
<title> {% block name=title %}{% /block %}{% block title_suffix %}_调试代理{% /block  %} </title>
{% block name=meta %}{% /block %}
{% block name=ico %}
<link href="/favicon.ico" rel="shortcut icon"  type="image/x-icon" />
<link rel="icon" href="/favicon.ico" />
{% /block %}
{% block name=css_global %}
<link href="/style.css" type="text/css" rel="stylesheet" media="all" />
{% /block %}
{% block name=css %}{% /block %}
{% block name=js_global %}
<script type="text/javascript" src="http://js.t.sinajs.cn/STK/js/gaea.1.14.js"></script>
<script type="text/javascript" src="http://js.devproxy/dev/js/all.js"></script>
{% /block %}
{% block name=js %}{% /block %}
</head>

<body {% block name=page_info %}{% /block %}>
{% block name=body_start %}{% /block %}


{% block name=header %}{% /block %}
{% block name=content_start %}{% /block %}
{% block name=content %}{% /block %}
{% block name=content_end %}{% /block %}
{% block name=footer %}{% /block %}

{% block name=footer_end %}{% /block %}

{% block name=counter %}{% /block %}

<script type="text/javascript">
//<!--
	STK.pageletM.start();
//-->
</script>
{% block name=body_end %}
{% /block %}


</body>
</html>