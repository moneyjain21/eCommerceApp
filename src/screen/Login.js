import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity, Image, TextInput, Dimensions, Text, SafeAreaView} from 'react-native';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
import SocialSignin from '../screen/SocialSignin';
import {setItemInAsyncStore} from '../utility/CommonFunctions';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

@inject('loginStore')
@observer
class Login extends Component {

    @observable email = '';
    @observable password = '';

    constructor(props) {
        super(props);
        this.state = {
            hidePassword: true
        };
    }   

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Login',
            headerStyle: {
                backgroundColor: '#202F42',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20
            },
            headerLeft: (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        style={styles.backButton}
                        resizeMode='contain'
                        source={require('../assets/leftArrow.png')}
                    />
                </TouchableOpacity>
            )
        };
    };

    managePasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    }

    onPress_loginBtn = () => {
        if(this.props.loginStore.email === 'admin' && this.props.loginStore.password === '12345678'){
            this.setState({ hidePassword: true });
            this.props.navigation.navigate('TabviewExample')
        }
        else {
            alert('Invalid Credentials')
        }
    }

    forgotPassword = () => {
        console.log('forgot password');
    }

    onPress_registerBtn = () => {
        this.props.navigation.navigate('Register')
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{flex: 0.9, marginTop: 10}}>
                <Image
                    style={{alignSelf: 'center'}}
                    resizeMode={'contain'}
                    source={require('../assets/icon.png')}
                />
                    <View style={{marginTop: 20, marginBottom: 10}}>
                        <View style={{flexDirection: 'row', }}>
                            <Image 
                                source={require('../assets/mail.png')} 
                                resizeMode="contain" 
                                style={{height: 22, width: 22}} 
                            />
                            <Text style={{fontSize: 18, paddingLeft: 5, color: '#202F42'}}>Email</Text>
                        </View>
                        <View style={{marginTop: 5}}>
                            <TextInput 
                                style={styles.textField}
                                placeholder="Email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                maxLength={30}
                                Ref={ref => (this.email_ref = ref)}
                                value={this.props.loginStore.email}
                                onChangeText={text => {
                                    this.email = text.trim();
                                    this.props.loginStore.email = text.trim();
                                }}
                            />
                        </View>
                    </View>
                    <View style={{paddingVertical: 10}}>
                        <View style={{flexDirection: 'row'}}>
                            <Image 
                                source={require('../assets/lock.png')} 
                                resizeMode="contain" 
                                style={{height: 22, width: 22}}
                            />
                            <Text style={{fontSize: 18, paddingLeft: 5, color: '#202F42'}}>Password</Text>
                        </View>
                        <View style={{marginTop: 5}}>
                            <TextInput 
                                style={styles.textField}
                                placeholder="Password"
                                secureTextEntry={this.state.hidePassword}
                                maxLength={16}
                                autoCapitalize="none"
                                Ref={ref => (this.password_ref = ref)}
                                value={this.props.loginStore.password}
                                onChangeText={text => {
                                    this.password = text;
                                    this.props.loginStore.password = text;
                                }}
                            />
                            <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
                                <Image
                                    source = { ( this.state.hidePassword ) ? require('../assets/hide.png') : require('../assets/view.png') } 
                                    resizeMode="contain" 
                                    style={{height: 22, width: 22}}
                                />
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                    <Text style={{textAlign: 'right'}} onPress={() => this.forgotPassword()}>Forgot Pasword</Text>
                    <View style={{alignItems: 'center', marginTop: 30}}>
                        <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: '#202F42',}]} onPress={() => this.onPress_loginBtn()}>
                            <Text style={{textAlign: 'center', alignSelf: 'center', paddingVertical: 15, fontSize: 18, fontWeight: 'bold', color: '#ffffff'}}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingVertical: 20}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#202F42'}}> OR </Text>
                    </View>
                    <SocialSignin />
                </View>
                <View style={{flex: 0.1, justifyContent:'center'}}>
                    <Text style={{fontWeight: 'bold', color: '#202F42'}}>Do not have a ClickPick account? <Text style={{fontStyle: 'italic'}} onPress={() => this.onPress_registerBtn()}>Register</Text></Text>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
      backButton: {
        height: 20,
        width: 15,
        marginHorizontal: 20,
        paddingTop: 15
      },
      buttonStyle: {
        height: 50,
        width: SCREEN_WIDTH-60,
        borderRadius: 25
      },
      visibilityBtn: {
        position: 'absolute',
        right: 3,
        height: 50,
        padding: 5,
        justifyContent: 'center'
      },
    textField: {
        width: SCREEN_WIDTH-30, 
        height: 50, 
        borderWidth: 1, 
        borderRadius: 5, 
        borderColor: '#202F42', 
        paddingLeft: 10, 
        fontSize: 16
    }
});

export default Login;