import Vue from 'vue'

import {
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  Message
} from 'element-ui'

const components = [
  Button,
  Dialog,
  Form,
  FormItem,
  Input
]

components.forEach(component => {
  Vue.use(component)
})

Vue.prototype.$message = Message
