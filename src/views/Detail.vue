<template>
    <div>
        <ErrorsTableItem :item="item" :id="id" mode="details"></ErrorsTableItem>
    </div>
</template>

<script>
    import ErrorsTableItem from "@/components/ErrorsTableItem";
    import axios from "axios";
    export default {
        name: "Detail",
        props: ['id'],
        data: function(){
            return{
                item: {}
            }
        },
        components: {ErrorsTableItem},
        mounted() {
            axios.get( (window.$elmah_root || '/elmah') +'/api/error?id='+ this.id)
                .then(response => {
                    this.item = response.data.error;
                })
                .catch(error => {
                    console.log(error)
                    this.$bvToast.toast("Data loading error.", {
                        variant: 'danger', solid: true,noCloseButton: true,autoHideDelay: 2000});
                })
        }
    }
</script>

<style scoped>

</style>