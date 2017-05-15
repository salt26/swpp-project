import React from 'react'
import RoomList from './RoomList.js'
import SignOut from '../TimeLinePage/SignOut.js'
import { postBack, showCreateRoom } from '../../actions'
import { connect } from 'react-redux'
import './styles.css'

class ChattingRoomPage extends React.Component {
    render() {
        // TODO <br />들은 나중에 지워주세요.
        return (
/*            this.props.rooms.rooms.length === 0 ? (
                <div >
                <SignOut />
                <br /> <br /> <br /> <br /> <br /> <br />
                <div className="ChattingRoom">
                <p>Now loading...</p>
                </div>
                </div>
            ) : (
*/              <div >
                <SignOut />
                <br /> <br /> <br /> <br /> <br /> <br /> 
                <div className="ChattingRoom">
                <button id="to_main_page_field" onClick={this.props.onBackClick}>Back to main</button>
                <div className="divider" />
                <button id="new_room_button_field" onClick={this.props.onNewRoomClick}>New room</button>
                <RoomList />
                </div>
                </div>
//          )
        )
    }
}
/*
let mapStateToProps = (state) => {
    return {
        rooms: Object.assign(state)
    }
}
*/
let mapDispatchToProps = (dispatch) => {
    return {
        onBackClick: () => dispatch(postBack()),
        onNewRoomClick: () => dispatch(showCreateRoom())
    }
}

//ChattingRoomPage = connect(mapStateToProps, mapDispatchToProps)(ChattingRoomPage)
ChattingRoomPage = connect(undefined, mapDispatchToProps)(ChattingRoomPage)

export default ChattingRoomPage