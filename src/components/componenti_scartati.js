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

                            
*/