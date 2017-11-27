var Label = function(x, y, text, fontSize, fontStyle, static){

    this.phaserObject = null;
    this.context = null;

    this.x = x;
    this.y = y;
    this.text = text;
    this.fontSize = fontSize;
    this.fontStyle = fontStyle;
    this.fontType = 'Arial';
    this.color = '#ffffff';
    this.boundsAlignH = 'center';
    this.boundsAlignV = 'middle';
    this.shadow = null;
    this.inputDown = null;

    this.inputOver = function(item){
        item.fill = "#ffff44";
      };
    this.inputOut = function(item){
        item.fill = "#ffffff";
      };

    this.OnInputDown = function(method){
        this.inputDown = method;
        return this;
    };

    this.OnInputOver = function(method){
        this.inputOver = method;
        return this;
    };

    this.OnInputOut = function(method){
        this.inputOut = method;
        return this;
    };

    this.withContext = function(context){
        this.context = context;
        return this; 
    };

    this.setText = function(text){
        this.text = text;
        this.phaserObject.setText(text);
    };

    this.disableHoverEffects = function(){
        this.inputOver = null;
        this.inputOut = null;
        this.phaserObject.events.onInputOver.removeAll();
        this.phaserObject.events.onInputOut.removeAll();
        return this;
    }

    this.build = function(){
        this.phaserObject = game.add.text(0, 0,
            this.text,
            {font: this.fontStyle + ' ' + this.fontSize + ' ' + this.fontType, fill: this.color,
            boundsAlignH: this.boundsAlignH, boundsAlignV: this.boundsAlignV });
        this.phaserObject.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.phaserObject.setTextBounds(this.x, this.y, game.world.width, game.world.height);
        this.phaserObject.inputEnabled = true;
        if(this.inputDown){
            this.phaserObject.events.onInputDown.add(this.inputDown, this.context);
        }
        if(!static){
            this.phaserObject.events.onInputOver.add(this.inputOver, this.context);
            this.phaserObject.events.onInputOut.add(this.inputOut, this.context);
        }
        return this;
    }

    return this;

}