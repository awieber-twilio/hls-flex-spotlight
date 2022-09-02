import React from 'react'
import { Actions, withTheme, withTaskContext } from '@twilio/flex-ui'
import { FormControl, Select, MenuItem }  from '@material-ui/core'

class CannedResponses extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      response: '',
    }
  }

  handleChange = async (event) => {
    Actions.invokeAction('SendMessage', {
      conversationSid: this.props.conversationSid,
      body: event.target.value,
    })

  }

  render() {
    let layout = null
    if (!this.props.task || !this.props.task.attributes) {
      return null
    }
    layout = (
      <React.Fragment>
        <FormControl className="form" style={styles.formControl}>
          <Select
            displayEmpty
            value={this.state.response}
            onChange={this.handleChange}
            name="response"
            style={styles.item}
            renderValue={() => {
                return <em style={styles.placeholder} >Canned Responses</em>;
            }}            
          >
          {values.map((value) => (
            <MenuItem
              style={styles.item}
              value={value[1]}
            >
              {value[0]}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
      </React.Fragment>
    )

    return layout
  }
}

const values = [
  ['Anything Else','Is there anything else I can help you with today?'],
  ['Hello','Hello! Thank you for connecting with us at Owl Health'],
  ['My Pleasure','It was my pleasure to be able to help you today'],
  ['Please Hold','Please hold for one moment while I verify some information'],
  ['Transfer','Please wait while I transfer you with someone who can help'],
];

const styles = {
  formControl: {
    width: '100%',
    marginBottom: '20px',
  },
  inputLabel: {
    paddingLeft: '5px',
  },
  placeholder: {
    fontStyle: 'italic',
    paddingLeft: '16px',
  },
  item: {
    paddingTop: '2px',
    paddingBottom: '2px',
    fontSize: '13px',
    fontFamily: "'Inter',sans-serif",
  }
}

export default withTheme(withTaskContext(CannedResponses))
