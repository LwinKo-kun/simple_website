<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$departments = [
    1 => ["name"=>"Engineering","manager"=>"Alice Tan","employees"=>50],
    2 => ["name"=>"Product","manager"=>"Bob Lee","employees"=>30],
    3 => ["name"=>"Operations","manager"=>"Carol Lim","employees"=>40],
    4 => ["name"=>"Sales & Marketing","manager"=>"David Ng","employees"=>25],
    5 => ["name"=>"Customer Support","manager"=>"Eva Wong","employees"=>15],
    6 => ["name"=>"Logistics","manager"=>"Frank Chen","employees"=>20],
    7 => ["name"=>"Creative","manager"=>"Grace Lee","employees"=>10],
    8 => ["name"=>"Digital Marketing","manager"=>"Helen Tan","employees"=>8]
];

// Optional: get single department by ID
$id = isset($_GET['id']) ? intval($_GET['id']) : null;
if ($id && isset($departments[$id])) {
    echo json_encode($departments[$id], JSON_PRETTY_PRINT);
} else {
    echo json_encode($departments, JSON_PRETTY_PRINT);
}
exit;
