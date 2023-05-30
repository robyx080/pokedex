import { React, useState, useEffect } from "react";
import { Card, Row, Col, Image, Modal, Button } from "react-bootstrap"
import { colorTypeGradients } from '../utils/utils.js';
import typesImage from '../utils/typesImage.js';
import './types.css';
import infoPokedex from '../image/infoPokedex.png'


function CardPoke(props) {

    const [hoveredType, setHoveredType] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const pk = props;
    var AllImgTypes = []
    Object.entries(typesImage).map(([imageName, image]) => (
        AllImgTypes.push([image, imageName])
    ))

    const sprite = pk.data.sprites.front_default;
    const name = pk.data.name;
    const id = pk.data.id;
    const type = pk.data.types
    var imgTypes = []

    var colorCard;

    if (type.length === 2) {
        colorCard = colorTypeGradients(type[0].type.name, type[1].type.name, type.length);
        AllImgTypes.forEach((img) => {
            if (img[1] === `${type[0].type.name}.png`) {
                imgTypes.push([img[0], type[0].type.name])
            }
            if (img[1] === `${type[1].type.name}.png`) {
                imgTypes.push([img[0], type[1].type.name])
            }
        });

    } else {
        colorCard = colorTypeGradients(type[0].type.name, type[0].type.name, type.length);
        AllImgTypes.forEach((img) => {
            if (img[1] === `${type[0].type.name}.png`) {
                imgTypes.push([img[0], type[0].type.name]);
            }
        });
    }


    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (showModal) {
            const modalContent = document.querySelector('.modal-content');
            modalContent.style.background = `linear-gradient(${colorCard[0]}, ${colorCard[1]})`;
            const modalHeader = document.querySelector('.modal-header');
            modalHeader.style.borderBottom = 'unset';
            const modalFooter = document.querySelector('.modal-footer');
            modalFooter.style.borderTop = 'unset';
        }
    }, [showModal, colorCard]);

    //console.log(AllImgTypes)
    //ui componente    
    return (
        <>
            <Card style={{ width: '13rem', background: `linear-gradient(${colorCard[0]}, ${colorCard[1]})`, borderRadius: '50px' }}>
                <Card.Header className="pokemon-link" style={{ display: 'flex', alignItems: 'center' }}>
                    <Image src={infoPokedex} style={{ marginRight: '45px', cursor: 'pointer' }} onClick={handleOpenModal} />
                    {'#' + id}
                </Card.Header>
                <Card.Img variant="top" src={sprite} />
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
            <Modal show={showModal} onHide={handleCloseModal} centered size="xl" >
                <Modal.Header closeButton>
                    <Modal.Title>{name} info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={sprite} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

};
export default CardPoke;