<template>
    <div class="items-table" >
        <div class="head-row">
            <div class="head-col host-col">Host</div>
            <div class="head-col request-info">Request Info</div>
            <div class="head-col code-col">Code</div>
            <div class="head-col type-col">Type</div>
            <div class="head-col message-col ">Error</div>
            <div class="head-col method-col">Method</div>
            <div class="head-col url-col">URL</div>
            <div class="head-col user-col">User</div>
            <div class="head-col time-col">When</div>
        </div>
        <div id="items-container" tabindex="0" v-on:scroll="scroll" :class="{loading: loading}">
            <template v-for="(item, index) in items">
                <ErrorsTableItem :class="{gray: index % 2 === 0 }" v-bind:item="item.error" v-bind:log="item.log"
                                 v-bind:id="item.id" v-bind:key="item.id"></ErrorsTableItem>
            </template>
        </div>
        <div class="footer">Loaded <span>{{items.length || 0}}</span> of <span>{{totalCount}}</span></div>
    </div>
</template>

<script>
    import ErrorsTableItem from "@/components/ErrorsTableItem";
    import axios from 'axios'

    export default {
        name: "ErrorsTable",
        components: { ErrorsTableItem},
        data: function(){
            return{
                items: [],
                totalCount: 0,
                loading: false,
                errporIndex: 0,
                loaded: false,
                loadNewTimerStarted: false
            }
        },
        computed: {
            listBox: function () {
                return document.getElementById("items-container");
            }
        },
        created() {
            window.addEventListener("resize", this.handleResize);
        },
        destroyed() {
            window.removeEventListener("resize", this.handleResize);
        },
        mounted() {
            this.handleResize();
            // eslint-disable-next-line no-undef
            axios.get( (window.$elmah_root || '/elmah') +'/api/errors?p=0&s=50')
                .then(response => {
                    this.items = response.data.errors;
                    this.errporIndex += response.data.errors.length;
                    this.totalCount = response.data.totalCount;
                })
                .catch(error => {
                    console.log(error)
                    this.$bvToast.toast("Data loading error.", {
                        variant: 'danger', solid: true,noCloseButton: true,autoHideDelay: 2000});
                })
                .finally(() => {
                    if (!this.loadNewTimerStarted){
                        this.loadNewTimerStarted = true;
                        setTimeout(() => ( this.loadNewErrors(this) ), 5000)
                    }
                });
            this.listBox.focus();
        },
        methods: {
            loadNewErrors(ctx) {
                let id = ctx.items.length > 0 ? ctx.items[0].id : "";
                // eslint-disable-next-line no-undef
                axios.get((window.$elmah_root || '/elmah') + '/api/new-errors?id='+id)
                    .then(response => {
                        if (response.data && response.data.errors && response.data.errors.length > 0) {
                            ctx.items = response.data.errors.concat(ctx.items);
                            this.totalCount = response.data.totalCount;
                            this.errporIndex += response.data.errors.length;
                            this.$bvToast.toast(`${response.data.errors.length} new error(s) loaded.`, {
                                variant: 'warning',
                                solid: true,
                                noCloseButton: true,
                                autoHideDelay: 2000
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.$bvToast.toast("Data loading error.", {
                            variant: 'danger', solid: true,noCloseButton: true,autoHideDelay: 2000});
                    })
                    .finally(() => (setTimeout(() => ( this.loadNewErrors(ctx) ), 5000)));
            },
            handleResize() {
                    if (!this.listBox) return;
                    const height = window.innerHeight - this.listBox.offsetTop - 30;
                    this.listBox.style.height = height + "px";
                },
            scroll() {
                if (!this.listBox) return;
                this.listBox.onscroll = () => {
                    if (this.loading || this.loaded) return;

                    let bottomOfWindow = this.listBox.scrollTop + this.listBox.clientHeight === this.listBox.scrollHeight;

                    if (bottomOfWindow) {
                        this.loading = true;
                        // eslint-disable-next-line no-undef
                        axios.get((window.$elmah_root || '/elmah') +'/api/errors?i=' + this.errporIndex + '&s=50')
                            .then(response => {
                                if (response.data && response.data.errors.length > 0)
                                    this.errporIndex += response.data.errors.length;
                                else
                                    this.loaded = true;
                                this.loading = false;
                                this.items = this.items.concat(response.data.errors);
                                this.totalCount = response.data.totalCount;
                            })
                            .catch(error => {
                                this.loading = false;
                                console.log(error)
                                this.$bvToast.toast("Data loading error.", {
                                    variant: 'danger', solid: true,noCloseButton: true,autoHideDelay: 2000});
                            })
                    }
                }
            }
        }
    }
</script>

<style>
    #items-container.loading .data-row {
        cursor:wait !important;
    }
    .gray .data-row {
        background-color: #f9f9f9;
    }
</style>

<style scoped>
    .footer {
        text-align: right;
        font-size: 13px;
    }
    .footer span {
        font-weight: 600;
    }
    #items-container:focus {
        outline: none;
    }
    #items-container.loading {
        cursor: wait !important;
    }
    #items-container  {
        overflow-y:auto;
    }

.head-row {
    border-left: 10px solid #ddd;
    display: flex;
    flex-direction: row;
}
.head-col {
    padding: 6px;
    font-size: 13px;
    font-weight: 600;
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 2px solid #ddd;
    cursor: pointer;
    word-break:break-all;
}
.head-col:hover{
    background-color: #f8f8f8;
}
    .time-col {
        flex-basis: 140px;
        flex-shrink: 0;
    }
    .method-col {
        flex-basis: 60px;
        flex-shrink: 0;
    }
    .url-col {
        width: calc(20%);
    }
    .code-col {
        flex-basis: 50px;
        flex-shrink: 0;
    }
    .host-col {
        flex-basis: 120px;
        flex-shrink: 0;
    }
    .type-col {
        width: calc(25%);
    }
    .message-col {
        width: calc(40%);
    }
    .user-col {
        flex-basis: 120px;
        flex-shrink: 0;
    }
    @media screen and (max-width: 780px) {
        .head-row {
            display: none;
        }
    }
</style>