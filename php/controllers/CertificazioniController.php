<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class CertificazioniController
{


  public function index(Request $request, Response $response, $args){
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("SELECT id, Titolo, Votazione, Ente FROM certificazioni WHERE alunno_id =".$args['id']);
    $certificazioni = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($certificazioni));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }



  public function show(Request $request, Response $response, $args){
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("SELECT id, Titolo, Votazione, Ente FROM certificazioni WHERE alunno_id =".$args['id']." AND id =".$args['certificazioneId']);
    $certificazione = $result->fetch_assoc();

    $response->getBody()->write(json_encode($certificazione));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }



  public function create(Request $request, Response $response, $args){
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $body = json_decode($request->getBody(), true);
    $Titolo = $mysqli_connection->real_escape_string($body['Titolo']);
    $Votazione = $mysqli_connection->real_escape_string($body['Votazione']);
    $Ente = $mysqli_connection->real_escape_string($body['Ente']);
    $result = $mysqli_connection->query("INSERT INTO certificazioni (alunno_id, Titolo, Votazione, Ente) VALUES (".$args['id'].", '$Titolo', '$Votazione', '$Ente')");

    if ($result) {
        $response->getBody()->write(json_encode(["message" => "Certificazione creata correttamente"]));
        return $response->withHeader("Content-type", "application/json")->withStatus(201);
    } else {
        $response->getBody()->write(json_encode(["error" => "Errore nella creazione della certificazione"]));
        return $response->withHeader("Content-type", "application/json")->withStatus(500);
    }
  }



  public function update(Request $request, Response $response, $args){
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $body = json_decode($request->getBody(), true);
    $Titolo = $mysqli_connection->real_escape_string($body['Titolo']);
    $Votazione = $mysqli_connection->real_escape_string($body['Votazione']);
    $Ente = $mysqli_connection->real_escape_string($body['Ente']);
    $result = $mysqli_connection->query("UPDATE certificazioni SET Titolo = '$Titolo', Votazione = '$Votazione', Ente = '$Ente' WHERE alunno_id =".$args['id']." AND id =".$args['certificazioneId']); 

    if ($mysqli_connection->affected_rows > 0) {
        $response->getBody()->write(json_encode(["message" => "Certificazione aggiornata correttamente"]));
        return $response->withHeader("Content-type", "application/json")->withStatus(200);
    } else {
        $response->getBody()->write(json_encode(["error" => "Errore nell'aggiornamento della certificazione"]));
        return $response->withHeader("Content-type", "application/json")->withStatus(400);
    }
  }



  public function delete(Request $request, Response $response, $args){
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("DELETE FROM certificazioni WHERE alunno_id =".$args['id']." AND id =".$args['certificazioneId']);

    if ($mysqli_connection->affected_rows > 0) {
        $response->getBody()->write(json_encode(["message" => "Certificazione eliminata correttamente"]));
        return $response->withHeader("Content-type", "application/json")->withStatus(200);
    } else {
        $response->getBody()->write(json_encode(["error" => "Errore nell'eliminazione della certificazione"]));
        return $response->withHeader("Content-type", "application/json")->withStatus(400);
    }
  }

}

