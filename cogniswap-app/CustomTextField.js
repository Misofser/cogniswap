import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CustomTextField = ({ title, chips, setChips, suggestedChips }) => {
  const [inputText, setInputText] = useState('');

  const handleAddChip = (chip) => {
    if (chip.trim() !== '') {
      setChips([...chips, chip.trim()]);
      setInputText('');
    }
  };

  const handleRemoveChip = (chipToRemove) => {
    setChips(chips.filter((chip) => chip !== chipToRemove));
  };

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const filteredSuggestions = suggestedChips.filter(
    (suggestion) =>
      suggestion.toLowerCase().indexOf(inputText.toLowerCase()) !== -1 &&
      !chips.includes(suggestion)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chipContainer}>
        {chips.map((chip) => (
          <TouchableOpacity key={chip} onPress={() => handleRemoveChip(chip)}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>{chip}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type and press Enter..."
          value={inputText}
          onChangeText={handleInputChange}
          onSubmitEditing={() => handleAddChip(inputText)}
        />
      </View>
      {inputText.trim() !== '' && suggestedChips.length > 0 && (
        <View style={styles.suggestedChipsContainer}>
          {filteredSuggestions.map((suggestion) => (
            <TouchableOpacity key={suggestion} onPress={() => handleAddChip(suggestion)}>
              <View style={styles.suggestedChip}>
                <Text style={styles.suggestedChipText}>{suggestion}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '86%',
    minHeight: 100,
    alignItems: 'flex-start',
    paddingBottom: 8,
  },
  title: {
    textAlign: 'left',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chip: {
    backgroundColor: '#5da5a9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  chipText: {
    color: 'white',
  },
  inputContainer: {
    width: '100%',
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  input: {
    height: 46,
  },
  suggestedChipsContainer: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  suggestedChip: {
    backgroundColor: '#d9d9d9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  suggestedChipText: {
    color: 'black',
  },
});

export default CustomTextField;
