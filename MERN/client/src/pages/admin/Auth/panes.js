import { Tab } from "semantic-ui-react";
import { RegisterForm } from "../../../components/Admin/Auth"
import { LoginForm } from "../../../components/Admin/Auth/LoginForm/LoginForm";


export function fpanes(openLogin) {
  const panes = [
    {
      menuItem: "Entrar",
      render: () => (
        <Tab.Pane>
          <LoginForm />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Nuevo Usuario",
      render: () => (
        <Tab.Pane>
          <RegisterForm openLogin={openLogin} />
        </Tab.Pane>
      )
    }
  ]

  return panes
}
