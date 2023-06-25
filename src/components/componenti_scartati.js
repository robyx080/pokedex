/*
 card con nome types


 {imgTypes.length > 1 ? (
                                <>
                                    {imgTypes.map((type, index) => (
                                        <Col key={index} onMouseEnter={() => setHoveredType(type[1])} onMouseLeave={() => setHoveredType(null)}>
                                            <Image src={type[0]} style={{maxHeight:'55px',maxWidth:'55px'}}/>
                                        </Col>
                                    ))}
                                    {hoveredType && (
                                        <p className="pokemon-link">type {hoveredType}</p>
                                    )}
                                </>
                            ) : (
                                <>
                                    {imgTypes.map((type, index) => (
                                        <Col key={index} onMouseEnter={() => setHoveredType(type[1])} onMouseLeave={() => setHoveredType(null)}>
                                            <Image src={type[0]} style={{maxHeight:'55px',maxWidth:'55px'}} title={type[1]}/>
                                        </Col>
                                    ))}
                                    {hoveredType && (
                                        <p className="pokemon-link">type {hoveredType}</p>
                                    )}
                                </>
                            )}

                    
                            




                            <Modal show={showModal} onHide={handleCloseModal} centered size="xl" className="details-font">
                <Modal.Header closeButton>
                    <Modal.Title style={{margin:'auto'}}>
                       <p style={{fontSize:'35px',marginLeft:'10px'}}>N° {id} {name}</p> 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row >
                        <Col>
                            <Carousel interval={null} controls={true} indicators >
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
                                            <td style={{width:255}}>
                                                <div className="bar-container">
                                                    <div
                                                        className="bar"
                                                        style={{ width: `calc((100% * ${st.base}/255)` }}
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

*/