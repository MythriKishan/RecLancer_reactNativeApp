import React, { Component , AsyncStorage} from 'react';
import * as actions from '../actions'
import { connect } from 'react-redux'
import React, { Component } from 'react'

export class exampleredux extends Component {

    //Constructor is necessary to pass the props 
    constructor(props){
        super(props)
        this.state={

        }
    }
    componentDidMount(){
        
        this.props.userId(value)      //to set the value 
        
        console.log(this.props.User)  // to get the value

        //ensure userId is function returned from mapdispatchprops
        //User is the state value from the map state to props
    }
    render() {
        return (
          <View>

          </View>
        )
    }
}

//Below two functions are necessary for component we are using redux
//We are dispatching the action
const mapDispatchToProps = dispatch => {
  return {
    userId: (id) => dispatch(actions.action_userid(id)),  
 

  }
}

//we are converting states to props
const mapStateToProps = (state /*, ownProps*/) => {
  // console.log(state.appstate.userid+"userjkdjfasdkjfakj")
  return {
   
    User:state.appstate.userid,

  }
}

//finally we are exporting through connect ensure connect is declared above

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(exampleredux)

