import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image, ImageBackground, Alert} from 'react-native';
import SignupScreen from './CrearCuenta';
import ForgotPasswordScreen from './OlvideContraseña';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // Estado para manejar la pantalla actual
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [error, setError] = useState(''); // Estado para manejar mensajes de error

  const handleLogin = () => {
    if (!email) {
      setError('Por favor, ingresa tu correo electrónico.');
    } else if (!password) {
      setError('Por favor, ingresa tu contraseña.');
    } else {
      setError(''); // Limpia el mensaje de error
      Alert.alert('Inicio de sesión exitoso');
    }
  };

  const handleBack = (screen) => {
    setCurrentScreen(screen); // Cambia a la pantalla indicada
    setError(''); // Limpia el mensaje de error al cambiar de pantalla
  };

  return (
    <ImageBackground 
      source={require('./assets/ganado1.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        {currentScreen === 'signup' ? (
          <SignupScreen onBack={() => handleBack('login')} /> // Regresa a Iniciar Sesión
        ) : currentScreen === 'forgotPassword' ? (
          <ForgotPasswordScreen onBack={() => handleBack('login')} /> // Regresa a Iniciar Sesión
        ) : (
          <View style={styles.formContainer}>
            <Image 
              style={styles.logo}
              source={require('./assets/logo.png')} 
            />
            <TextInput
              style={[styles.input]}
              placeholder="Correo Electrónico"
              onChangeText={setEmail} // Actualiza el estado del correo
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {error.includes('correo') && <Text style={styles.errorText}>{error}</Text>} {/* Mensaje de error para correo */}
            
            <TextInput
              style={[styles.input]}
              placeholder="Contraseña"
              onChangeText={setPassword} // Actualiza el estado de la contraseña
              secureTextEntry
            />
            {error.includes('contraseña') && <Text style={styles.errorText}>{error}</Text>} {/* Mensaje de error para contraseña */}
            
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
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
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
  },
  button: {
    width: '65%',
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
    width: '100%', // Asegura que el mensaje ocupe todo el ancho del campo
  },
});
