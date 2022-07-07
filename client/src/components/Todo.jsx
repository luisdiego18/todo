import React from 'react'
import List from '@mui/material/List';
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Todo = props => {
  const {todo, onDelete, onUpdate}  = props;
  
  return (
      <List>
        <ListItem 
          secondaryAction={
            <ListItemIcon>
              <IconButton onClick={() => onUpdate(todo)}>
                <EditIcon  color="warning" edge="end" />
              </IconButton>
              <IconButton onClick={() => onDelete(todo)}>
                <DeleteIcon  color="error"  edge="end" />
              </IconButton>
            </ListItemIcon>         
          }
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <Checkbox
                edge="start"
              />
            </ListItemIcon>         
            <ListItemText>{todo.title}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
  )
}

export default Todo;