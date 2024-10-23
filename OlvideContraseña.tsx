import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, Image, ImageBackground } from 'react-native';

export default function ForgotPasswordScreen({ onBack }) {
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(true);
  const [error, setError] = useState('');
  const handleResetPassword = () => {
    if (!email) {
        setError('Por favor, ingresa tu correo electrónico.');
      }else {
        setError(''); // Limpia el mensaje de error
        Alert.alert('Registro exitoso', `¡Bienvenido, ${email}!`);
      }
  };

  return (
    <ImageBackground 
      source={require('./assets/ganado1.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            style={styles.logo}
            source={require('./assets/logo.png')} 
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Restablecer Contraseña</Text>
          <Text style={styles.subtitle}>Por favor, ingresa tu correo electrónico para recibir un enlace de restablecimiento.</Text>
          
          <TextInput
            style={[styles.input, { borderColor: emailFocused ? 'blue' : 'black' }]}
            placeholder="Correo Electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setEmailFocused(false)}
            onBlur={() => setEmailFocused(true)}
          />
          {error.includes('correo') && <Text style={styles.errorText}>{error}</Text>} {/* Mensaje de error para correo */}
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
          
          <View style={styles.linksContainer}>
            <Text style={styles.link} onPress={onBack}>
              Regresar a Iniciar Sesión
            </Text>
          </View>
        </View>
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
  logoContainer: {
    marginTop: 50,
    marginBottom: 30,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    color: '#555',
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
  linksContainer: {
    marginTop: 20,
    alignItems: 'center',
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
