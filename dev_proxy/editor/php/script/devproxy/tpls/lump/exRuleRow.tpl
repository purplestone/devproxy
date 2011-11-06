
					<tr node-type="row_{% $exRuleRow['id'] %}" info="id={% $exRuleRow['id'] %}&table=ex" class="_e_exRuleRow{% if !$exRuleRow['able'] %} disable{% /if %}">
						<td node-type="srcReg">{% $exRuleRow['src'] %}</td>
						<td node-type="targetReg">
							{% if $exRuleRow['isLocalFile'] %}
								<a href="#" class="localFile" action-type="setLocalFileBtn" action-data="path={% $exRuleRow['target']|unescape:html|escape:url %}">{% $exRuleRow['target'] %}</a>
							{% else %}
								{% $exRuleRow['target'] %}
							{% /if %}
						</td>
						<td>
							<a href="#" action-type="delExRuleBtn" action-data="act=del">del</a>&nbsp;
							<a href="#" action-type="editExRuleBtn" action-data="act=edit">edit</a>&nbsp;
							<!-- <a href="#">file</a> -->
						</td>
						<td><input type="checkbox" node-type="ableStatus" action-type="switchExRuleBtn" action-data="act=edit"{% if $exRuleRow['able'] %} checked="checked"{% /if %} /></td>
					</tr>
