<?php
$folder = $_GET['folder'];
$file1 = basename($_GET['file']);
if($folder == "tenders"){
$file = 'C://wamp/www/php/tenders/'.$file1;
}
else if($folder == "bids"){
$file = 'C://wamp/www/php/Bids/'.$file1;
}
if(!file_exists($file)){
    die('file not found');
} else {
    header("Cache-Control: public");
    header("Content-Description: File Transfer");
    header("Content-Disposition: attachment; filename=$file1");
    header("Content-Type: application/zip");
    header("Content-Transfer-Encoding: binary");
    readfile($file);
}
?>