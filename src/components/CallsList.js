// src/components/CallsList.js

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CallsList.css';

function CallsList() {
  const [calls, setCalls] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);

  useEffect(() => {
    const callsCollection = collection(db, 'transcriptions');
    const unsubscribe = onSnapshot(callsCollection, snapshot => {
      const groupedCalls = {};
      snapshot.forEach(doc => {
        const data = doc.data();
        const group = data.Group || 'Ungrouped';
        if (!groupedCalls[group]) {
          groupedCalls[group] = [];
        }
        groupedCalls[group].push(data);
      });
      setCalls(groupedCalls);
    });
    return () => unsubscribe();
  }, []);

  const handleCallClick = (call) => {
    setSelectedCall(call);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Container fluid className="px-4">
      <Row className="gy-4">
        {Object.entries(calls).map(([group, groupCalls]) => (
          <Col md={4} key={group}>
            <div className="call-group">
              <h2>{group}</h2>
              {groupCalls.map((call, index) => (
                <Card key={index} className="mb-2 call-item" onClick={() => handleCallClick(call)}>
                  <Card.Body>
                    <Card.Title>{call.summary}</Card.Title>
                    <Card.Text>
                      Location: {call.locations}<br />
                      Time: {call.timestamp}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        ))}
      </Row>
      {selectedCall && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Call Transcript</Modal.Title>
          </Modal.Header>
          <Modal.Body>{selectedCall.transcription}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default CallsList;
