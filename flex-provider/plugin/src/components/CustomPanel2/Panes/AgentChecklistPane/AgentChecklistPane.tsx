import { Typography } from '@material-ui/core';
import React from 'react';
import PaneHeader from '../PaneHeader/PaneHeader';
import { AgentChecklistPaneStyles } from './AgentChecklistPane.Styles';

const AgentChecklistPane = () => {
  return (
    <AgentChecklistPaneStyles>
      <PaneHeader text="Agent Checklist" />
      <div className="check-list">
        <Typography className="content title" component={"h1"}>{"Please complete the items below."}</Typography>
        <div className="content">
          <input type="checkbox" id="Diabetes Management" name="fav_language" value="HTML"/>
          <label className="input-item">ID Verification</label><br/>
        </div>
        <div className="content">
          <input type="checkbox" id="css" name="fav_language" value="CSS"/>
          <label className="input-item">Updated contact info (phone number, address, email)</label><br/>
        </div>
        <div className="content">
          <input type="checkbox" id="javascript" name="fav_language" value="JavaScript"/>
          <label className="input-item">Insurance Eligibility Check </label>
        </div>
        <div className="content">
          <input type="checkbox" id="hello" name="fav_food" value="Foo"/>
          <label className="input-item">Flu Shot check</label>
        </div>
      </div>
    </AgentChecklistPaneStyles>
  );
};

export default AgentChecklistPane;
