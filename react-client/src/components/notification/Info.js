import '../../css/notification.css';

const Info = ({message, backgroundColor}) => {
    return (
        <div className="popup" style={{backgroundColor: backgroundColor}}>
            {message}
        </div>
    )
}

export default Info;