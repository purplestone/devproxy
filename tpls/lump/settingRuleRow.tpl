
						<tr node-type="row_{% $currentContextRow['context'] %}_{% $currentContextRow['type'] %}_{% $currentContextRow['id'] %}">
							<td node-type="srcReg">{% $currentContextRow['src'] %}</td>
							<td node-type="targetReg">{% $currentContextRow['target'] %}</td>
							<td node-type="context">{% $currentContextRow['context'] %}</td>
							<td node-type="type">{% $currentContextRow['type'] %}</td>
							<td><a href="#" action-type="toRuleBtn" action-data="hasAble=true&table=ex&act=add&src={% $currentContextRow['src']|escape:'url' %}&target={% $currentContextRow['target']|escape:'url' %}">to rule</a> <a href="#" action-type="delSettingRuleBtn" action-data="src_context={% $currentContextRow['context'] %}&src_type={% $currentContextRow['type'] %}&act=edit&id={% $currentContextRow['id'] %}">edit</a></td>
							<td><input type="checkbox" name="" value="src_context={% $currentContextRow['context'] %}&src_type={% $currentContextRow['type'] %}&act=edit&id={% $currentContextRow['id'] %}"{% if $currentContextRow['able'] %} checked="checked"{% /if %} /></td>
						</tr>