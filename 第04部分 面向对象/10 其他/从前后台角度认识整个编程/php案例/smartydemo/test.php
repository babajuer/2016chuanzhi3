<?php
include_once('./libs/Smarty.class.php');  //�����php.ini�ļ��н�include_path�����smart��Ŀ¼�����ֱ��дSmarty.class.php�Ϳ����ˡ�

$smarty = new Smarty();
$smarty -> template_dir = "./templates";      //ģ����Ŀ¼
$smarty -> compile_dir = "./templates_c";     //����Ŀ¼
$smarty -> left_delimiter = "{{";             //�󶨽��
$smarty -> right_delimiter = "}}";            //�Ҷ����

$smarty -> assign('test','����Smartyģ�������');
$arr=array(
	array("id"=>"1","name"=>"����","age"=>"18"),
	array("id"=>"2","name"=>"����","age"=>"19")
);

$smarty -> assign('arr',$arr);
$smarty -> display('template.tpl');
?>