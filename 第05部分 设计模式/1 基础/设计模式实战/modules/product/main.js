
	    //页面
	var page = function(pModule,pdModule,cModule)
	{
		this.productModule = pModule;
		this.productDetailModule = pdModule;
		this.productCommentsModule = cModule;
	}
	page.prototype={
			init:function()
			{
				this.productModule.init();
			}
		
		}