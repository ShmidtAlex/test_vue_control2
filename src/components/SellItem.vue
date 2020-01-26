<template>
  <div class="component_wrapper">
    <div class="input-wrapper" >
     <input :id="'input' + index" class="standart_view" type="text" min="0" 
        @keypress="validateInput" 
        @focus="expandInput" 
        @blur="treatInputData" 
        @keydown="saveAndTab"
        @mouseup="fillValue"
        :class="{expanded: expandStatus}"  
        :placeholder="initialPlaceholderVal" 
        :value="inputVal" 
      />
       <span v-if="!expandStatus" class="arrow_container"></span>
       <span v-else class="value_arrows">
         <span @click="increase" class="increment"></span>
         <span @click="decrease" class="decrement"></span>
       </span>
    </div>
    <button class="defaultBut" v-if="index === 0" @click="summValue">Summ</button>
    <button class="defaultBut" v-if="index === 1" @click="fillWithDefaultValue">million</button>
  </div>
  
</template>

<script>
export default {
  name: "SellItem",
  props: {
    index: Number,
    twinData: String
  },
  data: function(){
    return {
      initialPlaceholderVal: '0',
      isExpand: false,
      // recordedVal: this.index === 0 ? null : this.$store.state.runningVal,
      recordedVal: null,
      defaultVal: '1 000',
    }
  },
  //  watch: {
  //   input_1Val: function(newVal, oldVal) {
  //     this.$store.commit('changeControlValue1', newVal);
  //   },
  // },
  computed: {
    inputVal: function() {
      let commitName = 'changeControlValue' + this.index;
      if (this.index > 0 && this.twinData) {
        // this.$store.commit(commitName, this.twinData);
        this.$store.commit(commitName, this.twinData);
        return this.twinData;
      }else if (this.index > 0 && !this.twinData){
        return this.recordedVal;
      }
       else {
        this.$store.commit(commitName, this.recordedVal);
        return this.recordedVal;
      }
      
    },
    expandStatus: function() {
      if(this.inputVal === this.defaultVal) {
        this.isExpand = true;
      }
      return this.isExpand;
    },
  },
  methods: {
    expandInput: function(){
      let eventElem = event.target;
      if (this.recordedVal) {
          this.changeInputType(event.target, 'text');
          event.target.value = this.recordedVal;
      } else {
         eventElem.setAttribute('placeholder', '');
      }
        this.changeInputType(event.target, 'number');
        this.isExpand = true;
    },

    summValue:function() {
      let self = this;
      let control0 = this.transformToNumber(this.inputVal);
      let control1 = this.transformToNumber(this.$store.state.control1);
      let control2 = this.transformToNumber(this.$store.state.control2);
      this.recordedVal = control0 + control1 + control2;
      this.isExpand = true;
    },

    transformToNumber: function(val) {
      let transformedVal;
      if(val === null) {
        return 0;
      } else if (typeof val === 'number') {
        return val;
      }
       else {
        transformedVal = val.split(' ').join('');
        return Number(transformedVal);
      }
    },

    fillValue: function(){
      let transformedVal;
      if(typeof this.recordedVal === 'string') {
        transformedVal = this.recordedVal.split(' ').join('');
         event.target.value = Number(transformedVal);
      } else {
        transformedVal = this.recordedVal;
      }
    },

    fillWithDefaultValue: function() {
      this.recordedVal = this.defaultVal;
      if(this.index > 0) {
        this.$emit("dataChange", this.defaultVal);
      }
    },

    validateInput: function(event) {
      let regPattern = /[0-9]/g;
      let key = event.keyCode;
      let eventVal;
       if(!this.recordedVal) {
        eventVal = event.target.value;
          if(key === 44 || key === 46 || key === 101 ) {
            event.returnValue = false;
            if(event.preventDefault) {
              event.preventDefault();
            }
          } else {
            if (this.index > 0) {
              this.$emit("dataChange", eventVal);
              this.recordedVal = this.numberWithSpaces(eventVal);
            }
          }
       } else {
        eventVal = this.recordedVal;
        // this.$emit("dataChange", eventVal);
       }
      if (eventVal !== '' && eventVal !== 0 && key === 13) {
        this.changeInputType(event.target, 'text');
        this.recordedVal = this.numberWithSpaces(eventVal);
      } 
    },

    saveAndTab: function() {
      let key = event.keyCode;
      let eventVal = event.target.value;
      if (eventVal !== '' && eventVal !== 0 && (key === 9) ) {
        this.changeInputType(event.target, 'text');
        this.recordedVal = this.numberWithSpaces(eventVal);
      } 
    },

    increase: function(){
      let transformedVal;
      document.querySelectorAll('.standart_view')[this.index].focus();
      if(typeof this.recordedVal === 'string') {
        transformedVal = this.recordedVal.split(' ').join('');
         this.recordedVal = Number(transformedVal);
         transformedVal = this.recordedVal;
         this.recordedVal++;
      } else {
        transformedVal = this.recordedVal;
        this.recordedVal++;
      }
    },

    decrease: function() {
      let transformedVal;
      document.querySelectorAll('.standart_view')[this.index].focus();
      if(typeof this.recordedVal === 'string') {
        transformedVal = this.recordedVal.split(' ').join('');
        this.recordedVal = Number(transformedVal);
        transformedVal = this.recordedVal;
        this.recordedVal--;
      } else {
        transformedVal = this.recordedVal;
        this.recordedVal--;
      }
    },

    numberWithSpaces: function(inputValue) {
      if (typeof inputValue === 'number') {
        inputValue = inputValue.toString();
      }
      let parts = inputValue.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");//explanation
        return parts[0];
    },

    changeInputType: function(eventElem, type) {
      eventElem.setAttribute('type', type);
    },
    
    treatInputData: function() {
      let inputVal;
      let numberLength;
          inputVal = event.target.value;
     
      this.changeInputType(event.target, 'text');

        if (inputVal || inputVal.length) {
          numberLength = inputVal.length*10;
          event.target.style.minWidth = `${numberLength}px`;
        } else {
          event.target.setAttribute('placeholder', this.initialPlaceholderVal);
          event.target.style.minWidth = '0px';
          // this.recordedVal = null;
          // this.isExpand = false;
        }  
        if(this.recordedVal === null){
          this.isExpand = false;
          event.target.style.minWidth = '0px';
          event.target.setAttribute('placeholder', this.initialPlaceholderVal);
        } else {
          this.isExpand = true;
        }
        
          event.target.value = this.numberWithSpaces(inputVal);
          
    }
  }
};
</script>
<style scoped>
  .component_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }
  .input-wrapper {
    width: fit-content;
    width: -moz-max-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
  } 
  .defaultBut {
    color: blue;
    border: none;
    height: 25px;
    font-size: 13px;
    outline: none;
  }
</style>
