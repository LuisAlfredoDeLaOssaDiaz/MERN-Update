import { Tab } from "semantic-ui-react";

export const panes = [
    {
      menuItem: "Entrar",
      render: () => (
        <Tab.Pane>
          <h2>Login FORM</h2>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Nuevo Usuario",
      render: () => (
        <Tab.Pane>
          <h2>Register FORM</h2>
        </Tab.Pane>
      )
    }
  ]