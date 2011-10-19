
					<tr node-type="row_{% $exRuleRow['id'] %}">
						<td node-type="srcReg">{% $exRuleRow['src'] %}</td>
						<td node-type="targetReg">{% $exRuleRow['target'] %}</td>
						<td>
							<a href="#" action-type="delExRuleBtn" action-data="table=ex&act=del&id={% $exRuleRow['id'] %}">del</a>&nbsp;
							<a href="#" action-type="editExRuleBtn" action-data="hasAble=true&table=ex&act=edit&id={% $exRuleRow['id'] %}">edit</a>&nbsp;
							<a href="#">file</a>
						</td>
						<td><input type="checkbox" node-type="ableStatus" action-type="switchExRuleBtn" value="table=ex&id={% $exRuleRow['id'] %}"{% if $exRuleRow['able'] %} checked="checked"{% /if %} /></td>
					</tr>