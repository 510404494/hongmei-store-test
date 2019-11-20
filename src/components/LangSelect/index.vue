<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'

@Component({
  name: 'Login'
})
export default class extends Vue {
  get language () {
    return AppModule.language
  }

  private handleSetLanguage(lang: string) {
    this.$i18n.locale = lang
    AppModule.SetLanguage(lang)
    this.$message({
      message: 'Switch Language Success',
      type: 'success'
    })
  }
}
</script>
