import Vue from 'vue'

import {
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  RadioGroup,
  RadioButton,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup
} from 'element-ui'

const components = [
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  Container,
  Header,
  Aside,
  Main,
  RadioGroup,
  RadioButton,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup
]

components.forEach(component => {
  Vue.use(component)
})

Vue.prototype.$message = Message
