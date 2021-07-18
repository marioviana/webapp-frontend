import React from 'react'
import {Box, FormField, List, Text, Tip} from "grommet";

const Conditions = (props) => {
  const TipContent = ({message}) => (
    <Box
      animation={{type: 'fadeIn', delay: 700}}
      background="grey"
      direction="row"
      pad="small"
      round="xsmall"
    >
      <Text color="accent-1">{message}</Text>
    </Box>
  );

  return (
    <FormField label={<span className="form-field">Select a condition</span>} name="select">
      <div className="list">
        <List
          data={props.conditions}
          itemProps={
            props.selectedCondition >= 0 ? {[props.selectedCondition]: {background: 'brand'}} : undefined
          }
          onClickItem={event => {
            props.setSelectedCondition(props.selectedCondition === event.index ? undefined : event.index)
          }}
          primaryKey={item => (
            <Tip plain content={<TipContent message={item.ICD_10_Description}/>}>
              <Text size="small" weight="bold" className="condition">
                {item.ICD_10_Description}
              </Text>
            </Tip>
          )}
          secondaryKey={item => (
            <Text size="small" color="dark-4">
              {item.ICD_10}
            </Text>
          )}
        />
      </div>
      {props.conditionError && <Text size="small" color="status-error">You need to select a condition to advance</Text>}
    </FormField>
  );
}

export default Conditions;
