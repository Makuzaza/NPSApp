import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@material-ui/core';
import {
  ChatBubble,
  BarChart,
  ViewComfy,
  EmojiEvents,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function Sidebar({ state, setState }) {
  const toggleDrawer = () => {
    setState(false);
  };

  return (
    <>
      <Drawer anchor={'left'} open={state} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <ListItem button component={Link} to="/admin/">
              <ListItemIcon>
                <EmojiEvents />
              </ListItemIcon>
              <ListItemText primary={'NPS Score'} />
            </ListItem>
            <ListItem button component={Link} to="/admin/charts">
              <ListItemIcon>
                <BarChart />
              </ListItemIcon>
              <ListItemText primary={'Charts'} />
            </ListItem>
            <ListItem button component={Link} to="/admin/responses">
              <ListItemIcon>
                <ViewComfy />
              </ListItemIcon>
              <ListItemText primary={'Responses'} />
            </ListItem>
            <ListItem button component={Link} to="/admin/feedback">
              <ListItemIcon>
                <ChatBubble />
              </ListItemIcon>
              <ListItemText primary={'Feedback'} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
