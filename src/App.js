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
  const [searchedPokemon, setSearchedPokemon] = useState(null);

  useEffect(() => {
    const getPokemon = async () => {
      const response = await Poke.getPokemonsList({ limit: 1008 });
      const pokemonNames = response.results.map((pk) => pk.name);
      const pokemonDetails = await Promise.all(
        pokemonNames.map((name) => Poke.getPokemonByName(name))
      );

      setPokemon(pokemonDetails);

    };
    getPokemon();
  }, []);
  

  const handleLoadMore = () => {
    setVisiblePokemon((prevVisiblePokemon) => prevVisiblePokemon + saltPokemon);
  };

  const handleSearch = (e) => {
    try {
      const filteredPokemon = pokemon.filter((pk) =>{
        if(/^\d+$/.test(e.target.value)){     //espressione regolare per carcare tramite numero (id)
          return pk.id.toString().includes(e.target.value)
        }else{
          return pk.name.toLowerCase().includes(e.target.value.toLowerCase())
        }
      });
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

  const handleSelect = (e) => {
    const generationRanges = {
      'Gen 1': [0, 151],
      'Gen 2': [152, 251],
      'Gen 3': [252, 386],
      'Gen 4': [387, 493],
      'Gen 5': [494, 649],
      'Gen 6': [650, 721],
      'Gen 7': [722, 809],
      'Gen 8': [810, 905],
      'Gen 9': [906, 1008],
      'Select Gen': [null, null]
    }
    const [startId, endId] = generationRanges[e.target.value] || [null, null];
    try {
      if (startId !== null && endId !== null) {
        const filteredPokemon = pokemon.filter((pk) => {
          return pk.id >= startId && pk.id <= endId;
        });
        setSearchedPokemon(filteredPokemon);
      }else{
        setSearchedPokemon(null);
      }
    } catch (error) {
      console.log('Pokemon not found.');
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
          <Col className="d-flex justify-content-center">
            <Form>
              <Form.Control
                type="search"
                placeholder="Search by name/id"
                className="me-2 rounded-pill"
                onChange={handleSearch}
                style={{width:'unset'}}
              />
            </Form>
            <Form>
              <Form.Select 
                className="me-2 rounded-pill"
                onChange={handleSelect}
                style={{width:"unset"}}
              >
                <option>Select Gen</option>
                <option>Gen 1</option>
                <option>Gen 2</option>
                <option>Gen 3</option>
                <option>Gen 4</option>
                <option>Gen 5</option>
                <option>Gen 6</option>
                <option>Gen 7</option>
                <option>Gen 8</option>
                <option>Gen 9</option>
              </Form.Select>
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
                    <CardPoke data={poke} onClick={() => console.log('ciao')}/>
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
