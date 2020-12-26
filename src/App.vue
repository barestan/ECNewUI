<template>
 <div id="app">
     <div>
         <b-navbar toggleable="lg" type="dark" variant="dark">
             <b-navbar-brand href="#">ElamhCore</b-navbar-brand>

             <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

             <b-collapse id="nav-collapse" is-nav>
                 <b-navbar-nav>
                     <b-nav-item :to="(elmah_root || '/elmah') + '/errors'">Errors</b-nav-item>
                     <b-nav-item target="_blank" :href="(elmah_root || '/elmah') + '/rss'">RSS Feeds</b-nav-item>
                     <b-nav-item target="_blank" :href="(elmah_root || '/elmah') + '/digestrss'">RSS Digest</b-nav-item>
                     <b-nav-item target="_blank" :href="(elmah_root || '/elmah') + '/download'">Download Log</b-nav-item>
                     <b-nav-item target="_blank" :href="'https://github.com/ElmahCore/www'">Help</b-nav-item>
                     <b-nav-item :to="(elmah_root || '/elmah') + '/about'">About</b-nav-item>
                 </b-navbar-nav>
             </b-collapse>
         </b-navbar>
     </div>

     <router-view></router-view>
 </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: function (){
      return {
          appName: "ElmahCore"
      }
  },
  computed: {
      elmah_root: function () {
            return window.$elmah_root;
      }
  }
}
</script>
<style  lang="scss">
    @import 'node_modules/bootstrap/scss/bootstrap.scss';
    @import 'node_modules/bootstrap-vue/src/index.scss';
    @import url('https://fonts.googleapis.com/css?family=Roboto');
    body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    html, body{
        overflow-y:hidden;
    }
</style>
