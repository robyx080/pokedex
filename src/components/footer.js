import React from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap';
import email from "../image/email.png"
import github from "../image/github.png"

function Footer() {
  return (
    <Container fluid className='footer'>
        <Row className="justify-content-center">
          <Col style={{textAlign: 'center'}} className='footer-font'>
            <ul className='list-inline mb-4'>
              <li>
                <h1>Creat with:</h1>
              </li>
              <li>
                <p>React</p>
              </li>
              <li>
                <p>Pokeapi</p>
              </li>
            </ul>
          </Col>
          <Col style={{textAlign: 'center'}} className='footer-font'>
            <ul className='list-inline mb-4'>
              <li>
                <h1>Contact:</h1>
              </li>
              <li>
                <p>
                  <Image src={email} style={{paddingRight:'10px'}}></Image>
                  robyx080@gmail.com
                </p>
              </li>
              <li>
                <p>
                  <Image src={github} style={{paddingRight:'10px'}}></Image>
                  <a href="https://github.com/robyx080?tab=repositories">
                    repo github
                  </a>                
                </p>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className='text-center '>
          <Col className='footer-font'>
            <p>
              © 2023 Copyright: Roberto Tomasello
            </p>
          </Col>
        </Row>
      </Container>
  );
}

export default Footer;