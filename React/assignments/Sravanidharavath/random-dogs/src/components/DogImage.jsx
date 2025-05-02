import { useState, useEffect } from 'react';
import axios from 'axios';

const DogImage = () => {
  const [dogImage, setDogImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDogImage();
  }, []);

  const fetchDogImage = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random');
      setDogImage(response.data.message);
    } catch (error) {
      console.error('Error fetching dog image', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dog-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <img src={dogImage} alt="Random Dog" className="dog-image" />
          <button onClick={fetchDogImage}>Get New Dog</button>
        </div>
      )}
    </div>
  );
};

export default DogImage;
