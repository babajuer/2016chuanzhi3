
/*

�������ȿ�������һ��������ͼ�� �·�
���ǿ��Խ����ǹ�ͬ����ȡ���� ���ڸ��׶�������*/


/*����  ���� -- ���ô�Ҷ����������Ժͷ���*/
function Base(){
    this.name=''
    this.price=''
}
Base.prototype={}

/*
������  �����Լ����ص�һЩ���Ժͷ���*/
function  eBook(){
    Base.call(this, arguments);
    /*����*/
    this.author =''
    /*������*/
    this.publisher=''
    /*��������*/
    this.publishTimer = ''

}
eBook.prototype=new Base();



/*�·������*/
function  Clothes(){
    /*�ߴ�*/
    this.sizes =[]
    /*��ɫ*/
    this.colors=[]

}
Clothes.prototype={}

/*
�̳еĸ��1ӵ�У����ʣ���������Ժͷ���*/
/*ͬʱ���Է��ʵ����׵����Ժͷ���*/


var book = new eBook()

console.log(book.name)


