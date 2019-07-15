<template>
  <div class="login-container">
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 登录表单 -->
      <el-form ref="loginForm" :status-icon="true" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 校验手机号
    const checkMobile = (rule, value, callback) => {
      // 校验逻辑 把value拿出来进行手机号的校验
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('格式错误'))
      }
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 表单验证规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位数', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    login () {
    //   // 对整个表单进行校验
    //   this.$refs.loginForm.validate(valid => {
    //     if (valid) {
    //       // 提交登录请求 axios是基于promi封装的 post()返回值是一个promise对象
    //       this.$http.post('authorizations', this.loginForm).then(res => {
    //         // res是响应对象 包含后台返回的数据 res.data就是响应主题的内容
    //         // 通过js代码跳路由是编程式导航 不用router-link跳路由
    //         // 用sessionStorage保存taken数据 全局BOM对象
    //         window.sessionStorage.setItem('hm74-toutiao', JSON.stringify(res.data.data))
    //         this.$router.push('/')
    //       })
    //         .catch(() => {
    //           // 提示
    //           this.$message.error('手机号或验证码错误')
    //         })
    //     }
    //   })
    // }
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // 发promise对象请求
          try {
          // 先登录 拿到登录的结果
            const res = await this.$http.post('authorizations', this.loginForm)
            // 存数据
            window.sessionStorage.setItem('hm74-toutiao', JSON.stringify(res.data.data))
            // 跳路由
            this.$router.push('/')
          } catch (err) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}

</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login-box {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
  }
}
</style>
