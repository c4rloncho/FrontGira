import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import styles from './registerStyles';

const RegisterScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.0.2:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // Registro exitoso
        alert('Registro exitoso');
        // Puedes realizar acciones adicionales aquí, como navegar a la pantalla de inicio de sesión
        navigation.navigate('Login');
      } else {
        // El servidor devolvió un error
        alert('El registro falló. Verifica los datos proporcionados.');
      }
    } catch (error) {
      // Manejo de errores, por ejemplo, problemas de red
      console.error('Error en el registro:', error);
    }
  };

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrarse</Text>

      <TextInput
        label="Nombre de usuario"
        value={username}
        onChangeText={text => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        label="Correo electrónico"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleRegister}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Registrarse
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.registerLink}>
          ¿Ya tienes una cuenta? Inicia Sesión aquí.
        </Text>
      </TouchableOpacity>
    </View>
);
};

export default RegisterScreen;
