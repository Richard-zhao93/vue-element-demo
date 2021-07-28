<template>
  <div class="login-container">
      <!-- 登录表单部分 Start -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="100px" class="login-form">
        <!-- 标题 Start -->
        <div class="title-container">
          <h3 class="title">Login From</h3>
        </div>
        <!-- 标题 End -->

      <el-form-item prop="username" label-width="0">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" type='text' tabindex="1" autocomplete="on"></el-input>
      </el-form-item>

      <el-form-item prop="password" label-width="0">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input ref="password" v-model="loginForm.password" placeholder="Password" :type=passwordType></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType ? 'eye-open' : 'eye'"></svg-icon>
        </span>
      </el-form-item>

      <el-button type="primary" @click="handleLogin" :loading=loading>Login</el-button>
    </el-form>
    <!-- 登录表单部分 End -->
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  data () {
    const validateUsername = (rule, value, cb) => {
      if (!validUsername(value)) {
        cb(new Error('Please enter the correct user name'))
      } else {
        cb()
      }
    }

    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false
    }
  },
  mounted () {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    /**
     * 密码显示与隐藏切换
     */
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }

      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    /**
     * 点击 Login 按钮后的，登录逻辑
     * TODO:
     */
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.loading = true
          // 路由跳转
          this.$router.push('/')
        } else {
          console.log('error submit')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

.login-container {
  .el-input {
    display: inline-flex;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, .1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .el-button {
    width: 100%;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
