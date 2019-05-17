import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import ListItemButton from './ListItemButton';

import { formatDate } from '../lib/datetime';

const DEFAULT_HEADERS = ['Name', 'Window Open', 'Window Close', 'Status'];

const TaskList = ({ headers = DEFAULT_HEADERS, tasks }) => {
  const rows = tasks.map((task, index) => {
    return [
      task.properties.name,
      formatDate(task.properties.windowOpen),
      formatDate(task.properties.windowClose),
      task.properties.status,
      <ListItemButton key={`Task-Button-${index}`} id={task.id.toString()}>
        View Task Details
      </ListItemButton>
    ];
  });
  return <Table columns={headers} rows={rows} />;
};

TaskList.propTypes = {
  headers: PropTypes.array,
  tasks: PropTypes.array
};

export default TaskList;
