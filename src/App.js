import './App.css';
import {React,useState,useEffect} from 'react';
import {Container,Row,Col,Image,Button,Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Pokedex from 'pokedex-promise-v2';
import logo_pokedex from "./image/Pokedex_logo.png"
import background from "./image/background.jpg";
import pokeball from "./image/pokeball.png"
import NavBar from './components/navbar';
import CardPoke from './components/card';
import CardError from './components/cardError';
import Footer from './components/footer';

const Poke = new Pokedex();

function App() {
  const saltPokemon=20
  const [pokemon, setPokemon] = useState([]);
  const [visiblePokemon, setVisiblePokemon] = useState(saltPokemon);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedPokemon, setSearchedPokemon] = useState(null);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await Poke.getPokemonsList({ limit:1008 });
        const pokemonNames = response.results.map((pk) => pk.name);
  
        const pokemonDetails = await Promise.all(
          pokemonNames.map((name) => Poke.getPokemonByName(name))
        );
  
        setPokemon(pokemonDetails);
      } catch (error) {
        console.log('There was an ERROR: ', error);
      }
    };
    getPokemon();
  }, []);
  
  const handleLoadMore = () => {
    setVisiblePokemon((prevVisiblePokemon) => prevVisiblePokemon + saltPokemon);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    try {
      const filteredPokemon = pokemon.filter((pk) =>
        pk.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchedPokemon(filteredPokemon);
      if(filteredPokemon.length===0){
        setSearchedPokemon(['error'])
      }
    } catch (error) {
      console.log('Pokemon not found.');
      setSearchedPokemon(null);
    }

    if (e.target.value === '') {
      setSearchedPokemon(null);
    }
  }

  return (
    <div className="App" style={{backgroundImage:`url(${background})`}}>
      <NavBar/>
      <Container fluid className='header'>
        <Row>
          <Col style={{textAlign:'center'}}><Image src={logo_pokedex} className='logo'/></Col>
        </Row>
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <Form className="d-flex justify-content-center">
              <Form.Control
                type="search"
                placeholder="Search Pokemon"
                className="me-2 rounded-pill"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearch}
                style={{width:'unset'}}
              />
            </Form>
          </Col>
        </Row>
      </Container>
      <Container fluid className="pokedex">

        {searchedPokemon ? (
          searchedPokemon[0] === "error" ? (
            <Row className="justify-content-center">
              <Col xs="auto" className="text-center mb-3">
                <CardError/>
              </Col>
            </Row>
          ) : (
            <Row className="justify-content-center">
              {searchedPokemon.map((poke, index) => (
                <Col key={index} xs="auto" className="text-center mb-3">
                  <CardPoke data={poke} />
                </Col>
              ))}
            </Row>
          )
        ) : (
          pokemon.length > 0 ? (
            <>
              <Row className="justify-content-center">
                {pokemon.slice(0, visiblePokemon).map((poke, index) => (
                  <Col key={index} xs="auto" className="text-center mb-3">
                    <CardPoke data={poke} />
                  </Col>
                ))}
              </Row>
              <Row className='text-center pokemon-button-font pokemon-button'>
                <Col>
                  <Button size='xxl' variant='trasparent' onClick={handleLoadMore} className="custom-button">Carica di più</Button>
                </Col>
              </Row>
            </>
          ) : (
            <Row className="justify-content-center">
              <Col style={{ textAlign: 'center' }}>
                <Image src={pokeball} className="pokeball-loading" />
              </Col>
            </Row>
          )
        )}
        
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
