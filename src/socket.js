import io from 'socket.io-client'
import servicePath from './config/apiUrl'

const socket = io.connect(servicePath.socketUrl);
export default socket;