import React from 'react'
import {FormField, TextArea} from "grommet";

const Case = (props) => {
  return (
    <FormField name="case" label={<span className="form-field">Please review this case</span>} required>
      <TextArea
        className="case-description"
        name="case"
        placeholder="Case description"
        value={props.cases[props.currentCase] && props.cases[props.currentCase].content}
        resize={false}
        focusIndicator={false}
      />
    </FormField>
  );
}

export default Case;
