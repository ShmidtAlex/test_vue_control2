<template>
  <div class="hello">
    <h1>This is the test work</h1>
    <h3>For checking how it's working, click on 'Test" link</h3>
    <!--  for reusing the component on main page uncomment next element -->
    <!-- <control-group /> -->
  </div>
</template>

<script>

import controlGroup from '../components/controlGroup';

export default {
  name: "HelloWorld",
  components: {
    controlGroup
  },
  props: {
    msg: String
  },
  data: function(){
    return {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
