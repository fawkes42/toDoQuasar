<template>
    <q-card class="my-card bg-grey-2 text-white">
      <q-card-section>
        <slot name="header"/>
      </q-card-section>
      <q-card-section>
        <slot name="content"></slot>
      </q-card-section>
      <q-separator dark />
      <q-card-actions>
        <slot name="footer"></slot>
      </q-card-actions>
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
</style>
