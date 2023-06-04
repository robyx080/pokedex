import { React, useState, useEffect } from "react";
import { Card, Row, Col, Image, Modal,Carousel,Table} from "react-bootstrap"
import { colorTypeGradients } from '../utils/utils.js';
import typesImage from '../utils/typesImage.js';
import Pokedex from 'pokedex-promise-v2';

//import './types.css';
//import infoPokedex from '../image/infoPokedex.png'
const Poke = new Pokedex();


function CardPoke(props) {

    //const [hoveredType, setHoveredType] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const pk = props;
    var AllImgTypes = []
    Object.entries(typesImage).map(([imageName, image]) => (
        AllImgTypes.push([image, imageName])
    ))
    //console.log(AllImgTypes)

    const sprite = pk.data.sprites.other["official-artwork"].front_default;
    const spriteShiny = pk.data.sprites.other["official-artwork"].front_shiny;
    const name = pk.data.name;
    const id = pk.data.id;
    const type = pk.data.types
    const [nameSpecies, setNameSpecies] = useState('');
    const height = pk.data.height/10
    const weight = pk.data.weight/10
    const abilities = pk.data.abilities
    const [evYield, setEvYield] = useState([]);
    const [catchRate, setCathRate] = useState('');
    const [baseFriendship, setBaseFriendship] = useState('');
    const [baseExperience, setBaseExperience] = useState('');
    const [growthRate,setGrowthRate] = useState('')
    const [eggGroups,setEggGroups] = useState([])
    const [genderInfo,setGenderInfo] = useState([])
    const [eggCyclesInfo, setEggCyclesInfo] = useState('');
    const [stats,setStats] = useState([])
    
    async function getinfo(){
        try {
            const response = await Poke.getPokemonSpeciesByName(name);
            setNameSpecies(response.genera.find((genus) => genus.language.name === 'en').genus);
            setCathRate(response.capture_rate)
            setBaseFriendship(response.base_happiness)
            setGrowthRate(response.growth_rate.name)
            setGrowthRate(response.growth_rate.name)
            const eggGroups = response.egg_groups.map(eg=>eg.name)
            setEggGroups(eggGroups)
            const femalePercentage = response.gender_rate * 12.5;
            const malePercentage = 100 - femalePercentage;
            const genderInfo = [`${malePercentage}% male`,` ${femalePercentage}% female`]
            setGenderInfo(genderInfo)
            const eggCyclesInfo = response.hatch_counter
            setEggCyclesInfo(eggCyclesInfo);

            const response2 = await Poke.getPokemonByName(name);
            const evYieldValues = response2.stats
                .filter(stat => stat.effort !== 0)
                .map(stat => `${stat.stat.name}: ${stat.effort}`);
            setEvYield(evYieldValues);
            setBaseExperience(response2.base_experience)

            const st = pk.data.stats.map(s=>({
                name: s.stat.name,
                base: s.base_stat,
                //formula stats min e max livello 100
                //+ 10 + 100: Aggiungi 10 (valore fisso) e 100 (livello) per ottenere il valore finale degli HP minimi al livello 100.
                //+ 31 valore IV max
                //+ 63 valore EV max
                // *2 poichè la stats base è del pokemon al lv50 
                //0.9 natura per min e 1.1 natura per max
                min: (s.stat.name === 'hp') ? 
                    ((s.base_stat * 2) + 10 + 100) : Math.floor((((s.base_stat * 2) + 5)*0.9)),
                max: (s.stat.name === 'hp') ? 
                    ((s.base_stat * 2 + 31 + 63) + 10 + 100) : Math.floor((((s.base_stat * 2) + 31 + 63 + 5)*1.1))
            }))
            setStats(st)
        } catch (error) {
            console.error(error);
        }
    }



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
            getinfo();
            const modalContent = document.querySelector('.modal-content');
            modalContent.style.background = `linear-gradient(${colorCard[0]}, ${colorCard[1]})`;
            //modalContent.style.pointerEvents = 'unset'
            const modalHeader = document.querySelector('.modal-header');
            modalHeader.style.borderBottom = 'unset';
            //const modalFooter = document.querySelector('.modal-footer');
            //modalFooter.style.borderTop = 'unset';
            const closeModal = document.querySelector('.btn-close');
            closeModal.style.margin = 'unset';
            const indicatorsCarousel = document.querySelector('.carousel-indicators');
            indicatorsCarousel.style.marginBottom ='-1rem'
        }

        //per eliminare warning sull'array dipendenze 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showModal]);

    //console.log(AllImgTypes)
    //ui componente    
    return (
        <>
            <Card style={{ width: '13rem', background: `linear-gradient(${colorCard[0]}, ${colorCard[1]})`, borderRadius: '50px',cursor: 'pointer' }} onClick={handleOpenModal}>
                <Card.Header className="pokemon-link">
                    {'#' + id}
                </Card.Header>
                <Card.Img variant="top" src={sprite} style={{maxHeight:'150px',maxWidth:'150px',margin:'auto'}}/>
                <Card.Body className="text-center">
                    <Card.Title className="pokemon-link" style={{paddingBottom:'15px'}}>{name}</Card.Title>
                    <div>
                        <Row>
                            {imgTypes.map((type, index) => (
                                <Col key={index}>
                                    <Image src={type[0]} style={{ maxHeight: '55px', maxWidth: '55px' }} title={type[1]} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Card.Body>
            </Card>


            <Modal show={showModal} onHide={handleCloseModal} centered size="xl" className="details-font">
                <Modal.Header closeButton>
                    <Modal.Title style={{margin:'auto'}}>
                       <p style={{fontSize:'35px',marginLeft:'10px'}}>N° {id} {name}</p> 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row >
                        <Col>
                            <Carousel interval={null} controls={false} indicators >
                                <Carousel.Item>
                                    <div className="text-center">
                                        <Image src={sprite} style={{ maxHeight: '200px', maxWidth: '200px' }} />
                                        <p className="details-font">Artwork {name}</p>
                                    </div>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <div className="text-center">
                                        <Image src={spriteShiny} style={{ maxHeight: '200px', maxWidth: '200px' }} />
                                        <p className="details-font">Artwork {name} shiny</p>
                                    </div>
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                        <Col className="text-center" style={{marginBottom:'10px',marginTop:'10px'}}>
                            <h1>Pokèdex data</h1>
                            <Table style={{borderColor:'unset'}}>
                                <tbody>
                                    <tr>
                                        <td>National n°</td>
                                        <td>{id}</td>
                                    </tr>
                                    <tr>
                                        <td>Type</td>
                                        <td>
                                            {imgTypes.map((type, index) => (
                                                <Image src={type[0]} style={{ maxHeight: '30px', maxWidth: '30px',marginRight: '10px'}} title={type[1]} key={index}/>
                                            ))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Species</td>
                                        <td>{nameSpecies}</td>
                                    </tr>
                                    <tr>
                                        <td>Height</td>
                                        <td>{height} m</td>
                                    </tr>
                                    <tr>
                                        <td>Weight</td>
                                        <td>{weight} kg</td>
                                    </tr>
                                    <tr>
                                        <td>Abilities</td>
                                        <td>{abilities.map((ab,index) =>(
                                            <p key={index}>
                                            {ab.is_hidden ? `${ab.ability.name} (hidden)` : ab.ability.name}
                                          </p>
                                        ))}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            

                        </Col>
                    </Row>
                    <Row style={{paddingTop:'50px'}}> 
                        <Col className="text-center">
                            <h1>Training</h1>
                            <Table style={{borderColor:'unset'}}>
                                <tbody>
                                    <tr>
                                        <td>Ev yield</td>
                                        <td>{evYield.map((ev,index) =>(
                                            <p key={index}>
                                            {ev}
                                          </p>
                                        ))}</td>
                                    </tr>
                                    <tr>
                                        <td>Catch rate</td>
                                        <td>{catchRate}</td>
                                    </tr>
                                    <tr>
                                        <td>Base friendship</td>
                                        <td>{baseFriendship}</td>
                                    </tr>
                                    <tr>
                                        <td>Base exp.</td>
                                        <td>{baseExperience}</td>
                                    </tr>
                                    <tr>
                                        <td>Growth rate</td>
                                        <td>{growthRate}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="text-center">
                            <h1>Breeding</h1>
                            <Table style={{borderColor:'unset'}}>
                                <tbody>
                                    <tr>
                                        <td>Egg groups</td>
                                        <td>{eggGroups.map((eg,index) =>(
                                            <p key={index}>
                                            {eg}
                                          </p>
                                        ))}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td>{genderInfo.map((ge,index) =>(
                                            <p key={index}>
                                            {ge}
                                          </p>
                                        ))}</td>
                                    </tr>
                                    <tr>
                                        <td>Egg cycles</td>
                                        <td>{eggCyclesInfo}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row style={{paddingTop:'50px'}}>
                        <Col className="text-center">
                            <h1>Base stats</h1>
                            <Table style={{ borderColor: 'unset' }}>
                                <tbody>
                                    {stats.map((st, index) => (
                                        <tr key={index}>
                                            <td>{st.name}</td>
                                            <td>{st.base}</td>
                                            <td>
                                                <div className="bar-container">
                                                    <div
                                                        className="bar"
                                                        style={{ width: `calc((100% / 255) * ${st.base}*2)` }}
                                                    ></div>
                                                </div>
                                            </td>
                                            <td>{st.min}</td>
                                            <td>{st.max}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>Total</td>
                                        <td>{stats.reduce((accumulator, st) => accumulator + st.base, 0)}</td>
                                        <td></td>
                                        <td>Min</td>
                                        <td>Max</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <p>The ranges shown on the right are for a level 100 Pokémon. Maximum values are based on a beneficial nature, 252 EVs, 31 IVs; minimum values are based on a hindering nature, 0 EVs, 0 IVs.</p>
                        </Col>
                    </Row>


                </Modal.Body>
            </Modal>


        </>
    );

};
export default CardPoke;