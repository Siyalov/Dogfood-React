import React from "react";
import { Container, Row, Col, Figure } from "react-bootstrap";

/** @typedef {import('../typings').Product} Product */
/** @typedef {import('../typings').NewProduct} NewProduct */
/** @typedef {import('../typings').User} User */
/** @typedef {import('../typings').UserAuthorization} UserAuthorization */

/**
 * @param {Object} opts
 * @param {User} opts.user
 */
export default function Profile({ user }) {
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
