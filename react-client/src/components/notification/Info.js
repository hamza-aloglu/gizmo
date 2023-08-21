import '../../css/notification.css';

const Info = ({message}) => {
    return (
        <div className="popup">
            {message}
        </div>
    )
}

export default Info;