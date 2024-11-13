import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image, ImageBackground, Alert } from 'react-native';
import SignupScreen from './CrearCuenta';
import ForgotPasswordScreen from './OlvideContraseña';
import Dashboard from './Home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email) {
      setError('Por favor, ingresa tu correo electrónico.');
    } else if (!password) {
      setError('Por favor, ingresa tu contraseña.');
    } else {
      setError('');
      Alert.alert('Inicio de sesión exitoso');
      setCurrentScreen('dashboard');
    }
  };

  const handleBack = (screen) => {
    setCurrentScreen(screen);
    setError('');
  };

  // Renderiza la pantalla de Dashboard si `currentScreen` es 'dashboard'
  if (currentScreen === 'dashboard') {
    return <Dashboard />;
  }

  return (
    <ImageBackground 
      source={require('./assets/ganado1.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        {currentScreen === 'signup' ? (
          <SignupScreen onBack={() => handleBack('login')} />
        ) : currentScreen === 'forgotPassword' ? (
          <ForgotPasswordScreen onBack={() => handleBack('login')} />
        ) : (
          <View style={styles.formContainer}>
            <Image 
              style={styles.logo}
              source={require('./assets/logo.png')} 
            />
            <TextInput
              style={[styles.input]}
              placeholder="Correo Electrónico"
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {/* Mensaje de error para el campo de correo */}
            {error.includes('correo') && <Text style={styles.errorText}>{error}</Text>}
            
            <TextInput
              style={[styles.input2]}
              placeholder="Contraseña"
              onChangeText={setPassword}
              secureTextEntry
            />
            {/* Mensaje de error para el campo de contraseña */}
            {error.includes('contraseña') && <Text style={styles.errorText}>{error}</Text>}
            
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            
            {/* Enlaces a otras pantallas */}
            <Text style={styles.link} onPress={() => handleBack('signup')}>
              Crear Cuenta
            </Text>
            <Text style={styles.link} onPress={() => handleBack('forgotPassword')}>
              Olvidé Contraseña
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(233, 236, 239, 0.1)',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: 'rgba(233, 236, 239, 0.8)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  input: {
    width: 200,
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
  },
  input2: {
    width: 200,
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
  },
  button: {
    width: 130,
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginVertical: 5,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
});
