import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import FormularioVacas from './form';

// Importa las imágenes locales
import temperaturaImage from './assets/temperatura.png';
import pulsoImage from './assets/pulso.png';
import oxigenoImage from './assets/oxigeno.png';

// Importa MapView
import MapView, { Marker } from 'react-native-maps';

const Dashboard = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [error, setError] = useState('');
  const [datos, setDatos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const fetchDatos = () => {
    axios.get('http://192.168.210.251:3000/api/datos')
      .then((response) => {
        setDatos(response.data); 
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert('Error', 'No se pudieron cargar los datos. Verifica tu conexión y el servidor.');
      });
  };

  const handleBack = (screen) => {
    setCurrentScreen(screen);
    setError('');
  };

  useEffect(() => {
    fetchDatos();
    const intervalo = setInterval(() => {
      fetchDatos();
    }, 5000); // Actualiza cada 5 segundos
    return () => clearInterval(intervalo);
  }, []);

  if (isLoading) {
    return <Text style={styles.loadingText}>Cargando datos...</Text>;
  }

  const datoMasReciente = datos && datos.length > 0 ? datos[datos.length - 1] : null;

  return (
    <ScrollView style={styles.container}>
      {/* Menú Hamburguesa */}
      <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
        <View style={styles.menuIcon} />
        <View style={styles.menuIcon} />
        <View style={styles.menuIcon} />
      </TouchableOpacity>

      {/* Modal del Menú */}
      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.menu}>
            <Text style={styles.menuTitle}>Opciones</Text>
            <TouchableOpacity onPress={() => handleBack('login')}>
              <Text style={styles.menuItem}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleBack('configuracion')}>
              <Text style={styles.menuItem}>Configuración</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleBack('home')}>
              <Text style={styles.menuItem}>Salud</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuVisible(false)}>
              <Text style={styles.menuItem}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Renderiza la pantalla activa */}
      {currentScreen === 'home' && (
        <View>
          <Text style={styles.title}>Monitoreo de Salud</Text>

          {datoMasReciente ? (
            <View style={styles.card}>
              <View style={styles.progressContainer}>
                {/* Datos de la vaca */}
                <View style={styles.dataContainer}>
                  <Text style={styles.dataLabel}>Temperatura</Text>
                  <Text style={styles.dataValue}>{datoMasReciente.temperatura}°C</Text>
                  <View style={styles.progressWrapper}>
                    <Progress.Circle 
                      progress={datoMasReciente.temperatura / 40} 
                      size={80}
                      color="#0ff"
                      thickness={8}
                      unfilledColor="#444"
                      strokeCap="round"
                      showsText={false}
                      direction="counter-clockwise"
                    />
                    <Image 
                      source={temperaturaImage} 
                      style={styles.iconImage} 
                    />
                  </View>
                </View>

                <View style={styles.dataContainer}>
                  <Text style={styles.dataLabel}>Pulso</Text>
                  <Text style={styles.dataValue}>{datoMasReciente.pulso} bpm</Text>
                  <View style={styles.progressWrapper}>
                    <Progress.Circle 
                      progress={datoMasReciente.pulso / 180}
                      size={80}
                      color="#f80000"
                      thickness={8}
                      unfilledColor="#444"
                      strokeCap="round"
                      showsText={false}
                      direction="counter-clockwise"
                    />
                    <Image 
                      source={pulsoImage} 
                      style={styles.iconImage} 
                    />
                  </View>
                </View>

                <View style={styles.dataContainer}>
                  <Text style={styles.dataLabel}>Oxigenación</Text>
                  <Text style={styles.dataValue}>{datoMasReciente.oxigeno}%</Text>
                  <View style={styles.progressWrapper}>
                    <Progress.Circle 
                      progress={datoMasReciente.oxigeno / 100}
                      size={80}
                      color="#0f0"
                      thickness={8}
                      unfilledColor="#444"
                      strokeCap="round"
                      showsText={false}
                      direction="counter-clockwise"
                    />
                    <Image 
                      source={oxigenoImage} 
                      style={styles.iconImage} 
                    />
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <Text style={styles.noDataText}>No hay datos disponibles.</Text>
          )}

          {/* Mapa de localización */}
          <View style={styles.mapContainer}>
            <MapView style={styles.map} />
          </View>
        </View>
      )}

      {/* Pantalla de configuración */}
      {currentScreen === 'configuracion' && (
        <View>
          <Text style={styles.title}>Configuración</Text>
        </View>
      )}

      {/* Pantalla de perfil */}
      {currentScreen === 'perfil' && (
        <View>
          <Text style={styles.title}>Perfil</Text>
        </View>
      )}

      {/* Pantalla de login */}
      {currentScreen === 'login' && (
        <FormularioVacas onBack={() => handleBack('home')} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#e0e0e0',
    textAlign: 'center',
    marginVertical: 16,
  },
  map: {
    width:'100%',
    height:400,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  dataLabel: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 4,
  },
  dataValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e0e0e0',
    marginBottom: 8,
  },
  noDataText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginVertical: 20,
  },
  progressWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    position: 'absolute',
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  mapContainer: {
    height: 300,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1000,
  },
  menuIcon: {
    width: 30,
    height: 4,
    backgroundColor: '#e0e0e0',
    marginVertical: 4,
    borderRadius: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  menu: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 10,
    width: 250,
  },
  menuTitle: {
    fontSize: 18,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 16,
  },
  menuItem: {
    fontSize: 16,
    color: '#e0e0e0',
    paddingVertical: 10,
    textAlign: 'center',
  },
});

export default Dashboard;
