// UtilityForm.js
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import db from '../../firebase';
import Button from '@mui/material/Button';



const UtilityForm = ({ userId, roomNumber }) => {
  const [electricNumber, setElectricNumber] = useState('');
  const [waterNumber, setWaterNumber] = useState('');
  const [utilities, setUtilities] = useState([]);

  useEffect(() => {
    const fetchUtilities = async () => {
      try {
        const utilitiesQuery = query(
          collection(db, 'utilities'),
          where('userId', '==', userId),
          where('roomNumber', '==', roomNumber)
        );

        const utilitiesSnapshot = await getDocs(utilitiesQuery);

        const utilitiesData = utilitiesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUtilities(utilitiesData);
      } catch (error) {
        console.error('Error fetching utilities:', error);
      }
    };

    fetchUtilities();
  }, [userId, roomNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user exists
    const userExists = await checkIfUserExists(userId);

    // If the user doesn't exist, create the user
    if (!userExists) {
      await createDefaultUser(userId);
    }

    // Submit utility form data to Firebase
    try {
      const newUtility = {
        userId,
        roomNumber,
        electricNumber: Number(electricNumber),
        waterNumber: Number(waterNumber),
        timestamp: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'utilities'), newUtility);

      console.log('Utility form submitted:', { id: docRef.id, ...newUtility });
      setElectricNumber('');
      setWaterNumber('');
    } catch (error) {
      console.error('Error submitting utility form:', error);
    }
  };

  const checkIfUserExists = async (userId) => {
    try {
      const userQuery = query(collection(db, 'users'), where('userId', '==', userId));
      const userSnapshot = await getDocs(userQuery);
      return !userSnapshot.empty;
    } catch (error) {
      console.error('Error checking if user exists:', error);
      return false;
    }
  };

  const createDefaultUser = async (userId) => {
    try {
      // Create a default user
      await addDoc(collection(db, 'users'), {
        userId,
        // Add other user details as needed
      });

      console.log('Default user created:', { userId });
    } catch (error) {
      console.error('Error creating default user:', error);
    }
  };

  return (
    <div>
      <h2>Submit Utility Information</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Electric Number:
          <input
            type="number"
            value={electricNumber}
            onChange={(e) => setElectricNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Water Number:
          <input
            type="number"
            value={waterNumber}
            onChange={(e) => setWaterNumber(e.target.value)}
          />
        </label>
        <br />
        
        <Button variant="contained" type="submit">Submit</Button>
      </form>

      <h3>Previous Utilities</h3>
      <ul>
        {utilities.map((utility) => (
          <li key={utility.id}>
            Electric: {utility.electricNumber}, Water: {utility.waterNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UtilityForm;
