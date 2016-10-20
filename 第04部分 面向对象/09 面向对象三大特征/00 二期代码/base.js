
/*

我们首先考虑这样一个场景：图书 衣服
我们可以将他们共同的提取出来 放在父亲对象里面*/


/*基类  父亲 -- 放置大家都公共的属性和方法*/
function Base(){
    this.name=''
    this.price=''
}
Base.prototype={}

/*
电子书  放置自己独特的一些属性和方法*/
function  eBook(){
    Base.call(this, arguments);
    /*作者*/
    this.author =''
    /*出版社*/
    this.publisher=''
    /*出版日期*/
    this.publishTimer = ''

}
eBook.prototype=new Base();



/*衣服类对象*/
function  Clothes(){
    /*尺寸*/
    this.sizes =[]
    /*颜色*/
    this.colors=[]

}
Clothes.prototype={}

/*
继承的概念：1拥有（访问）自身的属性和方法*/
/*同时可以访问到父亲的属性和方法*/


var book = new eBook()

console.log(book.name)


