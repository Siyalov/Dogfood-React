import React, { useContext } from "react";
import { Container, Row, Col, Figure } from "react-bootstrap";
import { Context } from "../App";

export default function Profile() {
  const { user } = useContext(Context);
  return (
    <Container>
      {user.name && (
        <Row>
          <Col md={6}>
            <h1>Профиль</h1>
            <h2>{user.name}</h2>
            <a href={`mailto:${user.email}`}>{user.email}</a>
            <p>{user.about}</p>
          </Col>
          <Col md={6}>
            <Figure>
              <Figure.Image src={user.avatar} />
            </Figure>
          </Col>
        </Row>
      )}
    </Container>
  );
};
