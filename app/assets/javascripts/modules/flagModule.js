angular.module('appFlags',[])
    .value('showAddFormFlag',{
        flagValue: false,
        set: function(value){
            this.flagValue = value;
        },
        get: function(){
            return this.flagValue;
        },
        toggle: function(){
            this.flagValue = !this.flagValue;
        }
    })
    .value('showAttachmentsFlags', {
        flagsValues: [],
        set: function(id, value){
            this.flagsValues[id] = value;
        },
        get: function(id){
            return this.flagsValues[id];
        },
        toggle: function(id){
            if(!this.flagsValues[id])
                this.flagsValues[id] = true;
            else
                this.flagsValues[id] = !this.flagsValues[id];
        }
    })
    .value('testFlag', true);