import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

const RegistrationTable = ({ onRegistrationComplete, setLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    study: [],
    teach: []
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleStudyChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      study: value.split(',').map(item => item.trim()) // Split the input string by commas and trim whitespace for each element
    }));
  };
  
  const handleTeachChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      teach: value.split(',').map(item => item.trim()) // Split the input string by commas and trim whitespace for each element
    }));
  };

  const handleSubmit = async () => {
    
    console.log("handleSubmit", JSON.stringify(formData))
    
    if (!formData.name || !formData.dateOfBirth || !formData.study || !formData.teach) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${SERVER_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Registration successful');
        const data = await response.json();
        const userId = data.userId;
        console.log('Received user ID:', userId);

        const intervalId = setInterval(async () => {
          try {
            const statusResponse = await fetch(`${SERVER_URL}/api/status/${userId}`, {
              method: 'GET'
            });

            if (statusResponse.ok) {
              const statusData = await statusResponse.json();
              const { matched, roomId } = statusData;

              if (matched) {
                clearInterval(intervalId);
                setLoading(false);
                onRegistrationComplete(roomId);
              }
            } else {
              // Handle status request error
            }
          } catch (error) {
            // Handle status request error
          }
        }, 500);
      } else {
        // Handle registration failed
      }
    } catch (error) {
      // Handle registration error
    }
  };

  return (
    <View style={styles.container}>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={value => handleInputChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={formData.dateOfBirth}
        onChangeText={value => handleInputChange('dateOfBirth', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="What do you want to study?"
        value={formData.study.join(', ')}
        onChangeText={handleStudyChange}
      />

      <TextInput
        style={styles.input}
        placeholder="What do you want to teach?"
        value={formData.teach.join(', ')}
        onChangeText={handleTeachChange}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '86%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  errorText: {
    width: '86%',
    backgroundColor: 'lightcoral',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default RegistrationTable;
