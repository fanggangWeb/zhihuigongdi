//Component Object
Component({
  properties: {
    title:{
      type:String,
      value:'标题'
    },
    content:{
      type:String,
      value:'内容'
    },
    confirmText:{
      type:String,
      value:'确认按钮'
    },
  },
  data: {

  },
  methods: {
    handleConfirm () {
      this.triggerEvent("confirm")
    }
  },
  created: function(){

  },
  attached: function(){

  },
  ready: function(){

  },
  moved: function(){

  },
  detached: function(){

  },
});