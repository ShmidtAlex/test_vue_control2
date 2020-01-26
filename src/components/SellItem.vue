<template>
  <div class="component_wrapper">
    <div class="input-wrapper">
     <input :id="'input' + index" class="standart_view" :type="runningType" min="0" 
        :tabindex="index + 1" 
        @keyup="validateInput" 
        @keypress="changeFormat"
        @focus="expandInput" 
        @blur="treatInputData" 
        @keydown="saveAndTab"
        :class="{expanded: expandStatus}"  
        :placeholder="initialPlaceholderVal" 
        :value="value"
        autocomplete="off" 
      />
       <span v-if="!expandStatus" class="arrow_container"></span>
       <span v-else class="value_arrows">
         <span @click="increase" @mouseover="stayInFocus" @mouseleave="noBlur = false" class="increment"></span>
         <span @click="decrease" @mouseover="stayInFocus" @mouseleave="noBlur = false"  class="decrement"></span>
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
    twinData: String,
    type: String,
    isExpand: Boolean,
    flagState: Boolean
  },
  data: function(){
    return {
      initialPlaceholderVal: '0',
      isExpandLocal: false,
      recordedVal: this.$store.state.runningVal ? this.$store.runningVal : null,
      defaultVal: '1 000',
      typeLocal: 'number',
      noBlur: false
    }
  },
  mounted: function() {
    
  },
  watch: {
    value: function(newVal) {
      if(this.index > 0) {
        // console.log(newVal)
        let commitMethodName = 'changeControlValue' + this.index;
        this.$store.commit(commitMethodName, newVal);
      }
    }
  },
  computed: {
    value: function() {
      if(this.twinData === null && this.index > 0 || this.index === 0) {
        return this.recordedVal;
      } else {
        return this.twinData;
      }
    },
    expandStatus:function(){
      if(this.isExpand && this.index > 0){
        return this.isExpand;
      } else {
        return this.isExpandLocal;
      }
    },
    runningType: function(){
      if(this.type) {
        return this.type;
      } else {
        return this.typeLocal;
      }
    }
  },
  methods: {
    // прямые
    validateInput: function(event) {
      let regPattern = /[0-9]/g;
      let key = event.keyCode;
      let eventVal;
          eventVal = event.target.value;
          this.recordedVal = eventVal;
      if(key === 44 || key === 46 || key === 101 ) {
        event.returnValue = false;
        if(event.preventDefault) {
          event.preventDefault();
        }
      }
      if(this.index > 0) {
        this.$emit('dataChange', eventVal);
      }
    },
    changeFormat: function() {
      let eventVal = event.target.value;
      let key = event.keyCode;
      if (eventVal !== '' && eventVal !== 0 && key === 13) {
        // console.log(true);
        this.changeInputType(event.target, 'text');
        this.recordedVal = this.transformStringToSeparate(eventVal);
        if(this.index > 0) {
          this.$emit('dataChange', this.recordedVal);
          this.$emit('typeChange', 'text');
        }
      } 
    },
    expandInput: function(){
      if(this.$store.state.runningVal && this.index > 0) {
        this.recordedVal = this.$store.state.runningVal;
      }
      this.isExpandLocal = true;
      if(!this.flagState) {
        this.changeInputType(event.target, 'number');
      }
      if(this.recordedVal) {
        event.target.value = this.convertValueToNumber(this.recordedVal);
      }
    },
    treatInputData: function(){
      if(!this.flagState && !this.noBlur) {
        this.recordedVal = null;
        this.$emit('dataChange', null);
        this.isExpandLocal = false;
      }
    },
    saveAndTab: function() {
      let key = event.keyCode;
      let eventVal = event.target.value;
      if (eventVal !== '' && eventVal !== 0 && key === 9 ) {
        this.$emit('setTabFlag', true)
        this.changeInputType(event.target, 'text');
        this.recordedVal = this.transformStringToSeparate(eventVal);
        if(this.index > 0) {
          this.$emit('typeChange', 'text');
          this.$emit('dataChange', this.transformStringToSeparate(eventVal));
        }
      } 
    },
    stayInFocus:function() {
      this.noBlur = true;
    },
    increase: function(){
      document.querySelectorAll('.standart_view')[this.index].focus();
      let increasingVal = this.convertValueToNumber(this.value);
      document.querySelectorAll('.standart_view')[this.index].focus();
        increasingVal++;
        this.recordedVal = increasingVal;
        if(this.index > 0) {
          this.$emit('dataChange', this.recordedVal.toString());
          this.$emit('typeChange', '');
        }
    },
    decrease: function(){
      document.querySelectorAll('.standart_view')[this.index].focus();
      let decreasingVal = this.convertValueToNumber(this.value);
      document.querySelectorAll('.standart_view')[this.index].focus();
          decreasingVal--;
      this.recordedVal = decreasingVal;
      if(this.index > 0) {
          this.$emit('dataChange', this.recordedVal.toString());
          this.$emit('typeChange', '');
        }
    },
    summValue: function() {
      let control1 = this.convertValueToNumber(this.$store.state.control1);
      let control2 = this.convertValueToNumber(this.$store.state.control2);
          this.recordedVal = control1 + control2;
          this.isExpandLocal = true;
    },
    fillWithDefaultValue: function() {
      let commitMethodName = 'changeControlValue' + this.index;
      this.recordedVal = this.defaultVal;
      if(this.index > 0){
        this.$emit('dataChange', this.defaultVal);
        this.$emit('typeChange', 'text');
        this.$store.commit(commitMethodName, this.defaultVal);
        this.$store.commit('changeRunningVal', this.defaultVal);
      }

    },
    //служебные:
    convertValueToNumber: function(convertedVal){
      if(convertedVal === null) {
        console.log('save value with tab or enter key before count summ!!!');
        return;
      } 
      if( typeof convertedVal !== 'number') {
        convertedVal = convertedVal.split(' ').join('');
        return Number(convertedVal);
      } else {
        return convertedVal;
      }
    },
    transformStringToSeparate: function(str) {
      if (typeof str !== 'string') {
        str = str.toString();
      }
      let parts = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        return parts;
    },
    changeInputType: function(eventElem, type) {
      eventElem.setAttribute('type', type);
    },
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
