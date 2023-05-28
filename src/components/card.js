import { React,useState } from "react";
import { Card,Row,Col,Image } from "react-bootstrap"
import { colorTypeGradients } from '../utils/utils.js';
import typesImage from '../utils/typesImage.js';
import './types.css';


function CardPoke (props){

    const [hoveredType, setHoveredType] = useState(null);

    var AllImgTypes = []
    Object.entries(typesImage).map(([imageName, image]) => (
        AllImgTypes.push([image,imageName])
      ))
    
    const sprite = props.data.sprites.front_default;
    const name = props.data.name;
    const id = props.data.id;
    const type = props.data.types
    var imgTypes = []

    var colorCard;

    if (type.length === 2) {
        colorCard = colorTypeGradients(type[0].type.name, type[1].type.name, type.length);
        AllImgTypes.forEach((img) => {
            if (img[1] === `${type[0].type.name}.png`) {
                imgTypes.push([img[0],type[0].type.name])
            }
            if (img[1] === `${type[1].type.name}.png`) {
                imgTypes.push([img[0],type[1].type.name])
            }
          });
        
    } else {
        colorCard = colorTypeGradients(type[0].type.name, type[0].type.name, type.length);
        AllImgTypes.forEach((img) => {
            if (img[1] === `${type[0].type.name}.png`) {
              imgTypes.push([img[0],type[0].type.name]);
            }
          });
    }

    //console.log(AllImgTypes)
    //ui componente    
    return( 
        <Card style={{ width: '13rem',background: `linear-gradient(${colorCard[0]}, ${colorCard[1]})` ,borderRadius:'50px'}}>
            <Card.Header className="pokemon-link">{'#'+id}</Card.Header>
            <Card.Img variant="top" src={sprite}/>
            <Card.Body className="text-center">
                <Card.Title className="pokemon-link">{name}</Card.Title>
                    <div>
                        <Row>
                            {imgTypes.length > 1 ? (
                                <>
                                    {imgTypes.map((type, index) => (
                                        <Col key={index} className={`two-types ${type[1]}`} onMouseEnter={() => setHoveredType(type[1])} onMouseLeave={() => setHoveredType(null)}>
                                            <Image src={type[0]} />
                                        </Col>
                                    ))}
                                    {hoveredType && (
                                        <p className="pokemon-link">type {hoveredType}</p>
                                    )}
                                </>
                            ) : (
                                <>
                                    {imgTypes.map((type, index) => (
                                        <Col key={index} className={`types ${type[1]}`} onMouseEnter={() => setHoveredType(type[1])} onMouseLeave={() => setHoveredType(null)}>
                                            <Image src={type[0]} />
                                        </Col>
                                    ))}
                                    {hoveredType && (
                                        <p className="pokemon-link">type {hoveredType}</p>
                                    )}
                                </>
                            )}
                        </Row>
                    </div>
            </Card.Body>
        </Card>
    );

};
export default CardPoke;