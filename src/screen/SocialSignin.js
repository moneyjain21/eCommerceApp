import React, { Component } from 'react';
import {StyleSheet, View, Dimensions, Text, TouchableOpacity} from 'react-native';
import { observer, inject } from 'mobx-react';
import { GoogleSignin, statusCodes, GoogleSigninButton } from 'react-native-google-signin';
import {setItemInAsyncStore} from '../utility/CommonFunctions';

const SCREEN_WIDTH = Dimensions.get('screen').width;

@inject('loginStore')
@observer
class SocialSignin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: ''
        };
    }

    static navigationOptions = { header: null }

    componentDidMount() {
        this.setupGoogleSignin();
    }

      afterSuccessfulGoogleSignIn = async (userData) => {
        // this.props.loginStore.toggleLoader(true)
        this.props.loginStore.socialLogin = true
        this.props.loginStore.firstName = userData.givenName
        this.props.loginStore.lastName = userData.familyName
        this.props.loginStore.email = userData.email
        this.props.loginStore.username = userData.id
        this.props.loginStore.password = userData.id
        this.props.loginStore.photoUrl = userData.photo
        if (this.props.loginStore.email != '' && this.props.loginStore.email.length > 1) {
        //   this.props.loginStore.toggleLoader(false)
          setItemInAsyncStore('userData', JSON.stringify(this.props.loginStore.userInfo))
          setItemInAsyncStore('isLoggedIn', 'true');
          this.props.navigation.navigate('TabviewExample')
        }
        else {
        //   this.props.loginStore.toggleLoader(false)
          console.log('Email is required!')
        }
      }

    async setupGoogleSignin() {
        const IOS_CLIENT_ID = '161706665036-0dqu4i2sfe682f02kndo4uipg3i1ma4g.apps.googleusercontent.com'
        const ANDROID_CLIENT_ID = '161706665036-kmkeq780nltvau61svop3mmab7v891rl.apps.googleusercontent.com'
        const CLIENT_ID = Platform.OS == 'ios' ? IOS_CLIENT_ID : ANDROID_CLIENT_ID;
        try {
            await GoogleSignin.hasPlayServices;
            await GoogleSignin.configure({
                webClientId: CLIENT_ID,
                offlineAccess: true
            });
        } catch (err) {
            console.log('Google signin error', err.code, err.message);
        }
    }

    onPress_googleBtn = () => {
        this._signIn();
    };

    isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        return isSignedIn;
    };

    _signIn = async () => {
        if (await this.isSignedIn()) {
            console.log('Signing out')
            this._signOut()
        }
        //Prompts a modal to let the user sign in into your application.
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('google response', userInfo)
            this.afterSuccessfulGoogleSignIn(userInfo.user)
        } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
            } else {
                console.log('Some Other Error Happened', error);
            }
        }
    };

    //   _getCurrentUser = async () => {
    //     //May be called eg. in the componentDidMount of your main component.
    //     //This method returns the current user
    //     //if they already signed in and null otherwise.
    //     try {
    //       const userInfo = await GoogleSignin.signInSilently();
    //       this.setState({ userInfo });
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    _signOut = async () => {
        //Remove user session from the device.
        try {
            // await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ user: null }); // Remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };

    //   _revokeAccess = async () => {
    //     //Remove your application from the user authorized applications.
    //     try {
    //       await GoogleSignin.revokeAccess();
    //       console.log('deleted');
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    render() {
        return (
            <View style={styles.container}>
                {/* <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => this.onPress_googleBtn()}
                /> */}
                <TouchableOpacity 
                    style={styles.buttonStyle}
                    onPress={() => this.onPress_googleBtn()}
                >
                    <Text style={{textAlign: 'center', alignSelf: 'center', paddingVertical: 15, fontSize: 18, fontWeight: 'bold', color: '#ffffff'}}>Login with Google</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    headerBtn: {
        height: 40,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
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
        borderRadius: 25,
        backgroundColor: '#e24e4a'
      }
});

export default SocialSignin;
