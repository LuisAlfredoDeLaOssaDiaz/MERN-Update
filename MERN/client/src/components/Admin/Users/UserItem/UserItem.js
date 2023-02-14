import React, {useState} from 'react';
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets"
import { ENV } from '../../../../utils';
import {BasicModal} from '../../../Shared';
import {UserForm} from "../UserForm"
import { useAuth } from '../../../../hooks';

import "./UserItem.scss";
import { User } from '../../../../api';

export function UserItem(props) {
  const {user, onReload} = props;
  const {accessToken} = useAuth();
  
  const userController = new User()
  
  const [showoModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [isDelete, setIsDelete] = useState(false);
  
    
    const onOpenCloseModal = () => setShowModal(prevState => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState)
    
    const openUpdateUser = () => {
      setTitleModal(`Actualizar ${user.email}`);
      onOpenCloseModal()
    }

    const openDesactivateActivateDeleteConfirm = (onActivateDesactivateDelete) => {
      setConfirmMessage(((!onActivateDesactivateDelete) ? ((user.active) ? `Desactivar usuario ${user.email} ?` : `Activar usuario ${user.email} ?`) : `Eliminar usuario ${user.email} ?`));
      setIsDelete(onActivateDesactivateDelete);
      onOpenCloseConfirm()
    }

    const onActivateDesactivate = async () => {
      try {
        await userController.updateUser(accessToken, user._id, {
          active: !user.active,
        });
        onReload();
        onOpenCloseConfirm();
      } catch (error) {
        throw error;        
      }
    }

    const onDeleteUser = async _ => {
      try {
        await userController.deleteUser(accessToken, user._id);
        onReload();
        onOpenCloseConfirm();
      } catch (error) {
        throw error;
      }
    }

    return (
    <>
    <div className='user-item'>
        <div className='user-item__info'>
            <Image avatar src={ user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar } />
            {/* <Image avatar src={ user.avatar ? `${user.avatar}` : image.noAvatar } /> */ }
            <div>
                <p>{user.firstname} {user.lastname}</p> 
                <p>{user.email}</p>
            </div>
        </div>
        <div>
          <Button icon primary onClick={openUpdateUser}>
            <Icon name="pencil" />
          </Button>
          <Button icon color={user.active ? "orange" : "teal"} onClick={_=>openDesactivateActivateDeleteConfirm(false)} >
            <Icon name={user.active ? "ban" : "check"} />
          </Button>
          <Button icon color='red' onClick={_=>openDesactivateActivateDeleteConfirm(true)}>
            <Icon name="trash" />
          </Button>
        </div>
    </div>

    <BasicModal show={showoModal} close={onOpenCloseModal} title={titleModal} >
      <UserForm close={onOpenCloseModal} onReload={onReload} user={user} />
    </BasicModal>

    <Confirm 
      open={showConfirm} 
      onCancel={onOpenCloseConfirm} 
      onConfirm={isDelete ? onDeleteUser : onActivateDesactivate} 
      content={confirmMessage} 
      size="mini" 
    />
    </>
  )
}
