import React, { useState } from 'react'
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormField,
  Text,
  TextInput,
} from 'grommet';
import '../styles/Login.css'

const Login = props => {
  const [error, setError] = useState(false);

  const checkUser = async ({ email, password }) => {
    try {
      const response = await axios.post(`http://localhost:3001/auth/login`, {
        username: email,
        password
      });
      if (response.status === 201) {
        props.setName(response.data.name);
        props.setToken(response.data.access_token);
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className='container'>
      <Card width="medium" background="light-1">
        <CardHeader pad="medium">Welcome</CardHeader>
        <CardBody pad="medium">
          <Box fill align="center" justify="center">
            <Box width="medium">
              <Form
                onSubmit={user => checkUser(user.value)}
              >
                <FormField label="Email" name="email" required>
                  <TextInput name="email" type="email" />
                </FormField>
                <FormField label="Password" name="password" required>
                  <TextInput name="password" type="password" />
                </FormField>
                {error && (
                  <Box pad={{ horizontal: 'small' }}>
                    <Text size="small" color="status-error">The credentials are wrong. Please try again.</Text>
                  </Box>
                )}
                <Box direction="row" justify="between" margin={{ top: 'medium' }}>
                  <Button type="reset" label="Reset" />
                  <Button type="submit" label="Update" primary />
                </Box>
              </Form>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </div>
  )
}

export default Login
