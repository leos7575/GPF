import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import * as Progress from 'react-native-progress'; // Importamos Progress

// Leaflet Map
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Dashboard = () => {
  const [datos, setDatos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDatos = () => {
    axios.get('http://192.168.227.251:3000/api/datos')
      .then((response) => {
        console.log(response.data);
        setDatos(response.data); 
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
        setIsLoading(false);
        Alert.alert('Error', 'No se pudieron cargar los datos. Verifica tu conexión y el servidor.');
      });
  };

  useEffect(() => {
    fetchDatos(); // Llamada inicial

    // Configura un intervalo para actualizar los datos cada 5 segundos (5000 ms)
    const intervalo = setInterval(() => {
      fetchDatos();
    }, 500);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalo);
  }, []);

  if (isLoading) {
    return <Text style={styles.loadingText}>Cargando datos...</Text>;
  }

  // Obtenemos solo el dato más reciente (el último elemento del array)
  const datoMasReciente = datos && datos.length > 0 ? datos[datos.length - 1] : null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Monitoreo de Salud</Text>

      {datoMasReciente ? (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>Temperatura: {datoMasReciente.temperatura}°C</Text>
          <Progress.Bar 
            progress={datoMasReciente.temperatura / 40} // Ajusta el valor máximo (por ejemplo, 40°C)
            width={null}
            height={20}
            color="#3498db"
            borderWidth={0}
            style={styles.progressBar}
          />

          <Text style={styles.dataText}>Pulso: {datoMasReciente.pulso} bpm</Text>
          <Progress.Bar 
            progress={datoMasReciente.pulso / 180} // Ajusta el valor máximo (por ejemplo, 180 bpm)
            width={null}
            height={20}
            color="#e74c3c"
            borderWidth={0}
            style={styles.progressBar}
          />

          <Text style={styles.dataText}>Oxigenación: {datoMasReciente.oxigeno}%</Text>
          <Progress.Bar 
            progress={datoMasReciente.oxigeno / 100} // Máximo de 100%
            width={null}
            height={20}
            color="#2ecc71"
            borderWidth={0}
            style={styles.progressBar}
          />
        </View>
      ) : (
        <Text>No hay datos disponibles.</Text>
      )}

      {/* Aquí está el mapa de Leaflet */}
      <MapContainer 
        center={[datoMasReciente?.lat || 21.818999, datoMasReciente?.lng || -102.764098]} 
        zoom={13} 
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[datoMasReciente?.lat || 21.818999, datoMasReciente?.lng || -102.764098]}>
          <Popup>
            <Text>Ubicación de los datos</Text>
          </Popup>
        </Marker>
      </MapContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  dataContainer: {
    marginTop: 20,
  },
  dataText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBar: {
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default Dashboard;
