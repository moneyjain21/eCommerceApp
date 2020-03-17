import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TextInput, Dimensions, Text, SafeAreaView } from 'react-native';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

@inject('loginStore')
@observer
class Register extends Component {

    @observable fullName = '';
    @observable email = '';
    @observable password = '';
    @observable mobile = '';

    constructor(props) {
        super(props);
        this.state = {
            hidePassword: true
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Register',
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

    onPressRegisterBtn = () => {
        console.log('Register')
    }

    onPressLoginBtn = () => {
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 0.9, marginTop: 10 }}>
                    <Image
                        style={{ alignSelf: 'center' }}
                        resizeMode={'contain'}
                        source={require('../assets/icon.png')}
                    />
                    <View style={{ marginVertical: 10 }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Image
                                source={require('../assets/user.png')}
                                resizeMode="contain"
                                style={{ height: 22, width: 22 }}
                            />
                            <Text style={{ fontSize: 18, paddingLeft: 5, color: '#202F42' }}>Full Name</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <TextInput
                                style={styles.textField}
                                placeholder="Full Name"
                                autoCapitalize="words"
                                maxLength={30}
                                Ref={ref => (this.full_name_ref = ref)}
                                value={this.fullName}
                                onChangeText={text => {
                                    this.fullName = text;
                                }}
                            />
                        </View>
                    </View>
                    <View style={{paddingVertical: 10}}>
                        <View style={{ flexDirection: 'row', }}>
                            <Image
                                source={require('../assets/mail.png')}
                                resizeMode="contain"
                                style={{ height: 22, width: 22 }}
                            />
                            <Text style={{ fontSize: 18, paddingLeft: 5, color: '#202F42' }}>Email</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <TextInput
                                style={styles.textField}
                                placeholder="Email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                maxLength={30}
                                Ref={ref => (this.email_ref = ref)}
                                value={this.email}
                                onChangeText={text => {
                                    this.email = text.trim();
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={require('../assets/lock.png')}
                                resizeMode="contain"
                                style={{ height: 22, width: 22 }}
                            />
                            <Text style={{ fontSize: 18, paddingLeft: 5, color: '#202F42' }}>Password</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <TextInput
                                style={styles.textField}
                                placeholder="Password"
                                secureTextEntry={this.state.hidePassword}
                                maxLength={16}
                                autoCapitalize="none"
                                Ref={ref => (this.password_ref = ref)}
                                value={this.password}
                                onChangeText={text => {
                                    this.password = text;
                                }}
                            />
                            <TouchableOpacity activeOpacity={0.8} style={styles.visibilityBtn} onPress={this.managePasswordVisibility}>
                                <Image
                                    source={(this.state.hidePassword) ? require('../assets/hide.png') : require('../assets/view.png')}
                                    resizeMode="contain"
                                    style={{ height: 22, width: 22 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{paddingVertical: 10}}>
                        <View style={{ flexDirection: 'row', }}>
                            <Image
                                source={require('../assets/phone.png')}
                                resizeMode="contain"
                                style={{ height: 22, width: 22 }}
                            />
                            <Text style={{ fontSize: 18, paddingLeft: 5, color: '#202F42' }}>Mobile</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <TextInput
                                style={styles.textField}
                                placeholder="Mobile Number"
                                keyboardType="numeric"
                                maxLength={10}
                                Ref={ref => (this.mobile_ref = ref)}
                                value={this.mobile}
                                onChangeText={text => {
                                    this.mobile = text.trim();
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 30 }}>
                        <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: '#202F42', }]} onPress={() => this.onPressRegisterBtn()}>
                            <Text style={{ textAlign: 'center', alignSelf: 'center', paddingVertical: 15, fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 0.1, justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: '#202F42' }}>Already on ClickPick? <Text style={{ fontStyle: 'italic' }} onPress={() => this.onPressLoginBtn()}>Login</Text></Text>
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
        width: SCREEN_WIDTH - 60,
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
        width: SCREEN_WIDTH - 30,
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#202F42',
        paddingLeft: 10,
        fontSize: 16
    }
});

export default Register;