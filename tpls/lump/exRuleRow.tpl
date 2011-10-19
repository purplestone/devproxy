
					<tr node-type="row_{% $exRuleRow[0] %}">
						<td node-type="srcReg">{% $exRuleRow[1] %}</td>
						<td node-type="targetReg">{% $exRuleRow[2] %}</td>
						<td>
							<a href="#" action-type="delExRuleBtn" action-data="table=ex&act=del&id={% $exRuleRow[0] %}">del</a>&nbsp;
							<a href="#" action-type="editExRuleBtn" action-data="hasAble=true&table=ex&act=edit&id={% $exRuleRow[0] %}">edit</a>&nbsp;
							<a href="#">file</a>
						</td>
						<td><input type="checkbox" node-type="ableStatus" action-type="switchExRuleBtn" value="table=ex&id={% $exRuleRow[0] %}"{% if $exRuleRow[3] %} checked="checked"{% /if %} /></td>
					</tr>