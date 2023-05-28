import { React } from "react";
import { Card } from "react-bootstrap"
import { colorTypeGradients } from '../utils/utils.js';
import './types.css';
import error from '../image/missingno.png'


function CardError (){
    
    const sprite = error
    const name = 'pokemon not found';
    const id = '???';

    var colorCard = colorTypeGradients('normal', 'normal', 1);
    
    //console.log(AllImgTypes)
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