<template>
  <div class="about">
    <h1>This is a test page</h1>
    <div class="controls_wrapper_block">
      <h3>Here are three controls</h3>
      <div class="controls_themselvs">
        <div v-for="(sellItem, index)  in sellItems"  :key="index" class="control">
          <SellItem @setTabFlag="turnFlag" @dataChange="isInputData" @typeChange="isTypeChanged" :flagState="flagState"  :isExpand="isExpand" :type="parentType" :twinData="twinData" :index="index" />
        </div>
      </div>
    </div>
 </div>
</template>

<script>

  import SellItem from '../components/SellItem';

  export default {
    components: {
      SellItem
    },
    data: function() {
      return {
         value1: this.$store.state.control1,
         value2: this.$store.state.control2,
         value3: this.$store.state.control3,
         parentType: '',
         sellItems: 3,
         twinData: null,
         tabFlag: false
      }
    },
    mounted: function(){
        var inputsArr = document.querySelectorAll('INPUT');
       
        inputsArr.forEach(function(elem){
          elem.addEventListener("keydown", e => {
            // console.log(e.keyCode);

          });
          elem.addEventListener("keyup", e => {
            // console.log(e.keyCode);

          });
          elem.addEventListener("keypress", e => {
            // console.log(e.keyCode);
          });
        })
    },
   
   
    computed: {
      modifiedData: function() {
        return this.twinData;
      },
      isExpand: function() {
        if(this.twinData) {
          return true;
        }
      },
      flagState: function() {
        return this.tabFlag;
      }
    },
    methods: {
      isInputData: function(data) {
        this.twinData = data;
      },
      isTypeChanged: function(data) {
        this.parentType = data;
      },
      turnFlag: function(data) {
        this.tabFlag = data;
      }
    } 
  }
  
</script>
<style>
.controls_themselvs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100px;
  min-height: fit-content;
  min-height: -moz-max-content;

}
  .standart_view {
    max-width: fit-content;
    max-width: -moz-max-content;
    border: 1px solid rgba(0, 0, 0, .3 );
    height: 100%;
    font-size: 15px;
    width: 30px;
    padding-left: 5px;
  }
  .standart_view.expanded {
    width: 100px;
  }
  input::-webkit-inner-spin-button {  
    -webkit-appearance: none;    
    display: block;    
    width: 10px;    
    opacity: 1;  
    background-color: red;
  }
  .standart_view:hover {
    color: blue;
    border: 1px solid rgba( 50, 50, 150, .5);
  }
  /*PLACEHOLDER STYLES*/
  .standart_view:hover::-webkit-input-placeholder {
    color:rgba(0, 0, 255, 0.8);
  }
  .standart_view:hover::-moz-placeholder {
    color:rgba(0, 0, 255, 0.8);
  }
  .standart_view:hover:-moz-placeholder {
    color:rgba(0, 0, 255, 0.8);
  }
  .standart_view:hover:-ms-input-placeholder {
    color:rgba(0, 0, 255, 0.8);
  }
  ::-webkit-input-placeholder {
    color:rgba(0, 0, 0, 0.9);
  }
  ::-moz-placeholder {
    color:rgba(0, 0, 0, 0.9);
  }
  :-moz-placeholder {
    color:rgba(0, 0, 0, 0.9);
  }
  :-ms-input-placeholder {
    color:rgba(0, 0, 0, 0.9);
  }
  .standart_view:hover ~.arrow_container {
    background-image: url(../../public/img/icons/arrow_dropdown_sign2.svg);
    position: absolute;
    right: 2px;
    top: 3px;
  }
  .input-wrapper {
    position: relative;
    height: 25px;
  }
  .arrow_container {
    background-image: url(../../public/img/icons/arrow_dropdown_sign.svg);
    background-size: cover;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 2px;
    top: 3px;
  }
  .value_arrows {
    position: absolute;
    right: 4px;
    top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 13px;
    height: 25px;
  }
  .increment,
  .decrement {
    height: 50%;
    width: 13px;
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .increment {
    background-image: url(../../public/img/icons/angle-up.svg);
    background-size: cover;
    left: 0;
    top: 0px;
  }
  .decrement {
    background-image: url(../../public/img/icons/angle-down.svg);
    background-size: cover;
    left: 0;
    bottom: 0px;
  }
  .standart_view:hover ~.value_arrows .decrement {
    background-image: url(../../public/img/icons/angle-down_blue.svg);
    background-size: cover;
  }
  .standart_view:hover ~.value_arrows .increment {
    background-image: url(../../public/img/icons/angle-up_blue.svg);
    background-size: cover;
  }

  

</style>