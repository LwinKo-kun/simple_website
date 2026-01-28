<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Fake organizations with richer info
$organizations = [
    [
        "id" => 1,
        "name" => "NovaTech Solutions",
        "founded" => 2018,
        "location" => "Singapore",
        "employees" => 125,
        "description" => "Tech company specializing in smart inventory and enterprise tools.",
        "departments" => [1,2]
    ],
    [
        "id" => 2,
        "name" => "GreenWorks Corp",
        "founded" => 2015,
        "location" => "Malaysia",
        "employees" => 98,
        "description" => "Environmental solutions company focusing on sustainable energy.",
        "departments" => [3,4]
    ],
    [
        "id" => 3,
        "name" => "BlueWave Industries",
        "founded" => 2020,
        "location" => "Indonesia",
        "employees" => 60,
        "description" => "Manufacturing and logistics solutions provider.",
        "departments" => [5,6]
    ],
    [
        "id" => 4,
        "name" => "Skyline Media",
        "founded" => 2012,
        "location" => "Thailand",
        "employees" => 45,
        "description" => "Media and entertainment company producing digital content.",
        "departments" => [7,8]
    ]
];

// Partial search
$search = isset($_GET['search']) ? strtolower($_GET['search']) : null;
if ($search) {
    $organizations = array_filter($organizations, function($org) use ($search){
        return strpos(strtolower($org['name']), $search) !== false ||
               strpos(strtolower($org['location']), $search) !== false;
    });
}

echo json_encode(array_values($organizations), JSON_PRETTY_PRINT);
exit;
