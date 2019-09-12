<template>
    <q-card class="my-card transparent text-grey-4">
      <q-card-section>
        <slot name="header"/>
      </q-card-section>
      <q-card-section>
        <slot name="content"></slot>
      </q-card-section>
      <q-card-section>
        <slot name="footer"></slot>
      </q-card-section>
    </q-card>
</template>

<script>
export default ({
  name: 'card',
  data () {
    return {
    }
  },
  props: [
    'lorem'
  ]
})
</script>

<style lang="stylus">
  .my-card
    padding 20px
    width 50%
    border none
    box-shadow none
</style>
