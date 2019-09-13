<template>
    <q-card class="row col-12 my-card transparent text-grey-4">
      <div class="col-12">
        <q-card-section>
          <slot name="content"></slot>
        </q-card-section>
      </div>
      <div class="col-12">
        <q-card-section>
          <slot name="footer"></slot>
        </q-card-section>
      </div>
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
    border none
    box-shadow none
</style>
