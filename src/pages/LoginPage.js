import React from "react";
import { View, StyleSheet, TextInput, Text, Button, ActivityIndicator, Alert } from "react-native";
import firebase from "firebase";

import { tryLogin } from "../actions";
import { connect } from "react-redux";

import FormRow from '../components/FormRow';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            mail: '',
            password: '',
            isLoading: false,
            message: '',
        }
    }

    componentDidMount() {
        const config = {
            apiKey: "AIzaSyBmB32LbmdlCLI_E8OqiDMp46KP5a88JWg",
            authDomain: "series-5c4cc.firebaseapp.com",
            databaseURL: "https://series-5c4cc.firebaseio.com",
            projectId: "series-5c4cc",
            storageBucket: "series-5c4cc.appspot.com",
            messagingSenderId: "363908263998"
        };
        firebase.initializeApp(config);
    }

    onChangeHandler(field, value) {
        this.setState({
           [field]: value 
        });
    }

    tryLogin() {
        this.setState({ isLoading: true, message: '' });
        const { mail: email, password } = this.state;

        this.props.tryLogin({ email, password })
            .then((user) => {
                if (user) {
                    this.props.navigation.replace('Main');    
                } else {
                    this.setState({
                        isLoading: false,
                        message: ''
                    });
                }
            })
            .catch(error => {
                this.setState({ 
                    isLoading: false, 
                    message: this.getMessageByErrorCode(error.code) 
                });
            });
    }

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'Senha incorreta';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            case 'auth/invalid-email':
                return 'E-mail inválido';    
            default :
                return 'Erro desconhecido';
        }
    }

    renderMessage() {
        const { message } = this.state;
        if (!message)
            return null;
        
        return (
            <View>
                <Text>{message}</Text>
            </View>
        );
    }
    renderButton() {
        if (this.state.isLoading)
            return <ActivityIndicator />;
        return (
            <Button
                title='Entrar' 
                onPress={() => this.tryLogin()} />
        );
    }

    render() {
        return(
            <View style={styles.container}>
                <FormRow first>
                    <TextInput 
                        style={styles.input}
                        placeholder="user@mail.com"
                        value={this.state.mail}
                        onChangeText={value => this.onChangeHandler('mail', value)}
                    />
                </FormRow>
                <FormRow last>
                    <TextInput 
                        style={styles.input}
                        placeholder="******"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                    />
                </FormRow>

                { this.renderButton() }
                { this.renderMessage() }
            </View>
        )
    }
}

// rnss
const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    }
});

const mapDispatchToProps = {
    tryLogin
}

export default connect(null, mapDispatchToProps)(LoginPage)