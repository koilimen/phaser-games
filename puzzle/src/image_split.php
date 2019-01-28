#!/usr/bin/php
<?php
$width = 80;
$height = 60;
$dir = "/home/igor/workspace/phaser/puzzle/src/assets/images/page1/";
if(isset($argv[1])){
    $dir = $argv[1];
}
if (isset($argv[2])) {
    $width = $argv[2];
}
if (isset($argv[3])) {
    $height = $argv[3];
}

$files = scandir($dir);
foreach ($files as $key => $file) {
    $file_parts = pathinfo($dir . $file);
    $source = '';
    switch ($file_parts['extension']) {
        case "jpeg":
        case "jpg":
            $source = @imagecreatefromjpeg($dir . "/" . $file);
            break;
    }
    if($source == '') continue;

    $source_width = imagesx($source);
    $source_height = imagesy($source);
    $img_atlas = array(
        "frames" => array()
    );
    $part_index = 0;
    for ($row = 0; $row < $source_height / $height; $row++) {
        for ($col = 0; $col < $source_width / $width; $col++) {
            $img_atlas["frames"]["part" . ($part_index)] = array(
                "frame" => array("x" => $col * $width, "y" => $row * $height, "w" => $width, "h" => $height),
                "rotated" => false,
                "trimmed" => false,
                "spriteSourceSize" => array("x" => 0, "y" => 0, "w" => $width, "h" => $height),
                "sourceSize" => array("w" => $source_width, "h" => $source_height),
                "pivot" => array("x" => 0.5, "y" => 0.5)
            );
            $part_index++;

        }
    }
    $fname = $file_parts['filename'];
    $fn = $dir . "/atlas_$fname.json";
    file_put_contents($fn, json_encode($img_atlas));
}
?>
