<?php 
$width = 45;
$height = 45;
$source = @imagecreatefromjpeg( __DIR__."/image.jpeg" );
$source_width = imagesx( $source );
$source_height = imagesy( $source );
$img_atlas = array(
    "frames" => array()
);
$part_index = 0;
for( $row = 0; $row < $source_height / $height; $row++)
{
    for( $col = 0; $col < $source_width / $width; $col++)
    {
        $img_atlas["frames"]["part".($part_index)] = array(
            "frame" => array("x" => $col*$width,"y" => $row*$height,"w"=>$width,"h"=>$height),
            "rotated"=> false,
            "trimmed"=> false,
            "spriteSourceSize"=> array("x"=>0,"y"=>0,"w"=>$width,"h" =>$height),
            "sourceSize"=> array("w"=>$source_width,"h"=>$source_height),
            "pivot"=> array("x"=>0.5,"y"=>0.5)
        );
        $part_index++;
        
    }
} 
$fn = __DIR__."/atlas.json" ;
file_put_contents($fn, json_encode($img_atlas));
?>