import { React } from "react";
import { Card } from "react-bootstrap"
import { colorTypeGradients } from '../utils/typesColor.js';
import errorPk from '../image/missingno.png'  


function CardError (){
    
    //Definisco le costanti per lo sprite, il nome e l'ID del Pokémon
    const sprite = errorPk
    const name = 'pokemon not found';
    const id = '???';

    //Prendo i colori in base al tipo del pokemon per creare il gradiente di sfondo della card
    var colorCard = colorTypeGradients('normal', 'normal', 1);
    
    //ui componente    
    return( 
        <Card style={{ width: '13rem',background: `linear-gradient(${colorCard[0]}, ${colorCard[1]})` ,borderRadius:'50px'}}>
            <Card.Header className="pokemon-link">{'#'+id}</Card.Header>
            <Card.Img variant="top" src={sprite}/>
            <Card.Body className="text-center">
            <Card.Title className="pokemon-link">{name}</Card.Title>
            </Card.Body>
        </Card>
    );
};
export default CardError;