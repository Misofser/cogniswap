import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const RegistrationTable = ({ onRegistrationComplete, setLoading }) => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    if (!formData.name || !formData.dateOfBirth || !formData.study || !formData.teach) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setLoading(true);

    // Perform registration logic and handle success/error

    // Simulate registration success after a delay (replace with your actual registration logic)
    setTimeout(() => {
      setLoading(false);
      onRegistrationComplete('roomId123'); // Pass the generated roomId
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="What do you want to study?"
        onChangeText={(text) => setFormData({ ...formData, study: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="What do you want to teach?"
        onChangeText={(text) => setFormData({ ...formData, teach: text })}
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
