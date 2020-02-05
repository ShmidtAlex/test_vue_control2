<!-- reused component -->
<template>
  <div class="controls_themselvs">
    <div class="control">
       <div class="component_wrapper">
        <div class="photo_block" >
          <div class="hidden_border" :class="{blue_border: focusedColor}"></div>
          <div class="icon"></div>
        </div>
        <div class="input_block">
          <div class="title" :class="{blue_color: focusedColor}">HUG IS</div>
          <div class="input-wrapper"> 
             <input id="exactInput" class="standart_view" :type="typeLocal"
                @keyup="pushWholeValue"
                @keypress="changeFormat"
                @focus="changeColor" 
                @blur="treatInputData" 
                @input="checkLength"
                
                :placeholder="initialPlaceholderVal" 
                :value="value"
                autocomplete="off" 
              />
              <div class="measure_items_wrapper">
                <div class="measure_items">hours old</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "controlGroup",
  props: {
    
  },

  data: function(){
    return {
      initialPlaceholderVal: '0',
      typeLocal: 'string',
      focusedColor: false,
      recordedVal: null,
      transformedVal: '',
      globalDefinedCaretPosition: null,
      factor: 0
    }
  },
  computed: {
    value: function() {
      if(this.transformedVal) {
        return this.transformedVal;
      } 
    },
  },

  methods: {
    // checkClickedSelectionStart: function() {
    //   var position = event.target.selectionStart;
    //   console.log(position);
    //   if(event.target.value.length > 0) {
    //     this.$nextTick(function() {
    //       console.log("worked");
    //       this.globalDefinedCaretPosition = position;
    //     })
    //   }
      
    // },
    changeFormat: function() {
      let eventVal = event.target.value;
      let key = event.keyCode;  
      this.recordedVal = event.target.value;     
      this.validateInput(key); 
    },

    checkLength: function(){
      if (this.transformedVal.length >= 7 && event.inputType !== 'deleteContentBackward'){
        event.target.style.width = (event.target.scrollWidth + 4) + "px";
      } else if (this.transformedVal.length > 7 && event.inputType === 'deleteContentBackward') {
        event.target.style.width = (this.transformedVal.length *7) + 'px';
      }
    },

    pushWholeValue: function(){
      let caretPosition = event.target.selectionStart;
      this.transformedVal = event.target.value.toString().split(' ').join('').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      
      this.factor = this.transformedVal.length - this.transformedVal.split(' ').join('').length;

      if(this.factor > 0 && caretPosition === this.transformedVal.length-1) {
        caretPosition += this.factor;
      }
      this.$nextTick(() => {
        event.target.selectionStart = event.target.selectionEnd = caretPosition;
      });
    },

    changeColor: function(){
      this.focusedColor = true;
    },

    treatInputData: function(){
      this.focusedColor = false;
      this.recordedVal = this.transformedVal;
    },
    
    validateInput: function(key) {
      if (key < 48 || key > 57){
        event.returnValue= false;
      }
    },


  }
};
</script>
<style>
* {
  box-sizing: border-box;
}
.controls_themselvs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.control {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 333px;
  height: 103px;
  border: 1px solid #94949d;
}
.component_wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 309px;
  height: 55px;
  position: relative;
}
.photo_block {
  position: relative;
}
.icon {
  background-image: url(../../public/img/hugh.png);
  background-size: contain;
  background-repeat: no-repeat;
  width: 55px;
  height: 55px;
}
.hidden_border {
  display: none;
}
.hidden_border.blue_border {
  position: absolute;
  display: flex;
  top: 0.5px;
  right: 0.5px;
  border: 2px solid #2540ff;
  border-radius: 50%;
  width: 59px;
  height: 59px;
  border: solid 2px #2540ff;
  outline: none;
}
.input-wrapper {
  margin-left: 16px;
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
}
.title {
  width: 51px;
  height: 17px;
  font-family: Roboto;
  font-size: 13px;
  font-weight: bold;
  font-stretch: condensed;
  font-style: normal;
  line-height: 1.31;
  letter-spacing: 0.8px;
  text-align: center;
  color: #2c2c30;
  margin: 2px 0 0 15px;
}
.standart_view {
  border: none;
  border-bottom: 1px solid #c9c9cf;
  outline: none;
  width: 50px;
  height: 33px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: #2c2c30;
  max-width: 161px;
}
.title.blue_color {
  color: #2540ff;
}
/*PLACEHOLDER STYLES*/
  input::-webkit-input-placeholder{
    width: 9px;
    height: 17px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.21;
    letter-spacing: normal;
    color: #c9c9cf;
  }
  input::-moz-placeholder {
    width: 9px;
    height: 17px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.21;
    letter-spacing: normal;
    color: #c9c9cf;
  }
  input:-moz-placeholder {
    width: 9px;
    height: 17px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.21;
    letter-spacing: normal;
    color: #c9c9cf;
  }
  input:-ms-input-placeholder {
    width: 9px;
    height: 17px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.21;
    letter-spacing: normal;
    color: #c9c9cf;
  }
  input::-webkit-inner-spin-button {  
    -webkit-appearance: none;    
    display: block;    
    width: 10px;    
    opacity: 1;  
  }
  .measure_items_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-self: flex-end;
    width: fit-content;
    width: -moz-max-content;
    height: 33px;
  }
  .measure_items {
    width: 59px;
    height: 17px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.21;
    letter-spacing: normal;
    margin: 0px 0 0 8px;
    text-align: left;
  }
</style>
