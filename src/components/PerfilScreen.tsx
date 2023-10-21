import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons'; // Importa el set de íconos Entypo


const Perfil = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true); 
    const [isUsernameEditing, setIsUsernameEditing] = useState(false);
    const [isEmailEditing, setIsEmailEditing] = useState(false);
    // Función para obtener el token del AsyncStorage
    const getToken = async () => {
        try {
            return await AsyncStorage.getItem('token');
        } catch (error) {
            console.error('Error al obtener el token:', error);
        }
    };

    const updateProfile = async (fieldToUpdate : "username" | "email") => {
        try {
            const token = await getToken();
            const requestBody = fieldToUpdate === "username" ? { username } : { email };
    
            const response = await fetch('http://192.168.0.2:3000/profile/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Datos actualizados exitosamente:', data);
                return true; // Indicar que la actualización fue exitosa
            } else {
                console.error('Error actualizando el perfil:', data);
                return false; // Indicar que hubo un error
            }
        } catch (error) {
            console.error('Hubo un error al actualizar el perfil:', error);
            return false; // Indicar que hubo un error
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken();  // Obtener el token
                console.log(token)
                const response = await fetch('http://192.168.0.2:3000/profile/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Enviar el token en el header
                    },
                });
                console.log("funcionando")
                const data = await response.json();

                if (response.ok) {
                    setUsername(data.username);
                    setEmail(data.email);
                } else {
                    console.error('Error obteniendo los datos del usuario:', data);
                }
            } catch (error) {
                console.error('Hubo un error al hacer la petición:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Cargando datos...</Text>
            </View>
        );
    }

    const handleSave = async (field: "username" | "email") => {
        const updateWasSuccessful = await updateProfile(field); // que updateProfile devuelva true/false dependiendo del éxito
        if (updateWasSuccessful) {
            if (field === "username") {
                setIsUsernameEditing(false);
            } else {
                setIsEmailEditing(false);
            }
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre de usuario:</Text>
            <View style={styles.inputContainer}>
                {isUsernameEditing ? (
                    <TextInput
                        style={styles.dataText}
                        value={username}
                        onChangeText={setUsername}
                    />
                ) : (
                    <Text style={styles.dataText}>{username}</Text>
                )}
                <TouchableOpacity onPress={() => setIsUsernameEditing(!isUsernameEditing)}>
                    <Entypo name="edit" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {isUsernameEditing && <Button title="Guardar" onPress={() => handleSave("username")} />}

            <Text style={styles.label}>Email:</Text>
            <View style={styles.inputContainer}>
                {isEmailEditing ? (
                    <TextInput
                        style={styles.dataText}
                        value={email}
                        onChangeText={setEmail}
                    />
                ) : (
                    <Text style={styles.dataText}>{email}</Text>
                )}
                <TouchableOpacity onPress={() => setIsEmailEditing(!isEmailEditing)}>
                    <Entypo name="edit" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {isEmailEditing && <Button title="Guardar" onPress={() => handleSave("email")} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginVertical: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 16,
        backgroundColor: '#f5f5f5',
        
    },
    dataText: {
        flex: 1, // Para que ocupe todo el espacio disponible
        fontSize: 16,
        padding: 12,
    },
});

export default Perfil;
