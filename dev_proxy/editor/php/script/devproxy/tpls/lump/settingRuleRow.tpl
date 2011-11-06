
						<tr node-type="row_{% $settingRow['context'] %}_{% $settingRow['type'] %}_{% $settingRow['id'] %}" info="id={% $settingRow['id'] %}" class="_e_settingRuleRow{% if !$settingRow['able'] %} disable{% /if %}">
							<td node-type="srcReg">{% $settingRow['src'] %}</td>
							<td node-type="targetReg">
								{% if $settingRow['isLocalFile'] %}
									<a href="#" class="localFile" action-type="setLocalFileBtn" action-data="path={% $settingRow['target']|unescape:html|escape:url %}">{% $settingRow['target'] %}</a>
								{% else %}
									{% $settingRow['target'] %}
								{% /if %}
							</td>
							<td node-type="context">{% $settingRow['context'] %}</td>
							<td node-type="type">{% $settingRow['type'] %}</td>
							<td>
								<!-- <a href="#" action-type="toRuleBtn" action-data="hasAble=true&table=ex&act=add">to rule</a> -->
								<a href="#" class="delSettingRuleBtn" action-type="delSettingRuleBtn" action-data="act=del">del</a>
								<a href="#" action-type="editSettingRuleBtn" action-data="act=edit">edit</a>
							</td>
							<td><input type="checkbox" node-type="able" action-type="switchAbleBtn" action-data="act=edit" name="" value="act=edit"{% if $settingRow['able'] %} checked="checked"{% /if %} /></td>
						</tr>