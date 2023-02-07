import React, { useState } from 'react';
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from '../../../components/Shared';
import { UserForm, ListUsers } from '../../../components/Admin/Users';

import './Users.scss'

export function Users() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false)
  
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = ()=> setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Usuarios Activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={true} reload={reload} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Usuarios Inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={false} reload={reload} />
        </Tab.Pane>
      )
    }
  ]
  return (
    <>
      <div className='users-page'>
        <Button className='users-page__add' primary onClick={onOpenCloseModal} >
          Nuevo Usuario.
        </Button>
        <Tab menu={{ secondary: true}} panes={panes} />
      </div>

    <BasicModal show={showModal} close={onOpenCloseModal} title="Crear nuevo Usuario." >
      <UserForm close={onOpenCloseModal} 
      onReload={onReload}
      // user={{name:1}}
      />
    </BasicModal>
    </>
  )
}
