<template>
  <div>
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'RuoYiDoc',
  data() {
    return {
      url: 'https://kfuhp54gft.feishu.cn/docx/EeqWdTxhRocYjrxLuWScvCRUnZd?from=from_copylink'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
