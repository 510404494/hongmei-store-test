<template>
  <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <el-row class="top_head">
      <img class="head_logo" src="../assets/Logo.png"  height="23"  width="252"/>
      <div class="head_title">虹美智能管理平台</div>
      <div class="button_box">
        <a href="http://220.178.73.123:8011"><input type="button" class="button w120" value="虹美智能官网"></a>
      </div>
    </el-row>
    <el-row class="content_box">
      <el-col :span="12" class="box_left">
      </el-col>
      <el-col :span="12" class="box_right">
        <div id="login_form">
          <div id="login_label">账号登录</div>
          <el-form-item prop="account">
            <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item >
            <el-col :span="12">
              <el-form-item prop="captcha">
                <el-input type="test" v-model="loginForm.captcha" auto-complete="off" placeholder="验证码, 单击图片刷新"
                          style="width: 100%;">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item>
                <img style="width: 100%;" class="pointer" :src="loginForm.src">
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" >登 录</el-button>
          </el-form-item>
        </div>

      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Dictionary } from 'vuex'
import { Form as ElForm, Input } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import { isValidUsername } from '@/utils/validate'

@Component({
  name: 'Login',
  components: {
  }
})
export default class extends Vue {
    private loading = false
    private loginForm= {
      account: '',
      password: '',
      captcha: '',
      src: ''
    }
    private fieldRules={
      account: [{
        required: true,
        message: '请输入账号',
        trigger: 'blur'
      }],
      password: [{
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      }]
    }
    checked= true

  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (!isValidUsername(value)) {
      callback(new Error('Please enter the correct user name'))
    } else {
      callback()
    }
  }
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error('The password can not be less than 6 digits'))
    } else {
      callback()
    }
  }
  private loginRules = {
    username: [{ validator: this.validateUsername, trigger: 'blur' }],
    password: [{ validator: this.validatePassword, trigger: 'blur' }]
  }
  private passwordType = 'password'
  private showDialog = false
  private redirect?: string
  private otherQuery: Dictionary<string> = {}

  @Watch('$route', { immediate: true })
  private onRouteChange (route: Route) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  mounted () {
  }

  private showPwd () {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      (this.$refs.password as Input).focus()
    })
  }

  private getOtherQuery (query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as Dictionary<string>)
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    margin: 0 auto;
    position: relative;
    top: 45%;
    transform: translateY(-50%);
    width: 800px;
    height: 500px;
    background: #fff;
    /*border: 1px solid #eaeaea;*/
    /*box-shadow: 0 0 25px #cac6c6;*/

  }
  .top_head{
    height: 60px;
  }
  .head_logo{
    float: left;
    height: 40px;
    padding-top: 6px;
  }
  .head_title{
    margin-left: 10px;
    float: left;
    font-size: 20px;
    font-weight: bold;
    width: 180px;
    padding-top: 18px;
  }
  .button_box{
    float:right;
    margin-right:20px;
    width:100px;
    height:38px;
    padding:10px;
  }
  .button{
    height:38px;
    background:#0099FF;
    color:white;
    border-radius:5px;
    border:none;
    font-size:16px;
  }
  .w120 {
    width: 120px;
  }

  .content_box{
    border-radius: 8px;
    height: 439px;
    width: 100%;
    border: solid #E4E4E4 1px;
    background-image:url("../assets/bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .box_left{
    float: left;
    width: 50%;
    height: 100%;
    border-right: solid #E4E4E4 1px;
  }
  .box_right {
    float: left;
    height: 100%;
    background: white;
  }

  .el-button--primary {
    color: #fff;
    background-color: #1769FF;
    border-color: #1769FF;
  }
  #login_form {
    float: left;
    width: 300px;
    height: 400px;
    margin: 20px 49px 20px 49px;
  }
  #login_label {
    width: 150px;
    height: 40px;
    font-size: 22px;
    font-weight: bold;
    color: black;
    margin-top: 40px;
  }
</style>
