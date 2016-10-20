// JavaScript Document

	var Page =function(pModule,pdModule,pComment){
			this.productModule = pModule;
			this.productDetailModule = pdModule;
			this.productCommentsModule = pComment;
			
		};
	
 	   page.prototype={
		   	init:function(){
					this.productModule.init();
				    //this.productDetailModule.init();
					//this.productDetailModule.init();
				}
		   
		   };