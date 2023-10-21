import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ImageBackground  } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import styles from './loginStyles';
const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.0.2:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
      
        // Guarda el token en AsyncStorage
        await AsyncStorage.setItem('token', token);
      
        // Muestra un mensaje de inicio de sesión exitoso
        alert('Inicio de sesión exitoso');
        navigation.navigate('Home')
      
        // Puedes navegar a la pantalla de inicio o realizar otras acciones
      } else {
        // La solicitud al servidor devolvió un error
        // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje de error al usuario
        alert('Credenciales inválidas');
      }
    } catch (error) {
      // Maneja otros errores, como problemas de red
      console.error('Error al iniciar sesión:', error);
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
      <Text style={styles.header}>COLD GIRA</Text>
  
      <TextInput
        label="Correo Electronico"
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
        onPress={() => { handleLogin() }}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Iniciar sesión
      </Button>
  
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>
          ¿No tienes una cuenta? Regístrate aquí.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('')}>
        <Text style={styles.registerLink}>
          Recuperar contraseña
        </Text>
      </TouchableOpacity>
    </View>
  );
};
  


export default LoginScreen;
