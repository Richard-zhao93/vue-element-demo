import Vue from 'vue'

import {
  Button,
  Dialog
} from 'element-ui'

const components = [
  Button,
  Dialog
]

components.forEach(component => {
  Vue.use(component)
})
