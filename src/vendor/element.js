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
  MenuItemGroup,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Pagination,
  Switch,
  Breadcrumb,
  BreadcrumbItem
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
  MenuItemGroup,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Pagination,
  Switch,
  Breadcrumb,
  BreadcrumbItem
]

components.forEach(component => {
  Vue.use(component)
})

Vue.prototype.$message = Message
