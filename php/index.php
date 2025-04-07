<?php
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/controllers/AlunniController.php';
require __DIR__ . '/controllers/CertificazioniController.php';

$app = AppFactory::create();

//curl -X GET http://localhost:8080/alunni
$app->get('/alunni', "AlunniController:index");

//curl -X GET http://localhost:8080/alunni/1
$app->get('/alunni/{id}', "AlunniController:show");

//curl -X POST http://localhost:8080/alunni -H "Content-Type: application/json" -d '{"Nome": "Marco", "Cognome": "Zini"}'
$app->post('/alunni', "AlunniController:create");

//curl -X PUT http://localhost:8080/alunni/1 -H "Content-Type: application/json" -d '{"nome": "pollo", "cognome": "franco"}'
$app->put('/alunni/{id}', "AlunniController:update");

//curl -X DELETE http://localhost:8080/alunni/1
$app->delete('/alunni/{id}', "AlunniController:delete");

//curl -X GET http://localhost:8080/alunni/1/certificazioni
$app->get('/alunni/{id}/certificazioni', "CertificazioniController:index");

//curl -X POST http://localhost:8080/alunni/1/certificazioni -H "Content-Type: application/json" -d '{"Titolo": "Certificazione Informatica", "Votazione": 78, "Ente": "Meucci"}'
$app->post('/alunni/{id}/certificazioni', "CertificazioniController:create");

//curl -X GET http://localhost:8080/alunni/1/certificazioni/1
$app->get('/alunni/{id}/certificazioni/{certificazioneId}', "CertificazioniController:show");

//curl -X PUT http://localhost:8080/alunni/1/certificazioni/1 -H "Content-Type: application/json" -d '{"Titolo": "Certificazione Italiano", "Votazione": 78, "Ente": "Meucci"}'
$app->put('/alunni/{id}/certificazioni/{certificazioneId}', "CertificazioniController:update");

//curl -X DELETE http://localhost:8080/alunni/1/certificazioni/1
$app->delete('/alunni/{id}/certificazioni/{certificazioneId}', "CertificazioniController:delete");


$app->run();
