import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';

const FormularioVacas = () => {
  const [tipoDeAnimal, setTipoDeAnimal] = useState('');
  const [raza, setRaza] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [peso, setPeso] = useState('');
  const [estadoSalud, setEstadoSalud] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const handleSubmit = () => {
    if (!tipoDeAnimal || !raza || !fechaNacimiento || !peso || !estadoSalud) {
      Alert.alert('Error', 'Por favor, complete todos los campos obligatorios.');
      return;
    }

    const datosVaca = {
      tipo_de_animal: tipoDeAnimal,
      raza,
      fecha_nacimiento: fechaNacimiento,
      peso,
      estado_salud: estadoSalud,
      observaciones,
    };

    
      axios.post('http://192.168.210.251:3000/api/animal', datosVaca)
      .then((response) => {
        Alert.alert('Formulario enviado', 'Los datos del ganado se han registrado con éxito.');
        console.log('Respuesta del servidor:', response.data);
      })
      .catch((error) => {
        console.log('Error al enviar los datos:', error);
        Alert.alert('Error', 'No se pudo enviar el formulario.');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Formulario de Datos del Ganado (Vacas)</Text>

      <TextInput
        style={styles.input}
        placeholder="Tipo de animal"
        value={tipoDeAnimal}
        onChangeText={setTipoDeAnimal}
      />

      <TextInput
        style={styles.input}
        placeholder="Raza"
        value={raza}
        onChangeText={setRaza}
      />

      <TextInput
        style={styles.input}
        placeholder="Fecha de nacimiento (YYYY/MM/DD)"
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
      />

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        value={peso}
        onChangeText={setPeso}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Estado de salud"
        value={estadoSalud}
        onChangeText={setEstadoSalud}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Observaciones"
        value={observaciones}
        onChangeText={setObservaciones}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar Vaca</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FormularioVacas;
