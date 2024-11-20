import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../css/roomList.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch the list of rooms from the server
    axios.get('/api/rooms')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the rooms!', error);
      });
  }, []);

  return (
    <div className="room-list-container">
      <h1 className="room-list-title">Chat Rooms</h1>
      <ul className="room-list">
        {rooms.map((room) => (
          <li key={room.id} className="room-item">
            <Link to={`/rooms/${room.id}`} className="room-link">
              {room.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="create-room-container">
        <Link to="/create-room" className="create-room-button">
          Create New Room
        </Link>
      </div>
    </div>
  );
};

export default RoomList;
