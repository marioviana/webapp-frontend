import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Box, Button, FormField, TextArea, Grid, List, Text, Tip, Spinner} from 'grommet';
import Navbar from './Navbar'
import '../styles/Review.css'
import Case from "./Case";
import Conditions from "./Conditions";


const Review = (props) => {
  const [cases, setCases] = useState([]);
  const [currentCase, setCurrentCase] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [conditionError, setConditionError] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${props.token}` }
  };

  useEffect(async () => {
    const getCases = axios.get('http://localhost:3001/cases', config);
    const getConditions = axios.get('http://localhost:3001/conditions', config);
    const [casesResponse, conditionsResponse] = await Promise.all([getCases, getConditions]);
    setCases(casesResponse.data);
    setCurrentCase(0);
    setConditions(conditionsResponse.data);
    setTimestamp(new Date().getTime());
    setLoading(false);
  }, [])

  const saveRecord = async () => {
    if (!selectedCondition)
      return setConditionError(true);
    const selectedConditionValue = conditions[selectedCondition];
    const label = `${selectedConditionValue.ICD_10_Description} (${selectedConditionValue.ICD_10})`
    const currentDate = new Date();
    await axios.post('http://localhost:3001/cases/record', {
      label,
      caseId: cases[currentCase].id,
      time: currentDate,
      duration: currentDate.getTime() - timestamp
    }, config)
    setCurrentCase(currentCase + 1)
    setSelectedCondition(null)
    setTimestamp(new Date().getTime())
    setConditionError(false);
  }

  if (loading) {
    return (
      <Box align="center" direction="row" gap="small" className="spinner-container">
        <Spinner
          border={[
            { side: 'all', color: 'background-contrast', size: 'medium' },
            { side: 'right', color: 'brand', size: 'medium' },
            { side: 'top', color: 'brand', size: 'medium' },
            { side: 'left', color: 'brand', size: 'medium' },
          ]}
        />
        <Text>Loading...</Text>
      </Box>
    )
  }

  if (!cases.length || !cases[currentCase]) {
    return (
      <div>
        <Navbar setToken={props.setToken} name={props.name}/>
        <Text className="no-more-cases">There are no more cases to review</Text>
      </div>
    )
  }

  return (
    <div>
      <Navbar setToken={props.setToken} name={props.name}/>
      <Grid
        columns={['1/2', '1/2']}
        areas={[
          ['case-description', 'condition'],
        ]}
        gap="medium"
        pad="large"
      >
        <Box gridArea="case-description" align="center" pad="large">
          <Case cases={cases} currentCase={currentCase}/>
        </Box>
        <Box gridArea="condition" align="center" pad="large">
          <Conditions
            conditions={conditions}
            selectedCondition={selectedCondition}
            setSelectedCondition={setSelectedCondition}
            conditionError={conditionError}
          />
          <Button primary label="Next case" className="next-case" onClick={() => saveRecord()}/>
        </Box>
      </Grid>
    </div>
  );
}

export default Review;
