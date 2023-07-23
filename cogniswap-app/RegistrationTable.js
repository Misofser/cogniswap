import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomTextField from './CustomTextField';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

const RegistrationTable = ({ onRegistrationComplete, setLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    study: [],
    teach: []
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [ageError, setAgeError] = useState('');

  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setFormData({ ...formData, dateOfBirth: selectedDate.toISOString().split('T')[0] });
    }
  };

  const isUnderage = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
  
    return age < 18;
  };

  const handleSubmit = async () => {
    
    console.log("handleSubmit", JSON.stringify(formData))
    
    if (!formData.name || !formData.dateOfBirth || formData.study.length === 0 || formData.teach.length === 0) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (isUnderage(formData.dateOfBirth)) {
      setAgeError('You must be at least 18 years old to register');
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

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Name:</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Alexander Smith"
        value={formData.name}
        onChangeText={value => handleInputChange('name', value)}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Date of birth:</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="2000-01-01"
        value={formData.dateOfBirth} // Display dateOfBirth in the TextInput
        onFocus={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {ageError ? <Text style={styles.errorText}>{ageError}</Text> : null}

      <CustomTextField
        title="What do you want to study?"
        chips={formData.study}
        setChips={(chips) => handleInputChange('study', chips)}
        suggestedChips={['Math', 'Programming', 'Artificial Intelligence (AI)', 'English', 'Spanish', 'German', 'Georgian', 'Science', 'History', 'Art']} // Add suggested chips here
      />

      <CustomTextField
        title="What do you want to teach?"
        chips={formData.teach}
        setChips={(chips) => handleInputChange('teach', chips)}
        suggestedChips={['Math', 'Programming', 'Artificial Intelligence (AI)', 'English', 'Spanish', 'German', 'Georgian', 'Science', 'History', 'Art']} // Add suggested chips here
      />

      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="I am ready to start" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    width: '86%', // Set the width to 86% of the available space
    marginBottom: 8,
  },
  title: {
    textAlign: 'left',
    width: '86%',
  },
  
  buttonContainer: {
    width: '86%',
    marginTop: 20, // Adjust this value to set the distance between the form and the button
  },

  input: {
    width: '86%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 8,
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
