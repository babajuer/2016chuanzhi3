var data = [
    {name:'������',time:'3.21-4.19'},
    {name:'ʨ����',time:'3.21-4.19'},
    {name:'��з��',time:'3.21-4.19'},
    {name:'������',time:'3.21-4.19'},
    {name:'ʨ����',time:'3.21-4.19'},
    {name:'��з��',time:'3.21-4.19'},
    {name:'������',time:'3.21-4.19'},
    {name:'ʨ����',time:'3.21-4.19'},
    {name:'��з��',time:'3.21-4.19'},
    {name:'������',time:'3.21-4.19'},
    {name:'ʨ����',time:'3.21-4.19'},
    {name:'��з��',time:'3.21-4.19'},
]

for(var i = 0,len = data.length;i<len;i++){
    new Xingzuo(data[i],i).init()
}