import React from "react";
import { StyleSheet,Text,View } from "react-native";
import Header from "../../components/Header";

const Success = () => {

return(
<View style={styles.screen}>    
    <View style={styles.headerStyle}>
                    {/* Header reusable component*/}
    {/*<Header title="Freelancer Ad Post Successful" style={styles.headerTitle} />*/}
    <Text style={styles.headerTitle}>Freelancer Ad Post Successful</Text>
    </View>
</View>
)
}

export default Success;

const styles = StyleSheet.create({
screen:{
 flex:1
},
headerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40

},
headerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily:'OpenSans-bold',
    fontSize:20,
    color:'white'
    
},


});