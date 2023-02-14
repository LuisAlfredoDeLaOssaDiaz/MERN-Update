import React, { useState } from 'react';
import { Tab, Button } from "semantic-ui-react";
import { ListUsers } from '../../../components/Admin/Users';

import './Users.scss'

export function Users2() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false)
  
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = ()=> setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "All Users",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={undefined} reload={reload} />
        </Tab.Pane>
      )
    },
  ]
  return (
    <>
      <div className='users-page'>
        <Tab menu={{ secondary: true}} panes={panes} />
      </div>
    </>
  )
}
