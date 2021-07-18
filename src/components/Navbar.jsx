import React from 'react'
import {Anchor, Box, Header, Nav} from "grommet";

const Navbar = (props) => {
  return (
    <Header background="brand" pad="small">
      <Box direction="row" align="center" gap="small">
        <Anchor>
          Gyant
        </Anchor>
      </Box>
      <Nav direction="row" pad="small">
        <Anchor
          hoverIndicator
          onClick={() => props.setToken(null)}
        >
          Logged in as {props.name}. Click here to logout.
        </Anchor>
      </Nav>
    </Header>
  );
}

export default Navbar;
